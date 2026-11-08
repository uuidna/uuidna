import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RHYTHM — MUSICAL TIME AS ARITHMETIC. A tempo is a beat duration, a measure is beats stacked, a beat splits into
 *  subdivisions, swing is a long-to-short ratio, a polyrhythm is two pulses meeting, syncopation is off-beats over the
 *  whole, notes fill a measure, and a tuplet divides a span. Crosses to `music` — rhythm is music's time. A measure. */

const PROOF = 'rhythm arithmetic (beat duration, measure length, subdivision, swing ratio, polyrhythm, syncopation, notes per measure, tuplet duration); musical time as integers; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rhythm', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `rhythm.${name}`, params })

export class RhythmFormulas {
  /** BEAT DURATION: milliseconds per beat at a tempo. value ⌊60000 / bpm⌋. */
  static beatduration(bpm: number): CrossFormula { return c('rhythm-beatduration', 'beatduration(bpm) = ⌊60000 / bpm⌋', bpm > 0 ? Math.floor(60000 / bpm) : 0, nat(bpm) && bpm > 0, 'beatduration', [bpm]) }
  /** MEASURE LENGTH: beats at a beat duration. value beats · beatduration. */
  static measurelength(beats: number, beatduration: number): CrossFormula { return c('rhythm-measurelength', 'measurelength(beats, beatduration) = beats · beatduration', beats * beatduration, nat(beats, beatduration), 'measurelength', [beats, beatduration]) }
  /** NOTES PER MEASURE: beats times the subdivisions each. value beats · subdivisions. */
  static notespermeasure(beats: number, subdivisions: number): CrossFormula { return c('rhythm-notespermeasure', 'notespermeasure(beats, subdivisions) = beats · subdivisions', beats * subdivisions, nat(beats, subdivisions), 'notespermeasure', [beats, subdivisions]) }
  /** POLYRHYTHM: the span where two pulses meet. value a · b. */
  static polyrhythm(a: number, b: number): CrossFormula { return c('rhythm-polyrhythm', 'polyrhythm(a, b) = a · b', a * b, nat(a, b), 'polyrhythm', [a, b]) }
  /** SUBDIVISION: milliseconds per subdivision of a beat. value ⌊beatduration / divisions⌋. */
  static subdivision(beatduration: number, divisions: number): CrossFormula { return c('rhythm-subdivision', 'subdivision(beatduration, divisions) = ⌊beatduration / divisions⌋', divisions > 0 ? Math.floor(beatduration / divisions) : 0, nat(beatduration, divisions) && divisions > 0, 'subdivision', [beatduration, divisions]) }
  /** SWING RATIO: long to short as a percentage. value ⌊long · 100 / short⌋. */
  static swingratio(long: number, short: number): CrossFormula { return c('rhythm-swingratio', 'swingratio(long, short) = ⌊long · 100 / short⌋', short > 0 ? Math.floor((long * 100) / short) : 0, nat(long, short) && short > 0, 'swingratio', [long, short]) }
  /** SYNCOPATION: off-beats over the whole as a percentage. value ⌊offbeats · 100 / total⌋. */
  static syncopation(offbeats: number, total: number): CrossFormula { return c('rhythm-syncopation', 'syncopation(offbeats, total) = ⌊offbeats · 100 / total⌋', total > 0 ? Math.floor((offbeats * 100) / total) : 0, nat(offbeats, total) && total > 0 && offbeats <= total, 'syncopation', [offbeats, total]) }
  /** TUPLET DURATION: a span of beats divided among a tuplet. value ⌊beats · beatduration / tuplet⌋. */
  static tupletduration(beats: number, beatduration: number, tuplet: number): CrossFormula { return c('rhythm-tupletduration', 'tupletduration(beats, beatduration, tuplet) = ⌊beats · beatduration / tuplet⌋', tuplet > 0 ? Math.floor((beats * beatduration) / tuplet) : 0, nat(beats, beatduration, tuplet) && tuplet > 0, 'tupletduration', [beats, beatduration, tuplet]) }
}

for (const name of ['beatduration', 'measurelength', 'notespermeasure', 'polyrhythm', 'subdivision', 'swingratio', 'syncopation', 'tupletduration'] as const)
  hexRegisterOf('rhythm', name, (RhythmFormulas[name] as (...x: unknown[]) => unknown).bind(RhythmFormulas))
