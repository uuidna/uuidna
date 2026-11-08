import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AMORTIZATION — A LOAN (OR AN INTANGIBLE) SPREAD OVER TIME, AS ARITHMETIC. Paying a principal down is numbers: the level
 *  payment, the split of a payment into principal and interest, the balance left, the months to payoff, the total paid, the
 *  effect of paying extra, and the straight-line write-down of an intangible asset. Crosses to `accounting` — amortization is
 *  what the ledger records. A measure. */

const PROOF = 'amortization arithmetic (level payment, principal/interest split, remaining balance, payoff months, total cost, extra payment, intangible write-down); a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'amortization', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `amortization.${name}`, params })

export class AmortizationFormulas {
  /** LEVEL PAYMENT: a principal split evenly over the term (interest aside). value ⌊principal / months⌋. */
  static schedulepayment(principal: number, months: number): CrossFormula { return c('amortization-schedulepayment', 'schedulepayment(principal, months) = ⌊principal / months⌋', months > 0 ? Math.floor(principal / months) : 0, nat(principal, months) && months > 0, 'schedulepayment', [principal, months]) }
  /** PRINCIPAL PORTION: the part of a payment that is not interest. value max(0, payment − interest). */
  static principalportion(payment: number, interest: number): CrossFormula { return c('amortization-principalportion', 'principalportion(payment, interest) = max(0, payment − interest)', Math.max(0, payment - interest), nat(payment, interest), 'principalportion', [payment, interest]) }
  /** INTEREST PORTION: a month's interest on the balance at an annual percent. value ⌊balance · rate / 1200⌋. */
  static interestportion(balance: number, rate: number): CrossFormula { return c('amortization-interestportion', 'interestportion(balance, rate) = ⌊balance · rate / 1200⌋', Math.floor((balance * rate) / 1200), nat(balance, rate), 'interestportion', [balance, rate]) }
  /** REMAINING BALANCE: the principal still owed after what is paid. value max(0, principal − paid). */
  static remainingbalance(principal: number, paid: number): CrossFormula { return c('amortization-remainingbalance', 'remainingbalance(principal, paid) = max(0, principal − paid)', Math.max(0, principal - paid), nat(principal, paid), 'remainingbalance', [principal, paid]) }
  /** PAYOFF MONTHS: the months to clear a balance at a payment (interest aside). value ⌈balance / payment⌉. */
  static payoffmonths(balance: number, payment: number): CrossFormula { return c('amortization-payoffmonths', 'payoffmonths(balance, payment) = ⌈balance / payment⌉', payment > 0 ? Math.ceil(balance / payment) : 0, nat(balance, payment) && payment > 0, 'payoffmonths', [balance, payment]) }
  /** TOTAL COST: every payment over the term. value payment · months. */
  static totalcost(payment: number, months: number): CrossFormula { return c('amortization-totalcost', 'totalcost(payment, months) = payment · months', payment * months, nat(payment, months), 'totalcost', [payment, months]) }
  /** EXTRA PAYMENT: the months to clear a balance once an extra amount is added each month. value ⌈balance / (payment + extra)⌉. */
  static extrapayment(balance: number, payment: number, extra: number): CrossFormula { return c('amortization-extrapayment', 'extrapayment(balance, payment, extra) = ⌈balance / (payment + extra)⌉', (payment + extra) > 0 ? Math.ceil(balance / (payment + extra)) : 0, nat(balance, payment, extra) && (payment + extra) > 0, 'extrapayment', [balance, payment, extra]) }
  /** INTANGIBLE: a straight-line write-down of an intangible asset over its life. value ⌊cost / life⌋. */
  static intangible(cost: number, life: number): CrossFormula { return c('amortization-intangible', 'intangible(cost, life) = ⌊cost / life⌋', life > 0 ? Math.floor(cost / life) : 0, nat(cost, life) && life > 0, 'intangible', [cost, life]) }
}

for (const name of ['extrapayment', 'intangible', 'interestportion', 'payoffmonths', 'principalportion', 'remainingbalance', 'schedulepayment', 'totalcost'] as const)
  hexRegisterOf('amortization', name, (AmortizationFormulas[name] as (...x: unknown[]) => unknown).bind(AmortizationFormulas))
