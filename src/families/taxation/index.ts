import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TAXATION — WHAT A TAX SYSTEM OWES, AS ARITHMETIC (chosen by the public fiscal registry, not by hand). A tax system is
 *  numbers: income tax on earnings, VAT on a sale, the amount in a top bracket, taxable income after deductions, the
 *  effective rate, per-period withholding, the gain on a sale, and the final liability. Crosses to `econ` — taxation is
 *  the public side of the economy. A measure. */

const PROOF = 'taxation arithmetic (income tax, VAT, top-bracket amount, taxable after deductions, effective rate, withholding, capital gain, liability); the public fiscal domain; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'taxation', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `taxation.${name}`, params })

export class TaxationFormulas {
  /** INCOME TAX: gross earnings at a percentage rate. value ⌊gross · rate / 100⌋. */
  static income(gross: number, rate: number): CrossFormula { return c('taxation-income', 'income(gross, rate) = ⌊gross · rate / 100⌋', Math.floor((gross * rate) / 100), nat(gross, rate) && rate <= 100, 'income', [gross, rate]) }
  /** VAT: value-added tax on a sale amount at a rate. value ⌊amount · rate / 100⌋. */
  static vat(amount: number, rate: number): CrossFormula { return c('taxation-vat', 'vat(amount, rate) = ⌊amount · rate / 100⌋', Math.floor((amount * rate) / 100), nat(amount, rate) && rate <= 100, 'vat', [amount, rate]) }
  /** TOP BRACKET: income above a threshold. value max(0, income − threshold). */
  static bracket(income: number, threshold: number): CrossFormula { return c('taxation-bracket', 'bracket(income, threshold) = max(0, income − threshold)', Math.max(0, income - threshold), nat(income, threshold), 'bracket', [income, threshold]) }
  /** DEDUCTION: taxable income after deductions. value max(0, gross − deductions). */
  static deduction(gross: number, deductions: number): CrossFormula { return c('taxation-deduction', 'deduction(gross, deductions) = max(0, gross − deductions)', Math.max(0, gross - deductions), nat(gross, deductions), 'deduction', [gross, deductions]) }
  /** EFFECTIVE RATE as a percentage of income. value ⌊tax · 100 / income⌋. */
  static effective(tax: number, income: number): CrossFormula { return c('taxation-effective', 'effective(tax, income) = ⌊tax · 100 / income⌋', income > 0 ? Math.floor((tax * 100) / income) : 0, nat(tax, income) && income > 0 && tax <= income, 'effective', [tax, income]) }
  /** WITHHOLDING: annual salary split over pay periods. value ⌊salary / periods⌋. */
  static withholding(salary: number, periods: number): CrossFormula { return c('taxation-withholding', 'withholding(salary, periods) = ⌊salary / periods⌋', periods > 0 ? Math.floor(salary / periods) : 0, nat(salary, periods) && periods > 0, 'withholding', [salary, periods]) }
  /** CAPITAL GAIN: sale price above the cost basis. value max(0, sale − basis). */
  static capitalgains(sale: number, basis: number): CrossFormula { return c('taxation-capitalgains', 'capitalgains(sale, basis) = max(0, sale − basis)', Math.max(0, sale - basis), nat(sale, basis), 'capitalgains', [sale, basis]) }
  /** LIABILITY: taxable income at a rate. value ⌊taxable · rate / 100⌋. */
  static liability(taxable: number, rate: number): CrossFormula { return c('taxation-liability', 'liability(taxable, rate) = ⌊taxable · rate / 100⌋', Math.floor((taxable * rate) / 100), nat(taxable, rate) && rate <= 100, 'liability', [taxable, rate]) }
}

for (const name of ['bracket', 'capitalgains', 'deduction', 'effective', 'income', 'liability', 'vat', 'withholding'] as const)
  hexRegisterOf('taxation', name, (TaxationFormulas[name] as (...x: unknown[]) => unknown).bind(TaxationFormulas))
