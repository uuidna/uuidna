import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEMMATIZATION — REDUCING WORD FORMS TO THEIR LEMMA, AS ARITHMETIC. Normalizing text is numbers: how many lemmas a form
 *  set holds, inflections per lemma, forms per lemma, tagging accuracy, how often a form is ambiguous, how much the token
 *  stream shrinks, part-of-speech agreement, and vocabulary coverage. Crosses to `linguistics` — lemmatization is a
 *  linguistic operation. A measure. */

const PROOF = 'lemmatization arithmetic (lemma count, inflection ratio, forms per lemma, accuracy, ambiguity rate, reduction ratio, pos match, coverage); a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lemmatization', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `lemmatization.${name}`, params })

export class LemmatizationFormulas {
  /** LEMMA COUNT: distinct lemmas from a form set at a fixed forms-per-lemma. value ⌊forms / perLemma⌋. */
  static lemmacount(forms: number, perLemma: number): CrossFormula { return c('lemmatization-lemmacount', 'lemmacount(forms, perLemma) = ⌊forms / perLemma⌋', perLemma > 0 ? Math.floor(forms / perLemma) : 0, nat(forms, perLemma) && perLemma > 0, 'lemmacount', [forms, perLemma]) }
  /** INFLECTION RATIO: inflected forms per lemma, scaled by 100. value ⌊forms · 100 / lemmas⌋. */
  static inflectionratio(forms: number, lemmas: number): CrossFormula { return c('lemmatization-inflectionratio', 'inflectionratio(forms, lemmas) = ⌊forms · 100 / lemmas⌋', lemmas > 0 ? Math.floor((forms * 100) / lemmas) : 0, nat(forms, lemmas) && lemmas > 0, 'inflectionratio', [forms, lemmas]) }
  /** FORMS PER LEMMA: surface forms over the lemmas they reduce to. value ⌊forms / lemmas⌋. */
  static formsperlemma(forms: number, lemmas: number): CrossFormula { return c('lemmatization-formsperlemma', 'formsperlemma(forms, lemmas) = ⌊forms / lemmas⌋', lemmas > 0 ? Math.floor(forms / lemmas) : 0, nat(forms, lemmas) && lemmas > 0, 'formsperlemma', [forms, lemmas]) }
  /** ACCURACY: correctly lemmatized tokens as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('lemmatization-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** AMBIGUITY RATE: ambiguous forms as a percentage of all forms. value ⌊ambiguous · 100 / total⌋. */
  static ambiguityrate(ambiguous: number, total: number): CrossFormula { return c('lemmatization-ambiguityrate', 'ambiguityrate(ambiguous, total) = ⌊ambiguous · 100 / total⌋', total > 0 ? Math.floor((ambiguous * 100) / total) : 0, nat(ambiguous, total) && total > 0 && ambiguous <= total, 'ambiguityrate', [ambiguous, total]) }
  /** REDUCTION RATIO: how much the token stream shrinks to lemmas, as a percentage. value ⌊(tokens − lemmas) · 100 / tokens⌋. */
  static reductionratio(tokens: number, lemmas: number): CrossFormula { return c('lemmatization-reductionratio', 'reductionratio(tokens, lemmas) = ⌊max(0, tokens − lemmas) · 100 / tokens⌋', tokens > 0 ? Math.floor((Math.max(0, tokens - lemmas) * 100) / tokens) : 0, nat(tokens, lemmas) && tokens > 0, 'reductionratio', [tokens, lemmas]) }
  /** POS MATCH: part-of-speech tags agreeing with the gold set, as a percentage. value ⌊matched · 100 / total⌋. */
  static posmatch(matched: number, total: number): CrossFormula { return c('lemmatization-posmatch', 'posmatch(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'posmatch', [matched, total]) }
  /** COVERAGE: vocabulary entries the lexicon resolves, as a percentage. value ⌊found · 100 / vocab⌋. */
  static coverage(found: number, vocab: number): CrossFormula { return c('lemmatization-coverage', 'coverage(found, vocab) = ⌊found · 100 / vocab⌋', vocab > 0 ? Math.floor((found * 100) / vocab) : 0, nat(found, vocab) && vocab > 0 && found <= vocab, 'coverage', [found, vocab]) }
}

for (const name of ['accuracy', 'ambiguityrate', 'coverage', 'formsperlemma', 'inflectionratio', 'lemmacount', 'posmatch', 'reductionratio'] as const)
  hexRegisterOf('lemmatization', name, (LemmatizationFormulas[name] as (...x: unknown[]) => unknown).bind(LemmatizationFormulas))
