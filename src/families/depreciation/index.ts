import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEPRECIATION — THE BOOKS' FALL IN VALUE, AS ARITHMETIC (chosen by the asset registry, not by hand). An asset losing
 *  worth is numbers: the straight-line charge, the declining-balance charge, the per-unit charge, the book value left,
 *  what has piled up, the salvage, the rate, and the years remaining. Crosses to `accounting` — depreciation is an
 *  entry the books carry. A measure. */

const PROOF = 'depreciation arithmetic (straight-line, declining balance, units of production, book value, accumulated, salvage, rate, remaining life); the asset registry\'s uncovered domain; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'depreciation', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `depreciation.${name}`, params })

export class DepreciationFormulas {
  /** STRAIGHT-LINE: the yearly charge, depreciable base spread over the life. value ⌊(cost − salvage) / life⌋. */
  static straightline(cost: number, salvage: number, life: number): CrossFormula { return c('depreciation-straightline', 'straightline(cost, salvage, life) = ⌊(cost − salvage) / life⌋', life > 0 ? Math.floor(Math.max(0, cost - salvage) / life) : 0, nat(cost, salvage, life) && life > 0 && salvage <= cost, 'straightline', [cost, salvage, life]) }
  /** DECLINING BALANCE: a rate (percent) of the book value this period. value ⌊book · rate / 100⌋. */
  static decliningbalance(book: number, rate: number): CrossFormula { return c('depreciation-decliningbalance', 'decliningbalance(book, rate) = ⌊book · rate / 100⌋', Math.floor((book * rate) / 100), nat(book, rate) && rate <= 100, 'decliningbalance', [book, rate]) }
  /** UNITS OF PRODUCTION: the depreciable base apportioned by units used of the total. value ⌊base · used / total⌋. */
  static unitsofproduction(base: number, used: number, total: number): CrossFormula { return c('depreciation-unitsofproduction', 'unitsofproduction(base, used, total) = ⌊base · used / total⌋', total > 0 ? Math.floor((base * used) / total) : 0, nat(base, used, total) && total > 0 && used <= total, 'unitsofproduction', [base, used, total]) }
  /** BOOK VALUE: the cost left after what has depreciated. value max(0, cost − accumulated). */
  static bookvalue(cost: number, accumulated: number): CrossFormula { return c('depreciation-bookvalue', 'bookvalue(cost, accumulated) = max(0, cost − accumulated)', Math.max(0, cost - accumulated), nat(cost, accumulated) && accumulated <= cost, 'bookvalue', [cost, accumulated]) }
  /** ACCUMULATED: the charges piled up over the years. value annual · years. */
  static accumulated(annual: number, years: number): CrossFormula { return c('depreciation-accumulated', 'accumulated(annual, years) = annual · years', annual * years, nat(annual, years), 'accumulated', [annual, years]) }
  /** SALVAGE: the residual, cost less the depreciable base. value max(0, cost − depreciable). */
  static salvage(cost: number, depreciable: number): CrossFormula { return c('depreciation-salvage', 'salvage(cost, depreciable) = max(0, cost − depreciable)', Math.max(0, cost - depreciable), nat(cost, depreciable) && depreciable <= cost, 'salvage', [cost, depreciable]) }
  /** RATE: the straight-line rate as a percent of life. value ⌊100 / life⌋. */
  static rate(life: number): CrossFormula { return c('depreciation-rate', 'rate(life) = ⌊100 / life⌋', life > 0 ? Math.floor(100 / life) : 0, nat(life) && life > 0, 'rate', [life]) }
  /** REMAINING: the useful life left after the years elapsed. value max(0, life − elapsed). */
  static remaining(life: number, elapsed: number): CrossFormula { return c('depreciation-remaining', 'remaining(life, elapsed) = max(0, life − elapsed)', Math.max(0, life - elapsed), nat(life, elapsed) && elapsed <= life, 'remaining', [life, elapsed]) }
}

for (const name of ['accumulated', 'bookvalue', 'decliningbalance', 'rate', 'remaining', 'salvage', 'straightline', 'unitsofproduction'] as const)
  hexRegisterOf('depreciation', name, (DepreciationFormulas[name] as (...x: unknown[]) => unknown).bind(DepreciationFormulas))
