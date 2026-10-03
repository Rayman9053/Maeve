// Next Steps' contract: the type its files share, and the one value it keeps in `$.state`
// (the suggestions on offer) so a hot reload of the code does not lose them.

/** What happened during a turn that decides the next step, in the order it happened. */
export type Evidence = { kind: 'edit'; path: string } | { kind: 'run'; command: string }

declare module 'claude-code' {
  interface PluginState {
    'next-steps': { items: string[] }
  }
}
