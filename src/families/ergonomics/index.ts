import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ERGONOMICS — THE WORKPLACE ON THE BODY, AS ARITHMETIC (chosen by the registry, not by hand). Work put on a person is
 *  numbers: the lifting index of a load, how far a reach is of its limit, how far a posture is off neutral, repetition
 *  per minute, fatigue from work over rest, illumination over an area, ambient noise, and strain of force over capacity.
 *  Crosses to `med` — ergonomics is what medicine measures of the worker. A measure. */

const PROOF = 'ergonomics arithmetic (lift index, reach, posture deviation, repetition, fatigue, illumination, noise, strain); a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ergonomics', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `ergonomics.${name}`, params })

export class ErgonomicsFormulas {
  /** LIFTING INDEX proxy: a load lifted at a frequency. value weight · frequency. */
  static lift(weight: number, frequency: number): CrossFormula { return c('ergonomics-lift', 'lift(weight, frequency) = weight · frequency', weight * frequency, nat(weight, frequency), 'lift', [weight, frequency]) }
  /** REACH as a percentage of its limit. value ⌊distance · 100 / limit⌋. */
  static reach(distance: number, limit: number): CrossFormula { return c('ergonomics-reach', 'reach(distance, limit) = ⌊distance · 100 / limit⌋', limit > 0 ? Math.floor((distance * 100) / limit) : 0, nat(distance, limit) && limit > 0, 'reach', [distance, limit]) }
  /** POSTURE deviation as a percentage of neutral. value ⌊deviation · 100 / neutral⌋. */
  static posture(deviation: number, neutral: number): CrossFormula { return c('ergonomics-posture', 'posture(deviation, neutral) = ⌊deviation · 100 / neutral⌋', neutral > 0 ? Math.floor((deviation * 100) / neutral) : 0, nat(deviation, neutral) && neutral > 0, 'posture', [deviation, neutral]) }
  /** REPETITION: movements over the minutes worked. value ⌊movements / minutes⌋. */
  static repetition(movements: number, minutes: number): CrossFormula { return c('ergonomics-repetition', 'repetition(movements, minutes) = ⌊movements / minutes⌋', minutes > 0 ? Math.floor(movements / minutes) : 0, nat(movements, minutes) && minutes > 0, 'repetition', [movements, minutes]) }
  /** FATIGUE: time worked over time rested, as a percentage. value ⌊worked · 100 / rest⌋. */
  static fatigue(worked: number, rest: number): CrossFormula { return c('ergonomics-fatigue', 'fatigue(worked, rest) = ⌊worked · 100 / rest⌋', rest > 0 ? Math.floor((worked * 100) / rest) : 0, nat(worked, rest) && rest > 0, 'fatigue', [worked, rest]) }
  /** ILLUMINATION: lumens over the area lit. value ⌊lumens / area⌋. */
  static illumination(lumens: number, area: number): CrossFormula { return c('ergonomics-illumination', 'illumination(lumens, area) = ⌊lumens / area⌋', area > 0 ? Math.floor(lumens / area) : 0, nat(lumens, area) && area > 0, 'illumination', [lumens, area]) }
  /** NOISE: ambient sound level. value decibels (holds nat). */
  static noise(decibels: number): CrossFormula { return c('ergonomics-noise', 'noise(decibels) = decibels', decibels, nat(decibels), 'noise', [decibels]) }
  /** STRAIN: force over capacity, as a percentage. value ⌊force · 100 / capacity⌋. */
  static strain(force: number, capacity: number): CrossFormula { return c('ergonomics-strain', 'strain(force, capacity) = ⌊force · 100 / capacity⌋', capacity > 0 ? Math.floor((force * 100) / capacity) : 0, nat(force, capacity) && capacity > 0, 'strain', [force, capacity]) }
}

for (const name of ['fatigue', 'illumination', 'lift', 'noise', 'posture', 'reach', 'repetition', 'strain'] as const)
  hexRegisterOf('ergonomics', name, (ErgonomicsFormulas[name] as (...x: unknown[]) => unknown).bind(ErgonomicsFormulas))
