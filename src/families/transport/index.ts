import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRANSPORT — TRANSPORTATION AND TRAFFIC, AS ARITHMETIC (chosen by the public-API registry, not by hand). Moving people and
 *  freight is numbers: speed over a distance, arrival time, fuel burned, the seats a fleet carries, how full it rides, the
 *  gap between vehicles, emissions, and road congestion. Crosses to `econ` — transport is what the economy moves on. A measure. */

const PROOF = 'transport arithmetic (speed, eta, fuel, capacity, occupancy, headway, emissions, congestion); transportation and traffic as integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'transport', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `transport.${name}`, params })

export class TransportFormulas {
  /** SPEED: distance over the time taken. value ⌊distance / time⌋. */
  static speed(distance: number, time: number): CrossFormula { return c('transport-speed', 'speed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'speed', [distance, time]) }
  /** ETA: the distance remaining at a speed. value ⌈distance / speed⌉. */
  static eta(distance: number, speed: number): CrossFormula { return c('transport-eta', 'eta(distance, speed) = ⌈distance / speed⌉', speed > 0 ? Math.ceil(distance / speed) : 0, nat(distance, speed) && speed > 0, 'eta', [distance, speed]) }
  /** FUEL: distance at a distance-per-unit efficiency. value ⌊distance / efficiency⌋. */
  static fuel(distance: number, efficiency: number): CrossFormula { return c('transport-fuel', 'fuel(distance, efficiency) = ⌊distance / efficiency⌋', efficiency > 0 ? Math.floor(distance / efficiency) : 0, nat(distance, efficiency) && efficiency > 0, 'fuel', [distance, efficiency]) }
  /** CAPACITY: seats per vehicle across the fleet. value seats · vehicles. */
  static capacity(seats: number, vehicles: number): CrossFormula { return c('transport-capacity', 'capacity(seats, vehicles) = seats · vehicles', seats * vehicles, nat(seats, vehicles), 'capacity', [seats, vehicles]) }
  /** OCCUPANCY as a percentage of capacity. value ⌊riders · 100 / capacity⌋. */
  static occupancy(riders: number, capacity: number): CrossFormula { return c('transport-occupancy', 'occupancy(riders, capacity) = ⌊riders · 100 / capacity⌋', capacity > 0 ? Math.floor((riders * 100) / capacity) : 0, nat(riders, capacity) && capacity > 0 && riders <= capacity, 'occupancy', [riders, capacity]) }
  /** HEADWAY: the service period split across the vehicles. value ⌊period / vehicles⌋. */
  static headway(period: number, vehicles: number): CrossFormula { return c('transport-headway', 'headway(period, vehicles) = ⌊period / vehicles⌋', vehicles > 0 ? Math.floor(period / vehicles) : 0, nat(period, vehicles) && vehicles > 0, 'headway', [period, vehicles]) }
  /** EMISSIONS: distance at a per-distance factor. value distance · factor. */
  static emissions(distance: number, factor: number): CrossFormula { return c('transport-emissions', 'emissions(distance, factor) = distance · factor', distance * factor, nat(distance, factor), 'emissions', [distance, factor]) }
  /** CONGESTION: actual travel time against free-flow, as a percentage. value ⌊actual · 100 / free⌋. */
  static congestion(actual: number, free: number): CrossFormula { return c('transport-congestion', 'congestion(actual, free) = ⌊actual · 100 / free⌋', free > 0 ? Math.floor((actual * 100) / free) : 0, nat(actual, free) && free > 0, 'congestion', [actual, free]) }
}

for (const name of ['capacity', 'congestion', 'emissions', 'eta', 'fuel', 'headway', 'occupancy', 'speed'] as const)
  hexRegisterOf('transport', name, (TransportFormulas[name] as (...x: unknown[]) => unknown).bind(TransportFormulas))
