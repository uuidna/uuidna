import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INFORMATICS — INFORMATION MEASURED AS INTEGERS (the arithmetic a search index and a codec actually run). Entropy per
 *  symbol, bits from bytes, precision and recall of a retrieval, compression and redundancy of a code, the bandwidth of a
 *  link, the fan-in of an index. Crosses to `code` — informatics is what code measures of itself. A measure. */

const PROOF = 'informatics arithmetic (entropy, bits, precision, recall, compression, redundancy, bandwidth, index); information measured as integers; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'informatics', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `informatics.${name}`, params })

export class InformaticsFormulas {
  /** BANDWIDTH: bits over seconds. value ⌊bits / seconds⌋. */
  static bandwidth(bits_: number, seconds: number): CrossFormula { return c('informatics-bandwidth', 'bandwidth(bits, seconds) = ⌊bits / seconds⌋', seconds > 0 ? Math.floor(bits_ / seconds) : 0, nat(bits_, seconds) && seconds > 0, 'bandwidth', [bits_, seconds]) }
  /** BITS from bytes, eight to the byte. value bytes · 8. */
  static bits(bytes: number): CrossFormula { return c('informatics-bits', 'bits(bytes) = bytes · 8', bytes * 8, nat(bytes), 'bits', [bytes]) }
  /** COMPRESSION ratio as a percentage. value ⌊original · 100 / compressed⌋. */
  static compression(original: number, compressed: number): CrossFormula { return c('informatics-compression', 'compression(original, compressed) = ⌊original · 100 / compressed⌋', compressed > 0 ? Math.floor((original * 100) / compressed) : 0, nat(original, compressed) && compressed > 0, 'compression', [original, compressed]) }
  /** ENTROPY proxy: symbols over the distinct ones. value ⌊symbols / unique⌋. */
  static entropy(symbols: number, unique: number): CrossFormula { return c('informatics-entropy', 'entropy(symbols, unique) = ⌊symbols / unique⌋', unique > 0 ? Math.floor(symbols / unique) : 0, nat(symbols, unique) && unique > 0, 'entropy', [symbols, unique]) }
  /** INDEX fan-in: documents over terms. value ⌊documents / terms⌋. */
  static index(documents: number, terms: number): CrossFormula { return c('informatics-index', 'index(documents, terms) = ⌊documents / terms⌋', terms > 0 ? Math.floor(documents / terms) : 0, nat(documents, terms) && terms > 0, 'index', [documents, terms]) }
  /** PRECISION as a percentage. value ⌊relevant · 100 / retrieved⌋. */
  static precision(relevant: number, retrieved: number): CrossFormula { return c('informatics-precision', 'precision(relevant, retrieved) = ⌊relevant · 100 / retrieved⌋', retrieved > 0 ? Math.floor((relevant * 100) / retrieved) : 0, nat(relevant, retrieved) && retrieved > 0 && relevant <= retrieved, 'precision', [relevant, retrieved]) }
  /** RECALL as a percentage. value ⌊relevant · 100 / total⌋. */
  static recall(relevant: number, total: number): CrossFormula { return c('informatics-recall', 'recall(relevant, total) = ⌊relevant · 100 / total⌋', total > 0 ? Math.floor((relevant * 100) / total) : 0, nat(relevant, total) && total > 0 && relevant <= total, 'recall', [relevant, total]) }
  /** REDUNDANCY as a percentage. value ⌊actual · 100 / maximum⌋. */
  static redundancy(actual: number, maximum: number): CrossFormula { return c('informatics-redundancy', 'redundancy(actual, maximum) = ⌊actual · 100 / maximum⌋', maximum > 0 ? Math.floor((actual * 100) / maximum) : 0, nat(actual, maximum) && maximum > 0 && actual <= maximum, 'redundancy', [actual, maximum]) }
}

for (const name of ['bandwidth', 'bits', 'compression', 'entropy', 'index', 'precision', 'recall', 'redundancy'] as const)
  hexRegisterOf('informatics', name, (InformaticsFormulas[name] as (...x: unknown[]) => unknown).bind(InformaticsFormulas))
