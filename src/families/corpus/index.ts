import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CORPUS — A BODY OF TEXT, AS ARITHMETIC (chosen by the text registry, not by hand). A corpus is numbers: the type-token
 *  ratio of its vocabulary, the share of words seen once, a word's frequency per thousand, concordance characters shown,
 *  the words a sample draws, how much is annotated, how balanced the categories are, and a term's keyness over a reference.
 *  Crosses to `linguistics` — a corpus is what linguistics measures. A measure. */

const PROOF = 'corpus arithmetic (type-token ratio, hapax share, frequency per mille, concordance hits, sampled words, annotation coverage, balance, keyness); chosen by the text registry; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'corpus', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `corpus.${name}`, params })

export class CorpusFormulas {
  /** ANNOTATION COVERAGE: the share of tokens that are annotated, as a percentage. value ⌊annotated · 100 / total⌋. */
  static annotationcoverage(annotated: number, total: number): CrossFormula { return c('corpus-annotationcoverage', 'annotationcoverage(annotated, total) = ⌊annotated · 100 / total⌋', total > 0 ? Math.floor((annotated * 100) / total) : 0, nat(annotated, total) && total > 0 && annotated <= total, 'annotationcoverage', [annotated, total]) }
  /** BALANCE SCORE: the categories represented over those planned, as a percentage. value ⌊represented · 100 / categories⌋. */
  static balancescore(represented: number, categories: number): CrossFormula { return c('corpus-balancescore', 'balancescore(represented, categories) = ⌊represented · 100 / categories⌋', categories > 0 ? Math.floor((represented * 100) / categories) : 0, nat(represented, categories) && categories > 0 && represented <= categories, 'balancescore', [represented, categories]) }
  /** CONCORDANCE HITS: characters shown for each occurrence in a window. value occurrences · window. */
  static concordancehits(occurrences: number, window: number): CrossFormula { return c('corpus-concordancehits', 'concordancehits(occurrences, window) = occurrences · window', occurrences * window, nat(occurrences, window), 'concordancehits', [occurrences, window]) }
  /** FREQUENCY PER MILLE: a word's count over the tokens, per thousand. value ⌊count · 1000 / total⌋. */
  static frequencyperm(count: number, total: number): CrossFormula { return c('corpus-frequencyperm', 'frequencyperm(count, total) = ⌊count · 1000 / total⌋', total > 0 ? Math.floor((count * 1000) / total) : 0, nat(count, total) && total > 0 && count <= total, 'frequencyperm', [count, total]) }
  /** HAPAX RATIO: the share of types seen exactly once, as a percentage. value ⌊hapax · 100 / types⌋. */
  static hapaxratio(hapax: number, types: number): CrossFormula { return c('corpus-hapaxratio', 'hapaxratio(hapax, types) = ⌊hapax · 100 / types⌋', types > 0 ? Math.floor((hapax * 100) / types) : 0, nat(hapax, types) && types > 0 && hapax <= types, 'hapaxratio', [hapax, types]) }
  /** KEYNESS: how much more frequent a term is in the target than the reference. value max(0, target − reference). */
  static keyness(target: number, reference: number): CrossFormula { return c('corpus-keyness', 'keyness(target, reference) = max(0, target − reference)', Math.max(0, target - reference), nat(target, reference), 'keyness', [target, reference]) }
  /** SAMPLED WORDS: the words a sample draws, documents at a size each. value docs · perDoc. */
  static sampledwords(docs: number, perDoc: number): CrossFormula { return c('corpus-sampledwords', 'sampledwords(docs, perDoc) = docs · perDoc', docs * perDoc, nat(docs, perDoc), 'sampledwords', [docs, perDoc]) }
  /** TYPE-TOKEN RATIO: distinct types over running tokens, as a percentage. value ⌊types · 100 / tokens⌋. */
  static typetoken(types: number, tokens: number): CrossFormula { return c('corpus-typetoken', 'typetoken(types, tokens) = ⌊types · 100 / tokens⌋', tokens > 0 ? Math.floor((types * 100) / tokens) : 0, nat(types, tokens) && tokens > 0 && types <= tokens, 'typetoken', [types, tokens]) }
}

for (const name of ['annotationcoverage', 'balancescore', 'concordancehits', 'frequencyperm', 'hapaxratio', 'keyness', 'sampledwords', 'typetoken'] as const)
  hexRegisterOf('corpus', name, (CorpusFormulas[name] as (...x: unknown[]) => unknown).bind(CorpusFormulas))
