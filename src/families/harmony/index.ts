import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HARMONY — TONAL MUSIC AS ARITHMETIC (chosen by the registry, not by hand). Chords and voices are numbers mod the octave:
 *  the interval between two pitches, the shape of a triad, how consonant a span is, a key's accidentals, the motion of a
 *  voice, the tension of a sonority, the inversion of a pitch class, and whether a progression cadences. Crosses to `music` —
 *  harmony is the arithmetic music is made of. A measure. */

const PROOF = 'harmony arithmetic (interval mod 12, triad quality, consonance, key signature by fifths, voice leading, tension, inversion, cadence); tonal music reduced to semitone arithmetic; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'harmony', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `harmony.${name}`, params })

export class HarmonyFormulas {
  /** INTERVAL: the semitones between two pitches, folded into the octave. value (((high − low) mod 12) + 12) mod 12. */
  static interval(low: number, high: number): CrossFormula { return c('harmony-interval', 'interval(low, high) = (((high − low) mod 12) + 12) mod 12', ((((high - low) % 12) + 12) % 12), nat(low, high), 'interval', [low, high]) }
  /** CHORD QUALITY: the upper third of a triad, its lower third over the fifth. value max(0, fifth − third). */
  static chordquality(third: number, fifth: number): CrossFormula { return c('harmony-chordquality', 'chordquality(third, fifth) = max(0, fifth − third)', Math.max(0, fifth - third), nat(third, fifth), 'chordquality', [third, fifth]) }
  /** CONSONANCE: 1 when an interval is a perfect consonance (unison, fourth, fifth, octave). value [semitones mod 12 ∈ {0,5,7}]. */
  static consonance(semitones: number): CrossFormula { return c('harmony-consonance', 'consonance(semitones) = [semitones mod 12 ∈ {0, 5, 7}]', [0, 5, 7].includes(((semitones % 12) + 12) % 12) ? 1 : 0, nat(semitones), 'consonance', [semitones]) }
  /** KEY SIGNATURE: a major key's sharps by its place on the circle of fifths. value (tonic · 7) mod 12. */
  static keysignature(tonic: number): CrossFormula { return c('harmony-keysignature', 'keysignature(tonic) = (tonic · 7) mod 12', (tonic * 7) % 12, nat(tonic), 'keysignature', [tonic]) }
  /** VOICE LEADING: the smallest motion of a voice between two pitches, either way round the octave. value min(d, 12 − d). */
  static voiceleading(from: number, to: number): CrossFormula { const d = ((((to - from) % 12) + 12) % 12); return c('harmony-voiceleading', 'voiceleading(from, to) = min(d, 12 − d), d = (to − from) mod 12', Math.min(d, 12 - d), nat(from, to), 'voiceleading', [from, to]) }
  /** TENSION: the dissonances of a sonority per voice, as a percentage. value ⌊dissonances · 100 / voices⌋. */
  static tension(dissonances: number, voices: number): CrossFormula { return c('harmony-tension', 'tension(dissonances, voices) = ⌊dissonances · 100 / voices⌋', voices > 0 ? Math.floor((dissonances * 100) / voices) : 0, nat(dissonances, voices) && voices > 0, 'tension', [dissonances, voices]) }
  /** INVERSION: a pitch class mirrored about an axis, folded into the octave. value ((2·axis − pc) mod 12 + 12) mod 12. */
  static inversion(pc: number, axis: number): CrossFormula { return c('harmony-inversion', 'inversion(pc, axis) = ((2·axis − pc) mod 12 + 12) mod 12', (((2 * axis - pc) % 12) + 12) % 12, nat(pc, axis), 'inversion', [pc, axis]) }
  /** CADENCE: 1 when a progression rises a perfect fourth (V → I). value [(to − from) mod 12 = 5]. */
  static cadence(from: number, to: number): CrossFormula { return c('harmony-cadence', 'cadence(from, to) = [(to − from) mod 12 = 5]', (((((to - from) % 12) + 12) % 12) === 5) ? 1 : 0, nat(from, to), 'cadence', [from, to]) }
}

for (const name of ['cadence', 'chordquality', 'consonance', 'interval', 'inversion', 'keysignature', 'tension', 'voiceleading'] as const)
  hexRegisterOf('harmony', name, (HarmonyFormulas[name] as (...x: unknown[]) => unknown).bind(HarmonyFormulas))
