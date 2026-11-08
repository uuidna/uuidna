import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VITALS — GOOGLE CORE WEB VITALS, AS ARITHMETIC (the thresholds a page is graded by, not by hand). A page's field data is
 *  numbers: whether loading, interaction and layout clear the bar, the time to first byte and first paint, how much of a
 *  budget a resource burned, the share of metrics that passed, and how far a release regressed. Crosses to `obs` — vitals
 *  are what observability watches. Official Google thresholds: LCP ≤ 2500ms, INP ≤ 200ms, CLS ≤ 0.10, TTFB ≤ 800ms, FCP ≤
 *  1800ms (CLS is carried ×100 to stay an integer, so 0.10 is 10). A measure. */

const PROOF = 'core web vitals arithmetic (good LCP/INP/CLS/TTFB/FCP by Google\'s thresholds, resource budget, pass score, release regression); the thresholds a page is graded by; a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'vitals', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `vitals.${name}`, params })

export class VitalsFormulas {
  /** GOOD LCP: Largest Contentful Paint clears Google's 2500ms bar. value [ms ≤ 2500]. */
  static lcp(ms: number): CrossFormula { return c('vitals-lcp', 'lcp(ms) = [ms ≤ 2500]', ms <= 2500 ? 1 : 0, nat(ms), 'lcp', [ms]) }
  /** GOOD INP: Interaction to Next Paint clears Google's 200ms bar. value [ms ≤ 200]. */
  static inp(ms: number): CrossFormula { return c('vitals-inp', 'inp(ms) = [ms ≤ 200]', ms <= 200 ? 1 : 0, nat(ms), 'inp', [ms]) }
  /** GOOD CLS: Cumulative Layout Shift (carried ×100) clears Google's 0.10 bar. value [score ≤ 10]. */
  static cls(score: number): CrossFormula { return c('vitals-cls', 'cls(score) = [score ≤ 10]', score <= 10 ? 1 : 0, nat(score), 'cls', [score]) }
  /** GOOD TTFB: Time To First Byte clears Google's 800ms bar. value [ms ≤ 800]. */
  static ttfb(ms: number): CrossFormula { return c('vitals-ttfb', 'ttfb(ms) = [ms ≤ 800]', ms <= 800 ? 1 : 0, nat(ms), 'ttfb', [ms]) }
  /** GOOD FCP: First Contentful Paint clears Google's 1800ms bar. value [ms ≤ 1800]. */
  static fcp(ms: number): CrossFormula { return c('vitals-fcp', 'fcp(ms) = [ms ≤ 1800]', ms <= 1800 ? 1 : 0, nat(ms), 'fcp', [ms]) }
  /** BUDGET: the share of a performance budget a resource burned. value ⌊used · 100 / total⌋. */
  static budget(used: number, total: number): CrossFormula { return c('vitals-budget', 'budget(used, total) = ⌊used · 100 / total⌋', total > 0 ? Math.floor((used * 100) / total) : 0, nat(used, total) && total > 0, 'budget', [used, total]) }
  /** SCORE: the share of metrics that passed, as a percentage. value ⌊passed · 100 / metrics⌋. */
  static score(passed: number, metrics: number): CrossFormula { return c('vitals-score', 'score(passed, metrics) = ⌊passed · 100 / metrics⌋', metrics > 0 ? Math.floor((passed * 100) / metrics) : 0, nat(passed, metrics) && metrics > 0 && passed <= metrics, 'score', [passed, metrics]) }
  /** REGRESSION: how far a metric worsened since the last release, never below zero. value max(0, now − before). */
  static regression(now: number, before: number): CrossFormula { return c('vitals-regression', 'regression(now, before) = max(0, now − before)', Math.max(0, now - before), nat(now, before), 'regression', [now, before]) }
}

for (const name of ['budget', 'cls', 'fcp', 'inp', 'lcp', 'regression', 'score', 'ttfb'] as const)
  hexRegisterOf('vitals', name, (VitalsFormulas[name] as (...x: unknown[]) => unknown).bind(VitalsFormulas))
