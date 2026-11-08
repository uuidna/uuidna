import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ARBITRAGE — RISKLESS PRICE GAPS, AS ARITHMETIC. Trading is numbers: the bid-ask spread, net profit after fees, the
 *  rate implied across three markets, the percentage gap between venues, return on principal, the cost of a transaction
 *  in basis points, the units to break even, and the edge left after every cost. Crosses to `trading` — arbitrage is a
 *  trade with no exposure. A measure. */

const PROOF = 'arbitrage arithmetic (bid-ask spread, net profit, triangular rate, price difference, return rate, transaction cost, breakeven, edge); riskless price gaps as a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'arbitrage', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `arbitrage.${name}`, params })

export class ArbitrageFormulas {
  /** THE SPREAD: ask over bid. value max(0, ask − bid). */
  static spread(ask: number, bid: number): CrossFormula { return c('arbitrage-spread', 'spread(ask, bid) = max(0, ask − bid)', Math.max(0, ask - bid), nat(ask, bid), 'spread', [ask, bid]) }
  /** NET PROFIT: gross less fees. value max(0, gross − fees). */
  static netprofit(gross: number, fees: number): CrossFormula { return c('arbitrage-netprofit', 'netprofit(gross, fees) = max(0, gross − fees)', Math.max(0, gross - fees), nat(gross, fees), 'netprofit', [gross, fees]) }
  /** TRIANGULAR RATE: two legs scaled back. value ⌊rate1 · rate2 / scale⌋. */
  static triangularrate(rate1: number, rate2: number, scale: number): CrossFormula { return c('arbitrage-triangularrate', 'triangularrate(rate1, rate2, scale) = ⌊rate1 · rate2 / scale⌋', scale > 0 ? Math.floor((rate1 * rate2) / scale) : 0, nat(rate1, rate2, scale) && scale > 0, 'triangularrate', [rate1, rate2, scale]) }
  /** PRICE DIFFERENCE as a percentage of the low. value ⌊max(0, high − low) · 100 / low⌋. */
  static pricedifference(high: number, low: number): CrossFormula { return c('arbitrage-pricedifference', 'pricedifference(high, low) = ⌊max(0, high − low) · 100 / low⌋', low > 0 ? Math.floor((Math.max(0, high - low) * 100) / low) : 0, nat(high, low) && low > 0, 'pricedifference', [high, low]) }
  /** RETURN RATE: profit on principal, as a percentage. value ⌊profit · 100 / principal⌋. */
  static returnrate(profit: number, principal: number): CrossFormula { return c('arbitrage-returnrate', 'returnrate(profit, principal) = ⌊profit · 100 / principal⌋', principal > 0 ? Math.floor((profit * 100) / principal) : 0, nat(profit, principal) && principal > 0, 'returnrate', [profit, principal]) }
  /** TRANSACTION COST: amount at a rate in basis points. value ⌊amount · bps / 10000⌋. */
  static transactioncost(amount: number, bps: number): CrossFormula { return c('arbitrage-transactioncost', 'transactioncost(amount, bps) = ⌊amount · bps / 10000⌋', Math.floor((amount * bps) / 10000), nat(amount, bps), 'transactioncost', [amount, bps]) }
  /** BREAKEVEN: the units to cover a fixed cost at a per-unit margin. value ⌈fixed / margin⌉. */
  static breakeven(fixed: number, margin: number): CrossFormula { return c('arbitrage-breakeven', 'breakeven(fixed, margin) = ⌈fixed / margin⌉', margin > 0 ? Math.ceil(fixed / margin) : 0, nat(fixed, margin) && margin > 0, 'breakeven', [fixed, margin]) }
  /** THE EDGE: gross less cost less fees. value max(0, gross − cost − fees). */
  static edge(gross: number, cost: number, fees: number): CrossFormula { return c('arbitrage-edge', 'edge(gross, cost, fees) = max(0, gross − cost − fees)', Math.max(0, gross - cost - fees), nat(gross, cost, fees), 'edge', [gross, cost, fees]) }
}

for (const name of ['breakeven', 'edge', 'netprofit', 'pricedifference', 'returnrate', 'spread', 'transactioncost', 'triangularrate'] as const)
  hexRegisterOf('arbitrage', name, (ArbitrageFormulas[name] as (...x: unknown[]) => unknown).bind(ArbitrageFormulas))
