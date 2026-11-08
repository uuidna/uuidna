import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DYNAMICS — NEWTONIAN MOTION, AS ARITHMETIC. A moving body is numbers: the force an acceleration needs, momentum, the
 *  impulse of a push, kinetic energy, the work a force does over a distance, power, the acceleration of a velocity change,
 *  and the momentum two bodies carry away stuck together. Crosses to `kinematics` — dynamics is the forces behind the
 *  motion kinematics describes. A measure. */

const PROOF = 'dynamics arithmetic (force, momentum, impulse, kinetic energy, work, power, acceleration, inelastic collision); Newtonian motion as integers; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dynamics', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `dynamics.${name}`, params })

export class DynamicsFormulas {
  /** FORCE: Newton's second law, mass times acceleration. value mass · accel. */
  static force(mass: number, accel: number): CrossFormula { return c('dynamics-force', 'force(mass, accel) = mass · accel', mass * accel, nat(mass, accel), 'force', [mass, accel]) }
  /** MOMENTUM: mass in motion. value mass · velocity. */
  static momentum(mass: number, velocity: number): CrossFormula { return c('dynamics-momentum', 'momentum(mass, velocity) = mass · velocity', mass * velocity, nat(mass, velocity), 'momentum', [mass, velocity]) }
  /** IMPULSE: a force applied over a time. value force · time. */
  static impulse(force: number, time: number): CrossFormula { return c('dynamics-impulse', 'impulse(force, time) = force · time', force * time, nat(force, time), 'impulse', [force, time]) }
  /** KINETIC ENERGY: half mass times velocity squared. value ⌊mass · velocity² / 2⌋. */
  static kineticenergy(mass: number, velocity: number): CrossFormula { return c('dynamics-kineticenergy', 'kineticenergy(mass, velocity) = ⌊mass · velocity² / 2⌋', Math.floor((mass * velocity * velocity) / 2), nat(mass, velocity), 'kineticenergy', [mass, velocity]) }
  /** WORK: a force over a distance. value force · distance. */
  static work(force: number, distance: number): CrossFormula { return c('dynamics-work', 'work(force, distance) = force · distance', force * distance, nat(force, distance), 'work', [force, distance]) }
  /** POWER: work done over the time it took. value ⌊work / time⌋. */
  static power(work: number, time: number): CrossFormula { return c('dynamics-power', 'power(work, time) = ⌊work / time⌋', time > 0 ? Math.floor(work / time) : 0, nat(work, time) && time > 0, 'power', [work, time]) }
  /** ACCELERATION: a change in velocity over a time. value ⌊deltav / time⌋. */
  static acceleration(deltav: number, time: number): CrossFormula { return c('dynamics-acceleration', 'acceleration(deltav, time) = ⌊deltav / time⌋', time > 0 ? Math.floor(deltav / time) : 0, nat(deltav, time) && time > 0, 'acceleration', [deltav, time]) }
  /** COLLISION: perfectly inelastic — two masses stuck together carry momentum (m1 + m2) · velocity. value (m1 + m2) · velocity. */
  static collision(m1: number, m2: number, velocity: number): CrossFormula { return c('dynamics-collision', 'collision(m1, m2, velocity) = (m1 + m2) · velocity', (m1 + m2) * velocity, nat(m1, m2, velocity), 'collision', [m1, m2, velocity]) }
}

for (const name of ['acceleration', 'collision', 'force', 'impulse', 'kineticenergy', 'momentum', 'power', 'work'] as const)
  hexRegisterOf('dynamics', name, (DynamicsFormulas[name] as (...x: unknown[]) => unknown).bind(DynamicsFormulas))
