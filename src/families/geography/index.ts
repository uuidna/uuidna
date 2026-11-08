import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOGRAPHY — THE SHAPE OF THE LAND, AS ARITHMETIC (chosen by the public-API registry, not by hand). Place is numbers:
 *  people per unit of land, the slope of a hill, distance across a map, the area of a parcel, the rise of a peak, the
 *  water a basin drains, how much of a region is built up, and how well its places connect. Crosses to `ecology` —
 *  geography is the ground ecology lives on. A measure. */

const PROOF = 'geography arithmetic (population density, slope gradient, map distance, parcel area, elevation, watershed, urbanization, connectivity); a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geography', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `geography.${name}`, params })

export class GeographyFormulas {
  /** POPULATION DENSITY: people over the land they occupy. value ⌊population / area⌋. */
  static density(population: number, area: number): CrossFormula { return c('geography-density', 'density(population, area) = ⌊population / area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density', [population, area]) }
  /** SLOPE GRADIENT as a percentage: rise over run. value ⌊rise · 100 / run⌋. */
  static gradient(rise: number, run: number): CrossFormula { return c('geography-gradient', 'gradient(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'gradient', [rise, run]) }
  /** MAP DISTANCE: degrees at a scale (a proxy). value degrees · scale. */
  static distance(degrees: number, scale: number): CrossFormula { return c('geography-distance', 'distance(degrees, scale) = degrees · scale', degrees * scale, nat(degrees, scale), 'distance', [degrees, scale]) }
  /** PARCEL AREA: length by width. value length · width. */
  static area(length: number, width: number): CrossFormula { return c('geography-area', 'area(length, width) = length · width', length * width, nat(length, width), 'area', [length, width]) }
  /** ELEVATION: the rise of a peak over its base. value max(0, peak − base). */
  static elevation(peak: number, base: number): CrossFormula { return c('geography-elevation', 'elevation(peak, base) = max(0, peak − base)', Math.max(0, peak - base), nat(peak, base), 'elevation', [peak, base]) }
  /** WATERSHED: the catchment a basin drains per outlet. value ⌊catchment / outlet⌋. */
  static watershed(catchment: number, outlet: number): CrossFormula { return c('geography-watershed', 'watershed(catchment, outlet) = ⌊catchment / outlet⌋', outlet > 0 ? Math.floor(catchment / outlet) : 0, nat(catchment, outlet) && outlet > 0, 'watershed', [catchment, outlet]) }
  /** URBANIZATION as a percentage: built land over total. value ⌊urban · 100 / total⌋. */
  static urbanization(urban: number, total: number): CrossFormula { return c('geography-urbanization', 'urbanization(urban, total) = ⌊urban · 100 / total⌋', total > 0 ? Math.floor((urban * 100) / total) : 0, nat(urban, total) && total > 0 && urban <= total, 'urbanization', [urban, total]) }
  /** CONNECTIVITY: links per node, as a percentage. value ⌊links · 100 / nodes⌋. */
  static connectivity(links: number, nodes: number): CrossFormula { return c('geography-connectivity', 'connectivity(links, nodes) = ⌊links · 100 / nodes⌋', nodes > 0 ? Math.floor((links * 100) / nodes) : 0, nat(links, nodes) && nodes > 0, 'connectivity', [links, nodes]) }
}

for (const name of ['area', 'connectivity', 'density', 'distance', 'elevation', 'gradient', 'urbanization', 'watershed'] as const)
  hexRegisterOf('geography', name, (GeographyFormulas[name] as (...x: unknown[]) => unknown).bind(GeographyFormulas))
