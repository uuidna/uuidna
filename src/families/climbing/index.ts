import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLIMBING — THE SPORT, AS ARITHMETIC. A route is numbers: the grade climbed, the height gained, the length of each
 *  pitch, the effort against gravity, the send rate, the steepness of the wall, the grip as a fraction of bodyweight,
 *  and the rope played out per fall. Crosses to `fitness` — climbing is what fitness measures on the wall. A measure. */

const PROOF = 'climbing arithmetic (grade, gain, pitch, effort, sendrate, steepness, grip, rope); the sport as a measure crossed to fitness'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'climbing', dst: 'fitness', formula, value, proof: PROOF, ...extra }, holds, { name: `climbing.${name}`, params })

export class ClimbingFormulas {
  /** GRADE: the difficulty score of a route. value score. */
  static grade(score: number): CrossFormula { return c('climbing-grade', 'grade(score) = score', score, nat(score), 'grade', [score]) }
  /** GAIN: the height climbed from base to summit. value max(0, summit − base). */
  static gain(summit: number, base: number): CrossFormula { return c('climbing-gain', 'gain(summit, base) = max(0, summit − base)', Math.max(0, summit - base), nat(summit, base), 'gain', [summit, base]) }
  /** PITCH: the height of each pitch on a multi-pitch route. value ⌊height / pitches⌋. */
  static pitch(height: number, pitches: number): CrossFormula { return c('climbing-pitch', 'pitch(height, pitches) = ⌊height / pitches⌋', pitches > 0 ? Math.floor(height / pitches) : 0, nat(height, pitches) && pitches > 0, 'pitch', [height, pitches]) }
  /** EFFORT: work against gravity, weight over the height raised. value weight · height. */
  static effort(weight: number, height: number): CrossFormula { return c('climbing-effort', 'effort(weight, height) = weight · height', weight * height, nat(weight, height), 'effort', [weight, height]) }
  /** SENDRATE: clean sends as a percentage of attempts. value ⌊sent · 100 / attempts⌋. */
  static sendrate(sent: number, attempts: number): CrossFormula { return c('climbing-sendrate', 'sendrate(sent, attempts) = ⌊sent · 100 / attempts⌋', attempts > 0 ? Math.floor((sent * 100) / attempts) : 0, nat(sent, attempts) && attempts > 0 && sent <= attempts, 'sendrate', [sent, attempts]) }
  /** STEEPNESS: the wall angle, rise over run. value ⌊rise · 100 / run⌋. */
  static steepness(rise: number, run: number): CrossFormula { return c('climbing-steepness', 'steepness(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'steepness', [rise, run]) }
  /** GRIP: hold force as a percentage of bodyweight. value ⌊force · 100 / bodyweight⌋. */
  static grip(force: number, bodyweight: number): CrossFormula { return c('climbing-grip', 'grip(force, bodyweight) = ⌊force · 100 / bodyweight⌋', bodyweight > 0 ? Math.floor((force * 100) / bodyweight) : 0, nat(force, bodyweight) && bodyweight > 0, 'grip', [force, bodyweight]) }
  /** ROPE: length of rope played out per fall. value ⌊length / falls⌋. */
  static rope(length: number, falls: number): CrossFormula { return c('climbing-rope', 'rope(length, falls) = ⌊length / falls⌋', falls > 0 ? Math.floor(length / falls) : 0, nat(length, falls) && falls > 0, 'rope', [length, falls]) }
}

for (const name of ['effort', 'gain', 'grade', 'grip', 'pitch', 'rope', 'sendrate', 'steepness'] as const)
  hexRegisterOf('climbing', name, (ClimbingFormulas[name] as (...x: unknown[]) => unknown).bind(ClimbingFormulas))
