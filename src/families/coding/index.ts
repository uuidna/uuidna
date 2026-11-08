import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CODING — ERROR-CORRECTING CODES AS ARITHMETIC. A code is numbers: the rate at which bits carry information, the
 *  redundant symbols added, the minimum distance that separates codewords, the block it all fits in, the errors a
 *  distance can correct, the efficiency of a frame, a parity bit, and the overhead the protection costs. Crosses to
 *  `signal` — coding is what travels the channel signal carries. A measure. */

const PROOF = 'coding arithmetic (code rate, redundancy, Hamming distance, block length, error correction, efficiency, parity, overhead); error-correcting codes as integer formulas; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'coding', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `coding.${name}`, params })

export class CodingFormulas {
  /** CODE RATE: information bits over the block, as a percentage. value ⌊info · 100 / block⌋. */
  static coderate(info: number, block: number): CrossFormula { return c('coding-coderate', 'coderate(info, block) = ⌊info · 100 / block⌋', block > 0 ? Math.floor((info * 100) / block) : 0, nat(info, block) && block > 0 && info <= block, 'coderate', [info, block]) }
  /** REDUNDANCY: the extra symbols a block carries beyond its information. value max(0, block − info). */
  static redundancy(block: number, info: number): CrossFormula { return c('coding-redundancy', 'redundancy(block, info) = max(0, block − info)', Math.max(0, block - info), nat(block, info), 'redundancy', [block, info]) }
  /** HAMMING DISTANCE: the minimum distance that corrects a given number of errors. value 2 · errors + 1. */
  static hammingdistance(errors: number): CrossFormula { return c('coding-hammingdistance', 'hammingdistance(errors) = 2 · errors + 1', 2 * errors + 1, nat(errors), 'hammingdistance', [errors]) }
  /** BLOCK LENGTH: information bits plus parity bits. value info + parity. */
  static blocklength(info: number, parity: number): CrossFormula { return c('coding-blocklength', 'blocklength(info, parity) = info + parity', info + parity, nat(info, parity), 'blocklength', [info, parity]) }
  /** ERROR CORRECTION: the errors a minimum distance can correct. value ⌊max(0, distance − 1) / 2⌋. */
  static errorcorrection(distance: number): CrossFormula { return c('coding-errorcorrection', 'errorcorrection(distance) = ⌊max(0, distance − 1) / 2⌋', Math.floor(Math.max(0, distance - 1) / 2), nat(distance), 'errorcorrection', [distance]) }
  /** CODING EFFICIENCY: payload over the frame it rides in, as a percentage. value ⌊payload · 100 / frame⌋. */
  static codingefficiency(payload: number, frame: number): CrossFormula { return c('coding-codingefficiency', 'codingefficiency(payload, frame) = ⌊payload · 100 / frame⌋', frame > 0 ? Math.floor((payload * 100) / frame) : 0, nat(payload, frame) && frame > 0 && payload <= frame, 'codingefficiency', [payload, frame]) }
  /** PARITY BIT: even parity over a word with a given number of set bits. value ones mod 2. */
  static parityanbits(ones: number): CrossFormula { return c('coding-parityanbits', 'parityanbits(ones) = ones mod 2', ones % 2, nat(ones), 'parityanbits', [ones]) }
  /** OVERHEAD: parity bits as a percentage of the information they protect. value ⌊parity · 100 / info⌋. */
  static overhead(parity: number, info: number): CrossFormula { return c('coding-overhead', 'overhead(parity, info) = ⌊parity · 100 / info⌋', info > 0 ? Math.floor((parity * 100) / info) : 0, nat(parity, info) && info > 0, 'overhead', [parity, info]) }
}

for (const name of ['blocklength', 'coderate', 'codingefficiency', 'errorcorrection', 'hammingdistance', 'overhead', 'parityanbits', 'redundancy'] as const)
  hexRegisterOf('coding', name, (CodingFormulas[name] as (...x: unknown[]) => unknown).bind(CodingFormulas))
