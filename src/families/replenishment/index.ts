import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REPLENISHMENT — KEEPING THE SHELF FULL, AS ARITHMETIC (chosen by the inventory registry, not by hand). Restocking is
 *  numbers: the reorder point, the safety buffer, the order quantity, the lead time, the cycle stock, the par level, the
 *  fill rate, and whatever ran short. Crosses to `warehousing` — replenishment is what the warehouse carries out. A measure. */

const PROOF = 'replenishment arithmetic (reorder point, safety stock, economic order quantity, lead time, cycle stock, par level, fill rate, stockout); the inventory domain made of integers; a measure crossed to warehousing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'replenishment', dst: 'warehousing', formula, value, proof: PROOF, ...extra }, holds, { name: `replenishment.${name}`, params })

export class ReplenishmentFormulas {
  /** REORDER POINT: daily demand across the lead time. value demand · lead. */
  static reorder(demand: number, lead: number): CrossFormula { return c('replenishment-reorder', 'reorder(demand, lead) = demand · lead', demand * lead, nat(demand, lead), 'reorder', [demand, lead]) }
  /** SAFETY STOCK: the demand spike held across the lead time. value max(0, maxDemand − avgDemand) · lead. */
  static safetystock(maxDemand: number, avgDemand: number, lead: number): CrossFormula { return c('replenishment-safetystock', 'safetystock(maxDemand, avgDemand, lead) = max(0, maxDemand − avgDemand) · lead', Math.max(0, maxDemand - avgDemand) * lead, nat(maxDemand, avgDemand, lead), 'safetystock', [maxDemand, avgDemand, lead]) }
  /** ECONOMIC ORDER QUANTITY (integer proxy, no sqrt): the squared EOQ. value ⌊2 · demand · setup / hold⌋. */
  static eoq(demand: number, setup: number, hold: number): CrossFormula { return c('replenishment-eoq', 'eoq(demand, setup, hold) = ⌊2 · demand · setup / hold⌋', hold > 0 ? Math.floor((2 * demand * setup) / hold) : 0, nat(demand, setup, hold) && hold > 0, 'eoq', [demand, setup, hold]) }
  /** LEAD TIME: supplier days plus transit days. value supplier + transit. */
  static leadtime(supplier: number, transit: number): CrossFormula { return c('replenishment-leadtime', 'leadtime(supplier, transit) = supplier + transit', supplier + transit, nat(supplier, transit), 'leadtime', [supplier, transit]) }
  /** CYCLE STOCK: half the order quantity held on average. value ⌊orderQty / 2⌋. */
  static cycle(orderQty: number): CrossFormula { return c('replenishment-cycle', 'cycle(orderQty) = ⌊orderQty / 2⌋', Math.floor(orderQty / 2), nat(orderQty), 'cycle', [orderQty]) }
  /** PAR LEVEL: the reorder point plus the safety buffer. value demand · lead + safety. */
  static parlevel(demand: number, lead: number, safety: number): CrossFormula { return c('replenishment-parlevel', 'parlevel(demand, lead, safety) = demand · lead + safety', demand * lead + safety, nat(demand, lead, safety), 'parlevel', [demand, lead, safety]) }
  /** FILL RATE as a percentage. value ⌊filled · 100 / demanded⌋. */
  static fill(filled: number, demanded: number): CrossFormula { return c('replenishment-fill', 'fill(filled, demanded) = ⌊filled · 100 / demanded⌋', demanded > 0 ? Math.floor((filled * 100) / demanded) : 0, nat(filled, demanded) && demanded > 0 && filled <= demanded, 'fill', [filled, demanded]) }
  /** STOCKOUT: demand the shelf could not meet. value max(0, demand − onHand). */
  static stockout(demand: number, onHand: number): CrossFormula { return c('replenishment-stockout', 'stockout(demand, onHand) = max(0, demand − onHand)', Math.max(0, demand - onHand), nat(demand, onHand), 'stockout', [demand, onHand]) }
}

for (const name of ['cycle', 'eoq', 'fill', 'leadtime', 'parlevel', 'reorder', 'safetystock', 'stockout'] as const)
  hexRegisterOf('replenishment', name, (ReplenishmentFormulas[name] as (...x: unknown[]) => unknown).bind(ReplenishmentFormulas))
