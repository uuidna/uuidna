import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GASTRONOMY — RUNNING A KITCHEN, AS ARITHMETIC. A plate is numbers: cost per portion, the built-up plate cost, food cost as
 *  a percentage of price, net yield after trim, the menu price at a markup, covers served, waste against what was prepared, and
 *  the margin a plate earns. Crosses to `cuisine` — gastronomy is the economics of what cuisine cooks. A measure. */

const PROOF = 'gastronomy arithmetic (portion cost, plate cost, food-cost %, yield, menu price, covers, waste, margin); the kitchen as a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gastronomy', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `gastronomy.${name}`, params })

export class GastronomyFormulas {
  /** PORTION COST: a batch total split across portions. value ⌊total / portions⌋. */
  static portioncost(total: number, portions: number): CrossFormula { return c('gastronomy-portioncost', 'portioncost(total, portions) = ⌊total / portions⌋', portions > 0 ? Math.floor(total / portions) : 0, nat(total, portions) && portions > 0, 'portioncost', [total, portions]) }
  /** PLATE COST: food plus labor plus overhead. value food + labor + overhead. */
  static platecost(food: number, labor: number, overhead: number): CrossFormula { return c('gastronomy-platecost', 'platecost(food, labor, overhead) = food + labor + overhead', food + labor + overhead, nat(food, labor, overhead), 'platecost', [food, labor, overhead]) }
  /** FOOD COST PERCENT: cost as a percentage of price. value ⌊cost · 100 / price⌋. */
  static foodcostpercent(cost: number, price: number): CrossFormula { return c('gastronomy-foodcostpercent', 'foodcostpercent(cost, price) = ⌊cost · 100 / price⌋', price > 0 ? Math.floor((cost * 100) / price) : 0, nat(cost, price) && price > 0 && cost <= price, 'foodcostpercent', [cost, price]) }
  /** YIELD: usable weight left after trim. value max(0, gross − trim). */
  static yield(gross: number, trim: number): CrossFormula { return c('gastronomy-yield', 'yield(gross, trim) = max(0, gross − trim)', Math.max(0, gross - trim), nat(gross, trim) && trim <= gross, 'yield', [gross, trim]) }
  /** MENU PRICE: cost at a markup multiple. value cost · markup. */
  static menuprice(cost: number, markup: number): CrossFormula { return c('gastronomy-menuprice', 'menuprice(cost, markup) = cost · markup', cost * markup, nat(cost, markup), 'menuprice', [cost, markup]) }
  /** COVERS: seats over the night's turns. value seats · turns. */
  static covers(seats: number, turns: number): CrossFormula { return c('gastronomy-covers', 'covers(seats, turns) = seats · turns', seats * turns, nat(seats, turns), 'covers', [seats, turns]) }
  /** WASTE: prepared portions that were not served. value max(0, prepared − served). */
  static waste(prepared: number, served: number): CrossFormula { return c('gastronomy-waste', 'waste(prepared, served) = max(0, prepared − served)', Math.max(0, prepared - served), nat(prepared, served) && served <= prepared, 'waste', [prepared, served]) }
  /** MARGIN: the profit a plate earns at its price. value max(0, price − cost). */
  static margin(price: number, cost: number): CrossFormula { return c('gastronomy-margin', 'margin(price, cost) = max(0, price − cost)', Math.max(0, price - cost), nat(price, cost) && cost <= price, 'margin', [price, cost]) }
}

for (const name of ['covers', 'foodcostpercent', 'margin', 'menuprice', 'platecost', 'portioncost', 'waste', 'yield'] as const)
  hexRegisterOf('gastronomy', name, (GastronomyFormulas[name] as (...x: unknown[]) => unknown).bind(GastronomyFormulas))
