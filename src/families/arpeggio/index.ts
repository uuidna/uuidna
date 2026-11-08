import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ARPEGGIO — A BROKEN CHORD, AS ARITHMETIC. Playing a chord one note at a time is numbers: the span between lowest and
 *  highest note, the length of one cycle, how long each note lasts, how many times the pattern repeats, the octave range,
 *  the velocity ramp across the sweep, the sweep rate, and the total notes played. Crosses to `music`. A measure. */

const PROOF = 'arpeggio arithmetic (note span, cycle length, note duration, pattern repeats, octave range, velocity curve, sweep rate, total notes); a broken chord as a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0 && x <= 65535)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'arpeggio', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `arpeggio.${name}`, params })

export class ArpeggioFormulas {
  /** NOTE SPAN: semitones between the lowest and highest note. value max(0, high − low). */
  static notespan(low: number, high: number): CrossFormula { return c('arpeggio-notespan', 'notespan(low, high) = max(0, high − low)', Math.max(0, high - low), nat(low, high), 'notespan', [low, high]) }
  /** CYCLE LENGTH: notes in one cycle across the octaves it covers. value notes · octaves. */
  static cyclelength(notes: number, octaves: number): CrossFormula { return c('arpeggio-cyclelength', 'cyclelength(notes, octaves) = notes · octaves', notes * octaves, nat(notes, octaves), 'cyclelength', [notes, octaves]) }
  /** NOTE DURATION: milliseconds each note gets of the total. value ⌊total / notes⌋. */
  static noteduration(total: number, notes: number): CrossFormula { return c('arpeggio-noteduration', 'noteduration(total, notes) = ⌊total / notes⌋', notes > 0 ? Math.floor(total / notes) : 0, nat(total, notes) && notes > 0, 'noteduration', [total, notes]) }
  /** PATTERN REPEATS: how many times the pattern plays over the bars. value bars · perBar. */
  static patternrepeats(bars: number, perBar: number): CrossFormula { return c('arpeggio-patternrepeats', 'patternrepeats(bars, perBar) = bars · perBar', bars * perBar, nat(bars, perBar), 'patternrepeats', [bars, perBar]) }
  /** RANGE OCTAVES: whole octaves spanned by a semitone span. value ⌊span / 12⌋. */
  static rangeoctaves(span: number): CrossFormula { return c('arpeggio-rangeoctaves', 'rangeoctaves(span) = ⌊span / 12⌋', Math.floor(span / 12), nat(span), 'rangeoctaves', [span]) }
  /** VELOCITY CURVE: velocity at a step of a linear ramp. value start + step · index. */
  static velocitycurve(start: number, step: number, index: number): CrossFormula { return c('arpeggio-velocitycurve', 'velocitycurve(start, step, index) = start + step · index', start + step * index, nat(start, step, index), 'velocitycurve', [start, step, index]) }
  /** SWEEP RATE: notes per second across the sweep. value ⌊notes / seconds⌋. */
  static sweeprate(notes: number, seconds: number): CrossFormula { return c('arpeggio-sweeprate', 'sweeprate(notes, seconds) = ⌊notes / seconds⌋', seconds > 0 ? Math.floor(notes / seconds) : 0, nat(notes, seconds) && seconds > 0, 'sweeprate', [notes, seconds]) }
  /** TOTAL NOTES: notes per cycle over the cycles played. value cycleNotes · cycles. */
  static totalnotes(cycleNotes: number, cycles: number): CrossFormula { return c('arpeggio-totalnotes', 'totalnotes(cycleNotes, cycles) = cycleNotes · cycles', cycleNotes * cycles, nat(cycleNotes, cycles), 'totalnotes', [cycleNotes, cycles]) }
}

for (const name of ['cyclelength', 'noteduration', 'notespan', 'patternrepeats', 'rangeoctaves', 'sweeprate', 'totalnotes', 'velocitycurve'] as const)
  hexRegisterOf('arpeggio', name, (ArpeggioFormulas[name] as (...x: unknown[]) => unknown).bind(ArpeggioFormulas))
