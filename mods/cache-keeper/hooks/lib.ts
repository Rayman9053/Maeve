// Pure helpers for Cache Keeper: no `$` in here, so they unit-test without a session.

import type { SessionUsage } from 'claude-code'

import type { Segment, Tone } from '../types'

const MINUTE = 60_000

const LIMIT_LABELS: Record<string, string> = { five_hour: '5h', seven_day: 'week', spend_limit: 'spend' }

export function fmtTokens(tokens: number): string {
  if (tokens < 1_000) {
    return String(tokens)
  }

  if (tokens < 1_000_000) {
    return `${Math.round(tokens / 1_000)}k`
  }

  return `${(tokens / 1_000_000).toFixed(1)}M`
}

export function fmtDuration(ms: number): string {
  const minutes = Math.floor(Math.max(0, ms) / MINUTE)

  if (minutes < 1) {
    return '<1m'
  }

  if (minutes < 60) {
    return `${minutes}m`
  }

  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`
}

export function fmtCost(usd: number): string {
  return `$${usd.toFixed(2)}`
}

export function toneForPercent(percent: number): Tone {
  return percent >= 90 ? 'bad' : percent >= 75 ? 'warn' : 'normal'
}

type CacheInput = { lastAt: number | null; now: number; ttlMs: number; warnMs: number; isWorking: boolean }

/** Where the prompt cache stands: live while a turn runs, else a countdown from the last turn. */
export function cacheView({ lastAt, now, ttlMs, warnMs, isWorking }: CacheInput): Segment {
  if (isWorking) {
    return { text: 'cache live', tone: 'good' }
  }

  if (lastAt === null) {
    return { text: 'cache: no request yet', tone: 'dim' }
  }

  const left = lastAt + ttlMs - now

  if (left <= 0) {
    return { text: 'cache cold', tone: 'bad' }
  }

  return { text: `cache ${fmtDuration(left)} left`, tone: left <= warnMs ? 'warn' : 'good' }
}

/** The band's readings, in order: context, each rate limit, cost, then the cache. */
export function summarize(usage: SessionUsage, cache: Segment, now: number): Segment[] {
  const { tokens, window, percent } = usage.context
  const parts: Segment[] = [
    tokens === undefined
      ? { text: 'ctx empty', tone: 'dim' }
      : {
          text: `ctx ${fmtTokens(tokens)}/${fmtTokens(window)}${percent === undefined ? '' : ` ${Math.round(percent)}%`}`,
          tone: toneForPercent(percent ?? 0),
        },
  ]

  for (const limit of usage.rateLimits) {
    const resets = limit.resetsAt === undefined ? Number.NaN : Date.parse(limit.resetsAt) - now
    const label = LIMIT_LABELS[limit.kind] ?? limit.kind
    const reset = Number.isNaN(resets) || resets <= 0 ? '' : ` (resets in ${fmtDuration(resets)})`

    parts.push({ text: `${label} ${Math.round(limit.percentUsed)}%${reset}`, tone: toneForPercent(limit.percentUsed) })
  }

  if (usage.cost !== undefined) {
    parts.push({ text: `≈${fmtCost(usage.cost.usd)}`, tone: 'normal' })
  }

  parts.push(cache)

  return parts
}

/** The same readings as plain lines, for /cache where nothing can be drawn. */
export function describe(usage: SessionUsage, cache: Segment, now: number): string {
  const lines = summarize(usage, cache, now).map(part => `- ${part.text}`)
  const note = usage.cost === undefined ? '' : '\n≈ is an estimate at API rates, not a bill for a subscription.'

  return `${lines.join('\n')}${note}`
}
