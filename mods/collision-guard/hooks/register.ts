import type { EngineInterface, Register } from 'claude-code'

import { describeAge, findCollision, normalizePath, parseSessionFile, prune, shortPath } from './lib'
import type { EditLog, SessionFile } from './lib'

type Config = { windowMs: number }

const CHOICES = ['Proceed', 'Use a worktree', 'Cancel']

// Edits this chat made lately. Kept in memory so two edits that land together cannot
// lose one another, and written whole to this chat's own file after every edit.
let mine: EditLog | undefined

// Paths this chat was warned about while nobody could answer (a headless run).
const told = new Map<string, number>()

// One file per chat, in one folder every chat can reach. A chat only ever writes its own
// file, so two chats never overwrite one another.
async function dataDir($: EngineInterface): Promise<string | undefined> {
  const home = (await $.env.get('HOME')) ?? (await $.env.get('USERPROFILE'))

  return home === undefined || home === '' ? undefined : `${home}/.claude/collision-guard-data`
}

// Other chats' files. A file not touched inside the window cannot hold an edit inside it,
// because every edit rewrites its chat's file, so those are skipped without being read.
async function otherChats($: EngineInterface, dir: string, selfId: string, since: number): Promise<SessionFile[]> {
  const entries = await $.fs.list(dir).catch(() => [])
  const found: SessionFile[] = []

  for (const entry of entries) {
    if (entry.kind !== 'file' || !entry.name.endsWith('.json') || entry.mtimeMs < since) {
      continue
    }

    const text = await $.fs.read(`${dir}/${entry.name}`).catch(() => undefined)
    const file = text === undefined ? undefined : parseSessionFile(text)

    if (file !== undefined && file.sessionId !== selfId) {
      found.push(file)
    }
  }

  return found
}

// Returns why the edit should not go ahead, or undefined to let it.
async function check($: EngineInterface, config: Config, rawPath: string): Promise<string | undefined> {
  const dir = await dataDir($)

  if (dir === undefined) {
    return undefined
  }

  const path = normalizePath(rawPath)
  const now = await $.clock.now()
  const selfId = await $.session.id()
  const clash = findCollision(await otherChats($, dir, selfId, now - config.windowMs), path, now, config.windowMs)

  if (clash === undefined) {
    return undefined
  }

  const age = describeAge(clash.ageMs)
  const answer = await $.ui
    .ask(`Another chat changed ${shortPath(path)} ${age}. Edit it here too?`, {
      options: CHOICES,
      header: 'Collision',
    })
    .catch(() => undefined)

  if (answer === 'Proceed') {
    return undefined
  }

  if (answer === 'Use a worktree') {
    return `The user does not want two chats editing ${path}. Call EnterWorktree to work in a separate git worktree, then make this edit there.`
  }

  if (answer === 'Cancel') {
    return `The user cancelled this edit: another chat changed ${path} ${age}. Do not retry it; wait for the user's next instruction.`
  }

  if (answer === undefined) {
    // The question was dismissed, or nobody is attached to answer it. Say so once, then let
    // the retry through, so a headless run is warned but never stuck.
    const last = told.get(path)

    if (last !== undefined && now - last < config.windowMs) {
      return undefined
    }

    told.set(path, now)

    return `Another chat changed ${path} ${age}, and the question to the user got no answer. Tell the user, then retry this edit only if it is still right.`
  }

  return `The user answered "${answer}" instead of choosing an option. Follow that rather than editing ${path}.`
}

async function record($: EngineInterface, config: Config, rawPath: string): Promise<void> {
  const dir = await dataDir($)

  if (dir === undefined) {
    return
  }

  const now = await $.clock.now()
  const selfId = await $.session.id()
  const file = `${dir}/${selfId}.json`
  const text = mine === undefined ? await $.fs.read(file).catch(() => undefined) : undefined
  const loaded = text === undefined ? undefined : parseSessionFile(text)?.edits

  mine = prune({ ...(mine ?? loaded ?? {}), [normalizePath(rawPath)]: now }, now, config.windowMs)

  const body: SessionFile = { sessionId: selfId, cwd: await $.session.cwd(), edits: mine }

  await $.fs.write(file, JSON.stringify(body))
}

// A chat that ends (or is /cleared, after which the process goes on under a new session id)
// takes its edits off the shared folder, so its old file is never mistaken for another chat's.
async function forget($: EngineInterface, sessionId: string): Promise<void> {
  const dir = await dataDir($)

  if (dir !== undefined) {
    await $.fs.write(`${dir}/${sessionId}.json`, JSON.stringify({ sessionId, edits: {} })).catch(() => undefined)
  }
}

// Runs one edit behind the guard: ask first, record afterwards, and only if it worked.
async function guarded<R extends { deny?: string; isError?: true }>(
  $: EngineInterface,
  config: Config,
  path: string,
  run: () => Promise<R>,
): Promise<R | { deny: string }> {
  const reason = await check($, config, path)

  if (reason !== undefined) {
    return { deny: reason }
  }

  const ran = await run()

  if (ran.deny === undefined && ran.isError !== true) {
    await record($, config, path)
  }

  return ran
}

async function report($: EngineInterface, config: Config): Promise<string> {
  const dir = await dataDir($)

  if (dir === undefined) {
    return 'Collision Guard cannot find your home folder, so it shares nothing between chats.'
  }

  const now = await $.clock.now()
  const selfId = await $.session.id()
  const files = await otherChats($, dir, selfId, now - config.windowMs)
  const lines = files
    .flatMap(file => Object.entries(file.edits).map(([path, at]) => ({ path, at, who: file.sessionId.slice(0, 8) })))
    .filter(row => now - row.at <= config.windowMs)
    .sort((a, b) => b.at - a.at)
    .map(row => `${row.path}: ${describeAge(now - row.at)} (chat ${row.who})`)
  const minutes = Math.round(config.windowMs / 60_000)

  return lines.length === 0
    ? `No other chat has edited a file in the last ${minutes} minutes.`
    : `Files other chats edited in the last ${minutes} minutes:\n${lines.join('\n')}`
}

export const register: Register = (on, options) => {
  const minutes = Number(options.windowMinutes)
  const config: Config = { windowMs: (Number.isFinite(minutes) && minutes > 0 ? minutes : 30) * 60_000 }

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'collisions',
      description: 'Show the files other chats edited recently',
    })

    return next(e)
  })

  on('command.run', { command: 'collisions' }, async $ => ({ text: await report($, config) }))

  on('session.end', async ($, e, next) => {
    await forget($, e.sessionId)

    return next(e)
  })

  on('tool.call', { tool: 'Edit' }, ($, e, next) => guarded($, config, e.file_path, () => next(e)))
  on('tool.call', { tool: 'Write' }, ($, e, next) => guarded($, config, e.file_path, () => next(e)))
  on('tool.call', { tool: 'NotebookEdit' }, ($, e, next) =>
    guarded($, config, e.notebook_path, () => next(e)),
  )
}
