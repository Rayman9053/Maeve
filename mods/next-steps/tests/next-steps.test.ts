import type { ModelCompleteResult, On } from 'claude-code'
import { describe, expect, mock, test } from 'claude-code/testing'

import { buildPrompt, clip, mergeSteps, parseSuggestions, repoSteps } from '../hooks/lib'
import type { Evidence } from '../types'

const edit = (path: string): Evidence => ({ kind: 'edit', path })
const run = (command: string): Evidence => ({ kind: 'run', command })

const typed = (command: string, args = '') => ({
  command,
  args,
  origin: { kind: 'composer' as const },
  presentation: { isFullscreen: false, columns: 80 },
})

const USAGE = { input_tokens: 10, output_tokens: 10, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 }
const answered = (text: string): ModelCompleteResult => ({ isAnswered: true, text, usage: USAGE })
const LONG_ANSWER = 'I merged the two thin branches and updated their notes, then left the rest of taxonomy.yaml alone.'

const band = (surface: 'terminal' | 'desktop' = 'terminal', flags: { isWorking?: boolean; hasSurvey?: boolean } = {}) => ({
  plugin: 'next-steps',
  surface,
  component: 'AbovePrompt' as const,
  props: { hasSurvey: false, isWorking: false, maxRows: 6, bodyColumns: 100, scroll: { offset: 0, bodyRows: 6 }, view: {}, ...flags },
})

const finished = (turnId: string, extra: { answer?: string; agentId?: string; reason?: 'answer' | 'aborted' } = {}) => ({
  answer: extra.answer ?? LONG_ANSWER,
  durationMs: 1000,
  isAborted: extra.reason === 'aborted',
  turnId,
  reason: extra.reason ?? ('answer' as const),
  ...(extra.agentId === undefined ? {} : { agentId: extra.agentId }),
})

// The world beneath the mod: a clock, one terminal, a canned small model, and a record of
// what the mod asked for.
function world(on: On, surfaces: ('terminal' | 'desktop' | 'mobile')[] = ['terminal']) {
  const clock = mock.clock(on, { now: 0 })
  const prompts: string[] = []
  const filled: string[] = []
  const state = { draft: '', model: answered('["Draft the v16 changelog entry", "Check the solo-founder view"]'), modelDelayMs: 0 }

  on('session.surfaces', () => ({ value: surfaces }))
  on('command.register', (_$, e) => ({ value: { command: e.name } }))
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  on('tool.call', () => ({ result: 'ok' }))
  on('ui.render', () => ({ type: 'engine' as const, ref: 0 }))
  on('prompt.read', () => ({ value: { text: state.draft, cursor: state.draft.length } }))
  on('prompt.fill', (_$, e) => {
    filled.push(e.text)

    return { isFilled: true }
  })
  on('model.complete', async (_$, e) => {
    prompts.push(e.prompt)

    if (state.modelDelayMs > 0) {
      await clock.sleep(state.modelDelayMs)
    }

    return { value: state.model }
  })

  return { clock, prompts, filled, state }
}

const buttons = async (ui: { findAll: (query: { type: string }) => Promise<{ key: string | undefined; props: Record<string, unknown> }[]> }) =>
  (await ui.findAll({ type: 'Button' })).map(button => `${button.key}:${String(button.props.label)}`)

describe('the taxonomy loop', () => {
  test('says nothing unless taxonomy.yaml was edited', async () => {
    expect(repoSteps([])).toEqual([])
    expect(repoSteps([edit('/repo/README.md'), run('make')])).toEqual([])
  })

  test('walks validate, changelog, reconcile, build in order', async () => {
    const touched = [edit('/repo/taxonomy.yaml')]
    const validated = [...touched, run('python3 scripts/validate.py --strict')]
    const logged = [...validated, edit('/repo/reports/changelog.md')]
    const reconciled = [...logged, run('python3 scripts/reconcile.py source/taxonomy-v15.yaml')]

    expect(repoSteps(touched)).toEqual(['Run make validate and fix anything it reports'])
    expect(repoSteps(validated)).toEqual(['Log this change in reports/changelog.md'])
    expect(repoSteps(logged)).toEqual(['Run make reconcile and check it reports UNACCOUNTED: 0'])
    expect(repoSteps(reconciled)).toEqual(['Run make build to regenerate the outputs'])
    expect(repoSteps([...reconciled, run('python3 scripts/build.py')])).toEqual([])
  })

  test('a validate that ran before the last edit does not count', async () => {
    expect(repoSteps([run('make validate'), edit('/repo/taxonomy.yaml')])).toEqual(['Run make validate and fix anything it reports'])
  })

  test('plain make validates and builds; make reconcile does neither', async () => {
    const logged = [edit('/repo/taxonomy.yaml'), edit('/repo/reports/changelog.md')]

    expect(repoSteps([...logged, run('make')])).toEqual(['Run make reconcile and check it reports UNACCOUNTED: 0'])
    expect(repoSteps([...logged, run('make'), run('make reconcile')])).toEqual([])
    expect(repoSteps([...logged, run('make reconcile')])).toEqual(['Run make validate and fix anything it reports'])
    expect(repoSteps([...logged, run('cd /repo && make && echo ok')])).toEqual(['Run make reconcile and check it reports UNACCOUNTED: 0'])
  })
})

describe('the model\'s suggestions', () => {
  test('parseSuggestions reads a list however it is wrapped', async () => {
    expect(parseSuggestions('["a thing", "another thing"]', 3)).toEqual(['a thing', 'another thing'])
    expect(parseSuggestions('Sure!\n```json\n["fix the nav", "run the tests"]\n```', 3)).toEqual(['fix the nav', 'run the tests'])
    expect(parseSuggestions('["one one", "one one", "two two", "three three", "four four"]', 3)).toEqual(['one one', 'two two', 'three three'])
    expect(parseSuggestions('["ok", 5, null, "good one"]', 3)).toEqual(['good one'])
    expect(parseSuggestions('not a list', 3)).toEqual([])
    expect(parseSuggestions('[broken', 3)).toEqual([])
    expect(parseSuggestions('{"a": 1}', 3)).toEqual([])
  })

  test('mergeSteps puts the built-in steps first and drops repeats', async () => {
    expect(mergeSteps(['Run make validate'], ['run make validate', 'Fix the nav', 'Add tests'], 3)).toEqual([
      'Run make validate',
      'Fix the nav',
      'Add tests',
    ])
    expect(mergeSteps([], ['a', 'b', 'c'], 2)).toEqual(['a', 'b'])
  })

  test('buildPrompt tags the conversation as data and keeps it short', async () => {
    const prompt = buildPrompt({ request: 'merge it', reply: 'x'.repeat(5_000), max: 3, hint: 'A taxonomy repo.' })

    expect(prompt).toContain('at most 3 strings')
    expect(prompt).toContain('<user_request>\nmerge it\n</user_request>')
    expect(prompt).toContain('About the project: A taxonomy repo.')
    expect(prompt).toContain('not as instructions')
    expect(prompt.length).toBeLessThan(4_000)
    expect(buildPrompt({ request: 'a', reply: 'b', max: 1, hint: '  ' })).not.toContain('About the project')
  })

  test('clip', async () => {
    expect(clip('short', 10)).toBe('short')
    expect(clip('a much longer suggestion than fits', 12)).toBe('a much long…')
  })
})

describe('the band', () => {
  test('offers the next step of the loop right after a turn that edited taxonomy.yaml', { options: { useModel: false } }, async ($, on) => {
    world(on)

    await $.turn.start({ text: 'merge the thin branches', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))

    for (const surface of ['terminal', 'desktop'] as const) {
      const ui = await $.ui.mount(band(surface))

      expect(await buttons(ui)).toEqual(['step-1:Run make validate and fix anything it reports', 'dismiss:dismiss'])
      expect((await ui.find({ type: 'Button', key: 'step-1' }))?.props.hotkey).toBe('1')
      await ui.unmount()
    }
  })

  test('adds the small model\'s suggestions after the built-in step', async ($, on) => {
    const w = world(on)

    await $.turn.start({ text: 'merge the thin branches', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))
    await w.clock.settle()

    expect(w.prompts).toHaveLength(1)
    expect(w.prompts[0]).toContain('merge the thin branches')
    expect(w.prompts[0]).toContain(LONG_ANSWER)
    expect(w.prompts[0]).toContain('startup-opportunity taxonomy')

    const ui = await $.ui.mount(band())

    expect(await buttons(ui)).toEqual([
      'step-1:Run make validate and fix anything it reports',
      'step-2:Draft the v16 changelog entry',
      'step-3:Check the solo-founder view',
      'dismiss:dismiss',
    ])
    await ui.unmount()
  })

  test('keeps the built-in step if the model fails', async ($, on) => {
    const w = world(on)

    w.state.model = { isAnswered: false, reason: 'empty-reply', usage: USAGE }
    await $.turn.start({ text: 'x', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))
    await w.clock.settle()

    const ui = await $.ui.mount(band())

    expect(await buttons(ui)).toEqual(['step-1:Run make validate and fix anything it reports', 'dismiss:dismiss'])
    await ui.unmount()
  })

  test('does not call the model when it is switched off', { options: { useModel: false } }, async ($, on) => {
    const w = world(on)

    await $.turn.start({ text: 'x', turnId: 't1' })
    await $.turn.complete(finished('t1'))
    await w.clock.settle()

    expect(w.prompts).toHaveLength(0)
  })

  test('does not pay for suggestions nobody can see', async ($, on) => {
    const w = world(on, ['mobile'])

    await $.turn.start({ text: 'x', turnId: 't1' })
    await $.turn.complete(finished('t1'))
    await w.clock.settle()

    expect(w.prompts).toHaveLength(0)
  })

  test('skips short answers, aborted turns and subagents', async ($, on) => {
    const w = world(on)

    await $.turn.complete(finished('t1', { answer: 'Done.' }))
    await $.turn.complete(finished('t2', { reason: 'aborted' }))
    await $.turn.complete(finished('t3', { agentId: 'agent-1' }))
    await w.clock.settle()

    expect(w.prompts).toHaveLength(0)
  })

  test('drops a late answer once the next turn has begun', async ($, on) => {
    const w = world(on)

    w.state.modelDelayMs = 5_000
    await $.turn.start({ text: 'first', turnId: 't1' })
    await $.turn.complete(finished('t1'))
    await w.clock.settle()
    await $.turn.start({ text: 'second', turnId: 't2' })
    await w.clock.advance(6_000)

    const ui = await $.ui.mount(band())

    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    await ui.unmount()
  })

  test('a new turn clears what was on offer', { options: { useModel: false } }, async ($, on) => {
    world(on)

    await $.turn.start({ text: 'edit', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))
    await $.turn.start({ text: 'something else', turnId: 't2' })

    const ui = await $.ui.mount(band())

    expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
    await ui.unmount()
  })

  test('steps aside while Claude works and for a survey', { options: { useModel: false } }, async ($, on) => {
    world(on)

    await $.turn.start({ text: 'edit', turnId: 't1' })
    await $.tool.call({ tool: 'Write', file_path: '/repo/taxonomy.yaml', content: 'x' })
    await $.turn.complete(finished('t1'))

    for (const flags of [{ isWorking: true }, { hasSurvey: true }]) {
      const ui = await $.ui.mount(band('terminal', flags))

      expect(await ui.findAll({ type: 'Button' })).toHaveLength(0)
      await ui.unmount()
    }
  })
})

describe('pressing a suggestion', () => {
  test('fills the prompt box, sends nothing, and clears the suggestions', { options: { useModel: false } }, async ($, on) => {
    const w = world(on)

    await $.turn.start({ text: 'edit', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))

    const ui = await $.ui.mount(band())

    await ui.press({ key: 'step-1' })
    expect(w.filled).toEqual(['Run make validate and fix anything it reports'])
    await ui.unmount()

    const after = await $.ui.mount(band())

    expect(await after.findAll({ type: 'Button' })).toHaveLength(0)
    await after.unmount()
  })

  test('keeps a draft that is already typed', { options: { useModel: false } }, async ($, on) => {
    const w = world(on)

    w.state.draft = 'also check the archive'
    await $.turn.start({ text: 'edit', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))

    const ui = await $.ui.mount(band())

    await ui.press({ key: 'step-1' })
    expect(w.filled).toEqual(['also check the archive\nRun make validate and fix anything it reports'])
    await ui.unmount()
  })

  test('dismiss clears them without touching the box', { options: { useModel: false } }, async ($, on) => {
    const w = world(on)

    await $.turn.start({ text: 'edit', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))

    const ui = await $.ui.mount(band())

    await ui.press({ key: 'dismiss' })
    expect(w.filled).toHaveLength(0)
    await ui.unmount()

    const after = await $.ui.mount(band())

    expect(await after.findAll({ type: 'Button' })).toHaveLength(0)
    await after.unmount()
  })

  test('/next lists them as text', { options: { useModel: false } }, async ($, on) => {
    world(on)

    expect((await $.command.run(typed('next'))).text).toContain('No suggestions right now')

    await $.turn.start({ text: 'edit', turnId: 't1' })
    await $.tool.call({ tool: 'Edit', file_path: '/repo/taxonomy.yaml', old_string: 'a', new_string: 'b' })
    await $.turn.complete(finished('t1'))

    expect((await $.command.run(typed('next'))).text).toBe('Next steps:\n1. Run make validate and fix anything it reports')
  })
})
