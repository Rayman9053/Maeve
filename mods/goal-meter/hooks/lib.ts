// Pure helpers for Goal Meter: no `$` in here, so they unit-test without a session.

import type { Goal, GoalTask, Snapshot, TaskStatus } from '../types'

const MINUTE = 60_000

export type GoalArgs = { kind: 'set'; text: string } | { kind: 'clear' } | { kind: 'none' }

// The words after /goal. A single reserved word clears or only looks; anything else is the
// condition being set. (Assumption: /goal <condition> sets, /goal clear clears.)
const CLEAR_WORDS = new Set(['clear', 'off', 'stop', 'cancel', 'none', 'reset'])
const LOOK_WORDS = new Set(['status', 'show', 'info', 'help', '?'])

export function parseGoalArgs(args: string): GoalArgs {
  const text = args.trim()
  const word = text.toLowerCase()

  if (text === '' || LOOK_WORDS.has(word)) {
    return { kind: 'none' }
  }

  return CLEAR_WORDS.has(word) ? { kind: 'clear' } : { kind: 'set', text }
}

export function clip(text: string, max: number): string {
  const flat = text.replace(/\s+/g, ' ').trim()

  return flat.length <= max ? flat : `${flat.slice(0, Math.max(1, max - 1)).trimEnd()}…`
}

export function fmtElapsed(ms: number): string {
  const minutes = Math.floor(Math.max(0, ms) / MINUTE)

  if (minutes < 1) {
    return '<1m'
  }

  return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`
}

export function fmtAgo(ms: number): string {
  return Math.max(0, ms) < 45_000 ? 'just now' : `${fmtElapsed(ms)} ago`
}

export function progress(tasks: readonly GoalTask[]): { done: number; total: number; current: GoalTask | undefined } {
  return {
    done: tasks.filter(task => task.status === 'completed').length,
    total: tasks.length,
    current: tasks.find(task => task.status === 'in_progress') ?? tasks.find(task => task.status === 'pending'),
  }
}

export function bar(done: number, total: number, width = 10): string {
  const filled = total === 0 ? 0 : Math.round((done / total) * width)

  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

export const glyph = (status: TaskStatus): string => (status === 'completed' ? '✓' : status === 'in_progress' ? '◐' : '○')

/** A goal is finished once it has tasks and every one is completed. */
export function isFinished(tasks: readonly GoalTask[]): boolean {
  return tasks.length > 0 && tasks.every(task => task.status === 'completed')
}

export function addTask(tasks: readonly GoalTask[], id: string | undefined, subject: string): GoalTask[] {
  const taskId = id === undefined || id === '' ? `t${tasks.length + 1}` : id

  return [...tasks.filter(task => task.id !== taskId), { id: taskId, subject, status: 'pending' as const }]
}

type TaskPatch = { taskId: string; status?: TaskStatus | 'deleted'; subject?: string }

export function patchTask(tasks: readonly GoalTask[], patch: TaskPatch): GoalTask[] {
  const { taskId, status, subject } = patch

  if (status === 'deleted') {
    return tasks.filter(task => task.id !== taskId)
  }

  return tasks.map(task =>
    task.id === taskId ? { ...task, subject: subject ?? task.subject, status: status ?? task.status } : task,
  )
}

export function fromTodos(todos: readonly { content: string; status: TaskStatus }[]): GoalTask[] {
  return todos.map((todo, index) => ({ id: `todo-${index + 1}`, subject: todo.content, status: todo.status }))
}

export function snapshotOf(
  sessionId: string,
  cwd: string | undefined,
  goal: Goal | null,
  tasks: readonly GoalTask[],
  now: number,
): Snapshot {
  const { done, total } = progress(tasks)

  return {
    sessionId,
    cwd,
    goal: goal === null ? null : goal.text,
    startedAt: goal?.startedAt ?? now,
    endedAt: goal?.endedAt ?? null,
    done,
    total,
    updatedAt: now,
  }
}

export function parseSnapshot(text: string): Snapshot | undefined {
  let data: unknown

  try {
    data = JSON.parse(text)
  } catch {
    return undefined
  }

  if (typeof data !== 'object' || data === null) {
    return undefined
  }

  const row = data as Record<string, unknown>
  const { sessionId, cwd, goal, startedAt, endedAt, done, total, updatedAt } = row

  if (
    typeof sessionId !== 'string' ||
    (goal !== null && typeof goal !== 'string') ||
    typeof startedAt !== 'number' ||
    typeof done !== 'number' ||
    typeof total !== 'number' ||
    typeof updatedAt !== 'number'
  ) {
    return undefined
  }

  return {
    sessionId,
    cwd: typeof cwd === 'string' ? cwd : undefined,
    goal,
    startedAt,
    endedAt: typeof endedAt === 'number' ? endedAt : null,
    done,
    total,
    updatedAt,
  }
}

/** One line about another chat's goal, for the Goals pane and /goals. */
export function otherLine(snapshot: Snapshot, now: number): string {
  const where = snapshot.cwd === undefined ? snapshot.sessionId.slice(0, 8) : snapshot.cwd.split('/').filter(Boolean).pop() ?? snapshot.sessionId.slice(0, 8)
  const state =
    snapshot.endedAt !== null
      ? `done in ${fmtElapsed(snapshot.endedAt - snapshot.startedAt)}`
      : snapshot.total === 0
        ? 'planning'
        : `${snapshot.done}/${snapshot.total} tasks, ${fmtElapsed(now - snapshot.startedAt)}`

  return `${where}: ${clip(snapshot.goal ?? '', 48)} (${state}; updated ${fmtAgo(now - snapshot.updatedAt)})`
}
