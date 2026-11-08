import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REGRESSION — LEAST-SQUARES FITTING, AS ARITHMETIC (chosen by the registry, not by hand). Fitting a line to points is
 *  numbers: the slope from the sums, the intercept from the means, a residual, the summed squared error, R² as a percentage,
 *  a prediction at x, a point's leverage, and the mean squared error. Crosses to `statistics` — regression is statistics
 *  put to work on a line. A measure. */

const PROOF = 'regression arithmetic (slope, intercept, residual, sse, rsquared, prediction, leverage, mse); least-squares fitting the registry left uncovered; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'regression', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `regression.${name}`, params })

export class RegressionFormulas {
  /** SLOPE: covariance over variance. value ⌊sxy / sxx⌋. */
  static slope(sxy: number, sxx: number): CrossFormula { return c('regression-slope', 'slope(sxy, sxx) = ⌊sxy / sxx⌋', sxx > 0 ? Math.floor(sxy / sxx) : 0, nat(sxy, sxx) && sxx > 0, 'slope', [sxy, sxx]) }
  /** INTERCEPT from the means. value max(0, meanY − slope · meanX). */
  static intercept(meanY: number, slope: number, meanX: number): CrossFormula { return c('regression-intercept', 'intercept(meanY, slope, meanX) = max(0, meanY − slope · meanX)', Math.max(0, meanY - slope * meanX), nat(meanY, slope, meanX), 'intercept', [meanY, slope, meanX]) }
  /** RESIDUAL: observed minus fitted. value max(0, actual − predicted). */
  static residual(actual: number, predicted: number): CrossFormula { return c('regression-residual', 'residual(actual, predicted) = actual − predicted', Math.max(0, actual - predicted), nat(actual, predicted), 'residual', [actual, predicted]) }
  /** SSE: n residuals of equal size, squared and summed. value n · err². */
  static sse(err: number, n: number): CrossFormula { return c('regression-sse', 'sse(err, n) = n · err²', n * err * err, nat(err, n), 'sse', [err, n]) }
  /** R-SQUARED as a percentage: explained over total. value ⌊ssr · 100 / sst⌋. */
  static rsquared(ssr: number, sst: number): CrossFormula { return c('regression-rsquared', 'rsquared(ssr, sst) = ⌊ssr · 100 / sst⌋', sst > 0 ? Math.floor((ssr * 100) / sst) : 0, nat(ssr, sst) && sst > 0 && ssr <= sst, 'rsquared', [ssr, sst]) }
  /** PREDICTION at x on the fitted line. value slope · x + intercept. */
  static prediction(slope: number, x: number, intercept: number): CrossFormula { return c('regression-prediction', 'prediction(slope, x, intercept) = slope · x + intercept', slope * x + intercept, nat(slope, x, intercept), 'prediction', [slope, x, intercept]) }
  /** LEVERAGE of a point as a percentage. value ⌊xdiff2 · 100 / sxx⌋. */
  static leverage(xdiff2: number, sxx: number): CrossFormula { return c('regression-leverage', 'leverage(xdiff2, sxx) = ⌊xdiff2 · 100 / sxx⌋', sxx > 0 ? Math.floor((xdiff2 * 100) / sxx) : 0, nat(xdiff2, sxx) && sxx > 0, 'leverage', [xdiff2, sxx]) }
  /** MSE: the summed squared error over its degrees. value ⌊sse / n⌋. */
  static mse(sse: number, n: number): CrossFormula { return c('regression-mse', 'mse(sse, n) = ⌊sse / n⌋', n > 0 ? Math.floor(sse / n) : 0, nat(sse, n) && n > 0, 'mse', [sse, n]) }
}

for (const name of ['intercept', 'leverage', 'mse', 'prediction', 'residual', 'rsquared', 'slope', 'sse'] as const)
  hexRegisterOf('regression', name, (RegressionFormulas[name] as (...x: unknown[]) => unknown).bind(RegressionFormulas))
