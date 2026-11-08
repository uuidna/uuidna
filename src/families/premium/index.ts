import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PREMIUM — INSURANCE PRICING, AS ARITHMETIC (chosen by the actuarial registry, not by hand). Pricing a policy is
 *  numbers: the gross premium with its loading, the net after commission, the rate per unit of exposure, the pure
 *  premium of expected losses, the expense load, underwriting profit, the installment due, and the premium earned so
 *  far. Crosses to `econ` — a premium is a price. A measure. */

const PROOF = 'premium arithmetic (gross with loading, net of commission, rate per exposure, pure premium, expense load, underwriting profit, installment, earned pro-rata); insurance pricing; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'premium', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `premium.${name}`, params })

export class PremiumFormulas {
  /** GROSS PREMIUM: a base with a loading percentage added. value base + ⌊base · load / 100⌋. */
  static gross(base: number, load: number): CrossFormula { return c('premium-gross', 'gross(base, load) = base + ⌊base · load / 100⌋', base + Math.floor((base * load) / 100), nat(base, load), 'gross', [base, load]) }
  /** NET PREMIUM: the gross less a commission percentage. value max(0, gross − ⌊gross · commission / 100⌋). */
  static net(gross: number, commission: number): CrossFormula { return c('premium-net', 'net(gross, commission) = max(0, gross − ⌊gross · commission / 100⌋)', Math.max(0, gross - Math.floor((gross * commission) / 100)), nat(gross, commission) && commission <= 100, 'net', [gross, commission]) }
  /** RATE: premium per unit of exposure. value ⌊premium / exposure⌋. */
  static rate(premium: number, exposure: number): CrossFormula { return c('premium-rate', 'rate(premium, exposure) = ⌊premium / exposure⌋', exposure > 0 ? Math.floor(premium / exposure) : 0, nat(premium, exposure) && exposure > 0, 'rate', [premium, exposure]) }
  /** PURE PREMIUM: expected losses over exposures. value ⌊losses / exposures⌋. */
  static pure(losses: number, exposures: number): CrossFormula { return c('premium-pure', 'pure(losses, exposures) = ⌊losses / exposures⌋', exposures > 0 ? Math.floor(losses / exposures) : 0, nat(losses, exposures) && exposures > 0, 'pure', [losses, exposures]) }
  /** EXPENSE LOAD: a ratio of the premium. value ⌊premium · ratio / 100⌋. */
  static expense(premium: number, ratio: number): CrossFormula { return c('premium-expense', 'expense(premium, ratio) = ⌊premium · ratio / 100⌋', Math.floor((premium * ratio) / 100), nat(premium, ratio), 'expense', [premium, ratio]) }
  /** UNDERWRITING PROFIT: premium less losses and expenses. value max(0, premium − losses − expenses). */
  static profit(premium: number, losses: number, expenses: number): CrossFormula { return c('premium-profit', 'profit(premium, losses, expenses) = max(0, premium − losses − expenses)', Math.max(0, premium - losses - expenses), nat(premium, losses, expenses), 'profit', [premium, losses, expenses]) }
  /** INSTALLMENT: the total split over equal periods, rounded up. value ⌈total / periods⌉. */
  static installment(total: number, periods: number): CrossFormula { return c('premium-installment', 'installment(total, periods) = ⌈total / periods⌉', periods > 0 ? Math.ceil(total / periods) : 0, nat(total, periods) && periods > 0, 'installment', [total, periods]) }
  /** EARNED PREMIUM: the pro-rata share earned over the term. value ⌊premium · elapsed / term⌋. */
  static earned(premium: number, elapsed: number, term: number): CrossFormula { return c('premium-earned', 'earned(premium, elapsed, term) = ⌊premium · elapsed / term⌋', term > 0 ? Math.floor((premium * elapsed) / term) : 0, nat(premium, elapsed, term) && term > 0 && elapsed <= term, 'earned', [premium, elapsed, term]) }
}

for (const name of ['earned', 'expense', 'gross', 'installment', 'net', 'profit', 'pure', 'rate'] as const)
  hexRegisterOf('premium', name, (PremiumFormulas[name] as (...x: unknown[]) => unknown).bind(PremiumFormulas))
