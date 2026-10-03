// Pure masking helpers for Recording Mode: no `$` in here, so they unit-test without a session.

import type { Rule, RuleOptions } from '../types'

const SECRET = '[secret hidden]'
const MAX_DEPTH = 12

// Things that look like credentials. Checked first, so an email-shaped token is hidden as a secret.
const SECRETS: Rule[] = [
  { pattern: /\bsk-ant-[A-Za-z0-9_-]{16,}/g, replacement: SECRET },
  { pattern: /\bsk-[A-Za-z0-9_-]{20,}/g, replacement: SECRET },
  { pattern: /\bgh[pousr]_[A-Za-z0-9]{20,}/g, replacement: SECRET },
  { pattern: /\bgithub_pat_[A-Za-z0-9_]{20,}/g, replacement: SECRET },
  { pattern: /\bAKIA[0-9A-Z]{16}\b/g, replacement: SECRET },
  { pattern: /\bAIza[0-9A-Za-z_-]{30,}/g, replacement: SECRET },
  { pattern: /\bxox[abprs]-[A-Za-z0-9-]{10,}/g, replacement: SECRET },
  { pattern: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g, replacement: SECRET },
  { pattern: /\b(Bearer|Basic)\s+[A-Za-z0-9._~+/=-]{16,}/gi, replacement: `$1 ${SECRET}` },
  {
    pattern:
      /\b([A-Za-z0-9_]*(?:API_?KEY|TOKEN|SECRET|PASSWORD|PASSWD|PRIVATE_?KEY)[A-Za-z0-9_]*)(\s*[=:]\s*)(["']?)[^\s"']{6,}\3/gi,
    replacement: `$1$2$3${SECRET}$3`,
  },
]

const EMAIL: Rule = {
  pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+\b/g,
  replacement: '[email hidden]',
}

const MONEY: Rule = {
  pattern: /(?<![\w$])[$€£]\s?\d[\d,]*(?:\.\d+)?(?:\s?[kKmMbB]\b)?/g,
  replacement: '[amount hidden]',
}

const HOME_PATHS: Rule[] = [
  { pattern: /\/(?:home|Users)\/[^/\s"'`]+/g, replacement: '~' },
  { pattern: /[A-Za-z]:\\Users\\[^\\\s"'`]+/g, replacement: '~' },
]

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** The `hideTerms` option arrives as a list, or as one string if a settings file spells it so. */
export function parseTerms(raw: unknown): string[] {
  const list = Array.isArray(raw) ? raw : typeof raw === 'string' ? raw.split(/[\n,]/) : []

  return list
    .filter((term): term is string => typeof term === 'string')
    .map(term => term.trim())
    .filter(term => term.length >= 2)
}

export function buildRules(options: RuleOptions): Rule[] {
  const terms = [...new Set(options.terms)].sort((a, b) => b.length - a.length)
  const termRules: Rule[] = terms.map(term => ({
    pattern: new RegExp(escapeRegExp(term), 'gi'),
    replacement: '[hidden]',
  }))

  return [
    ...SECRETS,
    EMAIL,
    ...termRules,
    ...(options.maskMoney ? [MONEY] : []),
    ...(options.maskHomePath ? HOME_PATHS : []),
  ]
}

export function maskText(text: string, rules: readonly Rule[]): string {
  return rules.reduce((masked, rule) => masked.replace(rule.pattern, rule.replacement), text)
}

/** Masks every string value inside a JSON-like value and leaves its shape and keys alone. */
export function maskDeep(value: unknown, rules: readonly Rule[], depth = 0): unknown {
  if (typeof value === 'string') {
    return maskText(value, rules)
  }

  if (depth >= MAX_DEPTH || typeof value !== 'object' || value === null) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(item => maskDeep(item, rules, depth + 1))
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, maskDeep(item, rules, depth + 1)]),
  )
}
