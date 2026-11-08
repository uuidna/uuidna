import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MANIPULATOR — A ROBOT ARM, AS ARITHMETIC (chosen by the mechanism registry, not by hand). A manipulator is numbers:
 *  the degrees of freedom left after locking joints, total reach, the payload a joint torque holds, swept workspace,
 *  a joint's range of motion, repeatability, end-effector speed, and how many singular configurations it has. Crosses
 *  to `kinematics` — a manipulator is the body kinematics describes. A measure. */

const PROOF = 'manipulator arithmetic (dof, reach, payload, workspace, joint range, repeatability, link speed, singularities); the mechanism the kinematics domain describes; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'manipulator', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `manipulator.${name}`, params })

export class ManipulatorFormulas {
  /** DEGREES OF FREEDOM: the joints that stay free after locking some. value max(0, joints − locked). */
  static dof(joints: number, locked: number): CrossFormula { return c('manipulator-dof', 'dof(joints, locked) = max(0, joints − locked)', Math.max(0, joints - locked), nat(joints, locked), 'dof', [joints, locked]) }
  /** REACH: links of a given length, extended. value links · length. */
  static reach(links: number, length: number): CrossFormula { return c('manipulator-reach', 'reach(links, length) = links · length', links * length, nat(links, length), 'reach', [links, length]) }
  /** PAYLOAD: the force a joint torque holds at the arm length. value ⌊torque / armlen⌋. */
  static payload(torque: number, armlen: number): CrossFormula { return c('manipulator-payload', 'payload(torque, armlen) = ⌊torque / armlen⌋', armlen > 0 ? Math.floor(torque / armlen) : 0, nat(torque, armlen) && armlen > 0, 'payload', [torque, armlen]) }
  /** WORKSPACE: the volume a reach sweeps over a height (radius² · height, no π). value radius · radius · height. */
  static workspace(radius: number, height: number): CrossFormula { return c('manipulator-workspace', 'workspace(radius, height) = radius · radius · height', radius * radius * height, nat(radius, height), 'workspace', [radius, height]) }
  /** JOINT RANGE: a joint's range of motion between its limits. value max(0, hi − lo). */
  static jointrange(hi: number, lo: number): CrossFormula { return c('manipulator-jointrange', 'jointrange(hi, lo) = max(0, hi − lo)', Math.max(0, hi - lo), nat(hi, lo), 'jointrange', [hi, lo]) }
  /** REPEATABILITY: the average spread over repeated samples. value ⌊spread / samples⌋. */
  static repeatability(spread: number, samples: number): CrossFormula { return c('manipulator-repeatability', 'repeatability(spread, samples) = ⌊spread / samples⌋', samples > 0 ? Math.floor(spread / samples) : 0, nat(spread, samples) && samples > 0, 'repeatability', [spread, samples]) }
  /** LINK SPEED: the end-effector speed, distance over time. value ⌊distance / time⌋. */
  static linkspeed(distance: number, time: number): CrossFormula { return c('manipulator-linkspeed', 'linkspeed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'linkspeed', [distance, time]) }
  /** SINGULARITIES: the singular configurations, counted over the wrist, elbow, and shoulder. value wrist + elbow + shoulder. */
  static singularities(wrist: number, elbow: number, shoulder: number): CrossFormula { return c('manipulator-singularities', 'singularities(wrist, elbow, shoulder) = wrist + elbow + shoulder', wrist + elbow + shoulder, nat(wrist, elbow, shoulder), 'singularities', [wrist, elbow, shoulder]) }
}

for (const name of ['dof', 'jointrange', 'linkspeed', 'payload', 'reach', 'repeatability', 'singularities', 'workspace'] as const)
  hexRegisterOf('manipulator', name, (ManipulatorFormulas[name] as (...x: unknown[]) => unknown).bind(ManipulatorFormulas))
