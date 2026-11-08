import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BUDGETING — PLANNING MONEY AS ARITHMETIC. A budget is numbers: how far actual ran from plan, how much of an allocation
 *  was used, what income is left over expenses, where a trend lands over periods, a department's share of the total, the
 *  monthly burn, the runway reserves buy at that burn, and what spending under plan saved. Crosses to `accounting` —
 *  budgeting is the plan accounting records against. A measure. */

const PROOF = 'budgeting arithmetic (variance, utilization, surplus, forecast, allocation, burnrate, runway, savings); planning money as integers; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'budgeting', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `budgeting.${name}`, params })

export class BudgetingFormulas {
  /** VARIANCE: how far actual ran over the budget, as a percentage. value ⌊(actual − budgeted) · 100 / budgeted⌋. */
  static variance(actual: number, budgeted: number): CrossFormula { return c('budgeting-variance', 'variance(actual, budgeted) = ⌊(actual − budgeted) · 100 / budgeted⌋', budgeted > 0 ? Math.floor(((actual - budgeted) * 100) / budgeted) : 0, nat(actual, budgeted) && budgeted > 0 && actual >= budgeted, 'variance', [actual, budgeted]) }
  /** UTILIZATION: how much of an allocation was spent, as a percentage. value ⌊spent · 100 / allocated⌋. */
  static utilization(spent: number, allocated: number): CrossFormula { return c('budgeting-utilization', 'utilization(spent, allocated) = ⌊spent · 100 / allocated⌋', allocated > 0 ? Math.floor((spent * 100) / allocated) : 0, nat(spent, allocated) && allocated > 0, 'utilization', [spent, allocated]) }
  /** SURPLUS: income left over expenses, never below zero. value max(0, income − expenses). */
  static surplus(income: number, expenses: number): CrossFormula { return c('budgeting-surplus', 'surplus(income, expenses) = max(0, income − expenses)', Math.max(0, income - expenses), nat(income, expenses), 'surplus', [income, expenses]) }
  /** FORECAST: a trend carried across periods. value trend · periods. */
  static forecast(trend: number, periods: number): CrossFormula { return c('budgeting-forecast', 'forecast(trend, periods) = trend · periods', trend * periods, nat(trend, periods), 'forecast', [trend, periods]) }
  /** ALLOCATION: a department's share of the total, as a percentage. value ⌊department · 100 / total⌋. */
  static allocation(department: number, total: number): CrossFormula { return c('budgeting-allocation', 'allocation(department, total) = ⌊department · 100 / total⌋', total > 0 ? Math.floor((department * 100) / total) : 0, nat(department, total) && total > 0 && department <= total, 'allocation', [department, total]) }
  /** BURNRATE: spending per month. value ⌊spent / months⌋. */
  static burnrate(spent: number, months: number): CrossFormula { return c('budgeting-burnrate', 'burnrate(spent, months) = ⌊spent / months⌋', months > 0 ? Math.floor(spent / months) : 0, nat(spent, months) && months > 0, 'burnrate', [spent, months]) }
  /** RUNWAY: the months reserves buy at a burn. value ⌊reserves / burn⌋. */
  static runway(reserves: number, burn: number): CrossFormula { return c('budgeting-runway', 'runway(reserves, burn) = ⌊reserves / burn⌋', burn > 0 ? Math.floor(reserves / burn) : 0, nat(reserves, burn) && burn > 0, 'runway', [reserves, burn]) }
  /** SAVINGS: spending under the budget, never below zero. value max(0, budgeted − actual). */
  static savings(budgeted: number, actual: number): CrossFormula { return c('budgeting-savings', 'savings(budgeted, actual) = max(0, budgeted − actual)', Math.max(0, budgeted - actual), nat(budgeted, actual), 'savings', [budgeted, actual]) }
}

for (const name of ['allocation', 'burnrate', 'forecast', 'runway', 'savings', 'surplus', 'utilization', 'variance'] as const)
  hexRegisterOf('budgeting', name, (BudgetingFormulas[name] as (...x: unknown[]) => unknown).bind(BudgetingFormulas))
