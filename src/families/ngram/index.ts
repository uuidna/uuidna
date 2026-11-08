import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NGRAM — LANGUAGE-MODEL COUNTING, AS ARITHMETIC (the n-gram model is counts over a corpus, nothing else). How many n-grams a
 *  token stream holds, the maximum-likelihood probability of one, add-one smoothing, a perplexity proxy, vocabulary coverage,
 *  the backoff weight, the pruned vocabulary size, and an absolutely-discounted conditional count. Crosses to `statistics` —
 *  an n-gram model is a frequency distribution. A measure. */

const PROOF = 'ngram arithmetic (n-gram count, MLE probability, Laplace smoothing, perplexity proxy, coverage, backoff weight, vocabulary size, conditional count); the language-model counts of a corpus; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ngram', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `ngram.${name}`, params })

export class NgramFormulas {
  /** NGRAM COUNT: the n-grams in a token stream. value max(0, tokens − n + 1). */
  static count(tokens: number, n: number): CrossFormula { return c('ngram-count', 'count(tokens, n) = max(0, tokens − n + 1)', Math.max(0, tokens - n + 1), nat(tokens, n) && n >= 1, 'count', [tokens, n]) }
  /** MLE PROBABILITY in per-mille. value ⌊occurrences · 1000 / total⌋. */
  static probability(occurrences: number, total: number): CrossFormula { return c('ngram-probability', 'probability(occurrences, total) = ⌊occurrences · 1000 / total⌋', total > 0 ? Math.floor((occurrences * 1000) / total) : 0, nat(occurrences, total) && total > 0 && occurrences <= total, 'probability', [occurrences, total]) }
  /** ADD-ONE (LAPLACE) SMOOTHED probability in per-mille. value ⌊(count + 1) · 1000 / (total + vocab)⌋. */
  static laplacesmoothing(count: number, total: number, vocab: number): CrossFormula { const d = total + vocab; return c('ngram-laplacesmoothing', 'laplacesmoothing(count, total, vocab) = ⌊(count + 1) · 1000 / (total + vocab)⌋', d > 0 ? Math.floor(((count + 1) * 1000) / d) : 0, nat(count, total, vocab) && d > 0, 'laplacesmoothing', [count, total, vocab]) }
  /** PERPLEXITY PROXY: tokens per occurrence (inverse likelihood). value ⌊total / occurrences⌋. */
  static perplexityproxy(total: number, occurrences: number): CrossFormula { return c('ngram-perplexityproxy', 'perplexityproxy(total, occurrences) = ⌊total / occurrences⌋', occurrences > 0 ? Math.floor(total / occurrences) : 0, nat(total, occurrences) && occurrences > 0, 'perplexityproxy', [total, occurrences]) }
  /** VOCABULARY COVERAGE as a percentage. value ⌊seen · 100 / vocab⌋. */
  static coverage(seen: number, vocab: number): CrossFormula { return c('ngram-coverage', 'coverage(seen, vocab) = ⌊seen · 100 / vocab⌋', vocab > 0 ? Math.floor((seen * 100) / vocab) : 0, nat(seen, vocab) && vocab > 0 && seen <= vocab, 'coverage', [seen, vocab]) }
  /** BACKOFF WEIGHT: the higher-order mass over the lower, in per-mille. value ⌊higher · 1000 / lower⌋. */
  static backoffweight(higher: number, lower: number): CrossFormula { return c('ngram-backoffweight', 'backoffweight(higher, lower) = ⌊higher · 1000 / lower⌋', lower > 0 ? Math.floor((higher * 1000) / lower) : 0, nat(higher, lower) && lower > 0, 'backoffweight', [higher, lower]) }
  /** VOCABULARY SIZE after pruning the hapax legomena. value max(0, unique − hapax). */
  static vocabularysize(unique: number, hapax: number): CrossFormula { return c('ngram-vocabularysize', 'vocabularysize(unique, hapax) = max(0, unique − hapax)', Math.max(0, unique - hapax), nat(unique, hapax) && hapax <= unique, 'vocabularysize', [unique, hapax]) }
  /** CONDITIONAL COUNT with absolute discounting. value max(0, joint − discount). */
  static conditionalcount(joint: number, discount: number): CrossFormula { return c('ngram-conditionalcount', 'conditionalcount(joint, discount) = max(0, joint − discount)', Math.max(0, joint - discount), nat(joint, discount), 'conditionalcount', [joint, discount]) }
}

for (const name of ['backoffweight', 'conditionalcount', 'count', 'coverage', 'laplacesmoothing', 'perplexityproxy', 'probability', 'vocabularysize'] as const)
  hexRegisterOf('ngram', name, (NgramFormulas[name] as (...x: unknown[]) => unknown).bind(NgramFormulas))
