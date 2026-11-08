import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROPERTY — REAL ESTATE AS ARITHMETIC. The worth and the financing of land are numbers: the loan-to-value, the
 *  capitalization rate, the total mortgage repayment and its monthly instalment, the stamp duty, the owner's equity, the
 *  borrowing a buyer can afford, and the appreciation. Exact and jurisdiction-agnostic; crosses to `law`, where title,
 *  charge and conveyance are decided. A measure, not advice. */

const PROOF = 'real-estate arithmetic (loan-to-value, cap rate, total mortgage and instalment, stamp duty, equity, affordability, appreciation); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const r = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'property', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `property.${name}`, params })

export class PropertyFormulas {
  /** LOAN-TO-VALUE as a percentage. value ⌊loan · 100 / value⌋. */
  static ltv(loan: number, value: number): CrossFormula { return r('property-ltv', 'ltv(loan, value) = ⌊loan · 100 / value⌋', value > 0 ? Math.floor((loan * 100) / value) : 0, nat(loan, value) && value > 0, 'ltv', [loan, value]) }
  /** THE CAPITALIZATION RATE as a percentage: annual rent over price. value ⌊rent · 100 / price⌋. */
  static cap(rent: number, price: number): CrossFormula { return r('property-cap', 'cap(rent, price) = ⌊rent · 100 / price⌋', price > 0 ? Math.floor((rent * 100) / price) : 0, nat(rent, price) && price > 0, 'cap', [rent, price]) }
  /** THE TOTAL MORTGAGE REPAYMENT (simple interest): principal plus principal · rate% · years. value principal + ⌊principal · rate · years / 100⌋. */
  static mortgage(principal: number, rate: number, years: number): CrossFormula { return r('property-mortgage', 'mortgage(principal, rate, years) = principal + ⌊principal · rate · years / 100⌋', principal + Math.floor((principal * rate * years) / 100), nat(principal, rate, years), 'mortgage', [principal, rate, years]) }
  /** THE MONTHLY INSTALMENT: a total repayment spread over `months`. value ⌊total / months⌋. */
  static payment(total: number, months: number): CrossFormula { return r('property-payment', 'payment(total, months) = ⌊total / months⌋', months > 0 ? Math.floor(total / months) : 0, nat(total, months) && months > 0, 'payment', [total, months]) }
  /** STAMP DUTY at `rate`% of the price. value ⌊price · rate / 100⌋. */
  static stampduty(price: number, rate: number): CrossFormula { return r('property-stampduty', 'stampduty(price, rate) = ⌊price · rate / 100⌋', Math.floor((price * rate) / 100), nat(price, rate) && rate <= 100, 'stampduty', [price, rate]) }
  /** THE OWNER'S EQUITY: value less the loan outstanding. value max(0, value − loan). */
  static equity(value: number, loan: number): CrossFormula { return r('property-equity', 'equity(value, loan) = max(0, value − loan)', Math.max(0, value - loan), nat(value, loan), 'equity', [value, loan]) }
  /** AFFORDABILITY: the borrowing a buyer can carry at an income `multiple`. value income · multiple. */
  static afford(income: number, multiple: number): CrossFormula { return r('property-afford', 'afford(income, multiple) = income · multiple', income * multiple, nat(income, multiple), 'afford', [income, multiple]) }
  /** APPRECIATION: `pct`% added to the value. value ⌊value · pct / 100⌋. */
  static appreciation(value: number, pct: number): CrossFormula { return r('property-appreciation', 'appreciation(value, pct) = ⌊value · pct / 100⌋', Math.floor((value * pct) / 100), nat(value, pct), 'appreciation', [value, pct]) }
}

for (const name of ['afford', 'appreciation', 'cap', 'equity', 'ltv', 'mortgage', 'payment', 'stampduty'] as const)
  hexRegisterOf('property', name, (PropertyFormulas[name] as (...x: unknown[]) => unknown).bind(PropertyFormulas))
