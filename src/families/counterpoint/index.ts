import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COUNTERPOINT — THE WRITING OF INDEPENDENT VOICES, AS ARITHMETIC. Species counterpoint is numbers: how many voices sound,
 *  how many forbidden parallel fifths, how much contrary motion, whether an interval is consonant, the note-ratio of a
 *  species, the dissonances left, the span of the cantus firmus, and the beats an imitation is delayed. Crosses to `music` —
 *  counterpoint is a discipline of music. A measure. */

const PROOF = 'counterpoint arithmetic (voice count, parallel fifths, contrary motion, interval consonance, species ratio, dissonance count, cantus span, imitation delay); a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'counterpoint', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `counterpoint.${name}`, params })

export class CounterpointFormulas {
  /** VOICE COUNT: the upper and lower parts that sound together. value upper + lower. */
  static voicecount(upper: number, lower: number): CrossFormula { return c('counterpoint-voicecount', 'voicecount(upper, lower) = upper + lower', upper + lower, nat(upper, lower), 'voicecount', [upper, lower]) }
  /** PARALLEL FIFTHS as a percentage of the intervals written. value ⌊fifths · 100 / total⌋. */
  static parallelfifths(fifths: number, total: number): CrossFormula { return c('counterpoint-parallelfifths', 'parallelfifths(fifths, total) = ⌊fifths · 100 / total⌋', total > 0 ? Math.floor((fifths * 100) / total) : 0, nat(fifths, total) && total > 0 && fifths <= total, 'parallelfifths', [fifths, total]) }
  /** CONTRARY MOTION: the motions that are not parallel. value max(0, total − parallel). */
  static motioncontrary(total: number, parallel: number): CrossFormula { return c('counterpoint-motioncontrary', 'motioncontrary(total, parallel) = max(0, total − parallel)', Math.max(0, total - parallel), nat(total, parallel) && parallel <= total, 'motioncontrary', [total, parallel]) }
  /** INTERVAL CONSONANCE: 1 when the interval is within the consonant limit. value [interval ≤ limit]. */
  static intervalconsonance(interval: number, limit: number): CrossFormula { return c('counterpoint-intervalconsonance', 'intervalconsonance(interval, limit) = [interval ≤ limit]', interval <= limit ? 1 : 0, nat(interval, limit), 'intervalconsonance', [interval, limit]) }
  /** SPECIES RATIO: counterpoint notes per cantus-firmus note. value ⌊notes / cantus⌋. */
  static speciesratio(notes: number, cantus: number): CrossFormula { return c('counterpoint-speciesratio', 'speciesratio(notes, cantus) = ⌊notes / cantus⌋', cantus > 0 ? Math.floor(notes / cantus) : 0, nat(notes, cantus) && cantus > 0, 'speciesratio', [notes, cantus]) }
  /** DISSONANCE COUNT: the intervals that are not consonant. value max(0, total − consonant). */
  static dissonancecount(total: number, consonant: number): CrossFormula { return c('counterpoint-dissonancecount', 'dissonancecount(total, consonant) = max(0, total − consonant)', Math.max(0, total - consonant), nat(total, consonant) && consonant <= total, 'dissonancecount', [total, consonant]) }
  /** CANTUS SPAN: the range of the cantus firmus in semitones. value max(0, high − low). */
  static cantusspan(high: number, low: number): CrossFormula { return c('counterpoint-cantusspan', 'cantusspan(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low) && high >= low, 'cantusspan', [high, low]) }
  /** IMITATION DELAY: the beats before each imitative voice enters. value ⌊beats / voices⌋. */
  static imitationdelay(beats: number, voices: number): CrossFormula { return c('counterpoint-imitationdelay', 'imitationdelay(beats, voices) = ⌊beats / voices⌋', voices > 0 ? Math.floor(beats / voices) : 0, nat(beats, voices) && voices > 0, 'imitationdelay', [beats, voices]) }
}

for (const name of ['cantusspan', 'dissonancecount', 'imitationdelay', 'intervalconsonance', 'motioncontrary', 'parallelfifths', 'speciesratio', 'voicecount'] as const)
  hexRegisterOf('counterpoint', name, (CounterpointFormulas[name] as (...x: unknown[]) => unknown).bind(CounterpointFormulas))
