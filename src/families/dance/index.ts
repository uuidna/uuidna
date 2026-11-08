import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** DANCE — MOVEMENT AS ARITHMETIC. The craft is numbers: the tempo a count keeps, the counts a bar holds, how in time the
 *  floor is, the steps a routine drills, the phrase a section spans, how high a jump clears, the turn an angle lands on, and
 *  how long the body lasts between rests. Crosses to `music` — dance is what music moves. A measure. */

const PROOF = 'dance arithmetic (tempo, counts, synchrony, steps, phrase, elevation, rotation, stamina); movement as a measure crossed to music'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dance', dst: 'music', formula, value, proof: PROOF, ...extra }, holds, { name: `dance.${name}`, params })

export class DanceFormulas {
  /** TEMPO: beats per minute. value ⌊beats / minutes⌋. */
  static tempo(beats: number, minutes: number): CrossFormula { return c('dance-tempo', 'tempo(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'tempo', [beats, minutes]) }
  /** COUNTS: the counts a run of bars holds. value bars · beats. */
  static counts(bars: number, beats: number): CrossFormula { return c('dance-counts', 'counts(bars, beats) = bars · beats', bars * beats, nat(bars, beats), 'counts', [bars, beats]) }
  /** SYNCHRONY: how in time the floor is, as a percentage. value ⌊aligned · 100 / dancers⌋. */
  static synchrony(aligned: number, dancers: number): CrossFormula { return c('dance-synchrony', 'synchrony(aligned, dancers) = ⌊aligned · 100 / dancers⌋', dancers > 0 ? Math.floor((aligned * 100) / dancers) : 0, nat(aligned, dancers) && dancers > 0 && aligned <= dancers, 'synchrony', [aligned, dancers]) }
  /** STEPS: the steps a routine drills. value sequences · repeats. */
  static steps(sequences: number, repeats: number): CrossFormula { return c('dance-steps', 'steps(sequences, repeats) = sequences · repeats', sequences * repeats, nat(sequences, repeats), 'steps', [sequences, repeats]) }
  /** PHRASE: the phrase a section spans, in measures. value ⌊counts / measures⌋. */
  static phrase(counts_: number, measures: number): CrossFormula { return c('dance-phrase', 'phrase(counts, measures) = ⌊counts / measures⌋', measures > 0 ? Math.floor(counts_ / measures) : 0, nat(counts_, measures) && measures > 0, 'phrase', [counts_, measures]) }
  /** ELEVATION: the height a jump clears per attempt. value ⌊height / attempts⌋. */
  static elevation(height: number, attempts: number): CrossFormula { return c('dance-elevation', 'elevation(height, attempts) = ⌊height / attempts⌋', attempts > 0 ? Math.floor(height / attempts) : 0, nat(height, attempts) && attempts > 0, 'elevation', [height, attempts]) }
  /** ROTATION: the turn an angle lands on. value ((degrees mod 360) + 360) mod 360. */
  static rotation(degrees: number): CrossFormula { return c('dance-rotation', 'rotation(degrees) = ((degrees mod 360) + 360) mod 360', ((degrees % fullTurn) + fullTurn) % fullTurn, nat(degrees), 'rotation', [degrees]) }
  /** STAMINA: how long the body lasts between rests, as a percentage. value ⌊duration · 100 / rest⌋. */
  static stamina(duration: number, rest: number): CrossFormula { return c('dance-stamina', 'stamina(duration, rest) = ⌊duration · 100 / rest⌋', rest > 0 ? Math.floor((duration * 100) / rest) : 0, nat(duration, rest) && rest > 0, 'stamina', [duration, rest]) }
}

for (const name of ['counts', 'elevation', 'phrase', 'rotation', 'stamina', 'steps', 'synchrony', 'tempo'] as const)
  hexRegisterOf('dance', name, (DanceFormulas[name] as (...x: unknown[]) => unknown).bind(DanceFormulas))
