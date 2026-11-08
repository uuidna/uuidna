import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCALES — THE TWELVE-TONE GRID, AS ARITHMETIC. A musical scale is numbers: degrees per octave, a mode shifted around the
 *  root, tetrachord spans, the interval pattern that fills an octave, a note transposed, the pentatonic and chromatic note
 *  counts, and the distance between keys. All semitone arithmetic mod 12. Crosses to `music` — scales are what music is built
 *  from. A measure. */

const PROOF = 'scales arithmetic (degrees, mode shift, tetrachord span, interval pattern, transposition, pentatonic notes, chromatic fill, key distance); twelve-tone semitone arithmetic mod 12; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'scales', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `scales.${name}`, params })

export class ScalesFormulas {
  /** DEGREES: scale degrees across octaves. value notes · octaves. */
  static degrees(notes: number, octaves: number): CrossFormula { return c('scales-degrees', 'degrees(notes, octaves) = notes · octaves', notes * octaves, nat(notes, octaves), 'degrees', [notes, octaves]) }
  /** MODE SHIFT: the root moved by a mode degree, wrapped to the octave. value (root + mode) mod 12. */
  static modeshift(root: number, mode: number): CrossFormula { return c('scales-modeshift', 'modeshift(root, mode) = (root + mode) mod 12', (root + mode) % 12, nat(root, mode), 'modeshift', [root, mode]) }
  /** TETRACHORD: the semitone span of count tetrachords (a perfect fourth, 5 semitones, each). value count · 5. */
  static tetrachord(count: number): CrossFormula { return c('scales-tetrachord', 'tetrachord(count) = count · 5', count * 5, nat(count), 'tetrachord', [count]) }
  /** INTERVAL PATTERN: the average step size when semitones are split into steps. value ⌊semitones / steps⌋. */
  static intervalpattern(semitones: number, steps: number): CrossFormula { return c('scales-intervalpattern', 'intervalpattern(semitones, steps) = ⌊semitones / steps⌋', steps > 0 ? Math.floor(semitones / steps) : 0, nat(semitones, steps) && steps > 0, 'intervalpattern', [semitones, steps]) }
  /** TRANSPOSITION: a note moved by an interval, wrapped to the octave. value (note + interval) mod 12. */
  static transposition(note: number, interval: number): CrossFormula { return c('scales-transposition', 'transposition(note, interval) = (note + interval) mod 12', (note + interval) % 12, nat(note, interval), 'transposition', [note, interval]) }
  /** PENTATONIC NOTES: five notes per octave, across octaves. value octaves · 5. */
  static pentatonicnotes(octaves: number): CrossFormula { return c('scales-pentatonicnotes', 'pentatonicnotes(octaves) = octaves · 5', octaves * 5, nat(octaves), 'pentatonicnotes', [octaves]) }
  /** CHROMATIC FILL: the semitones between a low and a high note. value max(0, high − low). */
  static chromaticfill(low: number, high: number): CrossFormula { return c('scales-chromaticfill', 'chromaticfill(low, high) = max(0, high − low)', Math.max(0, high - low), nat(low, high), 'chromaticfill', [low, high]) }
  /** KEY DISTANCE: steps around the circle of fifths, as semitones (a fifth, 7 semitones, each) wrapped to the octave. value (steps · 7) mod 12. */
  static keydistance(steps: number): CrossFormula { return c('scales-keydistance', 'keydistance(steps) = (steps · 7) mod 12', (steps * 7) % 12, nat(steps), 'keydistance', [steps]) }
}

for (const name of ['chromaticfill', 'degrees', 'intervalpattern', 'keydistance', 'modeshift', 'pentatonicnotes', 'tetrachord', 'transposition'] as const)
  hexRegisterOf('scales', name, (ScalesFormulas[name] as (...x: unknown[]) => unknown).bind(ScalesFormulas))
