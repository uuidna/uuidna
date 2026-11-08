import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ROBOTICS — A MOVING MACHINE, AS ARITHMETIC (chosen by the registry, not by hand). A robot is numbers: the degrees of
 *  freedom its joints give, the torque a force makes at a radius, the reach of its segments, how fast it covers a distance,
 *  the payload it still carries, its accuracy over a range, how long the battery lasts, and the work a cycle does. Crosses
 *  to `obs` — robotics is what observability watches. A measure. */

const PROOF = 'robotics arithmetic (degrees of freedom, torque, reach, speed, payload, accuracy, battery, cycle); a moving machine as numbers; a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'robotics', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `robotics.${name}`, params })

export class RoboticsFormulas {
  /** DEGREES OF FREEDOM: one per joint. value joints. */
  static degrees(joints: number): CrossFormula { return c('robotics-degrees', 'degrees(joints) = joints', joints, nat(joints), 'degrees', [joints]) }
  /** TORQUE: a force at a radius. value force · radius. */
  static torque(force: number, radius: number): CrossFormula { return c('robotics-torque', 'torque(force, radius) = force · radius', force * radius, nat(force, radius), 'torque', [force, radius]) }
  /** REACH: segments at a length each. value segments · length. */
  static reach(segments: number, length: number): CrossFormula { return c('robotics-reach', 'reach(segments, length) = segments · length', segments * length, nat(segments, length), 'reach', [segments, length]) }
  /** SPEED: distance over time. value ⌊distance / time⌋. */
  static speed(distance: number, time: number): CrossFormula { return c('robotics-speed', 'speed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'speed', [distance, time]) }
  /** PAYLOAD: capacity less weight, never below zero. value max(0, capacity − weight). */
  static payload(capacity: number, weight: number): CrossFormula { return c('robotics-payload', 'payload(capacity, weight) = max(0, capacity − weight)', Math.max(0, capacity - weight), nat(capacity, weight), 'payload', [capacity, weight]) }
  /** ACCURACY: error as a percentage of range. value ⌊error · 100 / range⌋. */
  static accuracy(error: number, range: number): CrossFormula { return c('robotics-accuracy', 'accuracy(error, range) = ⌊error · 100 / range⌋', range > 0 ? Math.floor((error * 100) / range) : 0, nat(error, range) && range > 0, 'accuracy', [error, range]) }
  /** BATTERY: capacity over draw. value ⌊capacity / draw⌋. */
  static battery(capacity: number, draw: number): CrossFormula { return c('robotics-battery', 'battery(capacity, draw) = ⌊capacity / draw⌋', draw > 0 ? Math.floor(capacity / draw) : 0, nat(capacity, draw) && draw > 0, 'battery', [capacity, draw]) }
  /** CYCLE: steps at a cost each. value steps · perStep. */
  static cycle(steps: number, perStep: number): CrossFormula { return c('robotics-cycle', 'cycle(steps, perStep) = steps · perStep', steps * perStep, nat(steps, perStep), 'cycle', [steps, perStep]) }
}

for (const name of ['accuracy', 'battery', 'cycle', 'degrees', 'payload', 'reach', 'speed', 'torque'] as const)
  hexRegisterOf('robotics', name, (RoboticsFormulas[name] as (...x: unknown[]) => unknown).bind(RoboticsFormulas))
