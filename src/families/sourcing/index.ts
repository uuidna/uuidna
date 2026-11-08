import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOURCING — STRATEGIC PROCUREMENT, AS ARITHMETIC (chosen by the public-API registry, not by hand). Buying is numbers:
 *  savings won at the table, total spend, lead time to delivery, the suppliers a demand needs, the average bid, the award
 *  decision, the qualified share of a pool, and the risk a supplier carries. Crosses to `procurement` — sourcing is what
 *  procurement executes. A measure. */

const PROOF = 'sourcing arithmetic (negotiated savings, spend, lead time, suppliers needed, average bid, award, qualification, risk); the registry\'s uncovered buy-side domain; a measure crossed to procurement'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sourcing', dst: 'procurement', formula, value, proof: PROOF, ...extra }, holds, { name: `sourcing.${name}`, params })

export class SourcingFormulas {
  /** NEGOTIATED SAVINGS: the drop from the quoted price to the agreed price. value max(0, before − after). */
  static savings(before: number, after: number): CrossFormula { return c('sourcing-savings', 'savings(before, after) = max(0, before − after)', Math.max(0, before - after), nat(before, after), 'savings', [before, after]) }
  /** TOTAL SPEND: units at a unit price. value units · price. */
  static spend(units: number, price: number): CrossFormula { return c('sourcing-spend', 'spend(units, price) = units · price', units * price, nat(units, price), 'spend', [units, price]) }
  /** LEAD TIME: preparation days plus transit days. value prep + transit. */
  static leadtime(prep: number, transit: number): CrossFormula { return c('sourcing-leadtime', 'leadtime(prep, transit) = prep + transit', prep + transit, nat(prep, transit), 'leadtime', [prep, transit]) }
  /** SUPPLIERS: the suppliers a demand needs at a per-supplier capacity. value ⌈demand / capacity⌉. */
  static suppliers(demand: number, capacity: number): CrossFormula { return c('sourcing-suppliers', 'suppliers(demand, capacity) = ⌈demand / capacity⌉', capacity > 0 ? Math.ceil(demand / capacity) : 0, nat(demand, capacity) && capacity > 0, 'suppliers', [demand, capacity]) }
  /** AVERAGE BID: the total of the bids over the count received. value ⌊total / count⌋. */
  static bid(total: number, count: number): CrossFormula { return c('sourcing-bid', 'bid(total, count) = ⌊total / count⌋', count > 0 ? Math.floor(total / count) : 0, nat(total, count) && count > 0, 'bid', [total, count]) }
  /** THE AWARD: 1 when the winning bid is within budget. value [bid ≤ budget]. */
  static award(bid: number, budget: number): CrossFormula { return c('sourcing-award', 'award(bid, budget) = [bid ≤ budget]', bid <= budget ? 1 : 0, nat(bid, budget), 'award', [bid, budget]) }
  /** QUALIFICATION: the qualified share of the supplier pool, as a percentage. value ⌊passed · 100 / total⌋. */
  static qualification(passed: number, total: number): CrossFormula { return c('sourcing-qualification', 'qualification(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'qualification', [passed, total]) }
  /** SUPPLIER RISK: likelihood times impact on the risk matrix. value likelihood · impact. */
  static risk(likelihood: number, impact: number): CrossFormula { return c('sourcing-risk', 'risk(likelihood, impact) = likelihood · impact', likelihood * impact, nat(likelihood, impact), 'risk', [likelihood, impact]) }
}

for (const name of ['award', 'bid', 'leadtime', 'qualification', 'risk', 'savings', 'spend', 'suppliers'] as const)
  hexRegisterOf('sourcing', name, (SourcingFormulas[name] as (...x: unknown[]) => unknown).bind(SourcingFormulas))
