import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FLEET — RUNNING A FLEET AS ARITHMETIC. Vehicles are numbers: how many are up, how much they are down, how hard they
 *  are worked, what upkeep costs each one, how far through their life they are, how much they sit idle, when to replace
 *  them, and how noisy their telematics are. Crosses to `transport` — a fleet is what transport runs on. A measure. */

const PROOF = 'fleet arithmetic (availability, downtime, utilization, maintenance, lifecycle, idle, replacement, telematics); vehicles as a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fleet', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `fleet.${name}`, params })

export class FleetFormulas {
  /** AVAILABILITY as a percentage: the operational share of the fleet. value ⌊operational · 100 / total⌋. */
  static availability(operational: number, total: number): CrossFormula { return c('fleet-availability', 'availability(operational, total) = ⌊operational · 100 / total⌋', total > 0 ? Math.floor((operational * 100) / total) : 0, nat(operational, total) && total > 0 && operational <= total, 'availability', [operational, total]) }
  /** DOWNTIME as a percentage: hours lost over the total hours. value ⌊hours · 100 / total⌋. */
  static downtime(hours: number, total: number): CrossFormula { return c('fleet-downtime', 'downtime(hours, total) = ⌊hours · 100 / total⌋', total > 0 ? Math.floor((hours * 100) / total) : 0, nat(hours, total) && total > 0 && hours <= total, 'downtime', [hours, total]) }
  /** UTILIZATION as a percentage: the active share of the fleet. value ⌊active · 100 / fleet⌋. */
  static utilization(active: number, fleet_: number): CrossFormula { return c('fleet-utilization', 'utilization(active, fleet) = ⌊active · 100 / fleet⌋', fleet_ > 0 ? Math.floor((active * 100) / fleet_) : 0, nat(active, fleet_) && fleet_ > 0 && active <= fleet_, 'utilization', [active, fleet_]) }
  /** MAINTENANCE: upkeep cost per vehicle. value ⌊cost / vehicles⌋. */
  static maintenance(cost: number, vehicles: number): CrossFormula { return c('fleet-maintenance', 'maintenance(cost, vehicles) = ⌊cost / vehicles⌋', vehicles > 0 ? Math.floor(cost / vehicles) : 0, nat(cost, vehicles) && vehicles > 0, 'maintenance', [cost, vehicles]) }
  /** LIFECYCLE as a percentage: mileage against the service threshold. value ⌊mileage · 100 / threshold⌋. */
  static lifecycle(mileage: number, threshold: number): CrossFormula { return c('fleet-lifecycle', 'lifecycle(mileage, threshold) = ⌊mileage · 100 / threshold⌋', threshold > 0 ? Math.floor((mileage * 100) / threshold) : 0, nat(mileage, threshold) && threshold > 0, 'lifecycle', [mileage, threshold]) }
  /** IDLE as a percentage: idle share of the fleet. value ⌊idle · 100 / total⌋. */
  static idle(idle_: number, total: number): CrossFormula { return c('fleet-idle', 'idle(idle, total) = ⌊idle · 100 / total⌋', total > 0 ? Math.floor((idle_ * 100) / total) : 0, nat(idle_, total) && total > 0 && idle_ <= total, 'idle', [idle_, total]) }
  /** REPLACEMENT as a percentage: age against expected lifespan. value ⌊age · 100 / lifespan⌋. */
  static replacement(age: number, lifespan: number): CrossFormula { return c('fleet-replacement', 'replacement(age, lifespan) = ⌊age · 100 / lifespan⌋', lifespan > 0 ? Math.floor((age * 100) / lifespan) : 0, nat(age, lifespan) && lifespan > 0, 'replacement', [age, lifespan]) }
  /** TELEMATICS: events logged per trip. value ⌊events / trips⌋. */
  static telematics(events: number, trips: number): CrossFormula { return c('fleet-telematics', 'telematics(events, trips) = ⌊events / trips⌋', trips > 0 ? Math.floor(events / trips) : 0, nat(events, trips) && trips > 0, 'telematics', [events, trips]) }
}

for (const name of ['availability', 'downtime', 'idle', 'lifecycle', 'maintenance', 'replacement', 'telematics', 'utilization'] as const)
  hexRegisterOf('fleet', name, (FleetFormulas[name] as (...x: unknown[]) => unknown).bind(FleetFormulas))
