import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RAIL — RUNNING A RAILWAY, AS ARITHMETIC (chosen by the public-API registry, not by hand). A railway is numbers: the seats
 *  a train carries, the minutes between trains, the grade of the line, the gauge left after wear, the trailing tonnage, the
 *  seconds a train dwells at a platform, the passengers an hour of service moves, and the cars a load needs. Crosses to
 *  `transport` — rail is one way a network moves people and freight. A measure. */

const PROOF = 'rail arithmetic (seat capacity, headway, gradient, gauge, trailing tonnage, platform dwell, hourly throughput, consist length); a public-API registry domain; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rail', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `rail.${name}`, params })

export class RailFormulas {
  /** CAPACITY: seats a train carries, cars at a per-car seat count. value cars · seats. */
  static capacity(cars: number, seats: number): CrossFormula { return c('rail-capacity', 'capacity(cars, seats) = cars · seats', cars * seats, nat(cars, seats), 'capacity', [cars, seats]) }
  /** HEADWAY: minutes between trains, a cycle shared by the trains on the line. value ⌊cycle / trains⌋. */
  static headway(cycle: number, trains: number): CrossFormula { return c('rail-headway', 'headway(cycle, trains) = ⌊cycle / trains⌋', trains > 0 ? Math.floor(cycle / trains) : 0, nat(cycle, trains) && trains > 0, 'headway', [cycle, trains]) }
  /** GRADIENT: the grade of the line in per mille, rise over run. value ⌊rise · 1000 / run⌋. */
  static gradient(rise: number, run: number): CrossFormula { return c('rail-gradient', 'gradient(rise, run) = ⌊rise · 1000 / run⌋', run > 0 ? Math.floor((rise * 1000) / run) : 0, nat(rise, run) && run > 0, 'gradient', [rise, run]) }
  /** GAUGE: the track gauge left after wear takes from the nominal width. value max(0, nominal − wear). */
  static gauge(nominal: number, wear: number): CrossFormula { return c('rail-gauge', 'gauge(nominal, wear) = max(0, nominal − wear)', Math.max(0, nominal - wear), nat(nominal, wear) && wear <= nominal, 'gauge', [nominal, wear]) }
  /** TONNAGE: trailing tonnage, wagons at a load each. value wagons · load. */
  static tonnage(wagons: number, load: number): CrossFormula { return c('rail-tonnage', 'tonnage(wagons, load) = wagons · load', wagons * load, nat(wagons, load), 'tonnage', [wagons, load]) }
  /** DWELL: seconds a train dwells at a platform, passengers over a boarding rate. value ⌈passengers / rate⌉. */
  static dwell(passengers: number, rate: number): CrossFormula { return c('rail-dwell', 'dwell(passengers, rate) = ⌈passengers / rate⌉', rate > 0 ? Math.ceil(passengers / rate) : 0, nat(passengers, rate) && rate > 0, 'dwell', [passengers, rate]) }
  /** THROUGHPUT: passengers an hour of service moves, trains at a capacity each. value trains · capacity. */
  static throughput(trains: number, capacity: number): CrossFormula { return c('rail-throughput', 'throughput(trains, capacity) = trains · capacity', trains * capacity, nat(trains, capacity), 'throughput', [trains, capacity]) }
  /** CONSIST: the cars a load needs at a per-car capacity. value ⌈load / perCar⌉. */
  static consist(load: number, perCar: number): CrossFormula { return c('rail-consist', 'consist(load, perCar) = ⌈load / perCar⌉', perCar > 0 ? Math.ceil(load / perCar) : 0, nat(load, perCar) && perCar > 0, 'consist', [load, perCar]) }
}

for (const name of ['capacity', 'consist', 'dwell', 'gauge', 'gradient', 'headway', 'throughput', 'tonnage'] as const)
  hexRegisterOf('rail', name, (RailFormulas[name] as (...x: unknown[]) => unknown).bind(RailFormulas))
