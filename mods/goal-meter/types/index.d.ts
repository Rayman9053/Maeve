// Goal Meter's contract: the types its files share, and the two values it keeps in
// `$.state` so a hot reload of the code does not lose them.
//   goal:  the goal set with /goal (or proposed by Claude), when it began, and when its
//          tasks all finished (null while it is still going)
//   tasks: the task list Claude is working through, from TaskCreate, TaskUpdate and TodoWrite

export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export type GoalTask = { id: string; subject: string; status: TaskStatus }

export type Goal = { text: string; startedAt: number; endedAt: number | null }

/** What each chat writes to its own file, so other chats can show its goal. */
export type Snapshot = {
  sessionId: string
  cwd?: string
  goal: string | null
  startedAt: number
  endedAt: number | null
  done: number
  total: number
  updatedAt: number
}

declare module 'claude-code' {
  interface PluginState {
    'goal-meter': { goal: Goal | null; tasks: GoalTask[] }
  }
}
