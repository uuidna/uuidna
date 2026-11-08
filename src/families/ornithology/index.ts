import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ORNITHOLOGY — THE STUDY OF BIRDS, AS ARITHMETIC. A bird's flight and life are numbers: wing loading, clutch per nest,
 *  migration pace, fledging success, wing aspect ratio, flock density, song rate, and banded-return survival. Crosses to
 *  `zoology` — ornithology is the branch of zoology that watches birds. A measure. */

const PROOF = 'ornithology arithmetic (wing loading, clutch, migration pace, fledging, aspect ratio, flock density, song rate, survival); the study of birds as a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ornithology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `ornithology.${name}`, params })

export class OrnithologyFormulas {
  /** WING LOADING: body mass over wing area. value ⌊mass / area⌋. */
  static wingload(mass: number, area: number): CrossFormula { return c('ornithology-wingload', 'wingload(mass, area) = ⌊mass / area⌋', area > 0 ? Math.floor(mass / area) : 0, nat(mass, area) && area > 0, 'wingload', [mass, area]) }
  /** CLUTCH: eggs per nest. value ⌊eggs / nests⌋. */
  static clutch(eggs: number, nests: number): CrossFormula { return c('ornithology-clutch', 'clutch(eggs, nests) = ⌊eggs / nests⌋', nests > 0 ? Math.floor(eggs / nests) : 0, nat(eggs, nests) && nests > 0, 'clutch', [eggs, nests]) }
  /** MIGRATION: distance over days. value ⌊distance / days⌋. */
  static migration(distance: number, days: number): CrossFormula { return c('ornithology-migration', 'migration(distance, days) = ⌊distance / days⌋', days > 0 ? Math.floor(distance / days) : 0, nat(distance, days) && days > 0, 'migration', [distance, days]) }
  /** FLEDGING: fledged of hatched, as a percentage. value ⌊fledged · 100 / hatched⌋. */
  static fledging(fledged: number, hatched: number): CrossFormula { return c('ornithology-fledging', 'fledging(fledged, hatched) = ⌊fledged · 100 / hatched⌋', hatched > 0 ? Math.floor((fledged * 100) / hatched) : 0, nat(fledged, hatched) && hatched > 0 && fledged <= hatched, 'fledging', [fledged, hatched]) }
  /** WING ASPECT RATIO: span over chord. value ⌊span · 100 / chord⌋. */
  static aspect(span: number, chord: number): CrossFormula { return c('ornithology-aspect', 'aspect(span, chord) = ⌊span · 100 / chord⌋', chord > 0 ? Math.floor((span * 100) / chord) : 0, nat(span, chord) && chord > 0, 'aspect', [span, chord]) }
  /** FLOCK DENSITY: birds over area. value ⌊birds / area⌋. */
  static flock(birds: number, area: number): CrossFormula { return c('ornithology-flock', 'flock(birds, area) = ⌊birds / area⌋', area > 0 ? Math.floor(birds / area) : 0, nat(birds, area) && area > 0, 'flock', [birds, area]) }
  /** SONG RATE: notes over seconds. value ⌊notes / seconds⌋. */
  static song(notes: number, seconds: number): CrossFormula { return c('ornithology-song', 'song(notes, seconds) = ⌊notes / seconds⌋', seconds > 0 ? Math.floor(notes / seconds) : 0, nat(notes, seconds) && seconds > 0, 'song', [notes, seconds]) }
  /** SURVIVAL: returned of banded, as a percentage. value ⌊returned · 100 / banded⌋. */
  static survival(returned: number, banded: number): CrossFormula { return c('ornithology-survival', 'survival(returned, banded) = ⌊returned · 100 / banded⌋', banded > 0 ? Math.floor((returned * 100) / banded) : 0, nat(returned, banded) && banded > 0 && returned <= banded, 'survival', [returned, banded]) }
}

for (const name of ['aspect', 'clutch', 'fledging', 'flock', 'migration', 'song', 'survival', 'wingload'] as const)
  hexRegisterOf('ornithology', name, (OrnithologyFormulas[name] as (...x: unknown[]) => unknown).bind(OrnithologyFormulas))
