import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CADENCE — HOW A HARMONIC PHRASE ARRIVES, AS ARITHMETIC. The close of a phrase is numbers: how far the root moves, how
 *  hard the voices pull to resolution, the span of a chord, the beats in a phrase, how many chords fill a bar, the tension
 *  released, the interval that approaches the goal, and whether the arrival is final. Crosses to `music` — cadence is how
 *  music ends. A measure. */

const PROOF = 'cadence arithmetic (root motion, resolution strength, chord span, phrase length, harmonic rhythm, tension release, approach interval, finality); how a harmonic phrase arrives; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cadence', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `cadence.${name}`, params })

export class CadenceFormulas {
  /** ROOT MOTION: the ascending semitones the root moves between chords. value max(0, to − from). */
  static rootmotion(from: number, to: number): CrossFormula { return c('cadence-rootmotion', 'rootmotion(from, to) = max(0, to − from)', Math.max(0, to - from), nat(from, to), 'rootmotion', [from, to]) }
  /** RESOLUTION STRENGTH: total pull as each voice pulls to its goal. value pull · voices. */
  static resolutionstrength(pull: number, voices: number): CrossFormula { return c('cadence-resolutionstrength', 'resolutionstrength(pull, voices) = pull · voices', pull * voices, nat(pull, voices), 'resolutionstrength', [pull, voices]) }
  /** CHORD SPAN: semitones from the lowest to the highest note. value max(0, high − low). */
  static chordspan(low: number, high: number): CrossFormula { return c('cadence-chordspan', 'chordspan(low, high) = max(0, high − low)', Math.max(0, high - low), nat(low, high), 'chordspan', [low, high]) }
  /** PHRASE LENGTH: beats in a phrase, bars at a beats-per-bar. value bars · beats. */
  static phraselength(bars: number, beats: number): CrossFormula { return c('cadence-phraselength', 'phraselength(bars, beats) = bars · beats', bars * beats, nat(bars, beats), 'phraselength', [bars, beats]) }
  /** HARMONIC RHYTHM: chords per bar. value ⌊chords / bars⌋. */
  static harmonicrhythm(chords: number, bars: number): CrossFormula { return c('cadence-harmonicrhythm', 'harmonicrhythm(chords, bars) = ⌊chords / bars⌋', bars > 0 ? Math.floor(chords / bars) : 0, nat(chords, bars) && bars > 0, 'harmonicrhythm', [chords, bars]) }
  /** TENSION RELEASE: the released fraction as a percentage. value ⌊released · 100 / total⌋. */
  static tensionrelease(released: number, total: number): CrossFormula { return c('cadence-tensionrelease', 'tensionrelease(released, total) = ⌊released · 100 / total⌋', total > 0 ? Math.floor((released * 100) / total) : 0, nat(released, total) && total > 0 && released <= total, 'tensionrelease', [released, total]) }
  /** APPROACH INTERVAL: the ascending semitones approaching the cadence tone. value max(0, to − from). */
  static approachinterval(from: number, to: number): CrossFormula { return c('cadence-approachinterval', 'approachinterval(from, to) = max(0, to − from)', Math.max(0, to - from), nat(from, to), 'approachinterval', [from, to]) }
  /** FINALITY TYPE: 1 when the arrival meets the authentic threshold. value [strength ≥ threshold]. */
  static finalitytype(strength: number, threshold: number): CrossFormula { return c('cadence-finalitytype', 'finalitytype(strength, threshold) = [strength ≥ threshold]', strength >= threshold ? 1 : 0, nat(strength, threshold), 'finalitytype', [strength, threshold]) }
}

for (const name of ['approachinterval', 'chordspan', 'finalitytype', 'harmonicrhythm', 'phraselength', 'resolutionstrength', 'rootmotion', 'tensionrelease'] as const)
  hexRegisterOf('cadence', name, (CadenceFormulas[name] as (...x: unknown[]) => unknown).bind(CadenceFormulas))
