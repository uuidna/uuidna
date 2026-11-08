import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUTOMOTIVE — THE MOVING MACHINE, AS ARITHMETIC. A vehicle is numbers: horsepower from torque and rpm, fuel economy,
 *  acceleration, braking distance, engine displacement, emissions per distance, gear ratio, and the range a charge or
 *  tank affords. Crosses to `transport` — automotive is what transport is built from. A measure. */

const PROOF = 'automotive arithmetic (power, economy, acceleration, braking, displacement, emissions, gear ratio, range); the moving machine as integers; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'automotive', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `automotive.${name}`, params })

export class AutomotiveFormulas {
  /** POWER: a horsepower proxy from torque and rpm. value ⌊torque · rpm / 5252⌋. */
  static power(torque: number, rpm: number): CrossFormula { return c('automotive-power', 'power(torque, rpm) = ⌊torque · rpm / 5252⌋', Math.floor((torque * rpm) / 5252), nat(torque, rpm), 'power', [torque, rpm]) }
  /** FUEL ECONOMY: distance over fuel used. value ⌊distance / fuel⌋. */
  static economy(distance: number, fuel: number): CrossFormula { return c('automotive-economy', 'economy(distance, fuel) = ⌊distance / fuel⌋', fuel > 0 ? Math.floor(distance / fuel) : 0, nat(distance, fuel) && fuel > 0, 'economy', [distance, fuel]) }
  /** ACCELERATION: velocity gained over time. value ⌊velocity / time⌋. */
  static acceleration(velocity: number, time: number): CrossFormula { return c('automotive-acceleration', 'acceleration(velocity, time) = ⌊velocity / time⌋', time > 0 ? Math.floor(velocity / time) : 0, nat(velocity, time) && time > 0, 'acceleration', [velocity, time]) }
  /** BRAKING DISTANCE: the stopping distance at a deceleration. value ⌊velocity² / (2 · deceleration)⌋. */
  static braking(velocity: number, deceleration: number): CrossFormula { return c('automotive-braking', 'braking(velocity, deceleration) = ⌊velocity² / (2 · deceleration)⌋', deceleration > 0 ? Math.floor((velocity * velocity) / (2 * deceleration)) : 0, nat(velocity, deceleration) && deceleration > 0, 'braking', [velocity, deceleration]) }
  /** DISPLACEMENT: a swept-volume proxy from bore and stroke. value bore · stroke. */
  static displacement(bore: number, stroke: number): CrossFormula { return c('automotive-displacement', 'displacement(bore, stroke) = bore · stroke', bore * stroke, nat(bore, stroke), 'displacement', [bore, stroke]) }
  /** EMISSIONS: grams of output per unit distance. value ⌊grams / distance⌋. */
  static emissions(grams: number, distance: number): CrossFormula { return c('automotive-emissions', 'emissions(grams, distance) = ⌊grams / distance⌋', distance > 0 ? Math.floor(grams / distance) : 0, nat(grams, distance) && distance > 0, 'emissions', [grams, distance]) }
  /** GEAR RATIO: driven over drive, scaled by a hundred. value ⌊driven · 100 / drive⌋. */
  static ratio(driven: number, drive: number): CrossFormula { return c('automotive-ratio', 'ratio(driven, drive) = ⌊driven · 100 / drive⌋', drive > 0 ? Math.floor((driven * 100) / drive) : 0, nat(driven, drive) && drive > 0, 'ratio', [driven, drive]) }
  /** RANGE: the distance a capacity affords at a consumption rate. value ⌊capacity / consumption⌋. */
  static range(capacity: number, consumption: number): CrossFormula { return c('automotive-range', 'range(capacity, consumption) = ⌊capacity / consumption⌋', consumption > 0 ? Math.floor(capacity / consumption) : 0, nat(capacity, consumption) && consumption > 0, 'range', [capacity, consumption]) }
}

for (const name of ['acceleration', 'braking', 'displacement', 'economy', 'emissions', 'power', 'range', 'ratio'] as const)
  hexRegisterOf('automotive', name, (AutomotiveFormulas[name] as (...x: unknown[]) => unknown).bind(AutomotiveFormulas))
