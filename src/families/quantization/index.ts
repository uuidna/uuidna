import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QUANTIZATION — CONTINUOUS AMPLITUDE MADE DISCRETE, AS ARITHMETIC. Mapping a signal onto a finite ladder is numbers: the
 *  levels a bit-depth gives, the size of each step across a range, the signal-to-noise a depth buys, the depth a level
 *  count implies, the dynamic range, the worst-case rounding error, the bit rate a stream costs, and the resolution per
 *  step. Crosses to `signal` — quantization is what a signal is reduced to. A measure. */

const PROOF = 'quantization arithmetic (levels, step size, SNR, bit depth, dynamic range, quantization error, code rate, resolution); continuous amplitude made discrete; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'quantization', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `quantization.${name}`, params })

export class QuantizationFormulas {
  /** LEVELS: the codes a bit-depth gives. value 2^bits. */
  static levels(bits: number): CrossFormula { return c('quantization-levels', 'levels(bits) = 2^bits', 2 ** bits, nat(bits) && bits <= 16, 'levels', [bits]) }
  /** STEP SIZE: a full-scale range split across its levels. value ⌊range / levels⌋. */
  static stepsize(range: number, levels: number): CrossFormula { return c('quantization-stepsize', 'stepsize(range, levels) = ⌊range / levels⌋', levels > 0 ? Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'stepsize', [range, levels]) }
  /** SIGNAL-TO-NOISE a bit-depth buys (dB, 6 dB per bit). value 6 · bits. */
  static snr(bits: number): CrossFormula { return c('quantization-snr', 'snr(bits) = 6 · bits', 6 * bits, nat(bits) && bits <= 16, 'snr', [bits]) }
  /** BIT DEPTH a level count implies. value ⌊log2(levels)⌋. */
  static bits(levels: number): CrossFormula { return c('quantization-bits', 'bits(levels) = ⌊log2(levels)⌋', levels > 0 ? Math.floor(Math.log2(levels)) : 0, nat(levels) && levels > 0, 'bits', [levels]) }
  /** DYNAMIC RANGE: the largest code at a bit-depth. value 2^bits − 1. */
  static dynamicrange(bits: number): CrossFormula { return c('quantization-dynamicrange', 'dynamicrange(bits) = 2^bits − 1', Math.max(0, 2 ** bits - 1), nat(bits) && bits <= 16, 'dynamicrange', [bits]) }
  /** QUANTIZATION ERROR: the worst-case rounding, half a step. value ⌊step / 2⌋. */
  static quantizationerror(step: number): CrossFormula { return c('quantization-quantizationerror', 'quantizationerror(step) = ⌊step / 2⌋', Math.floor(step / 2), nat(step), 'quantizationerror', [step]) }
  /** CODE RATE: bits per sample over the samples of a stream. value bits · samples. */
  static coderate(bits: number, samples: number): CrossFormula { return c('quantization-coderate', 'coderate(bits, samples) = bits · samples', bits * samples, nat(bits, samples), 'coderate', [bits, samples]) }
  /** RESOLUTION: the smallest increment a range resolves at a bit-depth. value ⌊range / 2^bits⌋. */
  static resolution(range: number, bits: number): CrossFormula { return c('quantization-resolution', 'resolution(range, bits) = ⌊range / 2^bits⌋', Math.floor(range / (2 ** bits)), nat(range, bits) && bits <= 16, 'resolution', [range, bits]) }
}

for (const name of ['bits', 'coderate', 'dynamicrange', 'levels', 'quantizationerror', 'resolution', 'snr', 'stepsize'] as const)
  hexRegisterOf('quantization', name, (QuantizationFormulas[name] as (...x: unknown[]) => unknown).bind(QuantizationFormulas))
