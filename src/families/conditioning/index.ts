import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONDITIONING — TRAINING THE BODY, AS ARITHMETIC (chosen by the exercise-science registry, not by hand). Getting fit is
 *  numbers: aerobic power from the pulse, the max heart rate for an age, a session's load, the volume lifted, intensity as a
 *  share of a max, a target heart-rate zone, how fast the pulse recovers, and a one-rep max. Crosses to `physiology` —
 *  conditioning is what the body's physiology adapts to. A measure. */

const PROOF = 'conditioning arithmetic (vo2 max, max heart rate, session load, lifted volume, intensity, heart-rate zone, recovery, one-rep max); the exercise-science domain; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'conditioning', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `conditioning.${name}`, params })

export class ConditioningFormulas {
  /** VO2 MAX: aerobic power from the pulse ratio (Uth–Sørensen). value ⌊15 · hrmax / hrrest⌋. */
  static vo2max(hrmax: number, hrrest: number): CrossFormula { return c('conditioning-vo2max', 'vo2max(hrmax, hrrest) = ⌊15 · hrmax / hrrest⌋', hrrest > 0 ? Math.floor((15 * hrmax) / hrrest) : 0, nat(hrmax, hrrest) && hrrest > 0 && hrmax >= hrrest, 'vo2max', [hrmax, hrrest]) }
  /** MAX HEART RATE for an age. value max(0, 220 − age). */
  static heartrate(age: number): CrossFormula { return c('conditioning-heartrate', 'heartrate(age) = max(0, 220 − age)', Math.max(0, 220 - age), nat(age) && age <= 220, 'heartrate', [age]) }
  /** SESSION LOAD: minutes at a rated exertion. value duration · rpe. */
  static load(duration: number, rpe: number): CrossFormula { return c('conditioning-load', 'load(duration, rpe) = duration · rpe', duration * rpe, nat(duration, rpe) && rpe <= 10, 'load', [duration, rpe]) }
  /** VOLUME: the weight moved across all reps. value sets · reps · weight. */
  static volume(sets: number, reps: number, weight: number): CrossFormula { return c('conditioning-volume', 'volume(sets, reps, weight) = sets · reps · weight', sets * reps * weight, nat(sets, reps, weight), 'volume', [sets, reps, weight]) }
  /** INTENSITY: the lift as a share of the max. value ⌊weight · 100 / max⌋. */
  static intensity(weight: number, max: number): CrossFormula { return c('conditioning-intensity', 'intensity(weight, max) = ⌊weight · 100 / max⌋', max > 0 ? Math.floor((weight * 100) / max) : 0, nat(weight, max) && max > 0, 'intensity', [weight, max]) }
  /** TRAINING ZONE: a share of max heart rate. value ⌊hrmax · percent / 100⌋. */
  static trainingzone(hrmax: number, percent: number): CrossFormula { return c('conditioning-trainingzone', 'trainingzone(hrmax, percent) = ⌊hrmax · percent / 100⌋', Math.floor((hrmax * percent) / 100), nat(hrmax, percent) && percent <= 100, 'trainingzone', [hrmax, percent]) }
  /** RECOVERY: the pulse drop one minute after the peak. value max(0, peak − after). */
  static recovery(peak: number, after: number): CrossFormula { return c('conditioning-recovery', 'recovery(peak, after) = max(0, peak − after)', Math.max(0, peak - after), nat(peak, after), 'recovery', [peak, after]) }
  /** ONE-REP MAX: the Epley estimate. value weight + ⌊weight · reps / 30⌋. */
  static onerepmax(weight: number, reps: number): CrossFormula { return c('conditioning-onerepmax', 'onerepmax(weight, reps) = weight + ⌊weight · reps / 30⌋', weight + Math.floor((weight * reps) / 30), nat(weight, reps), 'onerepmax', [weight, reps]) }
}

for (const name of ['heartrate', 'intensity', 'load', 'onerepmax', 'recovery', 'trainingzone', 'vo2max', 'volume'] as const)
  hexRegisterOf('conditioning', name, (ConditioningFormulas[name] as (...x: unknown[]) => unknown).bind(ConditioningFormulas))
