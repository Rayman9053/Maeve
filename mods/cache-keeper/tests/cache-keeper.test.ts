import type { On, SessionUsage } from 'claude-code'
import { describe, expect, mock, test } from 'claude-code/testing'

import { cacheView, describe as describeUsage, fmtCost, fmtDuration, fmtTokens, summarize, toneForPercent } from '../hooks/lib'

const MIN = 60_000
const T0 = Date.parse('2026-10-03T10:00:00Z')

const USAGE: SessionUsage = {
  startedAt: T0,
  context: { tokens: 109_000, window: 1_000_000, percent: 11 },
  rateLimits: [
    { kind: 'five_hour', percentUsed: 23.4, resetsAt: '2026-10-03T12:10:00Z' },
    { kind: 'seven_day', percentUsed: 41 },
  ],
  cost: { usd: 3.4167 },
}

const typed = (command: string, args = '') => ({
  command,
  args,
  origin: { kind: 'composer' as const },
  presentation: { isFullscreen: false, columns: 80 },
})

const START = { cwd: '/repo', surface: 'terminal' as const, isInteractive: true }
const finished = (turnId: string, agentId?: string) => ({
  answer: 'done',
  durationMs: 1000,
  isAborted: false,
  turnId,
  reason: 'answer' as const,
  ...(agentId === undefined ? {} : { agentId }),
})

const band = (surface: 'terminal' | 'desktop', isWorking = false, hasSurvey = false) => ({
  plugin: 'cache-keeper',
  surface,
  component: 'AbovePrompt' as const,
  props: { hasSurvey, isWorking, maxRows: 6, bodyColumns: 100, scroll: { offset: 0, bodyRows: 6 }, view: {} },
})

// The world beneath the mod: a clock that only moves when told, canned usage figures, and
// a record of everything the mod asked the engine to do.
function world(on: On, usage: SessionUsage = USAGE) {
  const clock = mock.clock(on, { now: T0 })
  const toasts: string[] = []
  const submitted: string[] = []
  const origins: unknown[] = []
  const ran: string[] = []
  const failures = { clear: false }

  on('session.usage', () => ({ value: usage }))
  on('ui.toast', (_$, e) => {
    toasts.push(e.text)

    return { value: undefined }
  })
  on('ui.invalidate', () => ({ value: undefined }))
  on('ui.render', () => ({ type: 'engine' as const, ref: 0 }))
  on('command.register', (_$, e) => ({ value: { command: e.name } }))
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('session.end', (_$, e) => ({ sessionId: e.sessionId }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  on('prompt.submit', (_$, e) => {
    submitted.push(e.text)
    origins.push(e.origin)

    return { text: e.text }
  })
  on('command.run', (_$, e) => {
    ran.push(e.command)

    if (failures.clear) {
      throw new Error('clear failed')
    }

    return { text: 'ok' }
  })

  return { clock, toasts, submitted, origins, ran, failures }
}

describe('helpers', () => {
  test('format tokens, durations and cost', async () => {
    expect([fmtTokens(950), fmtTokens(109_400), fmtTokens(1_000_000), fmtTokens(2_560_000)]).toEqual(['950', '109k', '1.0M', '2.6M'])
    expect([fmtDuration(10_000), fmtDuration(57 * MIN), fmtDuration(65 * MIN), fmtDuration(120 * MIN)]).toEqual(['<1m', '57m', '1h 05m', '2h 00m'])
    expect(fmtCost(3.4167)).toBe('$3.42')
  })

  test('limits turn amber at 75% and red at 90%', async () => {
    expect([toneForPercent(10), toneForPercent(75), toneForPercent(90)]).toEqual(['normal', 'warn', 'bad'])
  })

  test('cacheView counts down, warns, and goes cold', async () => {
    const base = { now: 100 * MIN, ttlMs: 60 * MIN, warnMs: 5 * MIN, isWorking: false }

    expect(cacheView({ ...base, lastAt: null })).toEqual({ text: 'cache: no request yet', tone: 'dim' })
    expect(cacheView({ ...base, lastAt: 100 * MIN })).toEqual({ text: 'cache 1h 00m left', tone: 'good' })
    expect(cacheView({ ...base, lastAt: 45 * MIN })).toEqual({ text: 'cache 5m left', tone: 'warn' })
    expect(cacheView({ ...base, lastAt: 40 * MIN })).toEqual({ text: 'cache cold', tone: 'bad' })
    expect(cacheView({ ...base, lastAt: 40 * MIN, isWorking: true })).toEqual({ text: 'cache live', tone: 'good' })
  })

  test('summarize lists context, each limit, cost, then the cache', async () => {
    const cache = { text: 'cache 57m left', tone: 'good' as const }

    expect(summarize(USAGE, cache, T0).map(part => part.text)).toEqual([
      'ctx 109k/1.0M 11%',
      '5h 23% (resets in 2h 10m)',
      'week 41%',
      '≈$3.42',
      'cache 57m left',
    ])
  })

  test('summarize copes with a fresh session on an API key', async () => {
    const fresh: SessionUsage = { startedAt: T0, context: { window: 200_000 }, rateLimits: [] }

    expect(summarize(fresh, { text: 'cache: no request yet', tone: 'dim' }, T0).map(part => part.text)).toEqual([
      'ctx empty',
      'cache: no request yet',
    ])
  })

  test('describe adds the note about the cost estimate', async () => {
    expect(describeUsage(USAGE, { text: 'cache live', tone: 'good' }, T0)).toContain('not a bill')
  })
})

describe('band', () => {
  test('shows the readings and both buttons on every surface that draws it', async ($, on) => {
    world(on)

    for (const surface of ['terminal', 'desktop'] as const) {
      const ui = await $.ui.mount(band(surface))
      const shown = (await ui.findAll({ type: 'Text' })).map(text => text.text).join(' ')

      expect(shown).toContain('ctx 109k/1.0M 11%')
      expect(shown).toContain('5h 23% (resets in 2h 10m)')
      expect(shown).toContain('week 41%')
      expect(shown).toContain('≈$3.42')
      expect(shown).toContain('cache: no request yet')
      expect((await ui.findAll({ type: 'Button' })).map(button => button.key)).toEqual(['handoff', 'clear'])
      await ui.unmount()
    }
  })

  test('says the cache is live while a turn runs', async ($, on) => {
    world(on)

    const ui = await $.ui.mount(band('terminal', true))

    expect((await ui.find({ type: 'Text', text: 'cache live' }))?.props.color).toBe('green')
    await ui.unmount()
  })

  test('steps aside for a survey', async ($, on) => {
    world(on)

    const ui = await $.ui.mount(band('terminal', false, true))

    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    await ui.unmount()
  })

  test('counts down from the end of the last turn, warns once, then goes cold', async ($, on) => {
    const w = world(on)

    await $.session.start(START)
    await $.turn.start({ text: 'hi', turnId: 't1' })
    await $.turn.complete(finished('t1'))

    const fresh = await $.ui.mount(band('terminal'))

    expect(await fresh.find({ type: 'Text', text: 'cache 1h 00m left' })).toBeDefined()
    await fresh.unmount()

    await w.clock.advance(50 * MIN)
    expect(w.toasts).toHaveLength(0)

    await w.clock.advance(5 * MIN)
    expect(w.toasts).toHaveLength(1)
    expect(w.toasts[0]).toContain('expires in about 5m')

    await w.clock.advance(3 * MIN)
    expect(w.toasts).toHaveLength(1)

    const late = await $.ui.mount(band('terminal'))

    expect((await late.find({ type: 'Text', text: 'cache 2m left' }))?.props.color).toBe('yellow')
    await late.unmount()

    await w.clock.advance(5 * MIN)

    const cold = await $.ui.mount(band('terminal'))

    expect((await cold.find({ type: 'Text', text: 'cache cold' }))?.props.color).toBe('red')
    await cold.unmount()
  })

  test('a new turn starts the countdown over and re-arms the warning', async ($, on) => {
    const w = world(on)

    await $.session.start(START)
    await $.turn.complete(finished('t1'))
    await w.clock.advance(56 * MIN)
    expect(w.toasts).toHaveLength(1)

    await $.turn.complete(finished('t2'))
    await w.clock.advance(56 * MIN)
    expect(w.toasts).toHaveLength(2)
  })

  test('does not warn while a turn is running', async ($, on) => {
    const w = world(on)

    await $.session.start(START)
    await $.turn.complete(finished('t1'))
    await $.turn.start({ text: 'long job', turnId: 't2' })
    await w.clock.advance(58 * MIN)

    expect(w.toasts).toHaveLength(0)
  })

  test('a subagent finishing does not refresh the timer', async ($, on) => {
    const w = world(on)

    await $.session.start(START)
    await $.turn.complete(finished('t1'))
    await w.clock.advance(30 * MIN)
    await $.turn.complete(finished('sub', 'agent-1'))

    const ui = await $.ui.mount(band('terminal'))

    expect(await ui.find({ type: 'Text', text: 'cache 30m left' })).toBeDefined()
    await ui.unmount()
  })

  test('/clear forgets the timer', async ($, on) => {
    world(on)

    await $.turn.complete(finished('t1'))
    await $.session.end({ reason: 'clear', sessionId: 'old', resume: { id: 'old' } })

    const ui = await $.ui.mount(band('terminal'))

    expect(await ui.find({ type: 'Text', text: 'cache: no request yet' })).toBeDefined()
    await ui.unmount()
  })

  test('uses the lifetime from its settings', { options: { cacheMinutes: 5, warnMinutes: 1 } }, async ($, on) => {
    const w = world(on)

    await $.session.start(START)
    await $.turn.complete(finished('t1'))

    const ui = await $.ui.mount(band('terminal'))

    expect(await ui.find({ type: 'Text', text: 'cache 5m left' })).toBeDefined()
    await ui.unmount()

    await w.clock.advance(3 * MIN)
    expect(w.toasts).toHaveLength(0)
    await w.clock.advance(1 * MIN)
    expect(w.toasts).toHaveLength(1)
  })
})

describe('buttons and command', () => {
  test('Handoff sends the handoff prompt as the person\'s own words', async ($, on) => {
    const w = world(on)
    const ui = await $.ui.mount(band('terminal'))

    await ui.press({ key: 'handoff' })

    expect(w.submitted).toHaveLength(1)
    expect(w.submitted[0]).toContain('reports/handoff.md')
    expect(w.origins[0]).toMatchObject({ kind: 'plugin', name: 'cache-keeper', asUser: true })
    await ui.unmount()
  })

  test('Clear + continue runs /clear first, then sends the continue prompt', async ($, on) => {
    const w = world(on)
    const ui = await $.ui.mount(band('desktop'))

    await ui.press({ key: 'clear' })

    expect(w.ran).toEqual(['clear'])
    expect(w.submitted).toHaveLength(1)
    expect(w.submitted[0]).toContain('Read the newest')
    await ui.unmount()
  })

  test('Clear + continue says so, and sends nothing, if /clear fails', async ($, on) => {
    const w = world(on)
    const ui = await $.ui.mount(band('terminal'))

    w.failures.clear = true
    await ui.press({ key: 'clear' })

    expect(w.submitted).toHaveLength(0)
    expect(w.toasts[0]).toContain('did not finish')
    await ui.unmount()
  })

  test('/cache prints the same readings as text', async ($, on) => {
    world(on)

    const text = (await $.command.run(typed('cache'))).text

    expect(text).toContain('- ctx 109k/1.0M 11%')
    expect(text).toContain('- cache: no request yet')
  })
})
