import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SHIPPING — MOVING BOXES ACROSS THE SEA, AS ARITHMETIC. Container trade is numbers: twenty-foot equivalents on a hull,
 *  how full the ship is, days at sea, the rate per tonne, demurrage owed on late boxes, a box's dwell in the yard, the
 *  on-time share of arrivals, and the bunker fuel a voyage burns. Crosses to `logistics` — shipping is logistics at sea.
 *  A measure. */

const PROOF = 'shipping arithmetic (teu, utilization, transit time, freight rate, demurrage, dwell time, on-time, bunker fuel); container trade as integers; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'shipping', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `shipping.${name}`, params })

export class ShippingFormulas {
  /** TEU: twenty-foot equivalents a count of containers carries. value containers · factor. */
  static teu(containers: number, factor: number): CrossFormula { return c('shipping-teu', 'teu(containers, factor) = containers · factor', containers * factor, nat(containers, factor), 'teu', [containers, factor]) }
  /** UTILIZATION: how full the hull is, as a percentage. value ⌊loaded · 100 / capacity⌋. */
  static utilization(loaded: number, capacity: number): CrossFormula { return c('shipping-utilization', 'utilization(loaded, capacity) = ⌊loaded · 100 / capacity⌋', capacity > 0 ? Math.floor((loaded * 100) / capacity) : 0, nat(loaded, capacity) && capacity > 0 && loaded <= capacity, 'utilization', [loaded, capacity]) }
  /** TRANSIT TIME: the days a distance takes at a speed. value ⌊distance / speed⌋. */
  static transittime(distance: number, speed: number): CrossFormula { return c('shipping-transittime', 'transittime(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'transittime', [distance, speed]) }
  /** FREIGHT RATE: cost per unit of weight. value ⌊cost / weight⌋. */
  static freightrate(cost: number, weight: number): CrossFormula { return c('shipping-freightrate', 'freightrate(cost, weight) = ⌊cost / weight⌋', weight > 0 ? Math.floor(cost / weight) : 0, nat(cost, weight) && weight > 0, 'freightrate', [cost, weight]) }
  /** DEMURRAGE: the charge on days a box overstays, at a daily rate. value days · rate. */
  static demurrage(days: number, rate: number): CrossFormula { return c('shipping-demurrage', 'demurrage(days, rate) = days · rate', days * rate, nat(days, rate), 'demurrage', [days, rate]) }
  /** DWELL TIME: the hours a box waits in the yard. value hours. */
  static dwelltime(hours: number): CrossFormula { return c('shipping-dwelltime', 'dwelltime(hours) = hours', hours, nat(hours), 'dwelltime', [hours]) }
  /** ON-TIME: the on-time share of arrivals, as a percentage. value ⌊ontime · 100 / total⌋. */
  static ontime(ontime_: number, total: number): CrossFormula { return c('shipping-ontime', 'ontime(ontime, total) = ⌊ontime · 100 / total⌋', total > 0 ? Math.floor((ontime_ * 100) / total) : 0, nat(ontime_, total) && total > 0 && ontime_ <= total, 'ontime', [ontime_, total]) }
  /** BUNKER FUEL: the fuel a voyage burns over a distance at a per-distance consumption. value distance · consumption. */
  static bunkerfuel(distance: number, consumption: number): CrossFormula { return c('shipping-bunkerfuel', 'bunkerfuel(distance, consumption) = distance · consumption', distance * consumption, nat(distance, consumption), 'bunkerfuel', [distance, consumption]) }
}

for (const name of ['bunkerfuel', 'demurrage', 'dwelltime', 'freightrate', 'ontime', 'teu', 'transittime', 'utilization'] as const)
  hexRegisterOf('shipping', name, (ShippingFormulas[name] as (...x: unknown[]) => unknown).bind(ShippingFormulas))
