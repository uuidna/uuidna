import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ESTIMATION — RECOVERING A TRUE VALUE FROM NOISY MEASUREMENTS, AS ARITHMETIC. Estimating is numbers: the mean squared
 *  error, the bias of an estimator, its variance, a confidence level, the residual of a fit, a likelihood, the innovation
 *  a new measurement brings, and the gain that weights it. Crosses to `cybernetics` — estimation is the feedback a
 *  controller runs on. A measure. */

const PROOF = 'estimation arithmetic (mean squared error, bias, variance, confidence, residual, likelihood, innovation, gain); recovering a true value from noisy measurement; a measure crossed to cybernetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'estimation', dst: 'cybernetics', formula, value, proof: PROOF, ...extra }, holds, { name: `estimation.${name}`, params })

export class EstimationFormulas {
  /** MEAN SQUARED ERROR: the summed squared error over the samples. value ⌊sumsq / n⌋. */
  static meansquareerror(sumsq: number, n: number): CrossFormula { return c('estimation-meansquareerror', 'meansquareerror(sumsq, n) = ⌊sumsq / n⌋', n > 0 ? Math.floor(sumsq / n) : 0, nat(sumsq, n) && n > 0, 'meansquareerror', [sumsq, n]) }
  /** BIAS: how far an estimate sits above the truth. value max(0, estimate − truth). */
  static bias(estimate: number, truth: number): CrossFormula { return c('estimation-bias', 'bias(estimate, truth) = max(0, estimate − truth)', Math.max(0, estimate - truth), nat(estimate, truth), 'bias', [estimate, truth]) }
  /** VARIANCE: the summed squared deviation over the samples. value ⌊sumsqdev / n⌋. */
  static variance(sumsqdev: number, n: number): CrossFormula { return c('estimation-variance', 'variance(sumsqdev, n) = ⌊sumsqdev / n⌋', n > 0 ? Math.floor(sumsqdev / n) : 0, nat(sumsqdev, n) && n > 0, 'variance', [sumsqdev, n]) }
  /** CONFIDENCE as a percentage. value ⌊level · 100 / total⌋. */
  static confidence(level: number, total: number): CrossFormula { return c('estimation-confidence', 'confidence(level, total) = ⌊level · 100 / total⌋', total > 0 ? Math.floor((level * 100) / total) : 0, nat(level, total) && total > 0 && level <= total, 'confidence', [level, total]) }
  /** RESIDUAL: observed minus the fit's prediction. value max(0, observed − predicted). */
  static residual(observed: number, predicted: number): CrossFormula { return c('estimation-residual', 'residual(observed, predicted) = max(0, observed − predicted)', Math.max(0, observed - predicted), nat(observed, predicted), 'residual', [observed, predicted]) }
  /** LIKELIHOOD as a percentage of matches over the trials. value ⌊matches · 100 / total⌋. */
  static likelihood(matches: number, total: number): CrossFormula { return c('estimation-likelihood', 'likelihood(matches, total) = ⌊matches · 100 / total⌋', total > 0 ? Math.floor((matches * 100) / total) : 0, nat(matches, total) && total > 0 && matches <= total, 'likelihood', [matches, total]) }
  /** INNOVATION: the surprise a new measurement carries over the prediction. value max(0, measured − predicted). */
  static innovation(measured: number, predicted: number): CrossFormula { return c('estimation-innovation', 'innovation(measured, predicted) = max(0, measured − predicted)', Math.max(0, measured - predicted), nat(measured, predicted), 'innovation', [measured, predicted]) }
  /** ESTIMATE GAIN: how much weight a measurement earns against the noise. value ⌊error · 100 / (error + noise)⌋. */
  static estimategain(error: number, noise: number): CrossFormula { return c('estimation-estimategain', 'estimategain(error, noise) = ⌊error · 100 / (error + noise)⌋', (error + noise) > 0 ? Math.floor((error * 100) / (error + noise)) : 0, nat(error, noise) && (error + noise) > 0, 'estimategain', [error, noise]) }
}

for (const name of ['bias', 'confidence', 'estimategain', 'innovation', 'likelihood', 'meansquareerror', 'residual', 'variance'] as const)
  hexRegisterOf('estimation', name, (EstimationFormulas[name] as (...x: unknown[]) => unknown).bind(EstimationFormulas))
