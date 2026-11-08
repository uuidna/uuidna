import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SENTENCE — THE CRIMINAL ARITHMETIC, ANY JURISDICTION. How terms combine and reduce is arithmetic over the numbers the
 *  jurisdiction's code supplies: concurrent terms run together, consecutive ones add, time served is credited, parole and
 *  good-time are percentages, a mandatory minimum is a floor, a fine is units times value. Exact and jurisdiction-agnostic;
 *  a measure crossing to the `law` family, advice only when law.reviewed confirms it true on the document. */

const PROOF = 'criminal sentencing arithmetic (concurrent/consecutive terms, credit for time served, parole and good-time percentages, mandatory-minimum floor, enhancements, day-fines); a measure crossed to law, advice only when reviewed true'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const s = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sentence', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `sentence.${name}`, params })

export class SentenceFormulas {
  /** CONCURRENT terms run together: the total is the longest. value max(a, b). */
  static concurrent(a: number, b: number): CrossFormula { return s('sentence-concurrent', 'concurrent(a, b) = max(a, b)', Math.max(a, b), nat(a, b), 'concurrent', [a, b]) }
  /** CONSECUTIVE terms add: the total is the sum. value a + b. */
  static consecutive(a: number, b: number): CrossFormula { return s('sentence-consecutive', 'consecutive(a, b) = a + b', a + b, nat(a, b), 'consecutive', [a, b]) }
  /** CREDIT FOR TIME SERVED: what remains of the sentence. value max(0, sentence − served). */
  static credit(sentence: number, served: number): CrossFormula { return s('sentence-credit', 'credit(sentence, served) = max(0, sentence − served)', Math.max(0, sentence - served), nat(sentence, served), 'credit', [sentence, served]) }
  /** PAROLE ELIGIBILITY at `pct`% of the term. value ⌊sentence · pct / 100⌋. */
  static parole(sentence: number, pct: number): CrossFormula { return s('sentence-parole', 'parole(sentence, pct) = ⌊sentence · pct / 100⌋', Math.floor((sentence * pct) / 100), nat(sentence, pct) && pct <= 100, 'parole', [sentence, pct]) }
  /** GOOD-TIME reduction at `rate`% of the term. value ⌊sentence · rate / 100⌋. */
  static goodtime(sentence: number, rate: number): CrossFormula { return s('sentence-goodtime', 'goodtime(sentence, rate) = ⌊sentence · rate / 100⌋', Math.floor((sentence * rate) / 100), nat(sentence, rate) && rate <= 100, 'goodtime', [sentence, rate]) }
  /** A MANDATORY MINIMUM is a floor under the computed term. value max(min, computed). */
  static mandatory(min: number, computed: number): CrossFormula { return s('sentence-mandatory', 'mandatory(min, computed) = max(min, computed)', Math.max(min, computed), nat(min, computed), 'mandatory', [min, computed]) }
  /** AN ENHANCEMENT adds `pct`% to the base term. value base + ⌊base · pct / 100⌋. */
  static enhance(base: number, pct: number): CrossFormula { return s('sentence-enhance', 'enhance(base, pct) = base + ⌊base · pct / 100⌋', base + Math.floor((base * pct) / 100), nat(base, pct), 'enhance', [base, pct]) }
  /** A DAY-FINE: penalty `units` at the offender's daily `value`. value units · value. */
  static fine(units: number, value: number): CrossFormula { return s('sentence-fine', 'fine(units, value) = units · value', units * value, nat(units, value), 'fine', [units, value]) }
}

for (const name of ['concurrent', 'consecutive', 'credit', 'enhance', 'fine', 'goodtime', 'mandatory', 'parole'] as const)
  hexRegisterOf('sentence', name, (SentenceFormulas[name] as (...x: unknown[]) => unknown).bind(SentenceFormulas))
