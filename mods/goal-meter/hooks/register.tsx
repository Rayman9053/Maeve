import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Snapshot } from '../types'
import {
  addTask,
  bar,
  clip,
  fmtElapsed,
  fromTodos,
  glyph,
  isFinished,
  otherLine,
  parseGoalArgs,
  parseSnapshot,
  patchTask,
  progress,
  snapshotOf,
} from './lib'

const PANE = 'goal-meter'
const HOUR = 3_600_000

// The goal and its task list live in `$.state`, so a hot reload of the code keeps them.
const goalAtom = atom({ plugin: 'goal-meter', key: 'goal' } as const, null)
const tasksAtom = atom({ plugin: 'goal-meter', key: 'tasks' } as const, [])

const positive = (value: unknown, fallback: number): number => {
  const number = Number(value)

  return Number.isFinite(number) && number > 0 ? number : fallback
}

// One small file per chat in one folder, so the Goals pane can list the other chats' goals.
// A chat only ever writes its own file.
async function dataDir($: EngineInterface): Promise<string | undefined> {
  const home = (await $.env.get('HOME')) ?? (await $.env.get('USERPROFILE'))

  return home === undefined || home === '' ? undefined : `${home}/.claude/goal-meter-data`
}

// Writes this chat's snapshot. `id` is given when the chat that is ending is not the one
// `$.session.id()` names any more (after /clear the process goes on under a new id).
async function publish($: EngineInterface, id?: string, forgetGoal = false): Promise<void> {
  const dir = await dataDir($)

  if (dir === undefined) {
    return
  }

  const sessionId = id ?? (await $.session.id())
  const goal = forgetGoal ? null : await read($, goalAtom)
  const tasks = forgetGoal ? [] : await read($, tasksAtom)
  const snapshot = snapshotOf(sessionId, await $.session.cwd(), goal, tasks, await $.clock.now())

  await $.fs.write(`${dir}/${sessionId}.json`, JSON.stringify(snapshot))
}

async function otherChats($: EngineInterface, hours: number): Promise<Snapshot[]> {
  const dir = await dataDir($)

  if (dir === undefined) {
    return []
  }

  const selfId = await $.session.id()
  const since = (await $.clock.now()) - hours * HOUR
  const entries = await $.fs.list(dir).catch(() => [])
  const found: Snapshot[] = []

  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.json') || entry.mtimeMs < since) {
      continue
    }

    const text = await $.fs.read(`${dir}/${entry.name}`).catch(() => undefined)
    const snapshot = text === undefined ? undefined : parseSnapshot(text)

    if (snapshot !== undefined && snapshot.goal !== null && snapshot.sessionId !== selfId) {
      found.push(snapshot)
    }
  }

  return found.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 8)
}

async function startGoal($: EngineInterface, text: string): Promise<void> {
  const now = await $.clock.now()

  await update($, goalAtom, () => ({ text, startedAt: now, endedAt: null }))
  await update($, tasksAtom, () => [])
  await publish($)
}

async function clearGoal($: EngineInterface): Promise<void> {
  await update($, goalAtom, () => null)
  await update($, tasksAtom, () => [])
  await publish($)
}

// After the task list changed: a goal whose tasks are all done is done, and reopens if a new
// task appears. Then tell the other chats.
async function settle($: EngineInterface): Promise<void> {
  const now = await $.clock.now()
  const finished = isFinished(await read($, tasksAtom))

  await update($, goalAtom, goal => {
    if (goal === null) {
      return null
    }

    if (finished && goal.endedAt === null) {
      return { ...goal, endedAt: now }
    }

    return !finished && goal.endedAt !== null ? { ...goal, endedAt: null } : goal
  })
  await publish($)
}

async function summary($: EngineInterface, hours: number): Promise<string> {
  const goal = await read($, goalAtom)
  const tasks = await read($, tasksAtom)
  const now = await $.clock.now()
  const { done, total } = progress(tasks)
  const lines: string[] = []

  if (goal === null) {
    lines.push('No goal in this chat. Set one with /goal <what done looks like>.')
  } else {
    const state = goal.endedAt === null ? 'running' : 'done'

    lines.push(`Goal (${state}, ${fmtElapsed((goal.endedAt ?? now) - goal.startedAt)}): ${goal.text}`)
    lines.push(total === 0 ? 'Planning: no task list yet.' : `Tasks: ${done}/${total} ${bar(done, total)}`)
    lines.push(...tasks.map(task => `  ${glyph(task.status)} ${task.subject}`))
  }

  const others = await otherChats($, hours)

  lines.push(others.length === 0 ? 'No goals in other chats.' : 'Other chats:')
  lines.push(...others.map(other => `  ${otherLine(other, now)}`))

  return lines.join('\n')
}

// A pane only draws in a terminal or the desktop app; where neither is attached (a cloud
// session, `claude -p`) `/goals` answers with text instead.
async function canDraw($: EngineInterface): Promise<boolean> {
  const surfaces = await $.session.surfaces()

  return surfaces.some(surface => surface === 'terminal' || surface === 'desktop')
}

// Every 10 seconds while a goal runs: redraw, so the elapsed time moves.
async function tick($: EngineInterface): Promise<void> {
  const goal = await read($, goalAtom)

  if (goal !== null && goal.endedAt === null) {
    $.ui.invalidate('ui.render')
  }
}

export const register: Register = (on, options) => {
  const hours = positive(options.otherChatHours, 12)

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'goals',
      description: 'Show your goal, its tasks and the goals running in your other chats',
    })
    $.clock.every(10_000, () => {
      void tick($)
    })

    return next(e)
  })

  on('command.run', { command: 'goals' }, async $ => {
    const opened = (await canDraw($)) ? await $.ui.open({ id: PANE, title: 'Goals', focus: true, closeOnEscape: true }) : undefined

    return { text: opened?.isPlaced === true ? 'Goals pane opened.' : await summary($, hours) }
  })

  // /goal itself is Claude Code's own: this only watches it go by.
  on('command.run', { command: 'goal' }, async ($, e, next) => {
    const goal = parseGoalArgs(e.args)

    if (goal.kind === 'set') {
      await startGoal($, goal.text)
    } else if (goal.kind === 'clear') {
      await clearGoal($)
    }

    return next(e)
  })

  on('tool.call', { tool: 'ProposeGoal' }, async ($, e, next) => {
    const ran = await next(e)

    if (e.agentId === undefined && ran.deny === undefined && ran.isError !== true) {
      await startGoal($, e.condition)
    }

    return ran
  })

  on('tool.call', { tool: 'TaskCreate' }, async ($, e, next) => {
    const ran = await next(e)

    if (e.agentId === undefined && ran.deny === undefined && ran.isError !== true) {
      await update($, tasksAtom, list => addTask(list, ran.result.task.id, e.subject))
      await settle($)
    }

    return ran
  })

  on('tool.call', { tool: 'TaskUpdate' }, async ($, e, next) => {
    const ran = await next(e)

    if (e.agentId === undefined && ran.deny === undefined && ran.isError !== true && ran.result.success !== false) {
      await update($, tasksAtom, list => patchTask(list, { taskId: e.taskId, status: e.status, subject: e.subject }))
      await settle($)
    }

    return ran
  })

  on('tool.call', { tool: 'TodoWrite' }, async ($, e, next) => {
    const ran = await next(e)

    if (e.agentId === undefined && ran.deny === undefined && ran.isError !== true) {
      await update($, tasksAtom, () => fromTodos(e.todos))
      await settle($)
    }

    return ran
  })

  // A chat that ends takes its goal off the other chats' lists. After /clear the process goes
  // on under a new session id, so the file to rewrite is the ending chat's own.
  on('session.end', async ($, e, next) => {
    if (e.reason !== 'resume') {
      if (e.reason === 'clear') {
        await update($, goalAtom, () => null)
        await update($, tasksAtom, () => [])
      }

      await publish($, e.sessionId, true)
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const below = await next(e)
    const goal = await read($, goalAtom)

    if (e.props.hasSurvey || goal === null) {
      return below
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const { done, total, current } = progress(await read($, tasksAtom))
    const finished = goal.endedAt !== null
    const elapsed = fmtElapsed((goal.endedAt ?? (await $.clock.now())) - goal.startedAt)

    return (
      <Box flexDirection="column">
        {below}
        <Box flexWrap="wrap" columnGap={1}>
          <Text bold {...(finished ? { color: 'green' } : {})}>
            {finished ? '✓ Goal done' : '◎ Goal'}
          </Text>
          <Text>{clip(goal.text, Math.max(20, e.props.bodyColumns - 52))}</Text>
          <Text dimColor>· {elapsed}</Text>
          {total === 0 ? (
            <Text dimColor>· planning, waiting for the task plan</Text>
          ) : (
            <Text>
              · {done}/{total} tasks {bar(done, total)}
            </Text>
          )}
          {!finished && current !== undefined && <Text dimColor>· now: {clip(current.subject, 40)}</Text>}
          <Button
            key="tasks"
            label="Tasks"
            hotkey="g"
            onPress={() => {
              void $.ui.open({ id: PANE, title: 'Goals', focus: true, closeOnEscape: true })
            }}
          />
        </Box>
      </Box>
    )
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Button, Text } = $.ui.resolve(e)
    const goal = await read($, goalAtom)
    const tasks = await read($, tasksAtom)
    const now = await $.clock.now()
    const others = await otherChats($, hours)
    const { done, total } = progress(tasks)

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>This chat</Text>
          {goal === null ? (
            <Text dimColor>No goal yet. Set one with /goal.</Text>
          ) : (
            <Box flexDirection="column">
              <Text>{goal.text}</Text>
              <Text dimColor>
                {goal.endedAt === null ? 'Running' : 'Done'} for {fmtElapsed((goal.endedAt ?? now) - goal.startedAt)}
                {total === 0 ? ', planning' : `, ${done}/${total} tasks ${bar(done, total)}`}
              </Text>
              {tasks.map(task => (
                <Text dimColor={task.status === 'completed'}>
                  {glyph(task.status)} {task.subject}
                </Text>
              ))}
            </Box>
          )}
        </Box>
        <Box flexDirection="column">
          <Text bold>Other chats</Text>
          {others.length === 0 ? (
            <Text dimColor>No goals running in other chats.</Text>
          ) : (
            others.map(other => <Text>{otherLine(other, now)}</Text>)
          )}
        </Box>
        <Button
          key="close"
          label="Close"
          hotkey="x"
          role="dismiss"
          onPress={() => {
            void $.ui.close({ id: PANE })
          }}
        />
      </Box>
    )
  })
}
