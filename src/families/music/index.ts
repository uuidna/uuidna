import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MUSIC — MUSIC THEORY & AUDIO, AS ARITHMETIC. The sounding world is numbers: an interval in semitones, the octave a note
 *  sits in, tempo in beats per minute, the beats a measure holds, the frequency a pitch rings at, a transposition, the bars
 *  a run of beats fills, and the tempo a beat's length implies. Crosses to `tune` — music is what tuning measures. A measure. */

const PROOF = 'music arithmetic (interval, octave, bpm, beats, frequency, transpose, bars, tempo); music theory & audio as integer formulas; a measure crossed to tune'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'music', dst: 'tune', formula, value, proof: PROOF, ...extra }, holds, { name: `music.${name}`, params })

export class MusicFormulas {
  /** INTERVAL: the distance between two pitches, in semitones. value semitones. */
  static interval(semitones: number): CrossFormula { return c('music-interval', 'interval(semitones) = semitones', semitones, nat(semitones), 'interval', [semitones]) }
  /** OCTAVE: the octave a note number sits in. value ⌊note / 12⌋. */
  static octave(note: number): CrossFormula { return c('music-octave', 'octave(note) = ⌊note / 12⌋', Math.floor(note / 12), nat(note), 'octave', [note]) }
  /** BPM: beats per minute from beats over minutes. value ⌊beats / minutes⌋. */
  static bpm(beats: number, minutes: number): CrossFormula { return c('music-bpm', 'bpm(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'bpm', [beats, minutes]) }
  /** BEATS: the beats a run of bars holds at a time signature. value bars · signature. */
  static beats(bars: number, signature: number): CrossFormula { return c('music-beats', 'beats(bars, signature) = bars · signature', bars * signature, nat(bars, signature), 'beats', [bars, signature]) }
  /** FREQUENCY: equal-temperament pitch a base ring reaches after n semitones. value ⌊base · (1000 + semitones · 59) / 1000⌋. */
  static frequency(base: number, semitones: number): CrossFormula { return c('music-frequency', 'frequency(base, semitones) = ⌊base · (1000 + semitones · 59) / 1000⌋', Math.floor((base * (1000 + semitones * 59)) / 1000), nat(base, semitones), 'frequency', [base, semitones]) }
  /** TRANSPOSE: a note shifted by a number of steps. value note + steps. */
  static transpose(note: number, steps: number): CrossFormula { return c('music-transpose', 'transpose(note, steps) = note + steps', note + steps, nat(note, steps), 'transpose', [note, steps]) }
  /** BARS: the bars a run of beats fills at a time signature. value ⌊beats / signature⌋. */
  static bars(beats: number, signature: number): CrossFormula { return c('music-bars', 'bars(beats, signature) = ⌊beats / signature⌋', signature > 0 ? Math.floor(beats / signature) : 0, nat(beats, signature) && signature > 0, 'bars', [beats, signature]) }
  /** TEMPO: beats per minute a beat's length in milliseconds implies. value ⌊60000 / ms⌋. */
  static tempo(ms: number, beats: number): CrossFormula { return c('music-tempo', 'tempo(ms, beats) = ⌊60000 / ms⌋', ms > 0 ? Math.floor(60000 / ms) : 0, nat(ms, beats) && ms > 0, 'tempo', [ms, beats]) }
}

for (const name of ['bars', 'beats', 'bpm', 'frequency', 'interval', 'octave', 'tempo', 'transpose'] as const)
  hexRegisterOf('music', name, (MusicFormulas[name] as (...x: unknown[]) => unknown).bind(MusicFormulas))
