import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DERIVATIVE — OPTIONS AND FUTURES, AS ARITHMETIC (chosen by the public-API registry, not by hand). A contract on a price is
 *  numbers: the intrinsic value of a call, the payoff across contracts, the notional it controls, the margin it posts, the
 *  leverage it carries, the breakeven of the position, whether it is in the money, and what it settles to. Crosses to `econ` —
 *  a derivative is a price of a price. A measure. */

const PROOF = 'derivative arithmetic (intrinsic, payoff, notional, margin, leverage, breakeven, moneyness, settlement); the registry\'s options/futures domain; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'derivative', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `derivative.${name}`, params })

export class DerivativeFormulas {
  /** INTRINSIC VALUE of a call: how far it is in the money. value max(0, spot − strike). */
  static intrinsic(spot: number, strike: number): CrossFormula { return c('derivative-intrinsic', 'intrinsic(spot, strike) = max(0, spot − strike)', Math.max(0, spot - strike), nat(spot, strike), 'intrinsic', [spot, strike]) }
  /** PAYOFF across contracts at an intrinsic value each. value contracts · intrinsic. */
  static payoff(contracts: number, intrinsic: number): CrossFormula { return c('derivative-payoff', 'payoff(contracts, intrinsic) = contracts · intrinsic', contracts * intrinsic, nat(contracts, intrinsic), 'payoff', [contracts, intrinsic]) }
  /** NOTIONAL controlled: contracts at a multiplier and a price. value contracts · multiplier · price. */
  static notional(contracts: number, multiplier: number, price: number): CrossFormula { return c('derivative-notional', 'notional(contracts, multiplier, price) = contracts · multiplier · price', contracts * multiplier * price, nat(contracts, multiplier, price), 'notional', [contracts, multiplier, price]) }
  /** MARGIN posted: a percent of the notional. value ⌊notional · pct / 100⌋. */
  static margin(notional: number, pct: number): CrossFormula { return c('derivative-margin', 'margin(notional, pct) = ⌊notional · pct / 100⌋', Math.floor((notional * pct) / 100), nat(notional, pct) && pct <= 100, 'margin', [notional, pct]) }
  /** LEVERAGE: the notional over the equity backing it. value ⌊notional / equity⌋. */
  static leverage(notional: number, equity: number): CrossFormula { return c('derivative-leverage', 'leverage(notional, equity) = ⌊notional / equity⌋', equity > 0 ? Math.floor(notional / equity) : 0, nat(notional, equity) && equity > 0, 'leverage', [notional, equity]) }
  /** BREAKEVEN of a long call: strike plus premium paid. value strike + premium. */
  static breakeven(strike: number, premium: number): CrossFormula { return c('derivative-breakeven', 'breakeven(strike, premium) = strike + premium', strike + premium, nat(strike, premium), 'breakeven', [strike, premium]) }
  /** MONEYNESS: 1 when the spot is at or above the strike. value [spot ≥ strike]. */
  static moneyness(spot: number, strike: number): CrossFormula { return c('derivative-moneyness', 'moneyness(spot, strike) = [spot ≥ strike]', spot >= strike ? 1 : 0, nat(spot, strike), 'moneyness', [spot, strike]) }
  /** SETTLEMENT of a long future: the gain over the entry across contracts. value max(0, futures − spot) · contracts. */
  static settlement(futures: number, spot: number, contracts: number): CrossFormula { return c('derivative-settlement', 'settlement(futures, spot, contracts) = max(0, futures − spot) · contracts', Math.max(0, futures - spot) * contracts, nat(futures, spot, contracts), 'settlement', [futures, spot, contracts]) }
}

for (const name of ['breakeven', 'intrinsic', 'leverage', 'margin', 'moneyness', 'notional', 'payoff', 'settlement'] as const)
  hexRegisterOf('derivative', name, (DerivativeFormulas[name] as (...x: unknown[]) => unknown).bind(DerivativeFormulas))
