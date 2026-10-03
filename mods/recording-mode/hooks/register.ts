import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import { buildRules, maskDeep, maskText, parseTerms } from './lib'

const STATUS = '● RECORDING MODE: sensitive details are hidden on screen'

// Recording Mode changes what is drawn, never what is stored or what the model reads:
// every hook below rewrites a row's props on the way to the screen and nothing else.
export const register: Register = (on, options) => {
  const isOn = atom({ plugin: 'recording-mode', key: 'isOn' } as const, options.startOn === true)
  const rules = buildRules({
    terms: parseTerms(options.hideTerms),
    maskMoney: options.maskMoney === true,
    maskHomePath: options.maskHomePath !== false,
  })

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'recording',
      description: 'Hide sensitive details on screen while you record: on, off, or no argument to flip it',
      argumentHint: '[on|off]',
    })
    $.ui.status((await read($, isOn)) ? STATUS : undefined)

    return next(e)
  })

  on('command.run', { command: 'recording' }, async ($, e) => {
    const word = e.args.trim().toLowerCase()
    const now = await read($, isOn)
    const wanted = word === 'on' ? true : word === 'off' ? false : word === '' ? !now : undefined

    if (wanted === undefined) {
      return { text: `Recording mode is ${now ? 'on' : 'off'}. Use /recording on or /recording off.` }
    }

    await update($, isOn, () => wanted)
    $.ui.status(wanted ? STATUS : undefined)

    return {
      text: wanted
        ? 'Recording mode on. Emails, keys and the terms you listed are hidden on screen; Claude still sees the real text.'
        : 'Recording mode off. Everything shows as it is.',
    }
  })

  on('ui.render', { component: 'UserMessage' }, async ($, e, next) =>
    (await read($, isOn)) ? next({ ...e, props: { ...e.props, text: maskText(e.props.text, rules) } }) : next(e),
  )

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) =>
    (await read($, isOn)) ? next({ ...e, props: { ...e.props, text: maskText(e.props.text, rules) } }) : next(e),
  )

  on('ui.render', { component: 'CommandOutput' }, async ($, e, next) =>
    (await read($, isOn)) ? next({ ...e, props: { ...e.props, text: maskText(e.props.text, rules) } }) : next(e),
  )

  on('ui.render', { component: 'ToolUse' }, async ($, e, next) => {
    if (!(await read($, isOn))) {
      return next(e)
    }

    const props = { ...e.props, input: maskDeep(e.props.input, rules) }

    return next(e.props.output === undefined ? { ...e, props } : { ...e, props: { ...props, output: maskDeep(e.props.output, rules) } })
  })

  on('ui.render', { component: 'ToolResult' }, async ($, e, next) =>
    (await read($, isOn)) ? next({ ...e, props: { ...e.props, output: maskDeep(e.props.output, rules) } }) : next(e),
  )
}
