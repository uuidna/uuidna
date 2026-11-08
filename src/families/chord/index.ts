import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHORD — HARMONY AS ARITHMETIC. A chord is numbers: how many notes it holds, the semitone span of its outer voices,
 *  how many inversions it rotates through, the semitone sum that names its triad quality, the degree its stacked thirds
 *  reach, the average gap between its voices, whether the bass sits on the root, and the thirds stacked beneath it.
 *  Crosses to `music` — a chord is the vertical fact music is built from. A measure. */

const PROOF = 'chord arithmetic (note count, interval span, inversions, triad quality, extension degree, voicing width, root position, stacked thirds); harmony as integer arithmetic; a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chord', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `chord.${name}`, params })

export class ChordFormulas {
  /** NOTE COUNT: the triad's notes plus any extensions. value triad + extensions. */
  static notecount(triad: number, extensions: number): CrossFormula { return c('chord-notecount', 'notecount(triad, extensions) = triad + extensions', triad + extensions, nat(triad, extensions), 'notecount', [triad, extensions]) }
  /** INTERVAL SPAN: the semitones between the outer voices. value max(0, high − low). */
  static intervalspan(high: number, low: number): CrossFormula { return c('chord-intervalspan', 'intervalspan(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'intervalspan', [high, low]) }
  /** INVERSION COUNT: an n-note chord rotates through n positions. value notes. */
  static inversioncount(notes: number): CrossFormula { return c('chord-inversioncount', 'inversioncount(notes) = notes', notes, nat(notes), 'inversioncount', [notes]) }
  /** TRIAD QUALITY: the semitone sum of its third and fifth names the triad. value third + fifth. */
  static triadquality(third: number, fifth: number): CrossFormula { return c('chord-triadquality', 'triadquality(third, fifth) = third + fifth', third + fifth, nat(third, fifth), 'triadquality', [third, fifth]) }
  /** EXTENSION DEGREE: thirds stacked above the root reach an odd degree. value thirds · 2 + 1. */
  static extensiondegree(thirds: number): CrossFormula { return c('chord-extensiondegree', 'extensiondegree(thirds) = thirds · 2 + 1', thirds * 2 + 1, nat(thirds), 'extensiondegree', [thirds]) }
  /** VOICING WIDTH: the semitone span shared across the gaps between voices. value ⌊semitones / voices⌋. */
  static voicingwidth(semitones: number, voices: number): CrossFormula { return c('chord-voicingwidth', 'voicingwidth(semitones, voices) = ⌊semitones / voices⌋', voices > 0 ? Math.floor(semitones / voices) : 0, nat(semitones, voices) && voices > 0, 'voicingwidth', [semitones, voices]) }
  /** ROOT POSITION: 1 when the bass voice sits on the root. value [bass = root]. */
  static rootposition(bass: number, root: number): CrossFormula { return c('chord-rootposition', 'rootposition(bass, root) = [bass = root]', bass === root ? 1 : 0, nat(bass, root), 'rootposition', [bass, root]) }
  /** STACKED THIRDS: an n-note tertian chord stacks n − 1 thirds. value max(0, notes − 1). */
  static stackedthirds(notes: number): CrossFormula { return c('chord-stackedthirds', 'stackedthirds(notes) = max(0, notes − 1)', Math.max(0, notes - 1), nat(notes), 'stackedthirds', [notes]) }
}

for (const name of ['extensiondegree', 'intervalspan', 'inversioncount', 'notecount', 'rootposition', 'stackedthirds', 'triadquality', 'voicingwidth'] as const)
  hexRegisterOf('chord', name, (ChordFormulas[name] as (...x: unknown[]) => unknown).bind(ChordFormulas))
