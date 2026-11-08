import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TIMESERIES — A SEQUENCE OVER TIME, AS ARITHMETIC. A run of readings is numbers: the moving average over a window, the
 *  trend from first to last, a seasonal index against the mean, the autocorrelation at a lag, the lagged point, the
 *  exponentially smoothed value, the first difference, and the forecast a slope carries ahead. Crosses to `statistics` —
 *  a time series is what statistics summarises. A measure. */

const PROOF = 'timeseries arithmetic (moving average, trend, seasonal index, autocorrelation, lag, smoothing, differencing, forecast); a sequence over time; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'timeseries', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `timeseries.${name}`, params })

export class TimeseriesFormulas {
  /** MOVING AVERAGE: a window's sum over its width. value ⌊sum / window⌋. */
  static movingaverage(sum: number, window: number): CrossFormula { return c('timeseries-movingaverage', 'movingaverage(sum, window) = ⌊sum / window⌋', window > 0 ? Math.floor(sum / window) : 0, nat(sum, window) && window > 0, 'movingaverage', [sum, window]) }
  /** TREND: the rise from the first reading to the last. value max(0, last − first). */
  static trend(last: number, first: number): CrossFormula { return c('timeseries-trend', 'trend(last, first) = max(0, last − first)', Math.max(0, last - first), nat(last, first), 'trend', [last, first]) }
  /** SEASONAL INDEX: a reading against the mean, as a percentage. value ⌊observed · 100 / average⌋. */
  static seasonalindex(observed: number, average: number): CrossFormula { return c('timeseries-seasonalindex', 'seasonalindex(observed, average) = ⌊observed · 100 / average⌋', average > 0 ? Math.floor((observed * 100) / average) : 0, nat(observed, average) && average > 0, 'seasonalindex', [observed, average]) }
  /** AUTOCORRELATION at a lag: covariance over variance, as a percentage. value ⌊cov · 100 / variance⌋. */
  static autocorrelation(cov: number, variance: number): CrossFormula { return c('timeseries-autocorrelation', 'autocorrelation(cov, variance) = ⌊cov · 100 / variance⌋', variance > 0 ? Math.floor((cov * 100) / variance) : 0, nat(cov, variance) && variance > 0, 'autocorrelation', [cov, variance]) }
  /** LAG: the series shifted back by a number of periods. value max(0, series − shift). */
  static lag(series: number, shift: number): CrossFormula { return c('timeseries-lag', 'lag(series, shift) = max(0, series − shift)', Math.max(0, series - shift), nat(series, shift), 'lag', [series, shift]) }
  /** SMOOTHING: one exponential step, alpha as a percentage. value ⌊(alpha · cur + (100 − alpha) · prev) / 100⌋. */
  static smoothing(prev: number, cur: number, alpha: number): CrossFormula { return c('timeseries-smoothing', 'smoothing(prev, cur, alpha) = ⌊(alpha · cur + (100 − alpha) · prev) / 100⌋', Math.floor((alpha * cur + Math.max(0, 100 - alpha) * prev) / 100), nat(prev, cur, alpha) && alpha <= 100, 'smoothing', [prev, cur, alpha]) }
  /** DIFFERENCING: the first difference between consecutive readings. value max(0, current − previous). */
  static differencing(current: number, previous: number): CrossFormula { return c('timeseries-differencing', 'differencing(current, previous) = max(0, current − previous)', Math.max(0, current - previous), nat(current, previous), 'differencing', [current, previous]) }
  /** FORECAST: a last reading carried ahead by a slope over steps. value last + slope · steps. */
  static forecast(last: number, slope: number, steps: number): CrossFormula { return c('timeseries-forecast', 'forecast(last, slope, steps) = last + slope · steps', last + slope * steps, nat(last, slope, steps), 'forecast', [last, slope, steps]) }
}

for (const name of ['autocorrelation', 'differencing', 'forecast', 'lag', 'movingaverage', 'seasonalindex', 'smoothing', 'trend'] as const)
  hexRegisterOf('timeseries', name, (TimeseriesFormulas[name] as (...x: unknown[]) => unknown).bind(TimeseriesFormulas))
