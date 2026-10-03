// Recording Mode's contract: the types its files share, and the one value it keeps in
// `$.state` (whether it is on). The host holds that value, so a hot reload of the code
// does not turn recording mode off.

/** One find-and-replace applied to text on its way to the screen. */
export type Rule = { pattern: RegExp; replacement: string }

export type RuleOptions = {
  terms: readonly string[]
  maskMoney: boolean
  maskHomePath: boolean
}

declare module 'claude-code' {
  interface PluginState {
    'recording-mode': { isOn: boolean }
  }
}
