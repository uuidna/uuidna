import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRUCKING — FREIGHT HAULING AS ARITHMETIC (chosen by the public-API registry, not by hand). Moving freight is numbers:
 *  cost by the mile, fuel burned per gallon, how full the load is, the empty miles run, how busy the truck is, the hours
 *  a driver has left, the turnaround, and the payload share of the gross. Crosses to `transport` — trucking is what moves
 *  the goods. A measure. */

const PROOF = 'trucking arithmetic (cost per mile, fuel efficiency, load factor, deadhead, utilization, hours of service, turnaround, payload); a freight domain; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'trucking', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `trucking.${name}`, params })

export class TruckingFormulas {
  /** COST PER MILE: total cost over the miles driven. value ⌊cost / miles⌋. */
  static costpermile(cost: number, miles: number): CrossFormula { return c('trucking-costpermile', 'costpermile(cost, miles) = ⌊cost / miles⌋', miles > 0 ? Math.floor(cost / miles) : 0, nat(cost, miles) && miles > 0, 'costpermile', [cost, miles]) }
  /** FUEL EFFICIENCY: miles over gallons burned. value ⌊miles / gallons⌋. */
  static fuelefficiency(miles: number, gallons: number): CrossFormula { return c('trucking-fuelefficiency', 'fuelefficiency(miles, gallons) = ⌊miles / gallons⌋', gallons > 0 ? Math.floor(miles / gallons) : 0, nat(miles, gallons) && gallons > 0, 'fuelefficiency', [miles, gallons]) }
  /** LOAD FACTOR: loaded weight against capacity, as a percentage. value ⌊loaded · 100 / capacity⌋. */
  static loadfactor(loaded: number, capacity: number): CrossFormula { return c('trucking-loadfactor', 'loadfactor(loaded, capacity) = ⌊loaded · 100 / capacity⌋', capacity > 0 ? Math.floor((loaded * 100) / capacity) : 0, nat(loaded, capacity) && capacity > 0 && loaded <= capacity, 'loadfactor', [loaded, capacity]) }
  /** DEADHEAD: empty miles against total miles, as a percentage. value ⌊empty · 100 / total⌋. */
  static deadhead(empty: number, total: number): CrossFormula { return c('trucking-deadhead', 'deadhead(empty, total) = ⌊empty · 100 / total⌋', total > 0 ? Math.floor((empty * 100) / total) : 0, nat(empty, total) && total > 0 && empty <= total, 'deadhead', [empty, total]) }
  /** UTILIZATION: miles driven against miles available, as a percentage. value ⌊driven · 100 / available⌋. */
  static utilization(driven: number, available: number): CrossFormula { return c('trucking-utilization', 'utilization(driven, available) = ⌊driven · 100 / available⌋', available > 0 ? Math.floor((driven * 100) / available) : 0, nat(driven, available) && available > 0 && driven <= available, 'utilization', [driven, available]) }
  /** HOURS OF SERVICE: the hours a driver has left under the limit. value max(0, limit − driven). */
  static hoursofservice(driven: number, limit: number): CrossFormula { return c('trucking-hoursofservice', 'hoursofservice(driven, limit) = max(0, limit − driven)', Math.max(0, limit - driven), nat(driven, limit), 'hoursofservice', [driven, limit]) }
  /** TURNAROUND: the hours a load spends in turnaround. value hours. */
  static turnaround(hours: number): CrossFormula { return c('trucking-turnaround', 'turnaround(hours) = hours', hours, nat(hours), 'turnaround', [hours]) }
  /** PAYLOAD: the cargo share of the gross weight, as a percentage. value ⌊cargo · 100 / gross⌋. */
  static payload(cargo: number, gross: number): CrossFormula { return c('trucking-payload', 'payload(cargo, gross) = ⌊cargo · 100 / gross⌋', gross > 0 ? Math.floor((cargo * 100) / gross) : 0, nat(cargo, gross) && gross > 0 && cargo <= gross, 'payload', [cargo, gross]) }
}

for (const name of ['costpermile', 'deadhead', 'fuelefficiency', 'hoursofservice', 'loadfactor', 'payload', 'turnaround', 'utilization'] as const)
  hexRegisterOf('trucking', name, (TruckingFormulas[name] as (...x: unknown[]) => unknown).bind(TruckingFormulas))
