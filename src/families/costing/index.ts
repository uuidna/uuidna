import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COSTING — PRODUCT COST AS ARITHMETIC. The cost of making a thing is numbers: cost per unit, the markup over cost, the
 *  margin on price, the break-even volume, the overhead rate, absorption, contribution per unit, and the target cost for a
 *  wanted margin. Crosses to `accounting` — costing is what accounting books. A measure. */

const PROOF = 'costing arithmetic (unit cost, markup, margin, break-even, overhead, absorption, contribution, target cost); product cost as integers; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'costing', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `costing.${name}`, params })

export class CostingFormulas {
  /** UNIT COST: total over the units made. value ⌊total / units⌋. */
  static unitcost(total: number, units: number): CrossFormula { return c('costing-unitcost', 'unitcost(total, units) = ⌊total / units⌋', units > 0 ? Math.floor(total / units) : 0, nat(total, units) && units > 0, 'unitcost', [total, units]) }
  /** MARKUP over cost, as a percentage. value ⌊(price − cost) · 100 / cost⌋. */
  static markup(price: number, cost: number): CrossFormula { return c('costing-markup', 'markup(price, cost) = ⌊(price − cost) · 100 / cost⌋', cost > 0 ? Math.floor(((price - cost) * 100) / cost) : 0, nat(price, cost) && cost > 0 && price >= cost, 'markup', [price, cost]) }
  /** MARGIN on price, as a percentage. value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return c('costing-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor(((price - cost) * 100) / price) : 0, nat(price, cost) && price > 0 && cost <= price, 'margin', [price, cost]) }
  /** BREAK-EVEN volume: fixed cost over contribution per unit. value ⌊fixed / contribution⌋. */
  static breakeven(fixed: number, contribution: number): CrossFormula { return c('costing-breakeven', 'breakeven(fixed, contribution) = ⌊fixed / contribution⌋', contribution > 0 ? Math.floor(fixed / contribution) : 0, nat(fixed, contribution) && contribution > 0, 'breakeven', [fixed, contribution]) }
  /** OVERHEAD rate: indirect over direct cost, as a percentage. value ⌊indirect · 100 / direct⌋. */
  static overhead(indirect: number, direct: number): CrossFormula { return c('costing-overhead', 'overhead(indirect, direct) = ⌊indirect · 100 / direct⌋', direct > 0 ? Math.floor((indirect * 100) / direct) : 0, nat(indirect, direct) && direct > 0, 'overhead', [indirect, direct]) }
  /** ABSORPTION: overhead applied over actual, as a percentage. value ⌊applied · 100 / actual⌋. */
  static absorption(applied: number, actual: number): CrossFormula { return c('costing-absorption', 'absorption(applied, actual) = ⌊applied · 100 / actual⌋', actual > 0 ? Math.floor((applied * 100) / actual) : 0, nat(applied, actual) && actual > 0, 'absorption', [applied, actual]) }
  /** CONTRIBUTION per unit: price less variable cost. value max(0, price − variable). */
  static contribution(price: number, variable: number): CrossFormula { return c('costing-contribution', 'contribution(price, variable) = max(0, price − variable)', Math.max(0, price - variable), nat(price, variable), 'contribution', [price, variable]) }
  /** TARGET COST for a wanted margin. value ⌊price · (100 − margin_) / 100⌋. */
  static target(price: number, margin_: number): CrossFormula { return c('costing-target', 'target(price, margin_) = ⌊price · (100 − margin_) / 100⌋', Math.floor((price * (100 - margin_)) / 100), nat(price, margin_) && margin_ <= 99, 'target', [price, margin_]) }
}

for (const name of ['absorption', 'breakeven', 'contribution', 'margin', 'markup', 'overhead', 'target', 'unitcost'] as const)
  hexRegisterOf('costing', name, (CostingFormulas[name] as (...x: unknown[]) => unknown).bind(CostingFormulas))
