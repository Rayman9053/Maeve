import type { On } from 'claude-code'
import { describe, expect, mock, test } from 'claude-code/testing'

import { describeAge, findCollision, parseSessionFile, prune, shortPath } from '../hooks/lib'

const HOME = '/home/me'
const DIR = `${HOME}/.claude/collision-guard-data`
const SELF = 'this-chat'
const MIN = 60_000

type Fake = { text: string; mtimeMs: number }

// The world beneath the mod: a clock, a home folder, an in-memory shared folder, and a
// stand-in for the question dialog that answers with whatever `reply` says.
function world(on: On, reply: () => string | undefined) {
  const clock = mock.clock(on, { now: 10 * 60 * MIN })
  const files = new Map<string, Fake>()
  const asked: string[] = []
  let ran = 0
  const ids = { self: SELF }

  mock.env(on, { HOME })
  on('session.id', () => ({ value: ids.self }))
  on('session.cwd', () => ({ value: '/repo' }))
  on('session.end', (_$, e) => ({ sessionId: e.sessionId }))

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
  on('tool.call', (_$, e) => {
    if (e.tool === 'AskUserQuestion') {
      const question = e.questions[0]?.question ?? ''
      const answer = reply()

      asked.push(question)

      return answer === undefined
        ? { deny: 'no one to ask' }
        : { result: { questions: e.questions, answers: { [question]: answer } } }
    }

    ran += 1

    return { result: 'ok' }
  })

  // Another chat's file, last written `agoMin` minutes ago.
  const otherChat = (id: string, path: string, agoMin: number) => {
    const at = clock.now() - agoMin * MIN

    files.set(`${DIR}/${id}.json`, {
      text: JSON.stringify({ sessionId: id, edits: { [path]: at } }),
      mtimeMs: at,
    })
  }

  return { clock, files, asked, ids, otherChat, edits: () => ran }
}

// A slash command as the engine raises it when the person types it.
const typed = (command: string, args = '') => ({
  command,
  args,
  origin: { kind: 'composer' as const },
  presentation: { isFullscreen: false, columns: 80 },
})

const edit = (path: string) => ({ tool: 'Edit' as const, file_path: path, old_string: 'a', new_string: 'b' })

describe('helpers', () => {
  test('describeAge speaks in minutes and hours', async () => {
    expect(describeAge(10_000)).toBe('just now')
    expect(describeAge(4 * MIN)).toBe('4 min ago')
    expect(describeAge(60 * MIN)).toBe('1 h ago')
    expect(describeAge(65 * MIN)).toBe('1 h 5 min ago')
  })

  test('shortPath keeps the last two segments', async () => {
    expect(shortPath('/home/user/Maeve/taxonomy.yaml')).toBe('Maeve/taxonomy.yaml')
    expect(shortPath('C:\\repo\\a.md')).toBe('repo/a.md')
  })

  test('prune drops edits outside the window', async () => {
    expect(prune({ old: 0, fresh: 100 * MIN }, 110 * MIN, 30 * MIN)).toEqual({ fresh: 100 * MIN })
  })

  test('findCollision picks the newest edit inside the window', async () => {
    const files = [
      { sessionId: 'a', edits: { '/x': 90 * MIN } },
      { sessionId: 'b', edits: { '/x': 100 * MIN } },
      { sessionId: 'c', edits: { '/x': 10 * MIN } },
    ]

    expect(findCollision(files, '/x', 110 * MIN, 30 * MIN)).toEqual({ sessionId: 'b', ageMs: 10 * MIN })
    expect(findCollision(files, '/y', 110 * MIN, 30 * MIN)).toBeUndefined()
  })

  test('parseSessionFile refuses anything that is not a chat file', async () => {
    expect(parseSessionFile('not json')).toBeUndefined()
    expect(parseSessionFile('{"edits":{}}')).toBeUndefined()
    expect(parseSessionFile('{"sessionId":"s","edits":{"/a":1,"/b":"x"}}')).toEqual({
      sessionId: 's',
      cwd: undefined,
      edits: { '/a': 1 },
    })
  })
})

describe('collision guard', () => {
  test('lets an edit through, and records it, when no other chat touched the file', async ($, on) => {
    const w = world(on, () => 'Proceed')
    const result = await $.tool.call(edit('/repo/a.md'))
    const mine = parseSessionFile(w.files.get(`${DIR}/${SELF}.json`)?.text ?? '')

    expect(result.deny).toBeUndefined()
    expect(w.asked).toHaveLength(0)
    expect(mine?.edits['/repo/a.md']).toBe(w.clock.now())
  })

  test('asks when another chat changed the file inside the window', async ($, on) => {
    const w = world(on, () => 'Proceed')

    w.otherChat('other-chat', '/repo/a.md', 4)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(w.asked).toEqual(['Another chat changed repo/a.md 4 min ago. Edit it here too?'])
    expect(result.deny).toBeUndefined()
    expect(w.edits()).toBe(1)
  })

  test('Cancel denies the edit and records nothing', async ($, on) => {
    const w = world(on, () => 'Cancel')

    w.otherChat('other-chat', '/repo/a.md', 4)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(result.deny).toContain('cancelled')
    expect(w.edits()).toBe(0)
    expect(w.files.has(`${DIR}/${SELF}.json`)).toBe(false)
  })

  test('Use a worktree tells the model to enter one', async ($, on) => {
    const w = world(on, () => 'Use a worktree')

    w.otherChat('other-chat', '/repo/a.md', 4)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(result.deny).toContain('EnterWorktree')
    expect(w.edits()).toBe(0)
  })

  test('typed text becomes the instruction the model reads', async ($, on) => {
    const w = world(on, () => 'wait for the other chat to finish')

    w.otherChat('other-chat', '/repo/a.md', 4)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(result.deny).toContain('wait for the other chat to finish')
    expect(w.edits()).toBe(0)
  })

  test('ignores edits older than the window', async ($, on) => {
    const w = world(on, () => 'Cancel')

    w.otherChat('other-chat', '/repo/a.md', 45)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(w.asked).toHaveLength(0)
    expect(result.deny).toBeUndefined()
  })

  test('ignores edits to other files', async ($, on) => {
    const w = world(on, () => 'Cancel')

    w.otherChat('other-chat', '/repo/b.md', 1)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(w.asked).toHaveLength(0)
    expect(result.deny).toBeUndefined()
  })

  test('does not ask about its own earlier edits', async ($, on) => {
    const w = world(on, () => 'Cancel')

    await $.tool.call(edit('/repo/a.md'))
    await $.tool.call(edit('/repo/a.md'))

    expect(w.asked).toHaveLength(0)
    expect(w.edits()).toBe(2)
  })

  test('warns once when nobody can answer, then lets the retry through', async ($, on) => {
    const w = world(on, () => undefined)

    w.otherChat('other-chat', '/repo/a.md', 4)

    const first = await $.tool.call(edit('/repo/a.md'))
    const second = await $.tool.call(edit('/repo/a.md'))

    expect(first.deny).toContain('got no answer')
    expect(second.deny).toBeUndefined()
    expect(w.edits()).toBe(1)
  })

  test('guards Write by file_path and NotebookEdit by notebook_path', async ($, on) => {
    const w = world(on, () => 'Cancel')

    w.otherChat('other-chat', '/repo/a.md', 2)
    w.otherChat('other-chat-2', '/repo/n.ipynb', 2)

    const write = await $.tool.call({ tool: 'Write', file_path: '/repo/a.md', content: 'x' })
    const notebook = await $.tool.call({
      tool: 'NotebookEdit',
      notebook_path: '/repo/n.ipynb',
      new_source: 'x',
    })

    expect(write.deny).toContain('cancelled')
    expect(notebook.deny).toContain('cancelled')
    expect(w.asked).toHaveLength(2)
  })

  test('after /clear a chat does not collide with its own earlier self', async ($, on) => {
    const w = world(on, () => 'Cancel')

    await $.tool.call(edit('/repo/a.md'))
    expect(parseSessionFile(w.files.get(`${DIR}/${SELF}.json`)?.text ?? '')?.edits['/repo/a.md']).toBe(w.clock.now())

    // /clear: the old conversation ends, and the process goes on under a new session id.
    await $.session.end({ reason: 'clear', sessionId: SELF, resume: { id: SELF } })
    w.ids.self = 'this-chat-after-clear'
    await w.clock.advance(2 * MIN)

    const result = await $.tool.call(edit('/repo/a.md'))

    expect(parseSessionFile(w.files.get(`${DIR}/${SELF}.json`)?.text ?? '')?.edits).toEqual({})
    expect(w.asked).toHaveLength(0)
    expect(result.deny).toBeUndefined()
  })

  test('/collisions lists what other chats changed', async ($, on) => {
    const w = world(on, () => 'Proceed')

    expect((await $.command.run(typed('collisions'))).text).toContain('No other chat')

    w.otherChat('other-chat', '/repo/a.md', 4)

    expect((await $.command.run(typed('collisions'))).text).toContain('/repo/a.md: 4 min ago (chat other-ch)')
  })
})
