import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRANSIT — A TRANSIT NETWORK AS ARITHMETIC (chosen by the public-API registry, not by hand). Moving people is numbers:
 *  riders carried, departures in a span, how full a vehicle runs, how often it is on time, stops per area, the fare a
 *  service recovers, minutes between vehicles, and the hours a line runs. Crosses to `transport` — transit is transport
 *  measured. A measure. */

const PROOF = 'transit arithmetic (ridership, frequency, load factor, on-time, coverage, farebox recovery, headway, service span); a public-registry domain; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'transit', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `transit.${name}`, params })

export class TransitFormulas {
  /** RIDERSHIP: riders carried over a day's trips at a per-trip average. value trips · perTrip. */
  static ridership(trips: number, perTrip: number): CrossFormula { return c('transit-ridership', 'ridership(trips, perTrip) = trips · perTrip', trips * perTrip, nat(trips, perTrip), 'ridership', [trips, perTrip]) }
  /** FREQUENCY: departures in a span of hours at a fixed interval (minutes). value ⌊hours · 60 / interval⌋. */
  static frequency(hours: number, interval: number): CrossFormula { return c('transit-frequency', 'frequency(hours, interval) = ⌊hours · 60 / interval⌋', interval > 0 ? Math.floor((hours * 60) / interval) : 0, nat(hours, interval) && interval > 0, 'frequency', [hours, interval]) }
  /** LOAD FACTOR: how full a vehicle runs, as a percentage. value ⌊riders · 100 / seats⌋. */
  static loadfactor(riders: number, seats: number): CrossFormula { return c('transit-loadfactor', 'loadfactor(riders, seats) = ⌊riders · 100 / seats⌋', seats > 0 ? Math.floor((riders * 100) / seats) : 0, nat(riders, seats) && seats > 0, 'loadfactor', [riders, seats]) }
  /** ON-TIME: the share of punctual trips, as a percentage. value ⌊punctual · 100 / total⌋. */
  static ontime(punctual: number, total: number): CrossFormula { return c('transit-ontime', 'ontime(punctual, total) = ⌊punctual · 100 / total⌋', total > 0 ? Math.floor((punctual * 100) / total) : 0, nat(punctual, total) && total > 0 && punctual <= total, 'ontime', [punctual, total]) }
  /** COVERAGE: stops served per unit of area. value ⌊stops / area⌋. */
  static coverage(stops: number, area: number): CrossFormula { return c('transit-coverage', 'coverage(stops, area) = ⌊stops / area⌋', area > 0 ? Math.floor(stops / area) : 0, nat(stops, area) && area > 0, 'coverage', [stops, area]) }
  /** FAREBOX RECOVERY: fare revenue over operating cost, as a percentage. value ⌊revenue · 100 / cost⌋. */
  static farebox(revenue: number, cost: number): CrossFormula { return c('transit-farebox', 'farebox(revenue, cost) = ⌊revenue · 100 / cost⌋', cost > 0 ? Math.floor((revenue * 100) / cost) : 0, nat(revenue, cost) && cost > 0, 'farebox', [revenue, cost]) }
  /** HEADWAY: minutes between vehicles over a span given the trips run. value ⌊span / trips⌋. */
  static headway(span: number, trips: number): CrossFormula { return c('transit-headway', 'headway(span, trips) = ⌊span / trips⌋', trips > 0 ? Math.floor(span / trips) : 0, nat(span, trips) && trips > 0, 'headway', [span, trips]) }
  /** SERVICE SPAN: the hours a line runs, from first to last. value max(0, last − first). */
  static span(first: number, last: number): CrossFormula { return c('transit-span', 'span(first, last) = max(0, last − first)', Math.max(0, last - first), nat(first, last), 'span', [first, last]) }
}

for (const name of ['coverage', 'farebox', 'frequency', 'headway', 'loadfactor', 'ontime', 'ridership', 'span'] as const)
  hexRegisterOf('transit', name, (TransitFormulas[name] as (...x: unknown[]) => unknown).bind(TransitFormulas))
