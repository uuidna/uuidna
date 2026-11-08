import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENDOCRINOLOGY — THE HORMONE SYSTEM, AS ARITHMETIC. The glands and their signals are numbers: insulin resistance from
 *  glucose and insulin, an HbA1c proxy from mean glucose, thyroid and cortisol ratios, insulin sensitivity, glandular
 *  secretion, a dosing half-life, and feedback-loop gain. Crosses to `med` — endocrinology is a measure medicine reads. */

const PROOF = 'endocrinology arithmetic (HOMA-IR, HbA1c proxy, thyroid ratio, cortisol ratio, insulin sensitivity, secretion, half-life, feedback gain); the hormone system as integers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'endocrinology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `endocrinology.${name}`, params })

export class EndocrinologyFormulas {
  /** HOMA-IR: insulin resistance proxy from fasting glucose and insulin. value ⌊glucose · insulin / 405⌋. */
  static homa(glucose: number, insulin: number): CrossFormula { return c('endocrinology-homa', 'homa(glucose, insulin) = ⌊glucose · insulin / 405⌋', Math.floor((glucose * insulin) / 405), nat(glucose, insulin), 'homa', [glucose, insulin]) }
  /** HbA1c PROXY from mean glucose. value ⌊(glucose + 4600) / 1000⌋. */
  static a1c(glucose: number): CrossFormula { return c('endocrinology-a1c', 'a1c(glucose) = ⌊(glucose + 4600) / 1000⌋', Math.floor((glucose + 4600) / 1000), nat(glucose), 'a1c', [glucose]) }
  /** THYROID RATIO: TSH over free T4. value ⌊tsh · 100 / t4⌋. */
  static thyroid(tsh: number, t4: number): CrossFormula { return c('endocrinology-thyroid', 'thyroid(tsh, t4) = ⌊tsh · 100 / t4⌋', t4 > 0 ? Math.floor((tsh * 100) / t4) : 0, nat(tsh, t4) && t4 > 0, 'thyroid', [tsh, t4]) }
  /** CORTISOL RATIO: morning over evening. value ⌊morning · 100 / evening⌋. */
  static cortisol(morning: number, evening: number): CrossFormula { return c('endocrinology-cortisol', 'cortisol(morning, evening) = ⌊morning · 100 / evening⌋', evening > 0 ? Math.floor((morning * 100) / evening) : 0, nat(morning, evening) && evening > 0, 'cortisol', [morning, evening]) }
  /** INSULIN SENSITIVITY: glucose uptake over insulin. value ⌊uptake · 100 / insulin⌋. */
  static sensitivity(uptake: number, insulin_: number): CrossFormula { return c('endocrinology-sensitivity', 'sensitivity(uptake, insulin) = ⌊uptake · 100 / insulin⌋', insulin_ > 0 ? Math.floor((uptake * 100) / insulin_) : 0, nat(uptake, insulin_) && insulin_ > 0, 'sensitivity', [uptake, insulin_]) }
  /** SECRETION: hormone output per unit of gland. value ⌊hormone / gland⌋. */
  static secretion(hormone: number, gland: number): CrossFormula { return c('endocrinology-secretion', 'secretion(hormone, gland) = ⌊hormone / gland⌋', gland > 0 ? Math.floor(hormone / gland) : 0, nat(hormone, gland) && gland > 0, 'secretion', [hormone, gland]) }
  /** HALF-LIFE: dosing half-life from dose and clearance. value ⌊dose · 693 / (clearance · 1000)⌋. */
  static halflife(dose: number, clearance: number): CrossFormula { return c('endocrinology-halflife', 'halflife(dose, clearance) = ⌊dose · 693 / (clearance · 1000)⌋', clearance > 0 ? Math.floor((dose * 693) / (clearance * 1000)) : 0, nat(dose, clearance) && clearance > 0, 'halflife', [dose, clearance]) }
  /** FEEDBACK GAIN: response over stimulus. value ⌊response · 100 / stimulus⌋. */
  static feedback(response: number, stimulus: number): CrossFormula { return c('endocrinology-feedback', 'feedback(response, stimulus) = ⌊response · 100 / stimulus⌋', stimulus > 0 ? Math.floor((response * 100) / stimulus) : 0, nat(response, stimulus) && stimulus > 0, 'feedback', [response, stimulus]) }
}

for (const name of ['a1c', 'cortisol', 'feedback', 'halflife', 'homa', 'secretion', 'sensitivity', 'thyroid'] as const)
  hexRegisterOf('endocrinology', name, (EndocrinologyFormulas[name] as (...x: unknown[]) => unknown).bind(EndocrinologyFormulas))
