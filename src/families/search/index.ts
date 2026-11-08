import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEARCH — INFORMATION RETRIEVAL, AS ARITHMETIC (chosen by the public-API registry, not by hand). Retrieval is numbers:
 *  recall and precision over a result set, average latency, the index size, the hit rate, throughput, index coverage, and
 *  the F1 that balances precision against recall. Crosses to `cross` — a measure joined to the formula network. A measure. */

const PROOF = 'search arithmetic (recall, precision, latency, index size, hit rate, throughput, coverage, F1); an information-retrieval domain; a measure crossed to the formula network'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'search', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `search.${name}`, params })

export class SearchFormulas {
  /** RECALL: the relevant documents found, as a percentage. value ⌊found · 100 / relevant⌋. */
  static recall(found: number, relevant: number): CrossFormula { return c('search-recall', 'recall(found, relevant) = ⌊found · 100 / relevant⌋', relevant > 0 ? Math.floor((found * 100) / relevant) : 0, nat(found, relevant) && relevant > 0 && found <= relevant, 'recall', [found, relevant]) }
  /** PRECISION: the returned documents that are relevant, as a percentage. value ⌊relevant · 100 / returned⌋. */
  static precision(relevant: number, returned: number): CrossFormula { return c('search-precision', 'precision(relevant, returned) = ⌊relevant · 100 / returned⌋', returned > 0 ? Math.floor((relevant * 100) / returned) : 0, nat(relevant, returned) && returned > 0 && relevant <= returned, 'precision', [relevant, returned]) }
  /** AVERAGE LATENCY: total milliseconds over the queries served. value ⌊total / queries⌋. */
  static latency(total: number, queries: number): CrossFormula { return c('search-latency', 'latency(total, queries) = ⌊total / queries⌋', queries > 0 ? Math.floor(total / queries) : 0, nat(total, queries) && queries > 0, 'latency', [total, queries]) }
  /** INDEX SIZE: documents by the terms each carries. value docs · terms. */
  static index(docs: number, terms: number): CrossFormula { return c('search-index', 'index(docs, terms) = docs · terms', docs * terms, nat(docs, terms), 'index', [docs, terms]) }
  /** HIT RATE: matching documents over the collection, as a percentage. value ⌊matches · 100 / total⌋. */
  static hits(matches: number, total: number): CrossFormula { return c('search-hits', 'hits(matches, total) = ⌊matches · 100 / total⌋', total > 0 ? Math.floor((matches * 100) / total) : 0, nat(matches, total) && total > 0 && matches <= total, 'hits', [matches, total]) }
  /** THROUGHPUT: queries over seconds. value ⌊queries / seconds⌋. */
  static throughput(queries: number, seconds: number): CrossFormula { return c('search-throughput', 'throughput(queries, seconds) = ⌊queries / seconds⌋', seconds > 0 ? Math.floor(queries / seconds) : 0, nat(queries, seconds) && seconds > 0, 'throughput', [queries, seconds]) }
  /** COVERAGE: the collection that is indexed, as a percentage. value ⌊indexed · 100 / total⌋. */
  static coverage(indexed: number, total: number): CrossFormula { return c('search-coverage', 'coverage(indexed, total) = ⌊indexed · 100 / total⌋', total > 0 ? Math.floor((indexed * 100) / total) : 0, nat(indexed, total) && total > 0 && indexed <= total, 'coverage', [indexed, total]) }
  /** THE F1: the harmonic mean of precision and recall. value [p + r > 0] · ⌊2 · p · r / (p + r)⌋. */
  static f1(precision: number, recall: number): CrossFormula { return c('search-f1', 'f1(precision, recall) = ⌊2 · precision · recall / (precision + recall)⌋', precision + recall > 0 ? Math.floor((2 * precision * recall) / (precision + recall)) : 0, nat(precision, recall) && precision <= 100 && recall <= 100, 'f1', [precision, recall]) }
}

for (const name of ['coverage', 'f1', 'hits', 'index', 'latency', 'precision', 'recall', 'throughput'] as const)
  hexRegisterOf('search', name, (SearchFormulas[name] as (...x: unknown[]) => unknown).bind(SearchFormulas))
