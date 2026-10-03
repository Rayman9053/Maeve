import type { On } from 'claude-code'
import { describe, expect, mock, test } from 'claude-code/testing'

import {
  addTask,
  bar,
  clip,
  fmtElapsed,
  fromTodos,
  isFinished,
  otherLine,
  parseGoalArgs,
  parseSnapshot,
  patchTask,
  progress,
  snapshotOf,
} from '../hooks/lib'

const MIN = 60_000
const T0 = Date.parse('2026-10-03T10:00:00Z')
const HOME = '/home/me'
const DIR = `${HOME}/.claude/goal-meter-data`
const SELF = 'this-chat'
const START = { cwd: '/repo/Maeve', surface: 'terminal' as const, isInteractive: true }

const typed = (command: string, args = '') => ({
  command,
  args,
  origin: { kind: 'composer' as const },
  presentation: { isFullscreen: false, columns: 80 },
})

const band = (surface: 'terminal' | 'desktop' = 'terminal') => ({
  plugin: 'goal-meter',
  surface,
  component: 'AbovePrompt' as const,
  props: { hasSurvey: false, isWorking: false, maxRows: 6, bodyColumns: 120, scroll: { offset: 0, bodyRows: 6 }, view: {} },
})

const pane = (surface: 'terminal' | 'desktop' | 'vscode' | 'mobile') => ({
  plugin: 'goal-meter',
  surface,
  component: 'Pane' as const,
  props: { title: 'Goals', isFocused: true, bodyColumns: 70, placement: 'dock' as const, scroll: { offset: 0, bodyRows: 20 }, view: {} },
  requestId: 'goal-meter',
})

type Fake = { text: string; mtimeMs: number }

// The world beneath the mod: a clock, an in-memory shared folder, and stand-ins for the
// tools and commands the mod watches go by.
function world(on: On) {
  const clock = mock.clock(on, { now: T0 })
  const files = new Map<string, Fake>()
  const opened: string[] = []
  let invalidated = 0
  let nextId = 0
  const fail = { tools: false, open: true }
  const surfaces: ('terminal' | 'desktop' | 'mobile')[] = ['terminal']

  mock.env(on, { HOME })
  on('session.id', () => ({ value: SELF }))
  on('session.cwd', () => ({ value: '/repo/Maeve' }))
  on('session.surfaces', () => ({ value: surfaces }))
  on('fs.read', (_$, e) => {
    const file = files.get(e.path)

    return file === undefined ? { deny: `ENOENT ${e.path}` } : { value: file.text }
  })
  on('fs.write', (_$, e) => {
    files.set(e.path, { text: e.text, mtimeMs: clock.now() })

    return { value: undefined }
  })
  on('fs.list', (_$, e) => ({
    value: [...files]
      .filter(([path]) => path.startsWith(`${e.path}/`))
      .map(([path, file]) => ({
        name: path.slice(e.path.length + 1),
        kind: 'file' as const,
        size: file.text.length,
        mtimeMs: file.mtimeMs,
        isLink: false,
      })),
  }))
  on('ui.invalidate', () => {
    invalidated += 1

    return { value: undefined }
  })
  on('ui.render', () => ({ type: 'engine' as const, ref: 0 }))
  on('ui.open', (_$, e) => {
    opened.push(e.id)

    return { value: fail.open ? { isPlaced: true as const } : { isPlaced: false as const, reason: 'too narrow' } }
  })
  on('ui.close', () => ({ value: undefined }))
  on('command.register', (_$, e) => ({ value: { command: e.name } }))
  on('command.run', () => ({ text: 'ok' }))
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('session.end', (_$, e) => ({ sessionId: e.sessionId }))
  on('tool.call', (_$, e) => {
    if (fail.tools) {
      return { isError: true as const, result: 'failed', text: 'failed' }
    }

    switch (e.tool) {
      case 'TaskCreate':
        nextId += 1

        return { result: { task: { id: String(nextId), subject: e.subject } } }
      case 'TaskUpdate':
        return { result: { success: true, taskId: e.taskId, updatedFields: [] } }
      case 'TodoWrite':
        return { result: { oldTodos: [], newTodos: e.todos } }
      case 'ProposeGoal':
        return { result: { condition: e.condition, askUser: false } }
      default:
        return { result: 'ok' }
    }
  })

  const snapshotsIn = () =>
    [...files.keys()].filter(path => path.startsWith(`${DIR}/`)).map(path => path.slice(DIR.length + 1))
  const mine = () => {
    const file = files.get(`${DIR}/${SELF}.json`)

    return file === undefined ? undefined : parseSnapshot(file.text)
  }
  const otherChat = (id: string, goal: string | null, agoMin: number, done = 1, total = 4) => {
    const at = clock.now() - agoMin * MIN

    files.set(`${DIR}/${id}.json`, {
      text: JSON.stringify({ sessionId: id, cwd: `/work/${id}`, goal, startedAt: at - 10 * MIN, endedAt: null, done, total, updatedAt: at }),
      mtimeMs: at,
    })
  }

  return { clock, files, opened, fail, surfaces, snapshotsIn, mine, otherChat, invalidated: () => invalidated }
}

// A tool call as a subagent makes it: the engine stamps `agentId` on it, which a plugin's own
// `$.tool.call` cannot be typed to carry, so it goes on through a generic.
const asSubagent = <T extends object>(call: T): T => ({ ...call, agentId: 'agent-1' })

const texts = async (ui: { findAll: (query: { type: string }) => Promise<{ text: string }[]> }) =>
  (await ui.findAll({ type: 'Text' })).map(text => text.text).join(' | ')

describe('helpers', () => {
  test('parseGoalArgs sets, clears, or only looks', async () => {
    expect(parseGoalArgs('ship the v16 prune')).toEqual({ kind: 'set', text: 'ship the v16 prune' })
    expect(parseGoalArgs('  clear ')).toEqual({ kind: 'clear' })
    expect(parseGoalArgs('OFF')).toEqual({ kind: 'clear' })
    expect(parseGoalArgs('')).toEqual({ kind: 'none' })
    expect(parseGoalArgs('status')).toEqual({ kind: 'none' })
  })

  test('clip, fmtElapsed and bar', async () => {
    expect(clip('a  long\n goal here', 8)).toBe('a long…')
    expect(clip('short', 8)).toBe('short')
    expect([fmtElapsed(5_000), fmtElapsed(12 * MIN), fmtElapsed(65 * MIN)]).toEqual(['<1m', '12m', '1h 05m'])
    expect([bar(0, 0), bar(1, 4), bar(4, 4)]).toEqual(['░░░░░░░░░░', '███░░░░░░░', '██████████'])
  })

  test('task list helpers', async () => {
    let tasks = addTask([], '1', 'Find the tooling')

    tasks = addTask(tasks, undefined, 'Pull comments')
    expect(tasks.map(task => task.id)).toEqual(['1', 't2'])

    tasks = patchTask(tasks, { taskId: '1', status: 'in_progress' })
    expect(progress(tasks)).toEqual({ done: 0, total: 2, current: { id: '1', subject: 'Find the tooling', status: 'in_progress' } })

    tasks = patchTask(patchTask(tasks, { taskId: '1', status: 'completed' }), { taskId: 't2', status: 'completed' })
    expect(isFinished(tasks)).toBe(true)
    expect(isFinished([])).toBe(false)
    expect(patchTask(tasks, { taskId: 't2', status: 'deleted' }).map(task => task.id)).toEqual(['1'])
    expect(fromTodos([{ content: 'a', status: 'pending' }])).toEqual([{ id: 'todo-1', subject: 'a', status: 'pending' }])
  })

  test('snapshots round-trip and describe other chats', async () => {
    const goal = { text: 'Analyse the comments from my last ten videos', startedAt: T0, endedAt: null }
    const tasks = addTask(addTask([], '1', 'a'), '2', 'b')
    const snapshot = snapshotOf('abcdef123456', '/work/Maeve', goal, tasks, T0 + 7 * MIN)

    expect(parseSnapshot(JSON.stringify(snapshot))).toEqual(snapshot)
    expect(parseSnapshot('nope')).toBeUndefined()
    expect(otherLine(snapshot, T0 + 9 * MIN)).toBe('Maeve: Analyse the comments from my last ten videos (0/2 tasks, 9m; updated 2m ago)')
  })
})

describe('band', () => {
  test('is hidden until a goal is set, then shows the planning phase', async ($, on) => {
    world(on)

    const before = await $.ui.mount(band())

    expect(await before.findAll({ type: 'Button' })).toHaveLength(0)
    await before.unmount()

    await $.command.run(typed('goal', 'Analyse the comments from my last 10 videos'))

    for (const surface of ['terminal', 'desktop'] as const) {
      const ui = await $.ui.mount(band(surface))
      const shown = await texts(ui)

      expect(shown).toContain('◎ Goal')
      expect(shown).toContain('Analyse the comments from my last 10 videos')
      expect(shown).toContain('· <1m')
      expect(shown).toContain('planning, waiting for the task plan')
      expect((await ui.findAll({ type: 'Button' })).map(button => button.key)).toEqual(['tasks'])
      await ui.unmount()
    }
  })

  test('follows the tasks as Claude plans and checks them off, and stops the clock when they are all done', async ($, on) => {
    const w = world(on)

    await $.command.run(typed('goal', 'Report the top theme'))
    for (const subject of ['Find the tooling', 'Pull the comments', 'Report the theme']) {
      await $.tool.call({ tool: 'TaskCreate', subject, description: subject })
    }

    let ui = await $.ui.mount(band())

    expect(await texts(ui)).toContain('0/3 tasks ░░░░░░░░░░')
    expect(await texts(ui)).toContain('now: Find the tooling')
    await ui.unmount()

    await $.tool.call({ tool: 'TaskUpdate', taskId: '1', status: 'completed' })
    await $.tool.call({ tool: 'TaskUpdate', taskId: '2', status: 'in_progress' })
    await w.clock.advance(5 * MIN)
    ui = await $.ui.mount(band())
    expect(await texts(ui)).toContain('1/3 tasks ███░░░░░░░')
    expect(await texts(ui)).toContain('· 5m')
    expect(await texts(ui)).toContain('now: Pull the comments')
    await ui.unmount()

    await $.tool.call({ tool: 'TaskUpdate', taskId: '2', status: 'completed' })
    await $.tool.call({ tool: 'TaskUpdate', taskId: '3', status: 'completed' })
    await w.clock.advance(20 * MIN)
    ui = await $.ui.mount(band())
    expect(await texts(ui)).toContain('✓ Goal done')
    expect(await texts(ui)).toContain('· 5m')
    expect(await texts(ui)).toContain('3/3 tasks ██████████')
    await ui.unmount()

    await $.tool.call({ tool: 'TaskCreate', subject: 'One more thing', description: 'x' })
    ui = await $.ui.mount(band())
    expect(await texts(ui)).toContain('◎ Goal')
    expect(await texts(ui)).toContain('3/4 tasks')
    await ui.unmount()
  })

  test('/goal clear takes it away', async ($, on) => {
    world(on)

    await $.command.run(typed('goal', 'Ship it'))
    await $.command.run(typed('goal', 'clear'))

    const ui = await $.ui.mount(band())

    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    await ui.unmount()
  })

  test('a goal Claude proposes counts, unless the proposal fails', async ($, on) => {
    const w = world(on)

    w.fail.tools = true
    await $.tool.call({ tool: 'ProposeGoal', condition: 'all tests pass' })

    let ui = await $.ui.mount(band())

    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    await ui.unmount()

    w.fail.tools = false
    await $.tool.call({ tool: 'ProposeGoal', condition: 'all tests pass' })
    ui = await $.ui.mount(band())
    expect(await texts(ui)).toContain('all tests pass')
    await ui.unmount()
  })

  test('TodoWrite fills the task list too', async ($, on) => {
    world(on)

    await $.command.run(typed('goal', 'Tidy up'))
    await $.tool.call({
      tool: 'TodoWrite',
      todos: [
        { content: 'one', status: 'completed', activeForm: 'Doing one' },
        { content: 'two', status: 'in_progress', activeForm: 'Doing two' },
      ],
    })

    const ui = await $.ui.mount(band())

    expect(await texts(ui)).toContain('1/2 tasks █████░░░░░')
    expect(await texts(ui)).toContain('now: two')
    await ui.unmount()
  })

  test('counts only the main chat\'s successful task calls', async ($, on) => {
    const w = world(on)

    await $.command.run(typed('goal', 'Tidy up'))
    await $.tool.call(asSubagent({ tool: 'TaskCreate' as const, subject: 'by a subagent', description: 'x' }))
    expect(await texts(await $.ui.mount(band()))).toContain('planning')

    await $.tool.call({ tool: 'TaskCreate', subject: 'by the main chat', description: 'x' })
    w.fail.tools = true
    await $.tool.call({ tool: 'TaskCreate', subject: 'that failed', description: 'x' })

    const ui = await $.ui.mount(band())

    expect(await texts(ui)).toContain('0/1 tasks')
    expect(await texts(ui)).toContain('now: by the main chat')
    await ui.unmount()
  })

  test('asks for a redraw every ten seconds while a goal runs, and not otherwise', async ($, on) => {
    const w = world(on)

    await $.session.start(START)
    await w.clock.advance(30_000)
    expect(w.invalidated()).toBe(0)

    await $.command.run(typed('goal', 'Ship it'))
    await w.clock.advance(30_000)
    expect(w.invalidated()).toBe(3)
  })
})

describe('goals pane and other chats', () => {
  test('writes this chat\'s snapshot as the goal moves along', async ($, on) => {
    const w = world(on)

    await $.command.run(typed('goal', 'Ship it'))
    expect(w.mine()).toMatchObject({ goal: 'Ship it', done: 0, total: 0, endedAt: null })

    await $.tool.call({ tool: 'TaskCreate', subject: 'a', description: 'a' })
    await $.tool.call({ tool: 'TaskUpdate', taskId: '1', status: 'completed' })
    expect(w.mine()).toMatchObject({ done: 1, total: 1, endedAt: T0 })
  })

  test('lists the goals in other chats, newest first, and hides stale or empty ones', async ($, on) => {
    const w = world(on)

    await $.command.run(typed('goal', 'Mine'))
    w.otherChat('older', 'Report the top theme', 30)
    w.otherChat('newer', 'Prune the archive', 2, 3, 5)
    w.otherChat('stale', 'Ancient goal', 13 * 60)
    w.otherChat('nogoal', null, 1)

    for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
      const ui = await $.ui.mount(pane(surface))
      const shown = await texts(ui)

      expect(shown).toContain('This chat')
      expect(shown).toContain('Mine')
      expect(shown.indexOf('newer: Prune the archive (3/5 tasks')).toBeGreaterThan(-1)
      expect(shown.indexOf('newer: Prune the archive')).toBeLessThan(shown.indexOf('older: Report the top theme'))
      expect(shown).not.toContain('Ancient goal')
      expect(shown).not.toContain('nogoal')
      await ui.unmount()
    }
  })

  test('shows the task list and says so when no other chat has a goal', async ($, on) => {
    world(on)

    await $.command.run(typed('goal', 'Mine'))
    await $.tool.call({ tool: 'TaskCreate', subject: 'Find the tooling', description: 'x' })
    await $.tool.call({ tool: 'TaskCreate', subject: 'Pull the comments', description: 'x' })
    await $.tool.call({ tool: 'TaskUpdate', taskId: '1', status: 'completed' })

    const ui = await $.ui.mount(pane('terminal'))
    const shown = await texts(ui)

    expect(shown).toContain('✓ Find the tooling')
    expect(shown).toContain('○ Pull the comments')
    expect(shown).toContain('No goals running in other chats.')
    await ui.unmount()
  })

  test('the Tasks button and /goals open the pane', async ($, on) => {
    const w = world(on)
    const ui = await $.ui.mount(band())

    await $.command.run(typed('goal', 'Mine'))
    await ui.unmount()

    const again = await $.ui.mount(band())

    await again.press({ key: 'tasks' })
    expect(w.opened).toEqual(['goal-meter'])
    await again.unmount()

    expect((await $.command.run(typed('goals'))).text).toBe('Goals pane opened.')
    expect(w.opened).toEqual(['goal-meter', 'goal-meter'])
  })

  test('/goals falls back to text where no pane can open', async ($, on) => {
    const w = world(on)

    w.fail.open = false
    await $.command.run(typed('goal', 'Mine'))
    await $.tool.call({ tool: 'TaskCreate', subject: 'Find it', description: 'x' })
    w.otherChat('other', 'Their goal', 3)

    const text = (await $.command.run(typed('goals'))).text ?? ''

    expect(text).toContain('Goal (running, <1m): Mine')
    expect(text).toContain('Tasks: 0/1')
    expect(text).toContain('○ Find it')
    expect(text).toContain('other: Their goal')
  })

  test('/goals answers with text, and opens nothing, where nothing draws', async ($, on) => {
    const w = world(on)

    w.surfaces.length = 0
    await $.command.run(typed('goal', 'Mine'))

    expect((await $.command.run(typed('goals'))).text).toContain('Goal (running, <1m): Mine')
    expect(w.opened).toHaveLength(0)
  })

  test('/clear forgets the goal and takes it off the other chats\' lists', async ($, on) => {
    const w = world(on)

    await $.command.run(typed('goal', 'Mine'))
    await $.session.end({ reason: 'clear', sessionId: 'old-chat', resume: { id: 'old-chat' } })

    expect(w.snapshotsIn()).toContain('old-chat.json')
    expect(parseSnapshot(w.files.get(`${DIR}/old-chat.json`)?.text ?? '')?.goal).toBeNull()

    const ui = await $.ui.mount(band())

    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    await ui.unmount()
  })
})
