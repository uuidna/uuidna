import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FULFILLMENT — ORDER FULFILLMENT AS ARITHMETIC (chosen by the operations registry, not by hand). Getting orders out the
 *  door is numbers: the fill rate, the order cycle time, picking accuracy, units backordered, the perfect-order rate, items
 *  picked per hour, cartons packed, and the parcel shipping cost. Crosses to `logistics` — fulfillment is what logistics
 *  moves. A measure. */

const PROOF = 'fulfillment arithmetic (fill rate, cycle time, order accuracy, backorder, perfect-order rate, pick rate, pack cartons, ship cost); an operations domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fulfillment', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `fulfillment.${name}`, params })

export class FulfillmentFormulas {
  /** FILL RATE: units shipped against units ordered, as a percentage. value ⌊shipped · 100 / ordered⌋. */
  static rate(shipped: number, ordered: number): CrossFormula { return c('fulfillment-rate', 'rate(shipped, ordered) = ⌊shipped · 100 / ordered⌋', ordered > 0 ? Math.floor((shipped * 100) / ordered) : 0, nat(shipped, ordered) && ordered > 0 && shipped <= ordered, 'rate', [shipped, ordered]) }
  /** ORDER CYCLE TIME: total hours over the orders fulfilled. value ⌊total / orders⌋. */
  static cycle(total: number, orders: number): CrossFormula { return c('fulfillment-cycle', 'cycle(total, orders) = ⌊total / orders⌋', orders > 0 ? Math.floor(total / orders) : 0, nat(total, orders) && orders > 0, 'cycle', [total, orders]) }
  /** ORDER ACCURACY: orders filled correctly, as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('fulfillment-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** BACKORDER: units ordered beyond what is available. value max(0, ordered − available). */
  static backorder(ordered: number, available: number): CrossFormula { return c('fulfillment-backorder', 'backorder(ordered, available) = max(0, ordered − available)', Math.max(0, ordered - available), nat(ordered, available), 'backorder', [ordered, available]) }
  /** PERFECT-ORDER RATE: orders with nothing wrong, as a percentage. value ⌊perfect · 100 / total⌋. */
  static perfectorder(perfect: number, total: number): CrossFormula { return c('fulfillment-perfectorder', 'perfectorder(perfect, total) = ⌊perfect · 100 / total⌋', total > 0 ? Math.floor((perfect * 100) / total) : 0, nat(perfect, total) && total > 0 && perfect <= total, 'perfectorder', [perfect, total]) }
  /** PICK RATE: items picked over the hours worked. value ⌊items / hours⌋. */
  static pick(items: number, hours: number): CrossFormula { return c('fulfillment-pick', 'pick(items, hours) = ⌊items / hours⌋', hours > 0 ? Math.floor(items / hours) : 0, nat(items, hours) && hours > 0, 'pick', [items, hours]) }
  /** PACK: cartons needed for the items at a per-carton capacity. value ⌈items / perCarton⌉. */
  static pack(items: number, perCarton: number): CrossFormula { return c('fulfillment-pack', 'pack(items, perCarton) = ⌈items / perCarton⌉', perCarton > 0 ? Math.ceil(items / perCarton) : 0, nat(items, perCarton) && perCarton > 0, 'pack', [items, perCarton]) }
  /** SHIP COST: parcels at a per-parcel rate. value parcels · rate. */
  static ship(parcels: number, rate: number): CrossFormula { return c('fulfillment-ship', 'ship(parcels, rate) = parcels · rate', parcels * rate, nat(parcels, rate), 'ship', [parcels, rate]) }
}

for (const name of ['accuracy', 'backorder', 'cycle', 'pack', 'perfectorder', 'pick', 'rate', 'ship'] as const)
  hexRegisterOf('fulfillment', name, (FulfillmentFormulas[name] as (...x: unknown[]) => unknown).bind(FulfillmentFormulas))
