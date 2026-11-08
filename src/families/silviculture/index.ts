import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SILVICULTURE — GROWING A FOREST STAND, AS ARITHMETIC (stand mensuration, not by hand). Tending trees is numbers: the
 *  basal area a stand carries, how well stocked it is against the ideal, stem volume, the growth increment over a period,
 *  the rotation age to a target size, what a thinning leaves standing, trees per hectare, and the yield per year grown.
 *  Crosses to `botany` — silviculture is applied botany. A measure. */

const PROOF = 'silviculture arithmetic (basal area, stocking, stem volume, growth increment, rotation age, thinning, stand density, yield); stand mensuration; a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'silviculture', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `silviculture.${name}`, params })

export class SilvicultureFormulas {
  /** BASAL AREA: the cross-section a stand carries, from diameter and tree count. value ⌊dbh² · trees / 4⌋. */
  static basalarea(dbh: number, trees: number): CrossFormula { return c('silviculture-basalarea', 'basalarea(dbh, trees) = ⌊dbh² · trees / 4⌋', Math.floor((dbh * dbh * trees) / 4), nat(dbh, trees), 'basalarea', [dbh, trees]) }
  /** STAND DENSITY: trees over the area they grow on. value ⌊trees / area⌋. */
  static density(trees: number, area: number): CrossFormula { return c('silviculture-density', 'density(trees, area) = ⌊trees / area⌋', area > 0 ? Math.floor(trees / area) : 0, nat(trees, area) && area > 0, 'density', [trees, area]) }
  /** GROWTH INCREMENT: the size a stand put on over a period. value max(0, end − start). */
  static growth(start: number, end: number): CrossFormula { return c('silviculture-growth', 'growth(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'growth', [start, end]) }
  /** ROTATION: the years to reach a target size at a yearly rate. value ⌈target / rate⌉. */
  static rotation(target: number, rate: number): CrossFormula { return c('silviculture-rotation', 'rotation(target, rate) = ⌈target / rate⌉', rate > 0 ? Math.ceil(target / rate) : 0, nat(target, rate) && rate > 0, 'rotation', [target, rate]) }
  /** STOCKING as a percentage of the ideal. value ⌊actual · 100 / ideal⌋. */
  static stocking(actual: number, ideal: number): CrossFormula { return c('silviculture-stocking', 'stocking(actual, ideal) = ⌊actual · 100 / ideal⌋', ideal > 0 ? Math.floor((actual * 100) / ideal) : 0, nat(actual, ideal) && ideal > 0, 'stocking', [actual, ideal]) }
  /** THINNING: the trees left standing after a removal. value max(0, before − remove). */
  static thinning(before: number, remove: number): CrossFormula { return c('silviculture-thinning', 'thinning(before, remove) = max(0, before − remove)', Math.max(0, before - remove), nat(before, remove), 'thinning', [before, remove]) }
  /** STEM VOLUME: basal area at a height. value area · height. */
  static volume(area: number, height: number): CrossFormula { return c('silviculture-volume', 'volume(area, height) = area · height', area * height, nat(area, height), 'volume', [area, height]) }
  /** YIELD: mean annual increment compounded over the years grown. value mai · years. */
  static yield(mai: number, years: number): CrossFormula { return c('silviculture-yield', 'yield(mai, years) = mai · years', mai * years, nat(mai, years), 'yield', [mai, years]) }
}

for (const name of ['basalarea', 'density', 'growth', 'rotation', 'stocking', 'thinning', 'volume', 'yield'] as const)
  hexRegisterOf('silviculture', name, (SilvicultureFormulas[name] as (...x: unknown[]) => unknown).bind(SilvicultureFormulas))
