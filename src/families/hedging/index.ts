import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HEDGING — RISK OFFSET AS ARITHMETIC. A hedge is numbers: the ratio of a position that is covered, the net delta after a
 *  hedge, the exposure a position carries, how much is covered, the basis between spot and future, the notional of the
 *  contracts, what two sides offset, and the risk that is left. Crosses to `trading` — hedging is what trading offsets. A measure. */

const PROOF = 'hedging arithmetic (hedge ratio, net delta, exposure, coverage, spot-future basis, notional, offset, residual risk); risk offset crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hedging', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `hedging.${name}`, params })

export class HedgingFormulas {
  /** HEDGE RATIO: the percentage of a position that is covered. value ⌊hedged · 100 / total⌋. */
  static ratio(hedged: number, total: number): CrossFormula { return c('hedging-ratio', 'ratio(hedged, total) = ⌊hedged · 100 / total⌋', total > 0 ? Math.floor((hedged * 100) / total) : 0, nat(hedged, total) && total > 0 && hedged <= total, 'ratio', [hedged, total]) }
  /** NET DELTA: a position less its hedge. value max(0, position − hedge). */
  static delta(position: number, hedge: number): CrossFormula { return c('hedging-delta', 'delta(position, hedge) = max(0, position − hedge)', Math.max(0, position - hedge), nat(position, hedge), 'delta', [position, hedge]) }
  /** EXPOSURE: quantity at a price. value qty · price. */
  static exposure(qty: number, price: number): CrossFormula { return c('hedging-exposure', 'exposure(qty, price) = qty · price', qty * price, nat(qty, price), 'exposure', [qty, price]) }
  /** COVERAGE: the percentage of total that is covered. value ⌊covered · 100 / total⌋. */
  static coverage(covered: number, total: number): CrossFormula { return c('hedging-coverage', 'coverage(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'coverage', [covered, total]) }
  /** BASIS: spot less future. value max(0, spot − future). */
  static basis(spot: number, future: number): CrossFormula { return c('hedging-basis', 'basis(spot, future) = max(0, spot − future)', Math.max(0, spot - future), nat(spot, future), 'basis', [spot, future]) }
  /** NOTIONAL: contracts at a size each. value contracts · size. */
  static notional(contracts: number, size: number): CrossFormula { return c('hedging-notional', 'notional(contracts, size) = contracts · size', contracts * size, nat(contracts, size), 'notional', [contracts, size]) }
  /** OFFSET: longs less shorts. value max(0, longs − shorts). */
  static offset(longs: number, shorts: number): CrossFormula { return c('hedging-offset', 'offset(longs, shorts) = max(0, longs − shorts)', Math.max(0, longs - shorts), nat(longs, shorts), 'offset', [longs, shorts]) }
  /** RESIDUAL RISK: exposure less what is hedged. value max(0, exposure − hedged). */
  static residual(exposure: number, hedged: number): CrossFormula { return c('hedging-residual', 'residual(exposure, hedged) = max(0, exposure − hedged)', Math.max(0, exposure - hedged), nat(exposure, hedged), 'residual', [exposure, hedged]) }
}

for (const name of ['basis', 'coverage', 'delta', 'exposure', 'notional', 'offset', 'ratio', 'residual'] as const)
  hexRegisterOf('hedging', name, (HedgingFormulas[name] as (...x: unknown[]) => unknown).bind(HedgingFormulas))
