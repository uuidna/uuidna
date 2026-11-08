import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TUNING — MUSICAL INTONATION AS ARITHMETIC (chosen by the registry, not by hand). Tuning is numbers: cents between
 *  steps, the ratio of two pitches, equal-tempered divisions, the beat two close notes make, the Pythagorean comma from
 *  stacked fifths, a reference pitch doubled by octave, a semitone count, and the octave's own doubling. Crosses to
 *  `music` — tuning is what music is built on. A measure. */

const PROOF = 'tuning arithmetic (cents offset, frequency ratio, equal temperament, beat frequency, pythagorean comma, reference pitch, semitone count, octave doubling); a registry-chosen measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tuning', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `tuning.${name}`, params })

export class TuningFormulas {
  /** BEAT FREQUENCY: the beat two close pitches make. value |f1 − f2|. */
  static beatfrequency(f1: number, f2: number): CrossFormula { return c('tuning-beatfrequency', 'beatfrequency(f1, f2) = |f1 − f2|', Math.max(0, f1 - f2), nat(f1, f2) && f1 >= f2, 'beatfrequency', [f1, f2]) }
  /** CENTS OFFSET: cents in a span of semitones. value semitones · 100. */
  static centsoffset(semitones: number): CrossFormula { return c('tuning-centsoffset', 'centsoffset(semitones) = semitones · 100', semitones * 100, nat(semitones), 'centsoffset', [semitones]) }
  /** EQUAL TEMPERED: steps when each octave is cut into equal divisions. value octaves · divisions. */
  static equaltempered(octaves: number, divisions: number): CrossFormula { return c('tuning-equaltempered', 'equaltempered(octaves, divisions) = octaves · divisions', octaves * divisions, nat(octaves, divisions), 'equaltempered', [octaves, divisions]) }
  /** FREQUENCY RATIO: a pitch over a base, in thousandths. value ⌊freq · 1000 / base⌋. */
  static frequencyratio(freq: number, base: number): CrossFormula { return c('tuning-frequencyratio', 'frequencyratio(freq, base) = ⌊freq · 1000 / base⌋', base > 0 ? Math.floor((freq * 1000) / base) : 0, nat(freq, base) && base > 0, 'frequencyratio', [freq, base]) }
  /** OCTAVE RATIO: the frequency doubling across octaves. value 2^octaves. */
  static octaveratio(octaves: number): CrossFormula { return c('tuning-octaveratio', 'octaveratio(octaves) = 2^octaves', 2 ** octaves, nat(octaves), 'octaveratio', [octaves]) }
  /** PYTHAGOREAN COMMA: semitones from stacking perfect fifths (7 each). value fifths · 7. */
  static pythagoreancomma(fifths: number): CrossFormula { return c('tuning-pythagoreancomma', 'pythagoreancomma(fifths) = fifths · 7', fifths * 7, nat(fifths), 'pythagoreancomma', [fifths]) }
  /** REFERENCE PITCH: a base pitch doubled by octave. value base · 2^octaves. */
  static referencepitch(octaves: number, base: number): CrossFormula { return c('tuning-referencepitch', 'referencepitch(octaves, base) = base · 2^octaves', base * 2 ** octaves, nat(octaves, base), 'referencepitch', [octaves, base]) }
  /** SEMITONE RATIO: the semitones a cents interval spans. value ⌊cents / 100⌋. */
  static semitoneratio(cents: number): CrossFormula { return c('tuning-semitoneratio', 'semitoneratio(cents) = ⌊cents / 100⌋', Math.floor(cents / 100), nat(cents), 'semitoneratio', [cents]) }
}

for (const name of ['beatfrequency', 'centsoffset', 'equaltempered', 'frequencyratio', 'octaveratio', 'pythagoreancomma', 'referencepitch', 'semitoneratio'] as const)
  hexRegisterOf('tuning', name, (TuningFormulas[name] as (...x: unknown[]) => unknown).bind(TuningFormulas))
