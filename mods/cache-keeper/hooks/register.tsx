import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Tone } from '../types'
import { cacheView, describe, fmtDuration, summarize } from './lib'

type Config = { ttlMs: number; warnMs: number; handoffPrompt: string; continuePrompt: string }

// When this chat's last turn ended, which is when the prompt cache was last refreshed, and
// the moment the expiry warning was already shown for. The host holds both across reloads.
const lastResponseAt = atom({ plugin: 'cache-keeper', key: 'lastResponseAt' } as const, null)
const warnedFor = atom({ plugin: 'cache-keeper', key: 'warnedFor' } as const, null)

const TONES: Record<Tone, { color?: string; dimColor?: boolean }> = {
  normal: {},
  dim: { dimColor: true },
  good: { color: 'green' },
  warn: { color: 'yellow' },
  bad: { color: 'red' },
}

// True while a model turn runs: every request in a turn refreshes the cache, so the timer
// only counts down between turns. The band reads `e.props.isWorking`; this is for the timer.
let isBusy = false

const positive = (value: unknown, fallback: number): number => {
  const number = Number(value)

  return Number.isFinite(number) && number > 0 ? number : fallback
}

// Runs every 30 seconds for the life of the session: warns once as the cache nears expiry,
// and asks for a redraw so the countdown in the band moves.
async function tick($: EngineInterface, config: Config): Promise<void> {
  const at = await read($, lastResponseAt)

  if (at !== null && !isBusy) {
    const left = at + config.ttlMs - (await $.clock.now())

    if (left > 0 && left <= config.warnMs && (await read($, warnedFor)) !== at) {
      await update($, warnedFor, () => at)
      $.ui.toast(`Prompt cache expires in about ${fmtDuration(left)}. Send a message to keep it, or hand off.`)
    }
  }

  $.ui.invalidate('ui.render')
}

async function statusText($: EngineInterface, config: Config): Promise<string> {
  const now = await $.clock.now()
  const usage = await $.session.usage()
  const cache = cacheView({
    lastAt: await read($, lastResponseAt),
    now,
    ttlMs: config.ttlMs,
    warnMs: config.warnMs,
    isWorking: isBusy,
  })

  return `Cache Keeper:\n${describe(usage, cache, now)}`
}

export const register: Register = (on, options) => {
  const config: Config = {
    ttlMs: positive(options.cacheMinutes, 60) * 60_000,
    warnMs: positive(options.warnMinutes, 5) * 60_000,
    handoffPrompt: String(options.handoffPrompt ?? ''),
    continuePrompt: String(options.continuePrompt ?? ''),
  }

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'cache',
      description: 'Show context size, usage limits, cost and the prompt-cache timer',
    })
    $.clock.every(30_000, () => {
      void tick($, config)
    })

    return next(e)
  })

  on('command.run', { command: 'cache' }, async $ => ({ text: await statusText($, config) }))

  on('turn.start', ($, e, next) => {
    isBusy = true

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined) {
      const now = await $.clock.now()

      isBusy = false
      await update($, lastResponseAt, () => now)
    }

    return next(e)
  })

  on('session.end', async ($, e, next) => {
    if (e.reason === 'clear') {
      await update($, lastResponseAt, () => null)
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const below = await next(e)

    if (e.props.hasSurvey) {
      return below
    }

    const { Box, Button, Text } = $.ui.resolve(e)
    const now = await $.clock.now()
    const usage = await $.session.usage()
    const cache = cacheView({
      lastAt: await read($, lastResponseAt),
      now,
      ttlMs: config.ttlMs,
      warnMs: config.warnMs,
      isWorking: e.props.isWorking,
    })

    return (
      <Box flexDirection="column">
        {below}
        <Box flexWrap="wrap" columnGap={1}>
          {summarize(usage, cache, now).map((part, index) => (
            <Text {...TONES[part.tone]}>
              {index === 0 ? '' : '· '}
              {part.text}
            </Text>
          ))}
          <Button
            key="handoff"
            label="Handoff"
            hotkey="h"
            onPress={() => {
              void $.prompt.submit({ text: config.handoffPrompt, asUser: true })
            }}
          />
          <Button
            key="clear"
            label="Clear + continue"
            hotkey="c"
            onPress={async () => {
              try {
                await $.command.run({ command: 'clear' })
                await $.prompt.submit({ text: config.continuePrompt, asUser: true })
              } catch {
                $.ui.toast('Clear + continue did not finish. Type /clear yourself, then ask Claude to read the handoff.')
              }
            }}
          />
        </Box>
      </Box>
    )
  })
}
