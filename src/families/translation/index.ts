import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRANSLATION — THE LANGUAGE-SERVICE DOMAIN, AS ARITHMETIC (chosen by the registry, not by hand). Moving text between
 *  languages is numbers: BLEU match, fuzzy-match reuse, words per hour, how far the target expands the source, how much of
 *  a project is covered, the post-edit distance, glossary hits per term, and the share of reviewed segments accepted.
 *  Crosses to `linguistics` — translation is linguistics put to work. A measure. */

const PROOF = 'translation arithmetic (bleu, fuzzy reuse, throughput, expansion, coverage, post-edit distance, glossary, quality); a language-service domain; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'translation', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `translation.${name}`, params })

export class TranslationFormulas {
  /** BLEU: matched n-grams as a percentage of the total. value ⌊matches · 100 / total⌋. */
  static bleu(matches: number, total: number): CrossFormula { return c('translation-bleu', 'bleu(matches, total) = ⌊matches · 100 / total⌋', total > 0 ? Math.floor((matches * 100) / total) : 0, nat(matches, total) && total > 0 && matches <= total, 'bleu', [matches, total]) }
  /** FUZZY: translation-memory reuse as a percentage of the segments. value ⌊matched · 100 / segments⌋. */
  static fuzzy(matched: number, segments: number): CrossFormula { return c('translation-fuzzy', 'fuzzy(matched, segments) = ⌊matched · 100 / segments⌋', segments > 0 ? Math.floor((matched * 100) / segments) : 0, nat(matched, segments) && segments > 0 && matched <= segments, 'fuzzy', [matched, segments]) }
  /** THROUGHPUT: words over the hours worked. value ⌊words / hours⌋. */
  static throughput(words: number, hours: number): CrossFormula { return c('translation-throughput', 'throughput(words, hours) = ⌊words / hours⌋', hours > 0 ? Math.floor(words / hours) : 0, nat(words, hours) && hours > 0, 'throughput', [words, hours]) }
  /** EXPANSION: target length against source, as a percentage. value ⌊target · 100 / source⌋. */
  static expansion(target: number, source: number): CrossFormula { return c('translation-expansion', 'expansion(target, source) = ⌊target · 100 / source⌋', source > 0 ? Math.floor((target * 100) / source) : 0, nat(target, source) && source > 0, 'expansion', [target, source]) }
  /** COVERAGE: translated segments as a percentage of the total. value ⌊translated · 100 / total⌋. */
  static coverage(translated: number, total: number): CrossFormula { return c('translation-coverage', 'coverage(translated, total) = ⌊translated · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0 && translated <= total, 'coverage', [translated, total]) }
  /** EDIT: post-edit distance as a percentage of the words. value ⌊changes · 100 / words⌋. */
  static edit(changes: number, words: number): CrossFormula { return c('translation-edit', 'edit(changes, words) = ⌊changes · 100 / words⌋', words > 0 ? Math.floor((changes * 100) / words) : 0, nat(changes, words) && words > 0 && changes <= words, 'edit', [changes, words]) }
  /** GLOSSARY: hits per term. value ⌊hits / terms⌋. */
  static glossary(terms: number, hits: number): CrossFormula { return c('translation-glossary', 'glossary(terms, hits) = ⌊hits / terms⌋', terms > 0 ? Math.floor(hits / terms) : 0, nat(terms, hits) && terms > 0, 'glossary', [terms, hits]) }
  /** QUALITY: accepted segments as a percentage of those reviewed. value ⌊accepted · 100 / reviewed⌋. */
  static quality(accepted: number, reviewed: number): CrossFormula { return c('translation-quality', 'quality(accepted, reviewed) = ⌊accepted · 100 / reviewed⌋', reviewed > 0 ? Math.floor((accepted * 100) / reviewed) : 0, nat(accepted, reviewed) && reviewed > 0 && accepted <= reviewed, 'quality', [accepted, reviewed]) }
}

for (const name of ['bleu', 'coverage', 'edit', 'expansion', 'fuzzy', 'glossary', 'quality', 'throughput'] as const)
  hexRegisterOf('translation', name, (TranslationFormulas[name] as (...x: unknown[]) => unknown).bind(TranslationFormulas))
