import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHECKSUM — ERROR DETECTION, AS ARITHMETIC. A message carries a small number derived from its bytes so the far end can
 *  tell whether the bits arrived intact: the modular sum, its one's complement, the CRC check bits appended, a Fletcher
 *  pair folded to one word, a running XOR, the fraction of errors a code detects, the overhead it costs, and the bytes
 *  left in the last block. Crosses to `networking` — a checksum is what the wire's frames carry. A measure. */

const PROOF = 'checksum arithmetic (modular sum, one\'s complement, CRC check bits, Fletcher fold, XOR, detection rate, overhead, block remainder); error detection on the wire; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'checksum', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `checksum.${name}`, params })

export class ChecksumFormulas {
  /** MODULAR SUM: the byte sum folded into a modulus. value sum mod modulus. */
  static modular(sum: number, modulus: number): CrossFormula { return c('checksum-modular', 'modular(sum, modulus) = sum mod modulus', modulus > 0 ? sum % modulus : 0, nat(sum, modulus) && modulus > 0, 'modular', [sum, modulus]) }
  /** ONE'S COMPLEMENT of the folded sum over a modulus. value (modulus − 1) − (sum mod modulus). */
  static onescomplement(sum: number, modulus: number): CrossFormula { return c('checksum-onescomplement', 'onescomplement(sum, modulus) = (modulus − 1) − (sum mod modulus)', modulus > 0 ? Math.max(0, (modulus - 1) - (sum % modulus)) : 0, nat(sum, modulus) && modulus > 0, 'onescomplement', [sum, modulus]) }
  /** CRC BITS: the message extended by the generator's check bits. value datalen + polydegree. */
  static crcbits(datalen: number, polydegree: number): CrossFormula { return c('checksum-crcbits', 'crcbits(datalen, polydegree) = datalen + polydegree', datalen + polydegree, nat(datalen, polydegree), 'crcbits', [datalen, polydegree]) }
  /** FLETCHER: the two running sums folded into one word. value sum2 · 256 + sum1. */
  static fletcher(sum1: number, sum2: number): CrossFormula { return c('checksum-fletcher', 'fletcher(sum1, sum2) = sum2 · 256 + sum1', sum2 * 256 + sum1, nat(sum1, sum2), 'fletcher', [sum1, sum2]) }
  /** XOR SUM: the longitudinal parity of two words. value a xor b. */
  static xorsum(a: number, b: number): CrossFormula { return c('checksum-xorsum', 'xorsum(a, b) = a xor b', a ^ b, nat(a, b), 'xorsum', [a, b]) }
  /** DETECTION RATE as a percentage of errors caught. value ⌊detected · 100 / total⌋. */
  static detectionrate(detected: number, total: number): CrossFormula { return c('checksum-detectionrate', 'detectionrate(detected, total) = ⌊detected · 100 / total⌋', total > 0 ? Math.floor((detected * 100) / total) : 0, nat(detected, total) && total > 0 && detected <= total, 'detectionrate', [detected, total]) }
  /** OVERHEAD: the check bits as a percentage of the data bits. value ⌊checkbits · 100 / databits⌋. */
  static overhead(checkbits: number, databits: number): CrossFormula { return c('checksum-overhead', 'overhead(checkbits, databits) = ⌊checkbits · 100 / databits⌋', databits > 0 ? Math.floor((checkbits * 100) / databits) : 0, nat(checkbits, databits) && databits > 0, 'overhead', [checkbits, databits]) }
  /** BLOCK REMAINDER: the bytes left in the last block. value datalen mod blocksize. */
  static blocksremainder(datalen: number, blocksize: number): CrossFormula { return c('checksum-blocksremainder', 'blocksremainder(datalen, blocksize) = datalen mod blocksize', blocksize > 0 ? datalen % blocksize : 0, nat(datalen, blocksize) && blocksize > 0, 'blocksremainder', [datalen, blocksize]) }
}

for (const name of ['blocksremainder', 'crcbits', 'detectionrate', 'fletcher', 'modular', 'onescomplement', 'overhead', 'xorsum'] as const)
  hexRegisterOf('checksum', name, (ChecksumFormulas[name] as (...x: unknown[]) => unknown).bind(ChecksumFormulas))
