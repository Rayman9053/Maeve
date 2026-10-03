// Pure helpers for Collision Guard: no `$` in here, so they unit-test without a session.

/** File path -> when this chat last edited it, in epoch milliseconds. */
export type EditLog = Record<string, number>

/** What each chat writes to its own file in the shared folder. */
export type SessionFile = {
  sessionId: string
  cwd?: string
  edits: EditLog
}

export type Collision = {
  sessionId: string
  ageMs: number
}

const MAX_TRACKED_PATHS = 500

export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/').replace(/\/{2,}/g, '/')
}

/** The last two segments, enough to recognise a file in a question. */
export function shortPath(path: string): string {
  const parts = normalizePath(path).split('/').filter(part => part !== '')

  return parts.slice(-2).join('/')
}

export function describeAge(ageMs: number): string {
  const minutes = Math.round(Math.max(0, ageMs) / 60_000)

  if (ageMs < 45_000) {
    return 'just now'
  }

  if (minutes < 60) {
    return `${Math.max(1, minutes)} min ago`
  }

  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  return rest === 0 ? `${hours} h ago` : `${hours} h ${rest} min ago`
}

/** Drops edits older than the window, and keeps the newest few hundred. */
export function prune(edits: EditLog, now: number, windowMs: number): EditLog {
  const fresh = Object.entries(edits)
    .filter(([, at]) => now - at <= windowMs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_TRACKED_PATHS)

  return Object.fromEntries(fresh)
}

export function parseSessionFile(text: string): SessionFile | undefined {
  let data: unknown

  try {
    data = JSON.parse(text)
  } catch {
    return undefined
  }

  if (typeof data !== 'object' || data === null) {
    return undefined
  }

  const { sessionId, cwd, edits } = data as Record<string, unknown>

  if (typeof sessionId !== 'string' || typeof edits !== 'object' || edits === null) {
    return undefined
  }

  const clean: EditLog = {}

  for (const [path, at] of Object.entries(edits)) {
    if (typeof at === 'number' && Number.isFinite(at)) {
      clean[path] = at
    }
  }

  return { sessionId, cwd: typeof cwd === 'string' ? cwd : undefined, edits: clean }
}

/** The most recent edit of `path` by any of `files`, if it falls inside the window. */
export function findCollision(
  files: readonly SessionFile[],
  path: string,
  now: number,
  windowMs: number,
): Collision | undefined {
  let newest: { sessionId: string; at: number } | undefined

  for (const file of files) {
    const at = file.edits[path]

    if (at !== undefined && now - at <= windowMs && (newest === undefined || at > newest.at)) {
      newest = { sessionId: file.sessionId, at }
    }
  }

  return newest === undefined ? undefined : { sessionId: newest.sessionId, ageMs: Math.max(0, now - newest.at) }
}
