import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACTUATION — MOVING THE WORLD, AS ARITHMETIC (chosen by the public-API registry, not by hand). Driving a load is
 *  numbers: the force a cylinder makes, the stroke a lead screw travels, a motor's holding torque, the duty cycle it can
 *  sustain, how long it takes to respond, the backlash a gear train accumulates, a joint's stiffness, and the thrust a
 *  screw converts torque into. Crosses to `mechanical` — actuation is what mechanics moves. A measure. */

const PROOF = 'actuation arithmetic (force, stroke, holding torque, duty cycle, response time, backlash, stiffness, thrust); a driven-motion domain chosen by the public-API registry; a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'actuation', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `actuation.${name}`, params })

export class ActuationFormulas {
  /** FORCE: a cylinder's pressure over its area. value pressure · area. */
  static force(pressure: number, area: number): CrossFormula { return c('actuation-force', 'force(pressure, area) = pressure · area', pressure * area, nat(pressure, area), 'force', [pressure, area]) }
  /** STROKE: a lead screw's travel, pitch per turn over the turns. value pitch · turns. */
  static stroke(pitch: number, turns: number): CrossFormula { return c('actuation-stroke', 'stroke(pitch, turns) = pitch · turns', pitch * turns, nat(pitch, turns), 'stroke', [pitch, turns]) }
  /** HOLDING TORQUE: current at the motor's torque constant. value current · kt. */
  static holdingtorque(current: number, kt: number): CrossFormula { return c('actuation-holdingtorque', 'holdingtorque(current, kt) = current · kt', current * kt, nat(current, kt), 'holdingtorque', [current, kt]) }
  /** DUTY CYCLE as a percentage: on-time over the full period. value ⌊on · 100 / total⌋. */
  static dutycycle(on: number, total: number): CrossFormula { return c('actuation-dutycycle', 'dutycycle(on, total) = ⌊on · 100 / total⌋', total > 0 ? Math.floor((on * 100) / total) : 0, nat(on, total) && total > 0 && on <= total, 'dutycycle', [on, total]) }
  /** RESPONSE TIME: the distance to cover at a slew speed. value ⌊distance / speed⌋. */
  static responsetime(distance: number, speed: number): CrossFormula { return c('actuation-responsetime', 'responsetime(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'responsetime', [distance, speed]) }
  /** BACKLASH: lost motion per stage, accumulated over a gear train. value clearance · stages. */
  static backlash(clearance: number, stages: number): CrossFormula { return c('actuation-backlash', 'backlash(clearance, stages) = clearance · stages', clearance * stages, nat(clearance, stages), 'backlash', [clearance, stages]) }
  /** STIFFNESS: the force a joint resists per unit of deflection. value ⌊force / deflection⌋. */
  static stiffness(force: number, deflection: number): CrossFormula { return c('actuation-stiffness', 'stiffness(force, deflection) = ⌊force / deflection⌋', deflection > 0 ? Math.floor(force / deflection) : 0, nat(force, deflection) && deflection > 0, 'stiffness', [force, deflection]) }
  /** THRUST: a lead screw converting torque, 2π scaled by 100, over the pitch. value ⌊torque · 628 / pitch⌋. */
  static thrust(torque: number, pitch: number): CrossFormula { return c('actuation-thrust', 'thrust(torque, pitch) = ⌊torque · 628 / pitch⌋', pitch > 0 ? Math.floor((torque * 628) / pitch) : 0, nat(torque, pitch) && pitch > 0, 'thrust', [torque, pitch]) }
}

for (const name of ['backlash', 'dutycycle', 'force', 'holdingtorque', 'responsetime', 'stiffness', 'stroke', 'thrust'] as const)
  hexRegisterOf('actuation', name, (ActuationFormulas[name] as (...x: unknown[]) => unknown).bind(ActuationFormulas))
