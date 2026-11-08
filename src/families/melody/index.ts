import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MELODY — A TUNE AS ARITHMETIC. A melody is numbers: how wide it ranges, which way it moves, how much it steps versus
 *  leaps, how long its phrases run, how often a motif repeats, the pitch class of a note, a transposition, and how dense
 *  the notes sit against the beat. Crosses to `music` — melody is the line music is made of. A measure. */

const PROOF = 'melody arithmetic (range, contour, step/leap, phrase length, motif repeats, pitch class, transposition, density); a tune as integers; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'melody', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `melody.${name}`, params })

export class MelodyFormulas {
  /** RANGE: the span from lowest to highest pitch, in semitones. value max(0, high − low). */
  static range(high: number, low: number): CrossFormula { return c('melody-range', 'range(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'range', [high, low]) }
  /** CONTOUR: net upward motion, ascending steps less descending. value max(0, up − down). */
  static contour(up: number, down: number): CrossFormula { return c('melody-contour', 'contour(up, down) = max(0, up − down)', Math.max(0, up - down), nat(up, down), 'contour', [up, down]) }
  /** STEP vs LEAP: the percentage of moves that are stepwise. value ⌊steps · 100 / (steps + leaps)⌋. */
  static stepleap(steps: number, leaps: number): CrossFormula { return c('melody-stepleap', 'stepleap(steps, leaps) = ⌊steps · 100 / (steps + leaps)⌋', (steps + leaps) > 0 ? Math.floor((steps * 100) / (steps + leaps)) : 0, nat(steps, leaps) && (steps + leaps) > 0, 'stepleap', [steps, leaps]) }
  /** PHRASE LENGTH: average notes per phrase. value ⌊notes / phrases⌋. */
  static phraselength(notes: number, phrases: number): CrossFormula { return c('melody-phraselength', 'phraselength(notes, phrases) = ⌊notes / phrases⌋', phrases > 0 ? Math.floor(notes / phrases) : 0, nat(notes, phrases) && phrases > 0, 'phraselength', [notes, phrases]) }
  /** MOTIF REPEATS: how many times a motif fits the line. value ⌊total / motif⌋. */
  static motifrepeat(total: number, motif: number): CrossFormula { return c('melody-motifrepeat', 'motifrepeat(total, motif) = ⌊total / motif⌋', motif > 0 ? Math.floor(total / motif) : 0, nat(total, motif) && motif > 0, 'motifrepeat', [total, motif]) }
  /** PITCH CLASS: the note reduced to one octave. value pitch mod 12. */
  static pitchclass(pitch: number): CrossFormula { return c('melody-pitchclass', 'pitchclass(pitch) = pitch mod 12', pitch % 12, nat(pitch), 'pitchclass', [pitch]) }
  /** TRANSPOSITION: the pitch class after moving by an interval. value (pitch + interval) mod 12. */
  static transposition(pitch: number, interval: number): CrossFormula { return c('melody-transposition', 'transposition(pitch, interval) = (pitch + interval) mod 12', (pitch + interval) % 12, nat(pitch, interval), 'transposition', [pitch, interval]) }
  /** DENSITY: notes per hundred beats. value ⌊notes · 100 / beats⌋. */
  static density(notes: number, beats: number): CrossFormula { return c('melody-density', 'density(notes, beats) = ⌊notes · 100 / beats⌋', beats > 0 ? Math.floor((notes * 100) / beats) : 0, nat(notes, beats) && beats > 0, 'density', [notes, beats]) }
}

for (const name of ['contour', 'density', 'motifrepeat', 'phraselength', 'pitchclass', 'range', 'stepleap', 'transposition'] as const)
  hexRegisterOf('melody', name, (MelodyFormulas[name] as (...x: unknown[]) => unknown).bind(MelodyFormulas))
