import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARITY — ERROR DETECTION AND CORRECTION, AS ARITHMETIC. A bitstream protected is numbers: the even-parity bit over the
 *  ones, the check bits one per block, the syndrome that locates a flip, the Hamming bits a word needs, the codeword it
 *  covers, the detection rate, the parity overhead, and how many errors a distance can correct. Crosses to `signal` —
 *  parity is what keeps a signal clean. A measure. */

const PROOF = 'parity arithmetic (even bit, check bits, syndrome, hamming bits, coverage, detect rate, overhead, correctable); error detection and correction; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'parity', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `parity.${name}`, params })

export class ParityFormulas {
  /** EVEN PARITY BIT: 1 when the count of ones is odd. value ones mod 2. */
  static evenbit(ones: number): CrossFormula { return c('parity-evenbit', 'evenbit(ones) = ones mod 2', ones % 2, nat(ones), 'evenbit', [ones]) }
  /** CHECK BITS: one parity bit per block of data. value ⌈data / block⌉. */
  static checkbits(data: number, block: number): CrossFormula { return c('parity-checkbits', 'checkbits(data, block) = ⌈data / block⌉', block > 0 ? Math.ceil(data / block) : 0, nat(data, block) && block > 0, 'checkbits', [data, block]) }
  /** SYNDROME: the received word XOR the expected word locates the flip. value received ⊕ expected. */
  static syndrome(received: number, expected: number): CrossFormula { return c('parity-syndrome', 'syndrome(received, expected) = received ⊕ expected', received ^ expected, nat(received, expected), 'syndrome', [received, expected]) }
  /** HAMMING BITS: the parity bits a data word needs. value min r : 2^r ≥ data + r + 1. */
  static hammingbits(data: number): CrossFormula { let r = 0; while (2 ** r < data + r + 1) r++; return c('parity-hammingbits', 'hammingbits(data) = min r : 2^r ≥ data + r + 1', r, nat(data), 'hammingbits', [data]) }
  /** COVERAGE: the codeword length a protected word covers. value data + parity. */
  static coveragebits(data: number, parity: number): CrossFormula { return c('parity-coveragebits', 'coveragebits(data, parity) = data + parity', data + parity, nat(data, parity), 'coveragebits', [data, parity]) }
  /** DETECT RATE as a percentage. value ⌊detected · 100 / total⌋. */
  static detectrate(detected: number, total: number): CrossFormula { return c('parity-detectrate', 'detectrate(detected, total) = ⌊detected · 100 / total⌋', total > 0 ? Math.floor((detected * 100) / total) : 0, nat(detected, total) && total > 0 && detected <= total, 'detectrate', [detected, total]) }
  /** OVERHEAD: parity bits as a percentage of data. value ⌊parity · 100 / data⌋. */
  static overhead(parity: number, data: number): CrossFormula { return c('parity-overhead', 'overhead(parity, data) = ⌊parity · 100 / data⌋', data > 0 ? Math.floor((parity * 100) / data) : 0, nat(parity, data) && data > 0, 'overhead', [parity, data]) }
  /** CORRECTABLE: errors a minimum distance can correct. value ⌊max(0, distance − 1) / 2⌋. */
  static correctable(distance: number): CrossFormula { return c('parity-correctable', 'correctable(distance) = ⌊max(0, distance − 1) / 2⌋', Math.floor(Math.max(0, distance - 1) / 2), nat(distance), 'correctable', [distance]) }
}

for (const name of ['checkbits', 'correctable', 'coveragebits', 'detectrate', 'evenbit', 'hammingbits', 'overhead', 'syndrome'] as const)
  hexRegisterOf('parity', name, (ParityFormulas[name] as (...x: unknown[]) => unknown).bind(ParityFormulas))
