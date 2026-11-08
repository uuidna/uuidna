import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GIS — GEOGRAPHIC INFORMATION SYSTEMS, AS ARITHMETIC. Space is numbers: the area of a tile, feature density, a buffer
 *  ring, how two layers overlay, the resolution of a grid, terrain slope, nearness within a threshold, and positional
 *  accuracy. Crosses to `geography` — gis is geography made to compute. A measure. */

const PROOF = 'gis arithmetic (area, feature density, buffer ring, layer overlay, grid resolution, terrain slope, proximity, positional accuracy); geography made to compute; a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gis', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `gis.${name}`, params })

export class GisFormulas {
  /** AREA of a tile: width by height. value width · height. */
  static area(width: number, height: number): CrossFormula { return c('gis-area', 'area(width, height) = width · height', width * height, nat(width, height), 'area', [width, height]) }
  /** FEATURE DENSITY: features over area. value ⌊features / area⌋. */
  static density(features: number, area: number): CrossFormula { return c('gis-density', 'density(features, area) = ⌊features / area⌋', area > 0 ? Math.floor(features / area) : 0, nat(features, area) && area > 0, 'density', [features, area]) }
  /** BUFFER ring: the πr² area of a radius, scaled by 314/100. value ⌊314 · radius² / 100⌋. */
  static buffer(radius: number): CrossFormula { return c('gis-buffer', 'buffer(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'buffer', [radius]) }
  /** OVERLAY: Jaccard of two layers as a percentage. value ⌊intersection · 100 / union⌋. */
  static overlay(intersection: number, union: number): CrossFormula { return c('gis-overlay', 'overlay(intersection, union) = ⌊intersection · 100 / union⌋', union > 0 ? Math.floor((intersection * 100) / union) : 0, nat(intersection, union) && union > 0 && intersection <= union, 'overlay', [intersection, union]) }
  /** RESOLUTION: extent spread over the cells of a grid. value ⌊extent / cells⌋. */
  static resolution(extent: number, cells: number): CrossFormula { return c('gis-resolution', 'resolution(extent, cells) = ⌊extent / cells⌋', cells > 0 ? Math.floor(extent / cells) : 0, nat(extent, cells) && cells > 0, 'resolution', [extent, cells]) }
  /** SLOPE of terrain: rise over run as a percentage. value ⌊rise · 100 / run⌋. */
  static slope(rise: number, run: number): CrossFormula { return c('gis-slope', 'slope(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slope', [rise, run]) }
  /** PROXIMITY: how much of a threshold a distance leaves. value max(0, threshold − distance). */
  static proximity(distance: number, threshold: number): CrossFormula { return c('gis-proximity', 'proximity(distance, threshold) = max(0, threshold − distance)', Math.max(0, threshold - distance), nat(distance, threshold), 'proximity', [distance, threshold]) }
  /** POSITIONAL ACCURACY: correct points as a percentage of all points. value ⌊correct · 100 / points⌋. */
  static accuracy(correct: number, points: number): CrossFormula { return c('gis-accuracy', 'accuracy(correct, points) = ⌊correct · 100 / points⌋', points > 0 ? Math.floor((correct * 100) / points) : 0, nat(correct, points) && points > 0 && correct <= points, 'accuracy', [correct, points]) }
}

for (const name of ['accuracy', 'area', 'buffer', 'density', 'overlay', 'proximity', 'resolution', 'slope'] as const)
  hexRegisterOf('gis', name, (GisFormulas[name] as (...x: unknown[]) => unknown).bind(GisFormulas))
