import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHONETICS — THE SOUNDS OF SPEECH, AS ARITHMETIC. The voice is numbers: formant frequencies over harmonics, pitch as
 *  cycles per second, speaking rate as syllables per second, the share of voiced sounds, how long a sound holds, its
 *  intensity against a reference, the sonority of a segment, and the vowel share of the phonemes. Crosses to `linguistics`
 *  — phonetics is the measured layer the language sits on. A measure. */

const PROOF = 'phonetics arithmetic (formant, pitch, speaking rate, voicing, duration, intensity, sonority, vowel share); the sounds of speech as integers; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'phonetics', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `phonetics.${name}`, params })

export class PhoneticsFormulas {
  /** FORMANT: a resonance frequency over a harmonic number. value ⌊frequency / harmonic⌋. */
  static formant(frequency: number, harmonic: number): CrossFormula { return c('phonetics-formant', 'formant(frequency, harmonic) = ⌊frequency / harmonic⌋', harmonic > 0 ? Math.floor(frequency / harmonic) : 0, nat(frequency, harmonic) && harmonic > 0, 'formant', [frequency, harmonic]) }
  /** PITCH: cycles over seconds, the fundamental in hertz. value ⌊cycles / seconds⌋. */
  static pitch(cycles: number, seconds: number): CrossFormula { return c('phonetics-pitch', 'pitch(cycles, seconds) = ⌊cycles / seconds⌋', seconds > 0 ? Math.floor(cycles / seconds) : 0, nat(cycles, seconds) && seconds > 0, 'pitch', [cycles, seconds]) }
  /** RATE: syllables over seconds, the speaking rate. value ⌊syllables / seconds⌋. */
  static rate(syllables: number, seconds: number): CrossFormula { return c('phonetics-rate', 'rate(syllables, seconds) = ⌊syllables / seconds⌋', seconds > 0 ? Math.floor(syllables / seconds) : 0, nat(syllables, seconds) && seconds > 0, 'rate', [syllables, seconds]) }
  /** VOICING: the share of voiced sounds, as a percentage. value ⌊voiced · 100 / total⌋. */
  static voicing(voiced: number, total: number): CrossFormula { return c('phonetics-voicing', 'voicing(voiced, total) = ⌊voiced · 100 / total⌋', total > 0 ? Math.floor((voiced * 100) / total) : 0, nat(voiced, total) && total > 0 && voiced <= total, 'voicing', [voiced, total]) }
  /** DURATION: how long a sound holds, in milliseconds. value milliseconds. */
  static duration(milliseconds: number): CrossFormula { return c('phonetics-duration', 'duration(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'duration', [milliseconds]) }
  /** INTENSITY: amplitude against a reference, as a percentage. value ⌊amplitude · 100 / reference⌋. */
  static intensity(amplitude: number, reference: number): CrossFormula { return c('phonetics-intensity', 'intensity(amplitude, reference) = ⌊amplitude · 100 / reference⌋', reference > 0 ? Math.floor((amplitude * 100) / reference) : 0, nat(amplitude, reference) && reference > 0, 'intensity', [amplitude, reference]) }
  /** SONORITY: the sonority level of a segment. value level. */
  static sonority(level: number): CrossFormula { return c('phonetics-sonority', 'sonority(level) = level', level, nat(level), 'sonority', [level]) }
  /** VOWELS: the vowel share of the phonemes, as a percentage. value ⌊vowels · 100 / phonemes⌋. */
  static vowels(vowels_: number, phonemes: number): CrossFormula { return c('phonetics-vowels', 'vowels(vowels, phonemes) = ⌊vowels · 100 / phonemes⌋', phonemes > 0 ? Math.floor((vowels_ * 100) / phonemes) : 0, nat(vowels_, phonemes) && phonemes > 0 && vowels_ <= phonemes, 'vowels', [vowels_, phonemes]) }
}

for (const name of ['duration', 'formant', 'intensity', 'pitch', 'rate', 'sonority', 'voicing', 'vowels'] as const)
  hexRegisterOf('phonetics', name, (PhoneticsFormulas[name] as (...x: unknown[]) => unknown).bind(PhoneticsFormulas))
