import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUDIOLOGY — HEARING AS ARITHMETIC (a clinical measure, not advice). The audiogram is numbers: the threshold in decibels,
 *  hearing loss against the normal reference, speech discrimination, hearing-aid gain, a frequency in hertz, masking of a
 *  signal, room reverberation, and a tinnitus match. Crosses to `med` — audiology is a measure medicine reads. A measure. */

const PROOF = 'audiology arithmetic (threshold, loss, speech discrimination, hearing-aid gain, frequency, masking, reverberation, tinnitus match); a clinical measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'audiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `audiology.${name}`, params })

export class AudiologyFormulas {
  /** SPEECH DISCRIMINATION: words heard correctly as a percentage. value ⌊correct · 100 / words⌋. */
  static discrimination(correct: number, words: number): CrossFormula { return c('audiology-discrimination', 'discrimination(correct, words) = ⌊correct · 100 / words⌋', words > 0 ? Math.floor((correct * 100) / words) : 0, nat(correct, words) && words > 0 && correct <= words, 'discrimination', [correct, words]) }
  /** FREQUENCY: cycles over seconds, in hertz. value ⌊cycles / seconds⌋. */
  static frequency(cycles: number, seconds: number): CrossFormula { return c('audiology-frequency', 'frequency(cycles, seconds) = ⌊cycles / seconds⌋', seconds > 0 ? Math.floor(cycles / seconds) : 0, nat(cycles, seconds) && seconds > 0, 'frequency', [cycles, seconds]) }
  /** HEARING-AID GAIN: output against input as a percentage. value ⌊output · 100 / input⌋. */
  static gain(output: number, input: number): CrossFormula { return c('audiology-gain', 'gain(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0, 'gain', [output, input]) }
  /** HEARING LOSS: the impaired threshold against the normal reference, as a percentage. value ⌊impaired · 100 / normal⌋. */
  static loss(impaired: number, normal: number): CrossFormula { return c('audiology-loss', 'loss(impaired, normal) = ⌊impaired · 100 / normal⌋', normal > 0 ? Math.floor((impaired * 100) / normal) : 0, nat(impaired, normal) && normal > 0, 'loss', [impaired, normal]) }
  /** MASKING: a masker level against the signal, as a percentage. value ⌊level · 100 / signal⌋. */
  static masking(level: number, signal: number): CrossFormula { return c('audiology-masking', 'masking(level, signal) = ⌊level · 100 / signal⌋', signal > 0 ? Math.floor((level * 100) / signal) : 0, nat(level, signal) && signal > 0, 'masking', [level, signal]) }
  /** REVERBERATION: room volume over absorption. value ⌊volume / absorption⌋. */
  static reverberation(volume: number, absorption: number): CrossFormula { return c('audiology-reverberation', 'reverberation(volume, absorption) = ⌊volume / absorption⌋', absorption > 0 ? Math.floor(volume / absorption) : 0, nat(volume, absorption) && absorption > 0, 'reverberation', [volume, absorption]) }
  /** THRESHOLD: the hearing threshold in decibels. value decibels. */
  static threshold(decibels: number): CrossFormula { return c('audiology-threshold', 'threshold(decibels) = decibels', decibels, nat(decibels), 'threshold', [decibels]) }
  /** TINNITUS MATCH: the matched tone against a reference, as a percentage. value ⌊matched · 100 / reference⌋. */
  static tinnitus(matched: number, reference: number): CrossFormula { return c('audiology-tinnitus', 'tinnitus(matched, reference) = ⌊matched · 100 / reference⌋', reference > 0 ? Math.floor((matched * 100) / reference) : 0, nat(matched, reference) && reference > 0, 'tinnitus', [matched, reference]) }
}

for (const name of ['discrimination', 'frequency', 'gain', 'loss', 'masking', 'reverberation', 'threshold', 'tinnitus'] as const)
  hexRegisterOf('audiology', name, (AudiologyFormulas[name] as (...x: unknown[]) => unknown).bind(AudiologyFormulas))
