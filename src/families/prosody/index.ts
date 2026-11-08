import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROSODY — THE MUSIC OF SPEECH, AS ARITHMETIC. The spoken line is numbers: syllables per line, the share that carry stress,
 *  how fast the words come, how many breaths break the phrase, the span from lowest pitch to highest, the metrical feet, the
 *  rhythm's pairwise variability, and the beat. Crosses to `linguistics` — prosody is the sound the grammar is spoken in. A measure. */

const PROOF = 'prosody arithmetic (syllable count, stress ratio, speech rate, pause count, pitch range, metrical feet, rhythm index, tempo); the music of speech as integers; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'prosody', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `prosody.${name}`, params })

export class ProsodyFormulas {
  /** SYLLABLE COUNT: words at syllables each. value words · perWord. */
  static syllablecount(words: number, perWord: number): CrossFormula { return c('prosody-syllablecount', 'syllablecount(words, perWord) = words · perWord', words * perWord, nat(words, perWord), 'syllablecount', [words, perWord]) }
  /** STRESS RATIO: the percentage of syllables that carry stress. value ⌊stressed · 100 / total⌋. */
  static stressratio(stressed: number, total: number): CrossFormula { return c('prosody-stressratio', 'stressratio(stressed, total) = ⌊stressed · 100 / total⌋', total > 0 ? Math.floor((stressed * 100) / total) : 0, nat(stressed, total) && total > 0 && stressed <= total, 'stressratio', [stressed, total]) }
  /** SPEECH RATE: words over minutes, in words per minute. value ⌊words / minutes⌋. */
  static speechrate(words: number, minutes: number): CrossFormula { return c('prosody-speechrate', 'speechrate(words, minutes) = ⌊words / minutes⌋', minutes > 0 ? Math.floor(words / minutes) : 0, nat(words, minutes) && minutes > 0, 'speechrate', [words, minutes]) }
  /** PAUSE COUNT: the breaths a line of words needs at a phrase length. value ⌈words / perPhrase⌉. */
  static pausecount(words: number, perPhrase: number): CrossFormula { return c('prosody-pausecount', 'pausecount(words, perPhrase) = ⌈words / perPhrase⌉', perPhrase > 0 ? Math.ceil(words / perPhrase) : 0, nat(words, perPhrase) && perPhrase > 0, 'pausecount', [words, perPhrase]) }
  /** PITCH RANGE: the span from lowest to highest pitch (Hz). value max(0, high − low). */
  static pitchrange(high: number, low: number): CrossFormula { return c('prosody-pitchrange', 'pitchrange(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'pitchrange', [high, low]) }
  /** METRICAL FEET: syllables grouped into feet of a fixed length. value ⌊syllables / perFoot⌋. */
  static meterfeet(syllables: number, perFoot: number): CrossFormula { return c('prosody-meterfeet', 'meterfeet(syllables, perFoot) = ⌊syllables / perFoot⌋', perFoot > 0 ? Math.floor(syllables / perFoot) : 0, nat(syllables, perFoot) && perFoot > 0, 'meterfeet', [syllables, perFoot]) }
  /** RHYTHM INDEX: normalized pairwise variability of durations. value ⌊diff · 100 / sum⌋. */
  static rhythmindex(diff: number, sum: number): CrossFormula { return c('prosody-rhythmindex', 'rhythmindex(diff, sum) = ⌊diff · 100 / sum⌋', sum > 0 ? Math.floor((diff * 100) / sum) : 0, nat(diff, sum) && sum > 0 && diff <= sum, 'rhythmindex', [diff, sum]) }
  /** TEMPO: beats over minutes, in beats per minute. value ⌊beats / minutes⌋. */
  static tempo(beats: number, minutes: number): CrossFormula { return c('prosody-tempo', 'tempo(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'tempo', [beats, minutes]) }
}

for (const name of ['meterfeet', 'pausecount', 'pitchrange', 'rhythmindex', 'speechrate', 'stressratio', 'syllablecount', 'tempo'] as const)
  hexRegisterOf('prosody', name, (ProsodyFormulas[name] as (...x: unknown[]) => unknown).bind(ProsodyFormulas))
