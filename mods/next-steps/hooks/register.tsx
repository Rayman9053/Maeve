import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Evidence } from '../types'
import { buildPrompt, clip, mergeSteps, parseSuggestions, repoSteps } from './lib'

type Config = { useModel: boolean; model: string; max: number; hint: string }

// The suggestions on offer. The host holds them, so a hot reload of the code keeps them.
const items = atom({ plugin: 'next-steps', key: 'items' } as const, [])

// What this turn's tool calls did, and what the person asked, as the turn goes by. Only the
// turn in flight matters, so a reload that loses these costs nothing.
let events: Evidence[] = []
let request = ''
let currentTurn = ''

// One small model call, after the turn has ended. Its answer is dropped if the person has
// already started the next turn, since those suggestions would be for the wrong conversation.
async function askModel(
  $: EngineInterface,
  config: Config,
  turnId: string,
  reply: string,
  fromRepo: readonly string[],
): Promise<void> {
  const result = await $.model.complete({
    model: config.model,
    prompt: buildPrompt({ request, reply, max: config.max, hint: config.hint }),
    effort: 'low',
    maxTokens: 300,
    timeoutMs: 20_000,
  })

  if (result.isAnswered && currentTurn === turnId) {
    await update($, items, () => mergeSteps(fromRepo, parseSuggestions(result.text, config.max), config.max))
  }
}

// Drawing needs a terminal or the desktop app; where neither is attached (a cloud session,
// `claude -p`) a model call would pay for suggestions nobody can see.
async function canDraw($: EngineInterface): Promise<boolean> {
  const surfaces = await $.session.surfaces()

  return surfaces.some(surface => surface === 'terminal' || surface === 'desktop')
}

const number = (value: unknown, fallback: number): number => {
  const parsed = Number(value)

  return Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : fallback
}

export const register: Register = (on, options) => {
  const config: Config = {
    useModel: options.useModel !== false,
    model: String(options.model ?? 'haiku') || 'haiku',
    max: Math.min(4, number(options.maxSuggestions, 3)),
    hint: String(options.projectHint ?? ''),
  }

  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'next', description: 'Show the suggested next steps as text' })

    return next(e)
  })

  on('command.run', { command: 'next' }, async $ => {
    const list = await read($, items)

    return {
      text:
        list.length === 0
          ? 'No suggestions right now. They appear after Claude finishes a turn.'
          : `Next steps:\n${list.map((item, index) => `${index + 1}. ${item}`).join('\n')}`,
    }
  })

  // A new turn: the old suggestions are answered or ignored, so clear them and start watching.
  on('turn.start', async ($, e, next) => {
    events = []
    request = e.text
    currentTurn = e.turnId
    await update($, items, () => [])

    return next(e)
  })

  on('tool.call', { tool: 'Edit' }, ($, e, next) => {
    events.push({ kind: 'edit', path: e.file_path })

    return next(e)
  })

  on('tool.call', { tool: 'Write' }, ($, e, next) => {
    events.push({ kind: 'edit', path: e.file_path })

    return next(e)
  })

  on('tool.call', { tool: 'Bash' }, ($, e, next) => {
    events.push({ kind: 'run', command: e.command })

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined && e.reason === 'answer') {
      const turnId = e.turnId
      const reply = e.answer
      const fromRepo = repoSteps(events)

      await update($, items, () => fromRepo.slice(0, config.max))

      if (config.useModel && reply.trim().length >= 40 && (await canDraw($))) {
        // Its own dispatch, so the turn is not held up while the model answers.
        $.clock.after(0, () => {
          void askModel($, config, turnId, reply, fromRepo)
        })
      }
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const below = await next(e)
    const list = await read($, items)

    if (e.props.hasSurvey || e.props.isWorking || list.length === 0) {
      return below
    }

    const { Box, Button, Text } = $.ui.resolve(e)

    return (
      <Box flexDirection="column">
        {below}
        <Box flexWrap="wrap" columnGap={2}>
          <Text dimColor>Next:</Text>
          {list.map((item, index) => (
            <Button
              plain
              key={`step-${index + 1}`}
              hotkey={String(index + 1)}
              label={clip(item, 64)}
              onPress={async () => {
                // Fill the box, never send: the person reads it and presses Enter. A draft
                // already typed is kept, with the suggestion on the line below it.
                const draft = await $.prompt.read()

                await $.prompt.fill({ text: draft.text.trim() === '' ? item : `${draft.text}\n${item}` })
                await update($, items, () => [])
              }}
            />
          ))}
          <Button
            plain
            dimColor
            key="dismiss"
            hotkey="x"
            label="dismiss"
            onPress={() => {
              void update($, items, () => [])
            }}
          />
        </Box>
      </Box>
    )
  })
}
