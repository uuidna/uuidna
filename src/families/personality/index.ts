import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PERSONALITY — THE FIVE-FACTOR MODEL AS ARITHMETIC (chosen by the trait registry, not by hand). A profile is numbers:
 *  a Likert item sum read as a percent of its maximum, follow-through, net sociability, net negativity, the three-trait
 *  composite, the mean item, and how far a score sits above the population mean. Crosses to `psychology` — personality is
 *  what psychology measures. A measure. */

const PROOF = 'personality arithmetic (openness, conscientiousness, extraversion, agreeableness, neuroticism, composite, trait, deviation); the five-factor model as Likert sums, means and nets; a measure crossed to psychology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'personality', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `personality.${name}`, params })

export class PersonalityFormulas {
  /** OPENNESS: a Likert item sum as a percent of its maximum (each item at most 5). value ⌊raw · 20 / items⌋. */
  static openness(raw: number, items: number): CrossFormula { return c('personality-openness', 'openness(raw, items) = ⌊raw · 20 / items⌋', items > 0 ? Math.floor((raw * 20) / items) : 0, nat(raw, items) && items > 0 && raw <= items * 5, 'openness', [raw, items]) }
  /** CONSCIENTIOUSNESS: intentions carried through, as a percent. value ⌊done · 100 / planned⌋. */
  static conscientiousness(done: number, planned: number): CrossFormula { return c('personality-conscientiousness', 'conscientiousness(done, planned) = ⌊done · 100 / planned⌋', planned > 0 ? Math.floor((done * 100) / planned) : 0, nat(done, planned) && planned > 0 && done <= planned, 'conscientiousness', [done, planned]) }
  /** EXTRAVERSION: net sociability, social draw less solitary draw. value max(0, social − solitary). */
  static extraversion(social: number, solitary: number): CrossFormula { return c('personality-extraversion', 'extraversion(social, solitary) = max(0, social − solitary)', Math.max(0, social - solitary), nat(social, solitary), 'extraversion', [social, solitary]) }
  /** AGREEABLENESS: a Likert item sum as a percent of its maximum (each item at most 5). value ⌊agree · 20 / items⌋. */
  static agreeableness(agree: number, items: number): CrossFormula { return c('personality-agreeableness', 'agreeableness(agree, items) = ⌊agree · 20 / items⌋', items > 0 ? Math.floor((agree * 20) / items) : 0, nat(agree, items) && items > 0 && agree <= items * 5, 'agreeableness', [agree, items]) }
  /** NEUROTICISM: net negativity, stress less composure. value max(0, stress − calm). */
  static neuroticism(stress: number, calm: number): CrossFormula { return c('personality-neuroticism', 'neuroticism(stress, calm) = max(0, stress − calm)', Math.max(0, stress - calm), nat(stress, calm), 'neuroticism', [stress, calm]) }
  /** COMPOSITE: three trait scores summed into one profile total. value o + c + e. */
  static composite(o: number, co: number, e: number): CrossFormula { return c('personality-composite', 'composite(o, c, e) = o + c + e', o + co + e, nat(o, co, e), 'composite', [o, co, e]) }
  /** TRAIT: the mean item score of a Likert sum. value ⌊raw / items⌋. */
  static trait(raw: number, items: number): CrossFormula { return c('personality-trait', 'trait(raw, items) = ⌊raw / items⌋', items > 0 ? Math.floor(raw / items) : 0, nat(raw, items) && items > 0, 'trait', [raw, items]) }
  /** DEVIATION: how far a score sits above the population mean. value max(0, score − mean). */
  static deviation(score: number, mean: number): CrossFormula { return c('personality-deviation', 'deviation(score, mean) = max(0, score − mean)', Math.max(0, score - mean), nat(score, mean), 'deviation', [score, mean]) }
}

for (const name of ['agreeableness', 'composite', 'conscientiousness', 'deviation', 'extraversion', 'neuroticism', 'openness', 'trait'] as const)
  hexRegisterOf('personality', name, (PersonalityFormulas[name] as (...x: unknown[]) => unknown).bind(PersonalityFormulas))
