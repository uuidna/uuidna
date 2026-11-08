import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SWAPS — AN INTEREST-RATE SWAP AS ARITHMETIC. A swap is numbers: the fixed leg at a coupon rate, the floating leg at an
 *  index plus a spread, the net payment between them, the notional it all rides on, the implied swap rate, the bid/ask
 *  spread in basis points, the present value of a future cashflow, and the interest accrued over days. Crosses to
 *  `trading` — a swap is what a desk trades. A measure. */

const PROOF = 'swaps arithmetic (fixed leg, floating leg, net payment, notional value, swap rate, spread basis, present value, accrued interest); an interest-rate swap as a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'swaps', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `swaps.${name}`, params })

export class SwapsFormulas {
  /** FIXED LEG: notional at a coupon rate in basis points. value ⌊notional · rate / 10000⌋. */
  static fixedleg(notional: number, rate: number): CrossFormula { return c('swaps-fixedleg', 'fixedleg(notional, rate) = ⌊notional · rate / 10000⌋', Math.floor((notional * rate) / 10000), nat(notional, rate), 'fixedleg', [notional, rate]) }
  /** FLOATING LEG: notional at an index plus a spread, both in basis points. value ⌊notional · (index + spread) / 10000⌋. */
  static floatingleg(notional: number, index: number, spread: number): CrossFormula { return c('swaps-floatingleg', 'floatingleg(notional, index, spread) = ⌊notional · (index + spread) / 10000⌋', Math.floor((notional * (index + spread)) / 10000), nat(notional, index, spread), 'floatingleg', [notional, index, spread]) }
  /** NET PAYMENT: what the fixed payer owes over the floating leg, never negative. value max(0, fixed − floating). */
  static netpayment(fixed: number, floating: number): CrossFormula { return c('swaps-netpayment', 'netpayment(fixed, floating) = max(0, fixed − floating)', Math.max(0, fixed - floating), nat(fixed, floating), 'netpayment', [fixed, floating]) }
  /** NOTIONAL VALUE: units at a price each. value units · price. */
  static notionalvalue(units: number, price: number): CrossFormula { return c('swaps-notionalvalue', 'notionalvalue(units, price) = units · price', units * price, nat(units, price), 'notionalvalue', [units, price]) }
  /** SWAP RATE: the coupon in basis points implied by a fixed total on a notional. value ⌊fixed · 10000 / notional⌋. */
  static swaprate(fixed: number, notional: number): CrossFormula { return c('swaps-swaprate', 'swaprate(fixed, notional) = ⌊fixed · 10000 / notional⌋', notional > 0 ? Math.floor((fixed * 10000) / notional) : 0, nat(fixed, notional) && notional > 0, 'swaprate', [fixed, notional]) }
  /** SPREAD BASIS: the bid/ask gap in basis points, never negative. value max(0, ask − bid). */
  static spreadbasis(bid: number, ask: number): CrossFormula { return c('swaps-spreadbasis', 'spreadbasis(bid, ask) = max(0, ask − bid)', Math.max(0, ask - bid), nat(bid, ask), 'spreadbasis', [bid, ask]) }
  /** PRESENT VALUE: a future cashflow discounted at a rate in basis points. value ⌊future · 10000 / (10000 + discount)⌋. */
  static presentvalue(future: number, discount: number): CrossFormula { return c('swaps-presentvalue', 'presentvalue(future, discount) = ⌊future · 10000 / (10000 + discount)⌋', Math.floor((future * 10000) / (10000 + discount)), nat(future, discount), 'presentvalue', [future, discount]) }
  /** ACCRUED INTEREST: principal at a rate in basis points over days on a 365-day year. value ⌊principal · rate · days / 3650000⌋. */
  static accruedinterest(principal: number, rate: number, days: number): CrossFormula { return c('swaps-accruedinterest', 'accruedinterest(principal, rate, days) = ⌊principal · rate · days / 3650000⌋', Math.floor((principal * rate * days) / 3650000), nat(principal, rate, days), 'accruedinterest', [principal, rate, days]) }
}

for (const name of ['accruedinterest', 'fixedleg', 'floatingleg', 'netpayment', 'notionalvalue', 'presentvalue', 'spreadbasis', 'swaprate'] as const)
  hexRegisterOf('swaps', name, (SwapsFormulas[name] as (...x: unknown[]) => unknown).bind(SwapsFormulas))
