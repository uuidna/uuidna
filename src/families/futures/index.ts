import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FUTURES — THE DERIVATIVES DOMAIN, AS ARITHMETIC. Trading a futures contract is numbers: the forward price under
 *  cost-of-carry, the basis against spot, the margin a position requires, the value of one contract, the roll yield
 *  between near and far, the notional at risk, the maintenance floor, and the daily settlement. Crosses to `trading` —
 *  futures are what trading clears and marks. A measure. */

const PROOF = 'futures arithmetic (forward price, basis, margin requirement, contract value, roll yield, notional, maintenance margin, settlement); the derivatives domain as integer formulas; a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'futures', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `futures.${name}`, params })

export class FuturesFormulas {
  /** FORWARD PRICE under cost-of-carry: spot carried at a rate over time. value ⌊spot · (100 + rate · time) / 100⌋. */
  static forwardprice(spot: number, rate: number, time: number): CrossFormula { return c('futures-forwardprice', 'forwardprice(spot, rate, time) = ⌊spot · (100 + rate · time) / 100⌋', Math.floor((spot * (100 + rate * time)) / 100), nat(spot, rate, time), 'forwardprice', [spot, rate, time]) }
  /** BASIS: the future over spot, floored at zero. value max(0, future − spot). */
  static basis(future: number, spot: number): CrossFormula { return c('futures-basis', 'basis(future, spot) = max(0, future − spot)', Math.max(0, future - spot), nat(future, spot), 'basis', [future, spot]) }
  /** MARGIN REQUIREMENT: a rate of the contract value. value ⌊value · rate / 100⌋. */
  static marginrequirement(value: number, rate: number): CrossFormula { return c('futures-marginrequirement', 'marginrequirement(value, rate) = ⌊value · rate / 100⌋', Math.floor((value * rate) / 100), nat(value, rate), 'marginrequirement', [value, rate]) }
  /** CONTRACT VALUE: the price times the contract size. value price · size. */
  static contractvalue(price: number, size: number): CrossFormula { return c('futures-contractvalue', 'contractvalue(price, size) = price · size', price * size, nat(price, size), 'contractvalue', [price, size]) }
  /** ROLL YIELD: the near over far as a percentage, floored at zero. value ⌊max(0, near − far) · 100 / far⌋. */
  static rollyield(near: number, far: number): CrossFormula { return c('futures-rollyield', 'rollyield(near, far) = ⌊max(0, near − far) · 100 / far⌋', far > 0 ? Math.floor((Math.max(0, near - far) * 100) / far) : 0, nat(near, far) && far > 0, 'rollyield', [near, far]) }
  /** NOTIONAL: the price, the contract size, and the number of contracts. value price · size · count. */
  static notional(price: number, size: number, count: number): CrossFormula { return c('futures-notional', 'notional(price, size, count) = price · size · count', price * size * count, nat(price, size, count), 'notional', [price, size, count]) }
  /** MAINTENANCE MARGIN: a rate of the initial margin. value ⌊initial · rate / 100⌋. */
  static maintenancemargin(initial: number, rate: number): CrossFormula { return c('futures-maintenancemargin', 'maintenancemargin(initial, rate) = ⌊initial · rate / 100⌋', Math.floor((initial * rate) / 100), nat(initial, rate), 'maintenancemargin', [initial, rate]) }
  /** SETTLEMENT PRICE: the mean of the day's high, low, and close. value ⌊(high + low + close) / 3⌋. */
  static settlementprice(high: number, low: number, close: number): CrossFormula { return c('futures-settlementprice', 'settlementprice(high, low, close) = ⌊(high + low + close) / 3⌋', Math.floor((high + low + close) / 3), nat(high, low, close), 'settlementprice', [high, low, close]) }
}

for (const name of ['basis', 'contractvalue', 'forwardprice', 'maintenancemargin', 'marginrequirement', 'notional', 'rollyield', 'settlementprice'] as const)
  hexRegisterOf('futures', name, (FuturesFormulas[name] as (...x: unknown[]) => unknown).bind(FuturesFormulas))
