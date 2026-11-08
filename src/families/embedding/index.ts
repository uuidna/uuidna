import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMBEDDING — VECTORS AS ARITHMETIC. An embedding is a table of integer coordinates: how big the table is, the size of a
 *  lookup, the squared distance between two points, a dot-product similarity, a per-cent cosine proxy, a projection's
 *  dropped dimensions, and the Hamming distance of two codes. Crosses to `linearalgebra` — an embedding is a vector in a
 *  space linear algebra measures. A measure. */

const PROOF = 'embedding arithmetic (dimensions, dot similarity, squared L2, table size, lookup offset, projection, per-cent cosine, hamming); a measure crossed to linearalgebra'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'embedding', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds, { name: `embedding.${name}`, params })

export class EmbeddingFormulas {
  /** DIMENSIONS: a table of rows by columns. value rows · cols. */
  static dimensions(rows: number, cols: number): CrossFormula { return c('embedding-dimensions', 'dimensions(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'dimensions', [rows, cols]) }
  /** DOT SIMILARITY: an integer dot-product proxy over three coordinates. value a · b + b · cc. */
  static dotsim(a: number, b: number, cc: number): CrossFormula { return c('embedding-dotsim', 'dotsim(a, b, cc) = a · b + b · cc', a * b + b * cc, nat(a, b, cc), 'dotsim', [a, b, cc]) }
  /** SQUARED L2 DISTANCE between two points, one axis each. value dx² + dy². */
  static l2sq(dx: number, dy: number): CrossFormula { return c('embedding-l2sq', 'l2sq(dx, dy) = dx² + dy²', dx * dx + dy * dy, nat(dx, dy), 'l2sq', [dx, dy]) }
  /** TABLE SIZE: tokens at a dimension each. value tokens · dim. */
  static tablesize(tokens: number, dim: number): CrossFormula { return c('embedding-tablesize', 'tablesize(tokens, dim) = tokens · dim', tokens * dim, nat(tokens, dim), 'tablesize', [tokens, dim]) }
  /** LOOKUP: the flat offset of a row in a table with dim columns. value index · dim. */
  static lookup(index: number, dim: number): CrossFormula { return c('embedding-lookup', 'lookup(index, dim) = index · dim', index * dim, nat(index, dim), 'lookup', [index, dim]) }
  /** PROJECTION: the dimensions dropped when projecting dim down to keep. value max(0, dim − keep). */
  static projection(dim: number, keep: number): CrossFormula { return c('embedding-projection', 'projection(dim, keep) = max(0, dim − keep)', Math.max(0, dim - keep), nat(dim, keep), 'projection', [dim, keep]) }
  /** COSINE: a per-cent similarity proxy, dot over norm. value ⌊dot · 100 / norm⌋. */
  static cosine(dot: number, norm: number): CrossFormula { return c('embedding-cosine', 'cosine(dot, norm) = ⌊dot · 100 / norm⌋', norm > 0 ? Math.floor((dot * 100) / norm) : 0, nat(dot, norm) && norm > 0, 'cosine', [dot, norm]) }
  /** HAMMING DISTANCE between two integer codes. value popcount(a ⊕ b). */
  static hamming(a: number, b: number): CrossFormula { let x = (a ^ b) >>> 0, n = 0; while (x > 0) { n += x & 1; x >>>= 1 } return c('embedding-hamming', 'hamming(a, b) = popcount(a ⊕ b)', n, nat(a, b), 'hamming', [a, b]) }
}

for (const name of ['cosine', 'dimensions', 'dotsim', 'hamming', 'l2sq', 'lookup', 'projection', 'tablesize'] as const)
  hexRegisterOf('embedding', name, (EmbeddingFormulas[name] as (...x: unknown[]) => unknown).bind(EmbeddingFormulas))
