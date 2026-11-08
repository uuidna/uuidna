import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STATISTICS — DESCRIPTIVE AND INFERENTIAL MEASURES, AS ARITHMETIC. Summarising data is numbers: the mean, the spread
 *  (range and variance), a standardised score, a percentile, a correlation, a confidence margin, and the sample a fraction
 *  draws. Every quotient guarded (denominator > 0 else 0). Crosses to `code` — a measure read as a program. */

const PROOF = 'statistics arithmetic (mean, range, variance, zscore, percentile, correlation, confidence, sample); descriptive and inferential measures; every division guarded; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'statistics', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `statistics.${name}`, params })

export class StatisticsFormulas {
  /** THE MEAN: a sum over its count. value ⌊sum / count⌋. */
  static mean(sum: number, count: number): CrossFormula { return c('statistics-mean', 'mean(sum, count) = ⌊sum / count⌋', count > 0 ? Math.floor(sum / count) : 0, nat(sum, count) && count > 0, 'mean', [sum, count]) }
  /** THE RANGE: the spread between the extremes. value max(0, max_ − min_). */
  static range(max_: number, min_: number): CrossFormula { return c('statistics-range', 'range(max_, min_) = max(0, max_ − min_)', Math.max(0, max_ - min_), nat(max_, min_), 'range', [max_, min_]) }
  /** THE VARIANCE: the mean of the squared deviations. value ⌊squares / count⌋. */
  static variance(squares: number, count: number): CrossFormula { return c('statistics-variance', 'variance(squares, count) = ⌊squares / count⌋', count > 0 ? Math.floor(squares / count) : 0, nat(squares, count) && count > 0, 'variance', [squares, count]) }
  /** THE Z-SCORE: a value standardised by its deviation, scaled by 100. value ⌊value · 100 / sigma⌋. */
  static zscore(value: number, sigma: number): CrossFormula { return c('statistics-zscore', 'zscore(value, sigma) = ⌊value · 100 / sigma⌋', sigma > 0 ? Math.floor((value * 100) / sigma) : 0, nat(value, sigma) && sigma > 0, 'zscore', [value, sigma]) }
  /** THE PERCENTILE: a rank over the total, as a percentage. value ⌊rank · 100 / total⌋. */
  static percentile(rank: number, total: number): CrossFormula { return c('statistics-percentile', 'percentile(rank, total) = ⌊rank · 100 / total⌋', total > 0 ? Math.floor((rank * 100) / total) : 0, nat(rank, total) && total > 0 && rank <= total, 'percentile', [rank, total]) }
  /** THE CORRELATION: a covariance over the product of deviations, scaled by 100. value ⌊covariance · 100 / product⌋. */
  static correlation(covariance: number, product: number): CrossFormula { return c('statistics-correlation', 'correlation(covariance, product) = ⌊covariance · 100 / product⌋', product > 0 ? Math.floor((covariance * 100) / product) : 0, nat(covariance, product) && product > 0, 'correlation', [covariance, product]) }
  /** THE CONFIDENCE: a margin over the estimate, as a percentage. value ⌊margin · 100 / estimate⌋. */
  static confidence(margin: number, estimate: number): CrossFormula { return c('statistics-confidence', 'confidence(margin, estimate) = ⌊margin · 100 / estimate⌋', estimate > 0 ? Math.floor((margin * 100) / estimate) : 0, nat(margin, estimate) && estimate > 0, 'confidence', [margin, estimate]) }
  /** THE SAMPLE: a population thinned by a fraction. value ⌊population / fraction⌋. */
  static sample(population: number, fraction: number): CrossFormula { return c('statistics-sample', 'sample(population, fraction) = ⌊population / fraction⌋', fraction > 0 ? Math.floor(population / fraction) : 0, nat(population, fraction) && fraction > 0, 'sample', [population, fraction]) }
}

for (const name of ['confidence', 'correlation', 'mean', 'percentile', 'range', 'sample', 'variance', 'zscore'] as const)
  hexRegisterOf('statistics', name, (StatisticsFormulas[name] as (...x: unknown[]) => unknown).bind(StatisticsFormulas))
