import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MORTGAGE — HOME LENDING AS ARITHMETIC. A loan on a house is numbers: loan-to-value, debt-to-income, the cash down, the
 *  principal in a payment, the month's interest, the owner's equity, whether private mortgage insurance is owed, and how
 *  much a borrower can afford. Crosses to `banking` — a mortgage is the bank's loan on the house. A measure. */

const PROOF = 'mortgage arithmetic (loan-to-value, debt-to-income, down payment, principal, monthly interest, equity, PMI, affordability); home lending as exact integers; a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mortgage', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `mortgage.${name}`, params })

export class MortgageFormulas {
  /** LOAN-TO-VALUE as a percentage. value ⌊loan · 100 / price⌋. */
  static ltv(loan: number, price: number): CrossFormula { return c('mortgage-ltv', 'ltv(loan, price) = ⌊loan · 100 / price⌋', price > 0 ? Math.floor((loan * 100) / price) : 0, nat(loan, price) && price > 0, 'ltv', [loan, price]) }
  /** DEBT-TO-INCOME as a percentage. value ⌊debt · 100 / income⌋. */
  static dti(debt: number, income: number): CrossFormula { return c('mortgage-dti', 'dti(debt, income) = ⌊debt · 100 / income⌋', income > 0 ? Math.floor((debt * 100) / income) : 0, nat(debt, income) && income > 0, 'dti', [debt, income]) }
  /** DOWN PAYMENT: the cash down, price less the loan. value max(0, price − loan). */
  static downpayment(price: number, loan: number): CrossFormula { return c('mortgage-downpayment', 'downpayment(price, loan) = max(0, price − loan)', Math.max(0, price - loan), nat(price, loan), 'downpayment', [price, loan]) }
  /** PRINCIPAL: the part of a payment that pays down the loan. value max(0, payment − interest). */
  static principal(payment: number, interest: number): CrossFormula { return c('mortgage-principal', 'principal(payment, interest) = max(0, payment − interest)', Math.max(0, payment - interest), nat(payment, interest), 'principal', [payment, interest]) }
  /** MONTHLY INTEREST: a balance at an annual rate (percent), one month. value ⌊balance · rate / 1200⌋. */
  static interestportion(balance: number, rate: number): CrossFormula { return c('mortgage-interestportion', 'interestportion(balance, rate) = ⌊balance · rate / 1200⌋', Math.floor((balance * rate) / 1200), nat(balance, rate), 'interestportion', [balance, rate]) }
  /** EQUITY: the owner's stake, price less what is still owed. value max(0, price − balance). */
  static equity(price: number, balance: number): CrossFormula { return c('mortgage-equity', 'equity(price, balance) = max(0, price − balance)', Math.max(0, price - balance), nat(price, balance), 'equity', [price, balance]) }
  /** PMI: 1 when loan-to-value is over the threshold, so insurance is owed. value [ltv > threshold]. */
  static pmi(ltv: number, threshold: number): CrossFormula { return c('mortgage-pmi', 'pmi(ltv, threshold) = [ltv > threshold]', ltv > threshold ? 1 : 0, nat(ltv, threshold) && ltv <= 100 && threshold <= 100, 'pmi', [ltv, threshold]) }
  /** AFFORDABILITY: the most a borrower can borrow, income times a multiple. value income · multiple. */
  static affordability(income: number, multiple: number): CrossFormula { return c('mortgage-affordability', 'affordability(income, multiple) = income · multiple', income * multiple, nat(income, multiple), 'affordability', [income, multiple]) }
}

for (const name of ['affordability', 'downpayment', 'dti', 'equity', 'interestportion', 'ltv', 'pmi', 'principal'] as const)
  hexRegisterOf('mortgage', name, (MortgageFormulas[name] as (...x: unknown[]) => unknown).bind(MortgageFormulas))
