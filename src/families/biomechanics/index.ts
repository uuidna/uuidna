import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOMECHANICS — THE BODY AS MECHANISM, AS ARITHMETIC. Movement is numbers: the torque a muscle makes about a joint, the
 *  moment of inertia of a limb, the power in a lift, the impulse of a step, the ground reaction a stride returns, the
 *  leverage of a lever system, the workload of a session, and the cadence of a gait. Crosses to `mechanical` — the body
 *  obeys the same statics and dynamics as any machine. A measure. */

const PROOF = 'biomechanics arithmetic (joint torque, limb moment of inertia, lift power, step impulse, ground reaction, lever leverage, session workload, gait cadence); the body as mechanism; a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biomechanics', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `biomechanics.${name}`, params })

export class BiomechanicsFormulas {
  /** JOINT TORQUE: a force on a moment arm about a joint. value force · radius. */
  static torque(force: number, radius: number): CrossFormula { return c('biomechanics-torque', 'torque(force, radius) = force · radius', force * radius, nat(force, radius), 'torque', [force, radius]) }
  /** MOMENT OF INERTIA of a limb as a point mass at a radius. value mass · radius². */
  static moment(mass: number, radius: number): CrossFormula { return c('biomechanics-moment', 'moment(mass, radius) = mass · radius²', mass * radius * radius, nat(mass, radius), 'moment', [mass, radius]) }
  /** POWER in a lift: work done over the time taken. value ⌊work / time⌋. */
  static power(work: number, time: number): CrossFormula { return c('biomechanics-power', 'power(work, time) = ⌊work / time⌋', time > 0 ? Math.floor(work / time) : 0, nat(work, time) && time > 0, 'power', [work, time]) }
  /** IMPULSE of a step: a force applied over a contact time. value force · time. */
  static impulse(force: number, time: number): CrossFormula { return c('biomechanics-impulse', 'impulse(force, time) = force · time', force * time, nat(force, time), 'impulse', [force, time]) }
  /** GROUND REACTION FORCE under acceleration: mass times gravity (10) plus accel. value mass · (accel + 10). */
  static groundreaction(mass: number, accel: number): CrossFormula { return c('biomechanics-groundreaction', 'groundreaction(mass, accel) = mass · (accel + 10)', mass * (accel + 10), nat(mass, accel), 'groundreaction', [mass, accel]) }
  /** LEVERAGE: the mechanical advantage of a lever, effort arm over load arm. value ⌊effort / load⌋. */
  static leverage(effort: number, load: number): CrossFormula { return c('biomechanics-leverage', 'leverage(effort, load) = ⌊effort / load⌋', load > 0 ? Math.floor(effort / load) : 0, nat(effort, load) && load > 0, 'leverage', [effort, load]) }
  /** WORKLOAD of a session: reps at a load each (training volume). value reps · weight. */
  static workload(reps: number, weight: number): CrossFormula { return c('biomechanics-workload', 'workload(reps, weight) = reps · weight', reps * weight, nat(reps, weight), 'workload', [reps, weight]) }
  /** GAIT CADENCE: steps taken over the time taken. value ⌊steps / time⌋. */
  static gait(steps: number, time: number): CrossFormula { return c('biomechanics-gait', 'gait(steps, time) = ⌊steps / time⌋', time > 0 ? Math.floor(steps / time) : 0, nat(steps, time) && time > 0, 'gait', [steps, time]) }
}

for (const name of ['gait', 'groundreaction', 'impulse', 'leverage', 'moment', 'power', 'torque', 'workload'] as const)
  hexRegisterOf('biomechanics', name, (BiomechanicsFormulas[name] as (...x: unknown[]) => unknown).bind(BiomechanicsFormulas))
