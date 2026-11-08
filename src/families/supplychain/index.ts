import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUPPLYCHAIN — MOVING GOODS, AS ARITHMETIC (chosen by the registry, not by hand). A supply chain is numbers: how long an
 *  order takes to ship, how fast inventory turns, the share of orders filled, the stock held against variability, when to
 *  reorder, the share on backorder, how hard capacity is used, and the time a unit spends in work. Crosses to `logistics` —
 *  supplychain is what logistics carries. A measure. */

const PROOF = 'supplychain arithmetic (lead time, turnover, fill rate, safety stock, reorder point, backorder, utilization, cycle time); a registry domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'supplychain', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `supplychain.${name}`, params })

export class SupplychainFormulas {
  /** LEAD TIME: days from order to ship, never negative. value max(0, ship − order). */
  static leadtime(order: number, ship: number): CrossFormula { return c('supplychain-leadtime', 'leadtime(order, ship) = max(0, ship − order)', Math.max(0, ship - order), nat(order, ship), 'leadtime', [order, ship]) }
  /** INVENTORY TURNOVER: units sold over units held. value ⌊sold / inventory⌋. */
  static turnover(sold: number, inventory: number): CrossFormula { return c('supplychain-turnover', 'turnover(sold, inventory) = ⌊sold / inventory⌋', inventory > 0 ? Math.floor(sold / inventory) : 0, nat(sold, inventory) && inventory > 0, 'turnover', [sold, inventory]) }
  /** FILL RATE as a percentage. value ⌊filled · 100 / ordered⌋. */
  static fillrate(filled: number, ordered: number): CrossFormula { return c('supplychain-fillrate', 'fillrate(filled, ordered) = ⌊filled · 100 / ordered⌋', ordered > 0 ? Math.floor((filled * 100) / ordered) : 0, nat(filled, ordered) && ordered > 0 && filled <= ordered, 'fillrate', [filled, ordered]) }
  /** SAFETY STOCK: demand against variability. value demand · variability. */
  static safetystock(demand: number, variability: number): CrossFormula { return c('supplychain-safetystock', 'safetystock(demand, variability) = demand · variability', demand * variability, nat(demand, variability), 'safetystock', [demand, variability]) }
  /** REORDER POINT: demand over the lead time. value demand · leadtime. */
  static reorder(demand: number, leadtime_: number): CrossFormula { return c('supplychain-reorder', 'reorder(demand, leadtime) = demand · leadtime', demand * leadtime_, nat(demand, leadtime_), 'reorder', [demand, leadtime_]) }
  /** BACKORDER share as a percentage. value ⌊unfilled · 100 / demand⌋. */
  static backorder(unfilled: number, demand: number): CrossFormula { return c('supplychain-backorder', 'backorder(unfilled, demand) = ⌊unfilled · 100 / demand⌋', demand > 0 ? Math.floor((unfilled * 100) / demand) : 0, nat(unfilled, demand) && demand > 0 && unfilled <= demand, 'backorder', [unfilled, demand]) }
  /** UTILIZATION as a percentage. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('supplychain-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** CYCLE TIME: work-in-process over throughput. value ⌊wip / throughput⌋. */
  static cycle(throughput: number, wip: number): CrossFormula { return c('supplychain-cycle', 'cycle(throughput, wip) = ⌊wip / throughput⌋', throughput > 0 ? Math.floor(wip / throughput) : 0, nat(throughput, wip) && throughput > 0, 'cycle', [throughput, wip]) }
}

for (const name of ['backorder', 'cycle', 'fillrate', 'leadtime', 'reorder', 'safetystock', 'turnover', 'utilization'] as const)
  hexRegisterOf('supplychain', name, (SupplychainFormulas[name] as (...x: unknown[]) => unknown).bind(SupplychainFormulas))
