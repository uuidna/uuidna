import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RAILWAY — RUNNING A LINE, AS ARITHMETIC. Moving trains is numbers: the headway between services, the seats a
 *  consist carries, how punctual the timetable kept, the gradient of the track, how full a train is, the distance it
 *  needs to stop, the trains an hour the line clears, and how long it stands at a platform. Crosses to `transport` —
 *  railway is one way transport moves. A measure. */

const PROOF = 'railway arithmetic (headway, seat capacity, punctuality, gradient, load, braking distance, throughput, dwell); running a line as numbers; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'railway', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `railway.${name}`, params })

export class RailwayFormulas {
  /** BRAKING DISTANCE: from a speed at a deceleration. value ⌊speed² / (2 · deceleration)⌋. */
  static braking(speed: number, deceleration: number): CrossFormula { return c('railway-braking', 'braking(speed, deceleration) = ⌊speed² / (2 · deceleration)⌋', deceleration > 0 ? Math.floor((speed * speed) / (2 * deceleration)) : 0, nat(speed, deceleration) && deceleration > 0, 'braking', [speed, deceleration]) }
  /** SEAT CAPACITY: cars at seats each. value cars · seats. */
  static capacity(cars: number, seats: number): CrossFormula { return c('railway-capacity', 'capacity(cars, seats) = cars · seats', cars * seats, nat(cars, seats), 'capacity', [cars, seats]) }
  /** DWELL: seconds a train stands at a platform. value seconds. */
  static dwell(seconds: number): CrossFormula { return c('railway-dwell', 'dwell(seconds) = seconds', seconds, nat(seconds), 'dwell', [seconds]) }
  /** GRADIENT: rise over run, per mille. value ⌊rise · 1000 / run⌋. */
  static gradient(rise: number, run: number): CrossFormula { return c('railway-gradient', 'gradient(rise, run) = ⌊rise · 1000 / run⌋', run > 0 ? Math.floor((rise * 1000) / run) : 0, nat(rise, run) && run > 0, 'gradient', [rise, run]) }
  /** HEADWAY: the gap between trains over a period. value ⌊period / trains⌋. */
  static headway(period: number, trains: number): CrossFormula { return c('railway-headway', 'headway(period, trains) = ⌊period / trains⌋', trains > 0 ? Math.floor(period / trains) : 0, nat(period, trains) && trains > 0, 'headway', [period, trains]) }
  /** LOAD: passengers against capacity, as a percentage. value ⌊passengers · 100 / capacity⌋. */
  static load(passengers: number, capacity_: number): CrossFormula { return c('railway-load', 'load(passengers, capacity) = ⌊passengers · 100 / capacity⌋', capacity_ > 0 ? Math.floor((passengers * 100) / capacity_) : 0, nat(passengers, capacity_) && capacity_ > 0, 'load', [passengers, capacity_]) }
  /** PUNCTUALITY: on-time services as a percentage. value ⌊ontime · 100 / total⌋. */
  static punctuality(ontime: number, total: number): CrossFormula { return c('railway-punctuality', 'punctuality(ontime, total) = ⌊ontime · 100 / total⌋', total > 0 ? Math.floor((ontime * 100) / total) : 0, nat(ontime, total) && total > 0 && ontime <= total, 'punctuality', [ontime, total]) }
  /** THROUGHPUT: trains an hour over a span of hours. value ⌊trains / hours⌋. */
  static throughput(trains: number, hours: number): CrossFormula { return c('railway-throughput', 'throughput(trains, hours) = ⌊trains / hours⌋', hours > 0 ? Math.floor(trains / hours) : 0, nat(trains, hours) && hours > 0, 'throughput', [trains, hours]) }
}

for (const name of ['braking', 'capacity', 'dwell', 'gradient', 'headway', 'load', 'punctuality', 'throughput'] as const)
  hexRegisterOf('railway', name, (RailwayFormulas[name] as (...x: unknown[]) => unknown).bind(RailwayFormulas))
