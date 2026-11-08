import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** URBANISM — THE SHAPE OF A CITY, AS ARITHMETIC (chosen by the registry, not by hand). A settlement is numbers: dwelling
 *  density, the jobs-to-housing ratio, how mixed its uses are, block area, intersections per area, floor-area ratio,
 *  people per area, and the share of residents a service reaches. Crosses to `governance` — urbanism is what a government
 *  plans and regulates. A measure. */

const PROOF = 'urbanism arithmetic (dwelling density, jobs-housing ratio, mixed use, block size, intersection density, floor-area ratio, population density, service coverage); a city measured as integers; a measure crossed to governance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'urbanism', dst: 'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `urbanism.${name}`, params })

export class UrbanismFormulas {
  /** DWELLING DENSITY: units over the land area. value ⌊units / area⌋. */
  static density(units: number, area: number): CrossFormula { return c('urbanism-density', 'density(units, area) = ⌊units / area⌋', area > 0 ? Math.floor(units / area) : 0, nat(units, area) && area > 0, 'density', [units, area]) }
  /** JOBS-HOUSING RATIO as a percentage. value ⌊jobs · 100 / housing⌋. */
  static jobshousing(jobs: number, housing: number): CrossFormula { return c('urbanism-jobshousing', 'jobshousing(jobs, housing) = ⌊jobs · 100 / housing⌋', housing > 0 ? Math.floor((jobs * 100) / housing) : 0, nat(jobs, housing) && housing > 0, 'jobshousing', [jobs, housing]) }
  /** MIXED USE: the share of parcels carrying a mix, as a percentage. value ⌊uses · 100 / parcels⌋. */
  static mixeduse(uses: number, parcels: number): CrossFormula { return c('urbanism-mixeduse', 'mixeduse(uses, parcels) = ⌊uses · 100 / parcels⌋', parcels > 0 ? Math.floor((uses * 100) / parcels) : 0, nat(uses, parcels) && parcels > 0 && uses <= parcels, 'mixeduse', [uses, parcels]) }
  /** BLOCK SIZE: a block's area from its two sides. value length · width. */
  static blocksize(length: number, width: number): CrossFormula { return c('urbanism-blocksize', 'blocksize(length, width) = length · width', length * width, nat(length, width), 'blocksize', [length, width]) }
  /** INTERSECTION DENSITY: intersections over the area. value ⌊intersections / area⌋. */
  static intersectiondensity(intersections: number, area: number): CrossFormula { return c('urbanism-intersectiondensity', 'intersectiondensity(intersections, area) = ⌊intersections / area⌋', area > 0 ? Math.floor(intersections / area) : 0, nat(intersections, area) && area > 0, 'intersectiondensity', [intersections, area]) }
  /** FLOOR-AREA RATIO as a percentage of the lot. value ⌊floorarea · 100 / lotarea⌋. */
  static floorarearatio(floorarea: number, lotarea: number): CrossFormula { return c('urbanism-floorarearatio', 'floorarearatio(floorarea, lotarea) = ⌊floorarea · 100 / lotarea⌋', lotarea > 0 ? Math.floor((floorarea * 100) / lotarea) : 0, nat(floorarea, lotarea) && lotarea > 0, 'floorarearatio', [floorarea, lotarea]) }
  /** POPULATION DENSITY: people over the area. value ⌊population / area⌋. */
  static populationdensity(population: number, area: number): CrossFormula { return c('urbanism-populationdensity', 'populationdensity(population, area) = ⌊population / area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'populationdensity', [population, area]) }
  /** SERVICE COVERAGE: the share of residents a service reaches, as a percentage. value ⌊served · 100 / total⌋. */
  static servicecoverage(served: number, total: number): CrossFormula { return c('urbanism-servicecoverage', 'servicecoverage(served, total) = ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0 && served <= total, 'servicecoverage', [served, total]) }
}

for (const name of ['blocksize', 'density', 'floorarearatio', 'intersectiondensity', 'jobshousing', 'mixeduse', 'populationdensity', 'servicecoverage'] as const)
  hexRegisterOf('urbanism', name, (UrbanismFormulas[name] as (...x: unknown[]) => unknown).bind(UrbanismFormulas))
