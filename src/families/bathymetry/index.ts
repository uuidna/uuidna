import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BATHYMETRY — THE SEAFLOOR AS ARITHMETIC. Mapping depth is numbers: the two-way echo that gives depth, the sounding time a
 *  ping takes, the grade of a slope, the one-way echo delay, the area each grid cell covers, the swath a multibeam paints, the
 *  cross-section of a profile, and the interval between depth contours. Crosses to `oceanography` — bathymetry is the floor the
 *  ocean sits on. A measure. */

const PROOF = 'bathymetry arithmetic (two-way depth, sounding time, slope grade, echo delay, grid resolution, swath width, profile area, contour interval); the seafloor as a measure crossed to oceanography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bathymetry', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name: `bathymetry.${name}`, params })

export class BathymetryFormulas {
  /** DEPTH: the two-way echo — sound speed over the round trip, halved. value ⌊speed · time / 2⌋. */
  static depth(speed: number, time: number): CrossFormula { return c('bathymetry-depth', 'depth(speed, time) = ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) }
  /** SOUNDING TIME: the round-trip a ping takes to a depth at a sound speed. value ⌊2 · depth / speed⌋. */
  static soundingtime(depth: number, speed: number): CrossFormula { return c('bathymetry-soundingtime', 'soundingtime(depth, speed) = ⌊2 · depth / speed⌋', speed > 0 ? Math.floor((2 * depth) / speed) : 0, nat(depth, speed) && speed > 0, 'soundingtime', [depth, speed]) }
  /** SLOPE: the grade of the floor as a percent — rise over run. value ⌊rise · 100 / run⌋. */
  static slope(rise: number, run: number): CrossFormula { return c('bathymetry-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) }
  /** ECHO DELAY: the one-way delay in milliseconds over a range at a sound speed. value ⌊range · 1000 / speed⌋. */
  static echodelay(range: number, speed: number): CrossFormula { return c('bathymetry-echodelay', 'echodelay(range, speed) = ⌊range · 1000 / speed⌋', speed > 0 ? Math.floor((range * 1000) / speed) : 0, nat(range, speed) && speed > 0, 'echodelay', [range, speed]) }
  /** GRID RESOLUTION: the area each grid cell covers. value ⌊area / cells⌋. */
  static gridresolution(area: number, cells: number): CrossFormula { return c('bathymetry-gridresolution', 'gridresolution(area, cells) = ⌊area / cells⌋', cells > 0 ? Math.floor(area / cells) : 0, nat(area, cells) && cells > 0, 'gridresolution', [area, cells]) }
  /** SWATH WIDTH: the width a multibeam paints — depth times the coverage factor. value depth · factor. */
  static swathwidth(depth: number, factor: number): CrossFormula { return c('bathymetry-swathwidth', 'swathwidth(depth, factor) = depth · factor', depth * factor, nat(depth, factor), 'swathwidth', [depth, factor]) }
  /** PROFILE AREA: the cross-section of a profile — its length times its depth. value length · depth. */
  static profilearea(length: number, depth: number): CrossFormula { return c('bathymetry-profilearea', 'profilearea(length, depth) = length · depth', length * depth, nat(length, depth), 'profilearea', [length, depth]) }
  /** CONTOUR INTERVAL: the depth range split into contours. value ⌊range / count⌋. */
  static contourinterval(range: number, count: number): CrossFormula { return c('bathymetry-contourinterval', 'contourinterval(range, count) = ⌊range / count⌋', count > 0 ? Math.floor(range / count) : 0, nat(range, count) && count > 0, 'contourinterval', [range, count]) }
}

for (const name of ['contourinterval', 'depth', 'echodelay', 'gridresolution', 'profilearea', 'slope', 'soundingtime', 'swathwidth'] as const)
  hexRegisterOf('bathymetry', name, (BathymetryFormulas[name] as (...x: unknown[]) => unknown).bind(BathymetryFormulas))
