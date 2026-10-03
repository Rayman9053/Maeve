import type { On } from 'claude-code'
import { describe, expect, test } from 'claude-code/testing'

import { buildRules, maskDeep, maskText, parseTerms } from '../hooks/lib'

const rules = (terms: string[] = [], maskMoney = false, maskHomePath = true) =>
  buildRules({ terms, maskMoney, maskHomePath })

// A slash command as the engine raises it when the person types it.
const typed = (command: string, args = '') => ({
  command,
  args,
  origin: { kind: 'composer' as const },
  presentation: { isFullscreen: false, columns: 80 },
})

// What the screen would be asked to draw: the bottom of the chain records the props it gets.
function screen(on: On) {
  const drawn: unknown[] = []
  const statuses: (string | undefined)[] = []

  on('ui.render', (_$, e) => {
    drawn.push(e.props)

    return { type: 'engine' as const, ref: 0 }
  })
  on('ui.status', (_$, e) => {
    statuses.push(e.text)

    return { value: undefined }
  })

  return { drawn, statuses, last: () => drawn[drawn.length - 1] as Record<string, unknown> }
}

const assistant = (text: string) => ({
  plugin: 'recording-mode',
  surface: 'terminal' as const,
  component: 'AssistantMessage' as const,
  props: { text, isFirstOfReply: true },
})

describe('masking', () => {
  test('hides emails', async () => {
    expect(maskText('Mail ray.m@example.co.uk or a@b.io now', rules())).toBe(
      'Mail [email hidden] or [email hidden] now',
    )
  })

  test('hides keys and tokens', async () => {
    const text = [
      'key sk-ant-api03-abcdefghijklmnopqrstuv',
      'gh ghp_abcdefghijklmnopqrstuvwxyz0123',
      'aws AKIAABCDEFGHIJKLMNOP',
      'Authorization: Bearer abcdefghijklmnop1234567890',
      'API_KEY=hunter2hunter2',
      'password: "correct-horse"',
    ].join('\n')
    const masked = maskText(text, rules())

    expect(masked).not.toMatch(/abcdefghijkl|hunter2|correct-horse|AKIA/)
    expect(masked.match(/\[secret hidden\]/g)).toHaveLength(6)
  })

  test('leaves ordinary text alone', async () => {
    const text = 'Edit taxonomy.yaml, then run make validate. The token count is 3.'

    expect(maskText(text, rules())).toBe(text)
  })

  test('hides the terms you list, whatever their case, longest first', async () => {
    expect(maskText('ACME Corp and acme corporation, and Acme.', rules(['Acme', 'acme corp', 'x']))).toBe(
      '[hidden] and [hidden]oration, and [hidden].',
    )
  })

  test('hides money only when asked to', async () => {
    expect(maskText('Price goes from $29 to $1,200.50 or $2.5M', rules())).toBe(
      'Price goes from $29 to $1,200.50 or $2.5M',
    )
    expect(maskText('Price goes from $29 to $1,200.50 or $2.5M', rules([], true))).toBe(
      'Price goes from [amount hidden] to [amount hidden] or [amount hidden]',
    )
  })

  test('shows home folders as ~ unless told not to', async () => {
    expect(maskText('/home/ray/work and /Users/ray/x and C:\\Users\\ray\\y', rules())).toBe('~/work and ~/x and ~\\y')
    expect(maskText('/home/ray/work', rules([], false, false))).toBe('/home/ray/work')
  })

  test('masking twice changes nothing more', async () => {
    const once = maskText('ray@x.io sk-ant-api03-abcdefghijklmnopqrstuv $5', rules(['ray'], true))

    expect(maskText(once, rules(['ray'], true))).toBe(once)
  })

  test('maskDeep keeps the shape and the keys', async () => {
    const value = { file: { path: '/home/ray/a', content: 'ray@x.io', lines: 3 }, tags: ['a@b.io', 7, null], ok: true }

    expect(maskDeep(value, rules())).toEqual({
      file: { path: '~/a', content: '[email hidden]', lines: 3 },
      tags: ['[email hidden]', 7, null],
      ok: true,
    })
  })

  test('parseTerms takes a list or a single string', async () => {
    expect(parseTerms([' Acme ', 'x', 7, 'Beta'])).toEqual(['Acme', 'Beta'])
    expect(parseTerms('Acme, Beta\nGamma')).toEqual(['Acme', 'Beta', 'Gamma'])
    expect(parseTerms(undefined)).toEqual([])
  })
})

describe('recording mode', () => {
  test('is off until you turn it on, and then hides the text on screen', async ($, on) => {
    const s = screen(on)
    const text = 'Your GitHub email is ray@example.com'

    const before = await $.ui.mount(assistant(text))

    expect(s.last().text).toBe(text)
    await before.unmount()

    expect((await $.command.run(typed('recording', 'on'))).text).toContain('Recording mode on')

    const after = await $.ui.mount(assistant(text))

    expect(s.last().text).toBe('Your GitHub email is [email hidden]')
    await after.unmount()

    expect((await $.command.run(typed('recording', 'off'))).text).toContain('Recording mode off')

    const off = await $.ui.mount(assistant(text))

    expect(s.last().text).toBe(text)
    await off.unmount()
  })

  test('a bare /recording flips it, and an unknown word only says where it stands', async ($, on) => {
    screen(on)

    expect((await $.command.run(typed('recording'))).text).toContain('Recording mode on')
    expect((await $.command.run(typed('recording', 'maybe'))).text).toContain('Recording mode is on')
    expect((await $.command.run(typed('recording'))).text).toContain('Recording mode off')
  })

  test('shows a status line while it is on', async ($, on) => {
    const s = screen(on)

    await $.command.run(typed('recording', 'on'))
    await $.command.run(typed('recording', 'off'))

    expect(s.statuses).toEqual(['● RECORDING MODE: sensitive details are hidden on screen', undefined])
  })

  test('starts on when told to', { options: { startOn: true } }, async ($, on) => {
    const s = screen(on)
    const ui = await $.ui.mount(assistant('ray@example.com'))

    expect(s.last().text).toBe('[email hidden]')
    await ui.unmount()
  })

  test('hides the terms from its settings', { options: { hideTerms: ['Acme Corp'], startOn: true } }, async ($, on) => {
    const s = screen(on)
    const ui = await $.ui.mount({
      plugin: 'recording-mode',
      surface: 'terminal',
      component: 'UserMessage',
      props: { text: 'Draft the Acme Corp pitch', origin: { kind: 'composer' }, isExpanded: false },
    })

    expect(s.last().text).toBe('Draft the [hidden] pitch')
    await ui.unmount()
  })

  test('hides tool rows and results too', { options: { startOn: true } }, async ($, on) => {
    const s = screen(on)
    const row = await $.ui.mount({
      plugin: 'recording-mode',
      surface: 'terminal',
      component: 'ToolUse',
      props: {
        tool_use_id: 'tu_1',
        tool: 'Bash',
        input: { command: 'echo ray@example.com', timeout: 5 },
        isRunning: false,
        isErrored: false,
        isInterrupted: false,
        output: { stdout: 'ray@example.com\n', stderr: '' },
      },
      requestId: 'tu_1',
    })

    expect(s.last().input).toEqual({ command: 'echo [email hidden]', timeout: 5 })
    expect(s.last().output).toEqual({ stdout: '[email hidden]\n', stderr: '' })
    await row.unmount()

    const result = await $.ui.mount({
      plugin: 'recording-mode',
      surface: 'terminal',
      component: 'ToolResult',
      props: { tool_use_id: 'tu_2', tool: 'Bash', output: { stdout: 'key sk-ant-api03-abcdefghijklmnopqrstuv' }, isErrored: false },
      requestId: 'tu_2',
    })

    expect(s.last().output).toEqual({ stdout: 'key [secret hidden]' })
    await result.unmount()
  })

  test('hides command output and works on the desktop surface too', { options: { startOn: true } }, async ($, on) => {
    const s = screen(on)

    for (const surface of ['terminal', 'desktop', 'vscode', 'mobile'] as const) {
      const ui = await $.ui.mount({
        plugin: 'recording-mode',
        surface,
        component: 'CommandOutput',
        props: { command: 'whoami', args: '', text: 'ray@example.com', isErrored: false },
      })

      expect(s.last().text).toBe('[email hidden]')
      await ui.unmount()
    }
  })

  test('never touches what the model reads: tool calls pass through unchanged', { options: { startOn: true } }, async ($, on) => {
    const seen: unknown[] = []

    on('tool.call', (_$, e) => {
      seen.push(e)

      return { result: 'ok' }
    })

    await $.tool.call({ tool: 'Write', file_path: '/x/price.html', content: '<b>$29</b> ray@example.com' })

    expect(seen).toHaveLength(1)
    expect((seen[0] as { content: string }).content).toBe('<b>$29</b> ray@example.com')
  })
})
