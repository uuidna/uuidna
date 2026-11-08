import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANNUITY — A STREAM OF LEVEL PAYMENTS, AS ARITHMETIC (chosen by the public-API registry, not by hand). A loan or a savings
 *  plan is numbers: what the payments grow to, what they are worth now, the level payment, the total paid, the interest and
 *  principal in a payment, how many periods remain, and the balance still owed. Crosses to `accounting` — an annuity is what
 *  the ledger records. A measure. */

const PROOF = 'annuity arithmetic (future value, present value, level payment, total paid, interest portion, principal portion, periods, balance); a payment stream the ledger records; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'annuity', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `annuity.${name}`, params })

export class AnnuityFormulas {
  /** FUTURE VALUE: level payments summed over the term (an ordinary-annuity proxy). value payment · periods. */
  static futurevalue(payment: number, periods: number): CrossFormula { return c('annuity-futurevalue', 'futurevalue(payment, periods) = payment · periods', payment * periods, nat(payment, periods), 'futurevalue', [payment, periods]) }
  /** PRESENT VALUE: the payment stream less a simple discount at a percent rate. value payment · periods − ⌊payment · periods · rate / 100⌋. */
  static presentvalue(payment: number, periods: number, rate: number): CrossFormula { return c('annuity-presentvalue', 'presentvalue(payment, periods, rate) = payment · periods − ⌊payment · periods · rate / 100⌋', Math.max(0, payment * periods - Math.floor((payment * periods * rate) / 100)), nat(payment, periods, rate) && rate <= 100, 'presentvalue', [payment, periods, rate]) }
  /** LEVEL PAYMENT: a principal spread evenly over the periods. value ⌊principal / periods⌋. */
  static payment(principal: number, periods: number): CrossFormula { return c('annuity-payment', 'payment(principal, periods) = ⌊principal / periods⌋', periods > 0 ? Math.floor(principal / periods) : 0, nat(principal, periods) && periods > 0, 'payment', [principal, periods]) }
  /** TOTAL PAID: every payment over the term. value payment · periods. */
  static totalpaid(payment: number, periods: number): CrossFormula { return c('annuity-totalpaid', 'totalpaid(payment, periods) = payment · periods', payment * periods, nat(payment, periods), 'totalpaid', [payment, periods]) }
  /** INTEREST PORTION: the interest on the outstanding balance at a percent rate. value ⌊balance · rate / 100⌋. */
  static interestportion(balance: number, rate: number): CrossFormula { return c('annuity-interestportion', 'interestportion(balance, rate) = ⌊balance · rate / 100⌋', Math.floor((balance * rate) / 100), nat(balance, rate) && rate <= 100, 'interestportion', [balance, rate]) }
  /** PRINCIPAL PORTION: the part of a payment that reduces the balance. value max(0, payment − interest). */
  static principalportion(payment: number, interest: number): CrossFormula { return c('annuity-principalportion', 'principalportion(payment, interest) = max(0, payment − interest)', Math.max(0, payment - interest), nat(payment, interest), 'principalportion', [payment, interest]) }
  /** PERIODS: how many level payments clear a total. value ⌊total / payment⌋. */
  static periods(total: number, payment: number): CrossFormula { return c('annuity-periods', 'periods(total, payment) = ⌊total / payment⌋', payment > 0 ? Math.floor(total / payment) : 0, nat(total, payment) && payment > 0, 'periods', [total, payment]) }
  /** BALANCE: the principal still owed after what has been paid down. value max(0, principal − paid). */
  static balance(principal: number, paid: number): CrossFormula { return c('annuity-balance', 'balance(principal, paid) = max(0, principal − paid)', Math.max(0, principal - paid), nat(principal, paid), 'balance', [principal, paid]) }
}

for (const name of ['balance', 'futurevalue', 'interestportion', 'payment', 'periods', 'presentvalue', 'principalportion', 'totalpaid'] as const)
  hexRegisterOf('annuity', name, (AnnuityFormulas[name] as (...x: unknown[]) => unknown).bind(AnnuityFormulas))
