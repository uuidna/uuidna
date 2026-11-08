import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INTERLEAVING — SPREADING SYMBOLS SO A BURST OF NOISE HITS MANY CODEWORDS AT ONCE, AS ARITHMETIC. A block interleaver is
 *  a matrix: write by rows, read by columns, and an error burst is scattered. The numbers are depth, span, block size, the
 *  fill delay, the burst length it protects, the matrix cells, the spread factor, and the end-to-end latency. Crosses to
 *  `signal` — interleaving is how a channel's errors are reshaped before the signal is decoded. A measure. */

const PROOF = 'interleaving arithmetic (depth, span, block size, fill delay, burst protection, matrix cells, spread factor, latency); a block-interleaver matrix written by rows and read by columns; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'interleaving', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `interleaving.${name}`, params })

export class InterleavingFormulas {
  /** DEPTH: how deep the interleave reaches, streams at a stride. value streams · stride. */
  static depth(streams: number, stride: number): CrossFormula { return c('interleaving-depth', 'depth(streams, stride) = streams · stride', streams * stride, nat(streams, stride), 'depth', [streams, stride]) }
  /** SPAN: the symbols an interleave window covers, depth over symbols. value depth · symbols. */
  static span(depth: number, symbols: number): CrossFormula { return c('interleaving-span', 'span(depth, symbols) = depth · symbols', depth * symbols, nat(depth, symbols), 'span', [depth, symbols]) }
  /** BLOCK SIZE: the symbols per block when a total is split into blocks. value ⌊total / blocks⌋. */
  static blocksize(total: number, blocks: number): CrossFormula { return c('interleaving-blocksize', 'blocksize(total, blocks) = ⌊total / blocks⌋', blocks > 0 ? Math.floor(total / blocks) : 0, nat(total, blocks) && blocks > 0, 'blocksize', [total, blocks]) }
  /** FILL DELAY: symbols buffered before readout, depth over the rate. value ⌊depth / rate⌋. */
  static delay(depth: number, rate: number): CrossFormula { return c('interleaving-delay', 'delay(depth, rate) = ⌊depth / rate⌋', rate > 0 ? Math.floor(depth / rate) : 0, nat(depth, rate) && rate > 0, 'delay', [depth, rate]) }
  /** BURST PROTECTION: the burst length the interleave survives, depth less the overhead. value max(0, depth − overhead). */
  static burstprotection(depth: number, overhead: number): CrossFormula { return c('interleaving-burstprotection', 'burstprotection(depth, overhead) = max(0, depth − overhead)', Math.max(0, depth - overhead), nat(depth, overhead), 'burstprotection', [depth, overhead]) }
  /** MATRIX CELLS: the cells of the write/read matrix, rows by columns. value rows · cols. */
  static matrixcells(rows: number, cols: number): CrossFormula { return c('interleaving-matrixcells', 'matrixcells(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'matrixcells', [rows, cols]) }
  /** SPREAD FACTOR: how far apart adjacent symbols land, a distance over the symbols. value ⌊distance / symbols⌋. */
  static spreadfactor(distance: number, symbols: number): CrossFormula { return c('interleaving-spreadfactor', 'spreadfactor(distance, symbols) = ⌊distance / symbols⌋', symbols > 0 ? Math.floor(distance / symbols) : 0, nat(distance, symbols) && symbols > 0, 'spreadfactor', [distance, symbols]) }
  /** LATENCY: end-to-end time to fill the interleave, depth symbols at a per-symbol period. value depth · period. */
  static latency(depth: number, period: number): CrossFormula { return c('interleaving-latency', 'latency(depth, period) = depth · period', depth * period, nat(depth, period), 'latency', [depth, period]) }
}

for (const name of ['blocksize', 'burstprotection', 'delay', 'depth', 'latency', 'matrixcells', 'span', 'spreadfactor'] as const)
  hexRegisterOf('interleaving', name, (InterleavingFormulas[name] as (...x: unknown[]) => unknown).bind(InterleavingFormulas))
