import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KINESIOLOGY — HUMAN MOVEMENT AS ARITHMETIC (chosen by the registry, not by hand). Motion is numbers: the range a joint
 *  travels, flexion and extension of an angle, the fraction of muscle fibres recruited, the angle at a joint, the torque a
 *  muscle makes at its moment arm, how far a muscle shortens, and whether sway stays inside a limit. Crosses to `anatomy` —
 *  kinesiology is movement of the body anatomy describes. A measure. */

const PROOF = 'kinesiology arithmetic (range of motion, flexion, extension, muscle activation, joint angle, moment-arm torque, contraction, balance); movement of the anatomy; a measure crossed to anatomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'kinesiology', dst: 'anatomy', formula, value, proof: PROOF, ...extra }, holds, { name: `kinesiology.${name}`, params })

export class KinesiologyFormulas {
  /** RANGE OF MOTION: the degrees a joint travels, extension limit minus flexion limit. value max(0, max − min). */
  static rangeofmotion(max: number, min: number): CrossFormula { return c('kinesiology-rangeofmotion', 'rangeofmotion(max, min) = max(0, max − min)', Math.max(0, max - min), nat(max, min) && max >= min, 'rangeofmotion', [max, min]) }
  /** FLEXION: bending adds degrees to a joint angle. value angle + delta. */
  static flexion(angle: number, delta: number): CrossFormula { return c('kinesiology-flexion', 'flexion(angle, delta) = angle + delta', angle + delta, nat(angle, delta), 'flexion', [angle, delta]) }
  /** EXTENSION: straightening removes degrees from a joint angle. value max(0, angle − delta). */
  static extension(angle: number, delta: number): CrossFormula { return c('kinesiology-extension', 'extension(angle, delta) = max(0, angle − delta)', Math.max(0, angle - delta), nat(angle, delta) && angle >= delta, 'extension', [angle, delta]) }
  /** MUSCLE ACTIVATION: the percentage of fibres recruited. value ⌊active · 100 / total⌋. */
  static muscleactivation(active: number, total: number): CrossFormula { return c('kinesiology-muscleactivation', 'muscleactivation(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'muscleactivation', [active, total]) }
  /** JOINT ANGLE: a travelled arc shared over its segments. value ⌊total / count⌋. */
  static jointangle(total: number, count: number): CrossFormula { return c('kinesiology-jointangle', 'jointangle(total, count) = ⌊total / count⌋', count > 0 ? Math.floor(total / count) : 0, nat(total, count) && count > 0, 'jointangle', [total, count]) }
  /** MOMENT ARM: the torque a force makes at a lever distance. value force · distance. */
  static momentarm(force: number, distance: number): CrossFormula { return c('kinesiology-momentarm', 'momentarm(force, distance) = force · distance', force * distance, nat(force, distance), 'momentarm', [force, distance]) }
  /** CONTRACTION: how far a muscle shortens from rest. value max(0, rest − current). */
  static contraction(rest: number, current: number): CrossFormula { return c('kinesiology-contraction', 'contraction(rest, current) = max(0, rest − current)', Math.max(0, rest - current), nat(rest, current) && rest >= current, 'contraction', [rest, current]) }
  /** BALANCE: 1 when measured sway stays inside the limit. value [sway ≤ limit]. */
  static balance(sway: number, limit: number): CrossFormula { return c('kinesiology-balance', 'balance(sway, limit) = [sway ≤ limit]', sway <= limit ? 1 : 0, nat(sway, limit), 'balance', [sway, limit]) }
}

for (const name of ['balance', 'contraction', 'extension', 'flexion', 'jointangle', 'momentarm', 'muscleactivation', 'rangeofmotion'] as const)
  hexRegisterOf('kinesiology', name, (KinesiologyFormulas[name] as (...x: unknown[]) => unknown).bind(KinesiologyFormulas))
