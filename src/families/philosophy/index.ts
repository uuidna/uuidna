import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHILOSOPHY — REASONING AS ARITHMETIC (argument and ethics measured, not asserted). An argument is numbers: how many of
 *  its forms are sound, how many premises it rests on, how consistent its claims are, the utilitarian sum of happiness,
 *  the consensus of its thinkers, the strength a syllogism carries, the virtue of the golden mean, and how much a system
 *  entails per axiom. Crosses to `sociology` — philosophy is reasoning about how people live. A measure. */

const PROOF = 'philosophy arithmetic (validity, premises, consistency, utility, consensus, syllogism, virtue, entailment); reasoning and ethics as a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'philosophy', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `philosophy.${name}`, params })

export class PhilosophyFormulas {
  /** VALIDITY: the share of forms that are sound, as a percentage. value ⌊sound · 100 / total⌋. */
  static validity(sound: number, total: number): CrossFormula { return c('philosophy-validity', 'validity(sound, total) = ⌊sound · 100 / total⌋', total > 0 ? Math.floor((sound * 100) / total) : 0, nat(sound, total) && total > 0 && sound <= total, 'validity', [sound, total]) }
  /** PREMISES: the count an argument rests on. value count. */
  static premises(count: number): CrossFormula { return c('philosophy-premises', 'premises(count) = count', count, nat(count), 'premises', [count]) }
  /** CONSISTENCY: the share of claims that are consistent, as a percentage. value ⌊consistent · 100 / claims⌋. */
  static consistency(consistent: number, claims: number): CrossFormula { return c('philosophy-consistency', 'consistency(consistent, claims) = ⌊consistent · 100 / claims⌋', claims > 0 ? Math.floor((consistent * 100) / claims) : 0, nat(consistent, claims) && claims > 0 && consistent <= claims, 'consistency', [consistent, claims]) }
  /** UTILITY: the utilitarian sum of happiness across people. value happiness · people. */
  static utility(happiness: number, people: number): CrossFormula { return c('philosophy-utility', 'utility(happiness, people) = happiness · people', happiness * people, nat(happiness, people), 'utility', [happiness, people]) }
  /** CONSENSUS: the share of thinkers who agree, as a percentage. value ⌊agree · 100 / thinkers⌋. */
  static consensus(agree: number, thinkers: number): CrossFormula { return c('philosophy-consensus', 'consensus(agree, thinkers) = ⌊agree · 100 / thinkers⌋', thinkers > 0 ? Math.floor((agree * 100) / thinkers) : 0, nat(agree, thinkers) && thinkers > 0 && agree <= thinkers, 'consensus', [agree, thinkers]) }
  /** SYLLOGISM: a valid conclusion is only as strong as its weaker premise. value min(major, minor). */
  static syllogism(major: number, minor: number): CrossFormula { return c('philosophy-syllogism', 'syllogism(major, minor) = min(major, minor)', Math.min(major, minor), nat(major, minor), 'syllogism', [major, minor]) }
  /** VIRTUE: the golden mean, the mean less its deviation, never below zero. value max(0, mean − deviation). */
  static virtue(mean: number, deviation: number): CrossFormula { return c('philosophy-virtue', 'virtue(mean, deviation) = max(0, mean − deviation)', Math.max(0, mean - deviation), nat(mean, deviation), 'virtue', [mean, deviation]) }
  /** ENTAILMENT: how much a system derives per axiom. value ⌊derived / axioms⌋. */
  static entailment(derived: number, axioms: number): CrossFormula { return c('philosophy-entailment', 'entailment(derived, axioms) = ⌊derived / axioms⌋', axioms > 0 ? Math.floor(derived / axioms) : 0, nat(derived, axioms) && axioms > 0, 'entailment', [derived, axioms]) }
}

for (const name of ['consensus', 'consistency', 'entailment', 'premises', 'syllogism', 'utility', 'validity', 'virtue'] as const)
  hexRegisterOf('philosophy', name, (PhilosophyFormulas[name] as (...x: unknown[]) => unknown).bind(PhilosophyFormulas))
