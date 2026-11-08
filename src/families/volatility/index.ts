import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VOLATILITY — PRICE MOVEMENT, AS ARITHMETIC. How much a market moves is numbers: the day's range, the annualized swing,
 *  the width of a historical band, beta against the market, variance of returns, the implied move an option prices in, a
 *  z-score of deviation, and the depth of a drawdown. Integer proxies, no sqrt. Crosses to `trading` — volatility is what
 *  trading prices and hedges. A measure. */

const PROOF = 'volatility arithmetic (range, annualized swing, historical band, beta, variance, implied move, z-score, drawdown); integer proxies with no sqrt; a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'volatility', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `volatility.${name}`, params })

export class VolatilityFormulas {
  /** RANGE: the day's spread, high minus low. value max(0, high − low). */
  static range(high: number, low: number): CrossFormula { return c('volatility-range', 'range(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'range', [high, low]) }
  /** ANNUALIZED: a daily move scaled to a year by √252 ≈ 16 (integer proxy). value daily · 16. */
  static annualized(daily: number): CrossFormula { return c('volatility-annualized', 'annualized(daily) = daily · 16', daily * 16, nat(daily), 'annualized', [daily]) }
  /** HISTORICAL BAND: the full width of a k-sigma band. value 2 · sigma · k. */
  static historicalband(sigma: number, k: number): CrossFormula { return c('volatility-historicalband', 'historicalband(sigma, k) = 2 · sigma · k', 2 * sigma * k, nat(sigma, k), 'historicalband', [sigma, k]) }
  /** BETA against the market, in hundredths. value ⌊cov · 100 / mvar⌋. */
  static beta(cov: number, mvar: number): CrossFormula { return c('volatility-beta', 'beta(cov, mvar) = ⌊cov · 100 / mvar⌋', mvar > 0 ? Math.floor((cov * 100) / mvar) : 0, nat(cov, mvar) && mvar > 0, 'beta', [cov, mvar]) }
  /** VARIANCE: mean of the squared deviations. value ⌊sumsq / n⌋. */
  static variance(sumsq: number, n: number): CrossFormula { return c('volatility-variance', 'variance(sumsq, n) = ⌊sumsq / n⌋', n > 0 ? Math.floor(sumsq / n) : 0, nat(sumsq, n) && n > 0, 'variance', [sumsq, n]) }
  /** IMPLIED MOVE: the move an option prices in, from implied vol in percent. value ⌊price · iv / 100⌋. */
  static impliedmove(price: number, iv: number): CrossFormula { return c('volatility-impliedmove', 'impliedmove(price, iv) = ⌊price · iv / 100⌋', Math.floor((price * iv) / 100), nat(price, iv), 'impliedmove', [price, iv]) }
  /** Z-SCORE: deviation from the mean in sigmas. value ⌊max(0, x − mean) / sigma⌋. */
  static zscore(x: number, mean: number, sigma: number): CrossFormula { return c('volatility-zscore', 'zscore(x, mean, sigma) = ⌊max(0, x − mean) / sigma⌋', sigma > 0 ? Math.floor(Math.max(0, x - mean) / sigma) : 0, nat(x, mean, sigma) && sigma > 0, 'zscore', [x, mean, sigma]) }
  /** DRAWDOWN: the fall from peak to trough, as a percentage. value ⌊max(0, peak − trough) · 100 / peak⌋. */
  static drawdown(peak: number, trough: number): CrossFormula { return c('volatility-drawdown', 'drawdown(peak, trough) = ⌊max(0, peak − trough) · 100 / peak⌋', peak > 0 ? Math.floor((Math.max(0, peak - trough) * 100) / peak) : 0, nat(peak, trough) && peak > 0, 'drawdown', [peak, trough]) }
  static range2(hi: number, lo: number): CrossFormula { return c('volatility-range2', 'range(hi, lo) = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'range2', [hi, lo]) }
  static drawdown2(peak: number, trough: number): CrossFormula { return c('volatility-drawdown2', 'drawdown(peak, trough) = max(0, peak − trough)', Math.max(0, peak - trough), nat(peak, trough), 'drawdown2', [peak, trough]) }
  static valueatrisk(loss: number, confidence: number): CrossFormula { return c('volatility-valueatrisk', 'valueatrisk(loss, confidence) = ⌊loss·confidence/100⌋', Math.floor((loss * confidence) / 100), nat(loss, confidence), 'valueatrisk', [loss, confidence]) }
  static sumsquares(a: number, b: number): CrossFormula { return c('volatility-sumsquares', 'sumsquares(a, b) = a² + b²', a * a + b * b, nat(a, b), 'sumsquares', [a, b]) }
  static meandeviation(total: number, k: number): CrossFormula { return c('volatility-meandeviation', 'meandeviation(total, n) = ⌊total/n⌋', k > 0 ? Math.floor(total / k) : 0, nat(total, k) && k > 0, 'meandeviation', [total, k]) }
  static excessreturn(ret: number, riskfree: number): CrossFormula { return c('volatility-excessreturn', 'excessreturn(ret, riskfree) = max(0, ret − riskfree)', Math.max(0, ret - riskfree), nat(ret, riskfree), 'excessreturn', [ret, riskfree]) }
  static beta2(cov: number, mktvar: number): CrossFormula { return c('volatility-beta2', 'beta(cov, mktvar) = ⌊cov/mktvar⌋', mktvar > 0 ? Math.floor(cov / mktvar) : 0, nat(cov, mktvar) && mktvar > 0, 'beta2', [cov, mktvar]) }
}

for (const name of ['annualized', 'beta', 'beta2', 'drawdown', 'drawdown2', 'excessreturn', 'historicalband', 'impliedmove', 'meandeviation', 'range', 'range2', 'sumsquares', 'valueatrisk', 'variance', 'zscore'] as const)
  hexRegisterOf('volatility', name, (VolatilityFormulas[name] as (...x: unknown[]) => unknown).bind(VolatilityFormulas))
