import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MIXING — THE MIXING CONSOLE AS ARITHMETIC. Summing signals is numbers: gain applied to a level, headroom under a
 *  ceiling, the pan position across a stereo field, a compressor folding what sits over its threshold, the ratio of input
 *  to output, average loudness, a crossfade between two sources, and the bus that sums the channels. Crosses to
 *  `acoustics` — mixing is the arithmetic acoustics sounds out. A measure. */

const PROOF = 'mixing arithmetic (gain, headroom, pan, compression, ratio, loudness, crossfade, bus); the console as integers; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mixing', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `mixing.${name}`, params })

export class MixingFormulas {
  /** GAIN: a level scaled by a factor. value level · factor. */
  static gain(level: number, factor: number): CrossFormula { return c('mixing-gain', 'gain(level, factor) = level · factor', level * factor, nat(level, factor), 'gain', [level, factor]) }
  /** HEADROOM: how far a peak sits under the ceiling. value max(0, ceiling − peak). */
  static headroom(ceiling: number, peak: number): CrossFormula { return c('mixing-headroom', 'headroom(ceiling, peak) = max(0, ceiling − peak)', Math.max(0, ceiling - peak), nat(ceiling, peak), 'headroom', [ceiling, peak]) }
  /** PAN: the share of the signal sent left, as a percentage. value ⌊left · 100 / (left + right)⌋. */
  static pan(left: number, right: number): CrossFormula { return c('mixing-pan', 'pan(left, right) = ⌊left · 100 / (left + right)⌋', left + right > 0 ? Math.floor((left * 100) / (left + right)) : 0, nat(left, right) && left + right > 0, 'pan', [left, right]) }
  /** COMPRESSION: what sits over the threshold, folded by the ratio. value input ≤ threshold ? input : threshold + ⌊(input − threshold) / ratio⌋. */
  static compression(input: number, threshold: number, ratio: number): CrossFormula { return c('mixing-compression', 'compression(input, threshold, ratio) = input ≤ threshold ? input : threshold + ⌊(input − threshold) / ratio⌋', ratio > 0 ? (input <= threshold ? input : threshold + Math.floor(Math.max(0, input - threshold) / ratio)) : 0, nat(input, threshold, ratio) && ratio > 0, 'compression', [input, threshold, ratio]) }
  /** RATIO: input over output, floored. value ⌊input / output⌋. */
  static ratio(input: number, output: number): CrossFormula { return c('mixing-ratio', 'ratio(input, output) = ⌊input / output⌋', output > 0 ? Math.floor(input / output) : 0, nat(input, output) && output > 0, 'ratio', [input, output]) }
  /** LOUDNESS: the average over the frames. value ⌊sum / count⌋. */
  static loudness(sum: number, count: number): CrossFormula { return c('mixing-loudness', 'loudness(sum, count) = ⌊sum / count⌋', count > 0 ? Math.floor(sum / count) : 0, nat(sum, count) && count > 0, 'loudness', [sum, count]) }
  /** CROSSFADE: a blend of two sources at a position (0..100). value ⌊(a · (100 − pos) + b · pos) / 100⌋. */
  static crossfade(a: number, b: number, pos: number): CrossFormula { return c('mixing-crossfade', 'crossfade(a, b, pos) = ⌊(a · (100 − pos) + b · pos) / 100⌋', Math.floor((a * Math.max(0, 100 - pos) + b * pos) / 100), nat(a, b, pos) && pos <= 100, 'crossfade', [a, b, pos]) }
  /** BUS: the channels summed at a per-channel level. value channels · perChannel. */
  static bus(channels: number, perChannel: number): CrossFormula { return c('mixing-bus', 'bus(channels, perChannel) = channels · perChannel', channels * perChannel, nat(channels, perChannel), 'bus', [channels, perChannel]) }
}

for (const name of ['bus', 'compression', 'crossfade', 'gain', 'headroom', 'loudness', 'pan', 'ratio'] as const)
  hexRegisterOf('mixing', name, (MixingFormulas[name] as (...x: unknown[]) => unknown).bind(MixingFormulas))
