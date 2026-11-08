import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPRESSION — PACKING DATA SMALL, AS ARITHMETIC. Making data smaller is numbers: the ratio against the original, the
 *  percentage saved, symbols per distinct symbol, bits per second, how much repeats, bytes per millisecond, the dictionary
 *  it carries, and how faithfully it restores. Crosses to `storage` — compression is what storage buys back. A measure. */

const PROOF = 'compression arithmetic (ratio, savings, entropy, bitrate, redundancy, throughput, dictionary, fidelity); packing data small as integers; a measure crossed to storage'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'compression', dst: 'storage', formula, value, proof: PROOF, ...extra }, holds, { name: `compression.${name}`, params })

export class CompressionFormulas {
  /** RATIO: the original against the compressed, as a percentage. value ⌊original · 100 / compressed⌋. */
  static ratio(original: number, compressed: number): CrossFormula { return c('compression-ratio', 'ratio(original, compressed) = ⌊original · 100 / compressed⌋', compressed > 0 ? Math.floor((original * 100) / compressed) : 0, nat(original, compressed) && compressed > 0, 'ratio', [original, compressed]) }
  /** SAVINGS: the fraction of the original the compression removed, as a percentage. value ⌊(original − compressed) · 100 / original⌋. */
  static savings(original: number, compressed: number): CrossFormula { return c('compression-savings', 'savings(original, compressed) = ⌊(original − compressed) · 100 / original⌋', original > 0 ? Math.floor(((original - compressed) * 100) / original) : 0, nat(original, compressed) && original > 0 && compressed <= original, 'savings', [original, compressed]) }
  /** ENTROPY: symbols per distinct symbol. value ⌊symbols / unique⌋. */
  static entropy(symbols: number, unique: number): CrossFormula { return c('compression-entropy', 'entropy(symbols, unique) = ⌊symbols / unique⌋', unique > 0 ? Math.floor(symbols / unique) : 0, nat(symbols, unique) && unique > 0, 'entropy', [symbols, unique]) }
  /** BITRATE: bits over seconds. value ⌊bits / seconds⌋. */
  static bitrate(bits: number, seconds: number): CrossFormula { return c('compression-bitrate', 'bitrate(bits, seconds) = ⌊bits / seconds⌋', seconds > 0 ? Math.floor(bits / seconds) : 0, nat(bits, seconds) && seconds > 0, 'bitrate', [bits, seconds]) }
  /** REDUNDANCY: the repeated part of the total, as a percentage. value ⌊repeated · 100 / total⌋. */
  static redundancy(repeated: number, total: number): CrossFormula { return c('compression-redundancy', 'redundancy(repeated, total) = ⌊repeated · 100 / total⌋', total > 0 ? Math.floor((repeated * 100) / total) : 0, nat(repeated, total) && total > 0 && repeated <= total, 'redundancy', [repeated, total]) }
  /** THROUGHPUT: bytes over milliseconds. value ⌊bytes / ms⌋. */
  static throughput(bytes: number, ms: number): CrossFormula { return c('compression-throughput', 'throughput(bytes, ms) = ⌊bytes / ms⌋', ms > 0 ? Math.floor(bytes / ms) : 0, nat(bytes, ms) && ms > 0, 'throughput', [bytes, ms]) }
  /** DICTIONARY: the dictionary the compression carries. value size. */
  static dictionary(size: number): CrossFormula { return c('compression-dictionary', 'dictionary(size) = size', size, nat(size), 'dictionary', [size]) }
  /** FIDELITY: how much of the original the restore recovered, as a percentage. value ⌊restored · 100 / original⌋. */
  static fidelity(restored: number, original: number): CrossFormula { return c('compression-fidelity', 'fidelity(restored, original) = ⌊restored · 100 / original⌋', original > 0 ? Math.floor((restored * 100) / original) : 0, nat(restored, original) && original > 0 && restored <= original, 'fidelity', [restored, original]) }
}

for (const name of ['bitrate', 'dictionary', 'entropy', 'fidelity', 'ratio', 'redundancy', 'savings', 'throughput'] as const)
  hexRegisterOf('compression', name, (CompressionFormulas[name] as (...x: unknown[]) => unknown).bind(CompressionFormulas))
