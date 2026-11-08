import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPENSATION — PAY AS ARITHMETIC. What a role costs is numbers: annual salary from an hourly rate, a bonus as a percent
 *  of salary, equity at a share price, the new salary after a raise, the midpoint of a pay band, the ratio of highest to
 *  lowest pay, the benefits load, and total compensation. Crosses to `econ` — compensation is economics applied to one
 *  payroll. A measure. */

const PROOF = 'compensation arithmetic (salary, bonus, equity, raise, band midpoint, pay ratio, benefits, total comp); pay as economics on one payroll; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'compensation', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `compensation.${name}`, params })

export class CompensationFormulas {
  /** SALARY: annual pay from an hourly rate over hours worked. value hourly · hours. */
  static salary(hourly: number, hours: number): CrossFormula { return c('compensation-salary', 'salary(hourly, hours) = hourly · hours', hourly * hours, nat(hourly, hours), 'salary', [hourly, hours]) }
  /** BONUS: a percent of salary. value ⌊salary · pct / 100⌋. */
  static bonus(salary: number, pct: number): CrossFormula { return c('compensation-bonus', 'bonus(salary, pct) = ⌊salary · pct / 100⌋', Math.max(0, Math.floor((salary * pct) / 100)), nat(salary, pct), 'bonus', [salary, pct]) }
  /** EQUITY: shares at a share price. value shares · price. */
  static equity(shares: number, price: number): CrossFormula { return c('compensation-equity', 'equity(shares, price) = shares · price', shares * price, nat(shares, price), 'equity', [shares, price]) }
  /** RAISE: the new salary after a percent raise. value current + ⌊current · pct / 100⌋. */
  static raise(current: number, pct: number): CrossFormula { return c('compensation-raise', 'raise(current, pct) = current + ⌊current · pct / 100⌋', current + Math.max(0, Math.floor((current * pct) / 100)), nat(current, pct), 'raise', [current, pct]) }
  /** BAND: the midpoint of a pay band. value ⌊(min + max) / 2⌋. */
  static band(min: number, max: number): CrossFormula { return c('compensation-band', 'band(min, max) = ⌊(min + max) / 2⌋', Math.floor((min + max) / 2), nat(min, max) && min <= max, 'band', [min, max]) }
  /** RATIO: highest pay over lowest pay. value ⌊highest / lowest⌋. */
  static ratio(highest: number, lowest: number): CrossFormula { return c('compensation-ratio', 'ratio(highest, lowest) = ⌊highest / lowest⌋', lowest > 0 ? Math.floor(highest / lowest) : 0, nat(highest, lowest) && lowest > 0, 'ratio', [highest, lowest]) }
  /** BENEFIT: the benefits load as a percent of salary. value ⌊salary · pct / 100⌋. */
  static benefit(salary: number, pct: number): CrossFormula { return c('compensation-benefit', 'benefit(salary, pct) = ⌊salary · pct / 100⌋', Math.max(0, Math.floor((salary * pct) / 100)), nat(salary, pct), 'benefit', [salary, pct]) }
  /** TOTAL: total compensation, base plus everything else. value base + extra. */
  static total(base: number, extra: number): CrossFormula { return c('compensation-total', 'total(base, extra) = base + extra', base + extra, nat(base, extra), 'total', [base, extra]) }
}

for (const name of ['band', 'benefit', 'bonus', 'equity', 'raise', 'ratio', 'salary', 'total'] as const)
  hexRegisterOf('compensation', name, (CompensationFormulas[name] as (...x: unknown[]) => unknown).bind(CompensationFormulas))
