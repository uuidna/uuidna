import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KINEMATICS — MOTION AS ARITHMETIC (chosen by the mechanics registry, not by hand). Moving bodies are numbers: speed over
 *  a distance, how fast speed itself changes, the ground covered, momentum and kinetic energy carried, a projectile's range,
 *  the fall under gravity, and the impulse of a force. Crosses to `gravity` — motion is what gravity acts on. A measure. */

const PROOF = 'kinematics arithmetic (velocity, acceleration, displacement, momentum, kinetic energy, projectile range, free fall, impulse); motion as integers; a measure crossed to gravity'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'kinematics', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name: `kinematics.${name}`, params })

export class KinematicsFormulas {
  /** VELOCITY: distance over time. value ⌊distance / time⌋. */
  static velocity(distance: number, time: number): CrossFormula { return c('kinematics-velocity', 'velocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'velocity', [distance, time]) }
  /** ACCELERATION: change in velocity over time. value ⌊velocity / time⌋. */
  static acceleration(velocity: number, time: number): CrossFormula { return c('kinematics-acceleration', 'acceleration(velocity, time) = ⌊velocity / time⌋', time > 0 ? Math.floor(velocity / time) : 0, nat(velocity, time) && time > 0, 'acceleration', [velocity, time]) }
  /** DISPLACEMENT: the ground covered at a velocity over time. value velocity · time. */
  static displacement(velocity: number, time: number): CrossFormula { return c('kinematics-displacement', 'displacement(velocity, time) = velocity · time', velocity * time, nat(velocity, time), 'displacement', [velocity, time]) }
  /** MOMENTUM: mass carried at a velocity. value mass · velocity. */
  static momentum(mass: number, velocity: number): CrossFormula { return c('kinematics-momentum', 'momentum(mass, velocity) = mass · velocity', mass * velocity, nat(mass, velocity), 'momentum', [mass, velocity]) }
  /** KINETIC ENERGY: the energy of a moving mass. value ⌊mass · velocity² / 2⌋. */
  static kinetic(mass: number, velocity: number): CrossFormula { return c('kinematics-kinetic', 'kinetic(mass, velocity) = ⌊mass · velocity² / 2⌋', Math.floor((mass * velocity * velocity) / 2), nat(mass, velocity), 'kinetic', [mass, velocity]) }
  /** PROJECTILE: a range proxy from launch velocity under gravity. value ⌊velocity² / gravity⌋. */
  static projectile(velocity: number, gravity_: number): CrossFormula { return c('kinematics-projectile', 'projectile(velocity, gravity) = ⌊velocity² / gravity⌋', gravity_ > 0 ? Math.floor((velocity * velocity) / gravity_) : 0, nat(velocity, gravity_) && gravity_ > 0, 'projectile', [velocity, gravity_]) }
  /** FREE FALL: the distance dropped under gravity over time. value ⌊gravity · time² / 2⌋. */
  static freefall(gravity_: number, time: number): CrossFormula { return c('kinematics-freefall', 'freefall(gravity, time) = ⌊gravity · time² / 2⌋', Math.floor((gravity_ * time * time) / 2), nat(gravity_, time), 'freefall', [gravity_, time]) }
  /** IMPULSE: a force applied over time. value force · time. */
  static impulse(force: number, time: number): CrossFormula { return c('kinematics-impulse', 'impulse(force, time) = force · time', force * time, nat(force, time), 'impulse', [force, time]) }
}

for (const name of ['acceleration', 'displacement', 'freefall', 'impulse', 'kinetic', 'momentum', 'projectile', 'velocity'] as const)
  hexRegisterOf('kinematics', name, (KinematicsFormulas[name] as (...x: unknown[]) => unknown).bind(KinematicsFormulas))
