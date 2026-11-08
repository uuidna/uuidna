import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NOTICE — THE BANNER/CALLOUT/STATEMENT NOTICE USE CASE (payloadcms/website), AS ARITHMETIC. A notice shown to a reader
 *  is numbers: its severity level, how often it is dismissed, how often its call-to-action is clicked, how long it stays,
 *  how many stack at once, which of two notices wins, impressions per user, and the auto-hide delay. Crosses to `frontend`
 *  — a notice is what the frontend renders. A measure. */

const PROOF = 'notice arithmetic (severity, dismiss rate, cta rate, duration, stack, priority, impressions, autohide); the Banner/Callout/Statement notice use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'notice', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `notice.${name}`, params })

export class NoticeFormulas {
  /** SEVERITY: the notice level itself. value level. */
  static severity(level: number): CrossFormula { return c('notice-severity', 'severity(level) = level', level, nat(level) && level <= 5, 'severity', [level]) }
  /** DISMISS RATE as a percentage. value ⌊dismissed · 100 / shown⌋. */
  static dismiss(dismissed: number, shown: number): CrossFormula { return c('notice-dismiss', 'dismiss(dismissed, shown) = ⌊dismissed · 100 / shown⌋', shown > 0 ? Math.floor((dismissed * 100) / shown) : 0, nat(dismissed, shown) && shown > 0 && dismissed <= shown, 'dismiss', [dismissed, shown]) }
  /** CTA RATE as a percentage. value ⌊clicks · 100 / views⌋. */
  static cta(clicks: number, views: number): CrossFormula { return c('notice-cta', 'cta(clicks, views) = ⌊clicks · 100 / views⌋', views > 0 ? Math.floor((clicks * 100) / views) : 0, nat(clicks, views) && views > 0 && clicks <= views, 'cta', [clicks, views]) }
  /** DURATION the notice stays, in milliseconds. value ms. */
  static duration(ms: number): CrossFormula { return c('notice-duration', 'duration(ms) = ms', ms, nat(ms), 'duration', [ms]) }
  /** STACK: how many notices stack at once. value count. */
  static stack(count: number): CrossFormula { return c('notice-stack', 'stack(count) = count', count, nat(count), 'stack', [count]) }
  /** PRIORITY: 1 when the first notice wins over the second. value [a ≥ b]. */
  static priority(a: number, b: number): CrossFormula { return c('notice-priority', 'priority(a, b) = [a ≥ b]', a >= b ? 1 : 0, nat(a, b), 'priority', [a, b]) }
  /** IMPRESSIONS per user as a percentage. value ⌊shown · 100 / users⌋. */
  static impressions(shown: number, users: number): CrossFormula { return c('notice-impressions', 'impressions(shown, users) = ⌊shown · 100 / users⌋', users > 0 ? Math.floor((shown * 100) / users) : 0, nat(shown, users) && users > 0 && shown <= users, 'impressions', [shown, users]) }
  /** AUTOHIDE delay, in seconds. value seconds. */
  static autohide(seconds: number): CrossFormula { return c('notice-autohide', 'autohide(seconds) = seconds', seconds, nat(seconds), 'autohide', [seconds]) }
}

for (const name of ['autohide', 'cta', 'dismiss', 'duration', 'impressions', 'priority', 'severity', 'stack'] as const)
  hexRegisterOf('notice', name, (NoticeFormulas[name] as (...x: unknown[]) => unknown).bind(NoticeFormulas))
