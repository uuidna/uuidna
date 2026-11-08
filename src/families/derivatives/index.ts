import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DERIVATIVES — FINANCIAL CONTRACTS, AS ARITHMETIC. A derivative is numbers: the intrinsic value of a call, the leverage a
 *  margin buys, the delta against the spot, the premium paid, the payoff at settlement, the breakeven, moneyness, and the
 *  margin a notional requires. Crosses to `trading` — derivatives are what trading moves. A measure. */

const PROOF = 'derivatives arithmetic (intrinsic, leverage, delta, premium, payoff, breakeven, moneyness, margin); a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'derivatives', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `derivatives.${name}`, params })

export class DerivativesFormulas {
  /** INTRINSIC: the value of a call at expiry. value max(0, spot − strike). */
  static intrinsic(spot: number, strike: number): CrossFormula { return c('derivatives-intrinsic', 'intrinsic(spot, strike) = max(0, spot − strike)', Math.max(0, spot - strike), nat(spot, strike), 'intrinsic', [spot, strike]) }
  /** LEVERAGE: the notional a margin controls. value ⌊notional / margin⌋. */
  static leverage(notional: number, margin: number): CrossFormula { return c('derivatives-leverage', 'leverage(notional, margin) = ⌊notional / margin⌋', margin > 0 ? Math.floor(notional / margin) : 0, nat(notional, margin) && margin > 0, 'leverage', [notional, margin]) }
  /** DELTA: option change per unit spot change, ×100. value ⌊optionchange · 100 / spotchange⌋. */
  static delta(optionchange: number, spotchange: number): CrossFormula { return c('derivatives-delta', 'delta(optionchange, spotchange) = ⌊optionchange · 100 / spotchange⌋', spotchange > 0 ? Math.floor((optionchange * 100) / spotchange) : 0, nat(optionchange, spotchange) && spotchange > 0, 'delta', [optionchange, spotchange]) }
  /** PREMIUM: intrinsic value plus time value. value intrinsic + time. */
  static premium(intrinsic_: number, time: number): CrossFormula { return c('derivatives-premium', 'premium(intrinsic_, time) = intrinsic_ + time', intrinsic_ + time, nat(intrinsic_, time), 'premium', [intrinsic_, time]) }
  /** PAYOFF: the value at settlement. value max(0, settlement − strike). */
  static payoff(settlement: number, strike: number): CrossFormula { return c('derivatives-payoff', 'payoff(settlement, strike) = max(0, settlement − strike)', Math.max(0, settlement - strike), nat(settlement, strike), 'payoff', [settlement, strike]) }
  /** BREAKEVEN: strike plus the premium paid. value strike + premium. */
  static breakeven(strike: number, premium: number): CrossFormula { return c('derivatives-breakeven', 'breakeven(strike, premium) = strike + premium', strike + premium, nat(strike, premium), 'breakeven', [strike, premium]) }
  /** MONEYNESS: spot over strike, ×100. value ⌊spot · 100 / strike⌋. */
  static moneyness(spot: number, strike: number): CrossFormula { return c('derivatives-moneyness', 'moneyness(spot, strike) = ⌊spot · 100 / strike⌋', strike > 0 ? Math.floor((spot * 100) / strike) : 0, nat(spot, strike) && strike > 0, 'moneyness', [spot, strike]) }
  /** MARGIN: the margin a notional requires at a rate (percent). value ⌊notional · rate / 100⌋. */
  static margin(notional: number, rate: number): CrossFormula { return c('derivatives-margin', 'margin(notional, rate) = ⌊notional · rate / 100⌋', Math.floor((notional * rate) / 100), nat(notional, rate), 'margin', [notional, rate]) }
}

for (const name of ['breakeven', 'delta', 'intrinsic', 'leverage', 'margin', 'moneyness', 'payoff', 'premium'] as const)
  hexRegisterOf('derivatives', name, (DerivativesFormulas[name] as (...x: unknown[]) => unknown).bind(DerivativesFormulas))
