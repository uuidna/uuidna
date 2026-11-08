import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OBSERVABILITY — WATCHING THE CLOUD, AS ARITHMETIC. What the signals say: the error budget left, the SLO met, the
 *  Apdex score, a percentile, metric cardinality, the sampling rate, saturation, and signal over noise. Each one is
 *  numbers over numbers, floored to an integer. Crosses to `cloud` — observability is what watches the compute. A measure. */

const PROOF = 'observability arithmetic (error budget, SLO, Apdex, percentile, cardinality, sampling, saturation, signal/noise); the signals that watch the cloud; a measure crossed to cloud'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'observability', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `observability.${name}`, params })

export class ObservabilityFormulas {
  /** ERROR BUDGET: errors still allowed after what is consumed. value max(0, allowed − consumed). */
  static errorbudget(allowed: number, consumed: number): CrossFormula { return c('observability-errorbudget', 'errorbudget(allowed, consumed) = max(0, allowed − consumed)', Math.max(0, allowed - consumed), nat(allowed, consumed), 'errorbudget', [allowed, consumed]) }
  /** SLO: good events over total as a percentage. value ⌊good · 100 / total⌋. */
  static slo(good: number, total: number): CrossFormula { return c('observability-slo', 'slo(good, total) = ⌊good · 100 / total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total, 'slo', [good, total]) }
  /** APDEX: satisfied requests over total as a percentage. value ⌊satisfied · 100 / total⌋. */
  static apdex(satisfied: number, total: number): CrossFormula { return c('observability-apdex', 'apdex(satisfied, total) = ⌊satisfied · 100 / total⌋', total > 0 ? Math.floor((satisfied * 100) / total) : 0, nat(satisfied, total) && total > 0 && satisfied <= total, 'apdex', [satisfied, total]) }
  /** PERCENTILE: rank over total as a percentage. value ⌊rank · 100 / total⌋. */
  static percentile(rank: number, total: number): CrossFormula { return c('observability-percentile', 'percentile(rank, total) = ⌊rank · 100 / total⌋', total > 0 ? Math.floor((rank * 100) / total) : 0, nat(rank, total) && total > 0 && rank <= total, 'percentile', [rank, total]) }
  /** CARDINALITY: time series per metric. value ⌊series / metrics⌋. */
  static cardinality(series: number, metrics: number): CrossFormula { return c('observability-cardinality', 'cardinality(series, metrics) = ⌊series / metrics⌋', metrics > 0 ? Math.floor(series / metrics) : 0, nat(series, metrics) && metrics > 0, 'cardinality', [series, metrics]) }
  /** SAMPLING: sampled over total as a percentage. value ⌊sampled · 100 / total⌋. */
  static sampling(sampled: number, total: number): CrossFormula { return c('observability-sampling', 'sampling(sampled, total) = ⌊sampled · 100 / total⌋', total > 0 ? Math.floor((sampled * 100) / total) : 0, nat(sampled, total) && total > 0 && sampled <= total, 'sampling', [sampled, total]) }
  /** SATURATION: used over capacity as a percentage. value ⌊used · 100 / capacity⌋. */
  static saturation(used: number, capacity: number): CrossFormula { return c('observability-saturation', 'saturation(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'saturation', [used, capacity]) }
  /** SIGNAL over noise as a percentage. value ⌊events · 100 / noise⌋. */
  static signal(events: number, noise: number): CrossFormula { return c('observability-signal', 'signal(events, noise) = ⌊events · 100 / noise⌋', noise > 0 ? Math.floor((events * 100) / noise) : 0, nat(events, noise) && noise > 0, 'signal', [events, noise]) }
}

for (const name of ['apdex', 'cardinality', 'errorbudget', 'percentile', 'sampling', 'saturation', 'signal', 'slo'] as const)
  hexRegisterOf('observability', name, (ObservabilityFormulas[name] as (...x: unknown[]) => unknown).bind(ObservabilityFormulas))
