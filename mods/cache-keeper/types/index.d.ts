// Cache Keeper's contract: the types its files share, and the two values it keeps in
// `$.state` so a hot reload of the code does not lose them.
//   lastResponseAt: when the last turn of this chat ended, which is when the prompt cache
//                   was last refreshed (null before the first turn, and after /clear)
//   warnedFor:      the lastResponseAt the expiry warning was already shown for

/** How a piece of the band is coloured. */
export type Tone = 'normal' | 'dim' | 'good' | 'warn' | 'bad'

/** One piece of the band: some text and how to colour it. */
export type Segment = { text: string; tone: Tone }

declare module 'claude-code' {
  interface PluginState {
    'cache-keeper': { lastResponseAt: number | null; warnedFor: number | null }
  }
}
