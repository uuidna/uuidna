import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CRYPTANALYSIS — BREAKING A CIPHER, AS ARITHMETIC. The work of an attack is numbers: the keyspace to search, the time a
 *  brute force takes at a guess rate, the entropy per symbol, letter frequency, the index of coincidence, the avalanche of a
 *  bit flip, hash collisions, and the strength in bits that stands. Crosses to `code` — cryptanalysis is what breaks code. */

const PROOF = 'cryptanalysis arithmetic (keyspace, brute force time, entropy, frequency, index of coincidence, avalanche, collisions, strength); a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cryptanalysis', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `cryptanalysis.${name}`, params })

export class CryptanalysisFormulas {
  /** KEYSPACE: alphabet size over a length, as a bits proxy. value alphabet · length. */
  static keyspace(alphabet: number, length: number): CrossFormula { return c('cryptanalysis-keyspace', 'keyspace(alphabet, length) = alphabet · length', alphabet * length, nat(alphabet, length), 'keyspace', [alphabet, length]) }
  /** BRUTE FORCE: the keyspace searched at a per-second guess rate. value ⌊keyspace / rate⌋. */
  static bruteforce(keyspace_: number, rate: number): CrossFormula { return c('cryptanalysis-bruteforce', 'bruteforce(keyspace, rate) = ⌊keyspace / rate⌋', rate > 0 ? Math.floor(keyspace_ / rate) : 0, nat(keyspace_, rate) && rate > 0, 'bruteforce', [keyspace_, rate]) }
  /** ENTROPY: symbols over the unique symbols seen. value ⌊symbols / unique⌋. */
  static entropy(symbols: number, unique: number): CrossFormula { return c('cryptanalysis-entropy', 'entropy(symbols, unique) = ⌊symbols / unique⌋', unique > 0 ? Math.floor(symbols / unique) : 0, nat(symbols, unique) && unique > 0, 'entropy', [symbols, unique]) }
  /** FREQUENCY: a letter's share of the whole, as a percentage. value ⌊occurrences · 100 / total⌋. */
  static frequency(occurrences: number, total: number): CrossFormula { return c('cryptanalysis-frequency', 'frequency(occurrences, total) = ⌊occurrences · 100 / total⌋', total > 0 ? Math.floor((occurrences * 100) / total) : 0, nat(occurrences, total) && total > 0 && occurrences <= total, 'frequency', [occurrences, total]) }
  /** INDEX OF COINCIDENCE: matching pairs over all pairs, scaled by 10000. value ⌊matches · 10000 / pairs⌋. */
  static coincidence(matches: number, pairs: number): CrossFormula { return c('cryptanalysis-coincidence', 'coincidence(matches, pairs) = ⌊matches · 10000 / pairs⌋', pairs > 0 ? Math.floor((matches * 10000) / pairs) : 0, nat(matches, pairs) && pairs > 0, 'coincidence', [matches, pairs]) }
  /** AVALANCHE: output bits flipped by a one-bit change, as a percentage. value ⌊flipped · 100 / bits⌋. */
  static avalanche(flipped: number, bits: number): CrossFormula { return c('cryptanalysis-avalanche', 'avalanche(flipped, bits) = ⌊flipped · 100 / bits⌋', bits > 0 ? Math.floor((flipped * 100) / bits) : 0, nat(flipped, bits) && bits > 0 && flipped <= bits, 'avalanche', [flipped, bits]) }
  /** COLLISIONS: found over hashes drawn, scaled by a million. value ⌊found · 1000000 / hashes⌋. */
  static collisions(found: number, hashes: number): CrossFormula { return c('cryptanalysis-collisions', 'collisions(found, hashes) = ⌊found · 1000000 / hashes⌋', hashes > 0 ? Math.floor((found * 1000000) / hashes) : 0, nat(found, hashes) && hashes > 0, 'collisions', [found, hashes]) }
  /** STRENGTH: the bits of security that stand. value bits. */
  static strength(bits: number): CrossFormula { return c('cryptanalysis-strength', 'strength(bits) = bits', bits, nat(bits), 'strength', [bits]) }
}

for (const name of ['avalanche', 'bruteforce', 'coincidence', 'collisions', 'entropy', 'frequency', 'keyspace', 'strength'] as const)
  hexRegisterOf('cryptanalysis', name, (CryptanalysisFormulas[name] as (...x: unknown[]) => unknown).bind(CryptanalysisFormulas))
