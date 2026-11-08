import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DELIVERY — LAST-MILE LOGISTICS, AS ARITHMETIC. Moving parcels is numbers: on-time rate, stops per route, first-attempt
 *  success, last-mile cost per parcel, delivery-window hit rate, return rate, the ETA from distance and speed, and the
 *  deliveries a courier makes per hour. Crosses to `logistics` — delivery is logistics at the doorstep. A measure. */

const PROOF = 'delivery arithmetic (on-time rate, stop density, first-attempt success, last-mile cost, window hit rate, returns, eta, productivity); last-mile logistics as a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'delivery', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `delivery.${name}`, params })

export class DeliveryFormulas {
  /** ON-TIME RATE as a percentage. value ⌊ontime · 100 / total⌋. */
  static ontime(ontime_: number, total: number): CrossFormula { return c('delivery-ontime', 'ontime(ontime, total) = ⌊ontime · 100 / total⌋', total > 0 ? Math.floor((ontime_ * 100) / total) : 0, nat(ontime_, total) && total > 0 && ontime_ <= total, 'ontime', [ontime_, total]) }
  /** STOP DENSITY: stops over the routes run. value ⌊stops / route⌋. */
  static density(stops: number, route: number): CrossFormula { return c('delivery-density', 'density(stops, route) = ⌊stops / route⌋', route > 0 ? Math.floor(stops / route) : 0, nat(stops, route) && route > 0, 'density', [stops, route]) }
  /** FIRST-ATTEMPT SUCCESS as a percentage. value ⌊delivered · 100 / attempts⌋. */
  static firstattempt(delivered: number, attempts: number): CrossFormula { return c('delivery-firstattempt', 'firstattempt(delivered, attempts) = ⌊delivered · 100 / attempts⌋', attempts > 0 ? Math.floor((delivered * 100) / attempts) : 0, nat(delivered, attempts) && attempts > 0 && delivered <= attempts, 'firstattempt', [delivered, attempts]) }
  /** LAST-MILE COST per parcel. value ⌊cost / parcels⌋. */
  static lastmile(cost: number, parcels: number): CrossFormula { return c('delivery-lastmile', 'lastmile(cost, parcels) = ⌊cost / parcels⌋', parcels > 0 ? Math.floor(cost / parcels) : 0, nat(cost, parcels) && parcels > 0, 'lastmile', [cost, parcels]) }
  /** DELIVERY-WINDOW HIT RATE as a percentage. value ⌊hit · 100 / promised⌋. */
  static window(hit: number, promised: number): CrossFormula { return c('delivery-window', 'window(hit, promised) = ⌊hit · 100 / promised⌋', promised > 0 ? Math.floor((hit * 100) / promised) : 0, nat(hit, promised) && promised > 0 && hit <= promised, 'window', [hit, promised]) }
  /** RETURN RATE as a percentage. value ⌊returned · 100 / shipped⌋. */
  static returns(returned: number, shipped: number): CrossFormula { return c('delivery-returns', 'returns(returned, shipped) = ⌊returned · 100 / shipped⌋', shipped > 0 ? Math.floor((returned * 100) / shipped) : 0, nat(returned, shipped) && shipped > 0 && returned <= shipped, 'returns', [returned, shipped]) }
  /** ETA: distance over speed. value ⌊distance / speed⌋. */
  static eta(distance: number, speed: number): CrossFormula { return c('delivery-eta', 'eta(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'eta', [distance, speed]) }
  /** PRODUCTIVITY: deliveries over hours worked. value ⌊deliveries / hours⌋. */
  static productivity(deliveries: number, hours: number): CrossFormula { return c('delivery-productivity', 'productivity(deliveries, hours) = ⌊deliveries / hours⌋', hours > 0 ? Math.floor(deliveries / hours) : 0, nat(deliveries, hours) && hours > 0, 'productivity', [deliveries, hours]) }
}

for (const name of ['density', 'eta', 'firstattempt', 'lastmile', 'ontime', 'productivity', 'returns', 'window'] as const)
  hexRegisterOf('delivery', name, (DeliveryFormulas[name] as (...x: unknown[]) => unknown).bind(DeliveryFormulas))
