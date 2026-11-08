import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FITNESS — EXERCISE SCIENCE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Training is numbers: the
 *  volume a session moves, an estimated one-rep max, max heart rate by age, the heart-rate zone, running pace, calories
 *  burned, a recovery ratio, and the progress made since a baseline. Crosses to `med` — fitness is what medicine measures.
 *  A measure. */

const PROOF = 'fitness arithmetic (training volume, one-rep max, max heart rate, heart-rate zone, pace, calories, recovery, progress); exercise science as integers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fitness', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `fitness.${name}`, params })

export class FitnessFormulas {
  /** TRAINING VOLUME: sets times reps. value sets · reps. */
  static volume(sets: number, reps: number): CrossFormula { return c('fitness-volume', 'volume(sets, reps) = sets · reps', sets * reps, nat(sets, reps), 'volume', [sets, reps]) }
  /** ONE-REP MAX (Epley-ish): a lift scaled by the reps performed. value ⌊weight · (100 + reps · 3) / 100⌋. */
  static onerm(weight: number, reps: number): CrossFormula { return c('fitness-onerm', 'onerm(weight, reps) = ⌊weight · (100 + reps · 3) / 100⌋', Math.floor((weight * (100 + reps * 3)) / 100), nat(weight, reps), 'onerm', [weight, reps]) }
  /** MAX HEART RATE by age. value max(0, 220 − age). */
  static heartrate(age: number): CrossFormula { return c('fitness-heartrate', 'heartrate(age) = max(0, 220 − age)', Math.max(0, 220 - age), nat(age), 'heartrate', [age]) }
  /** HEART-RATE ZONE as a percentage of max. value ⌊hr · 100 / max⌋. */
  static zone(hr: number, max: number): CrossFormula { return c('fitness-zone', 'zone(hr, max) = ⌊hr · 100 / max⌋', max > 0 ? Math.floor((hr * 100) / max) : 0, nat(hr, max) && max > 0 && hr <= max, 'zone', [hr, max]) }
  /** PACE: time over distance. value ⌊time / distance⌋. */
  static pace(distance: number, time: number): CrossFormula { return c('fitness-pace', 'pace(distance, time) = ⌊time / distance⌋', distance > 0 ? Math.floor(time / distance) : 0, nat(distance, time) && distance > 0, 'pace', [distance, time]) }
  /** CALORIES: MET times minutes. value met · minutes. */
  static calories(met: number, minutes: number): CrossFormula { return c('fitness-calories', 'calories(met, minutes) = met · minutes', met * minutes, nat(met, minutes), 'calories', [met, minutes]) }
  /** RECOVERY: load over rest. value ⌊load / rest⌋. */
  static recovery(load: number, rest: number): CrossFormula { return c('fitness-recovery', 'recovery(load, rest) = ⌊load / rest⌋', rest > 0 ? Math.floor(load / rest) : 0, nat(load, rest) && rest > 0, 'recovery', [load, rest]) }
  /** PROGRESS since a baseline. value max(0, now − start). */
  static progress(now: number, start: number): CrossFormula { return c('fitness-progress', 'progress(now, start) = max(0, now − start)', Math.max(0, now - start), nat(now, start), 'progress', [now, start]) }
}

for (const name of ['calories', 'heartrate', 'onerm', 'pace', 'progress', 'recovery', 'volume', 'zone'] as const)
  hexRegisterOf('fitness', name, (FitnessFormulas[name] as (...x: unknown[]) => unknown).bind(FitnessFormulas))
