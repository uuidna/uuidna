import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AGRONOMY — THE SCIENCE OF THE FIELD, AS ARITHMETIC. Growing a crop is numbers: yield per area, the seeds a field takes,
 *  how a rotation divides over years, soil moisture, nitrogen against uptake, tillage work, harvest against the expectation,
 *  and planting density. Crosses to `agriculture` — agronomy is the measure the farm is run by. A measure. */

const PROOF = 'agronomy arithmetic (yield, seed rate, rotation, moisture, nitrogen, tillage, harvest, density); the field as integers; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'agronomy', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `agronomy.${name}`, params })

export class AgronomyFormulas {
  /** YIELD: harvest over the area it came from. value ⌊harvest / area⌋. */
  static output(harvest: number, area: number): CrossFormula { return c('agronomy-output', 'output(harvest, area) = ⌊harvest / area⌋', area > 0 ? Math.floor(harvest / area) : 0, nat(harvest, area) && area > 0, 'output', [harvest, area]) }
  /** SEED RATE: seeds over the area sown. value ⌊seeds / area⌋. */
  static seedrate(seeds: number, area: number): CrossFormula { return c('agronomy-seedrate', 'seedrate(seeds, area) = ⌊seeds / area⌋', area > 0 ? Math.floor(seeds / area) : 0, nat(seeds, area) && area > 0, 'seedrate', [seeds, area]) }
  /** ROTATION: crops divided over the years of the cycle. value ⌊crops / years⌋. */
  static rotation(crops: number, years: number): CrossFormula { return c('agronomy-rotation', 'rotation(crops, years) = ⌊crops / years⌋', years > 0 ? Math.floor(crops / years) : 0, nat(crops, years) && years > 0, 'rotation', [crops, years]) }
  /** MOISTURE: water as a percentage of the soil's capacity. value ⌊water · 100 / soil⌋. */
  static moisture(water: number, soil: number): CrossFormula { return c('agronomy-moisture', 'moisture(water, soil) = ⌊water · 100 / soil⌋', soil > 0 ? Math.floor((water * 100) / soil) : 0, nat(water, soil) && soil > 0 && water <= soil, 'moisture', [water, soil]) }
  /** NITROGEN: applied as a percentage of crop uptake. value ⌊applied · 100 / uptake⌋. */
  static nitrogen(applied: number, uptake: number): CrossFormula { return c('agronomy-nitrogen', 'nitrogen(applied, uptake) = ⌊applied · 100 / uptake⌋', uptake > 0 ? Math.floor((applied * 100) / uptake) : 0, nat(applied, uptake) && uptake > 0, 'nitrogen', [applied, uptake]) }
  /** TILLAGE: the work of a depth over its passes. value depth · passes. */
  static tillage(depth: number, passes: number): CrossFormula { return c('agronomy-tillage', 'tillage(depth, passes) = depth · passes', depth * passes, nat(depth, passes), 'tillage', [depth, passes]) }
  /** HARVEST: what was taken against what was expected. value ⌊yielded · 100 / expected⌋. */
  static harvest(yielded: number, expected: number): CrossFormula { return c('agronomy-harvest', 'harvest(yielded, expected) = ⌊yielded · 100 / expected⌋', expected > 0 ? Math.floor((yielded * 100) / expected) : 0, nat(yielded, expected) && expected > 0 && yielded <= expected, 'harvest', [yielded, expected]) }
  /** DENSITY: plants over the area they stand in. value ⌊plants / area⌋. */
  static density(plants: number, area: number): CrossFormula { return c('agronomy-density', 'density(plants, area) = ⌊plants / area⌋', area > 0 ? Math.floor(plants / area) : 0, nat(plants, area) && area > 0, 'density', [plants, area]) }
}

for (const name of ['density', 'harvest', 'moisture', 'nitrogen', 'output', 'rotation', 'seedrate', 'tillage'] as const)
  hexRegisterOf('agronomy', name, (AgronomyFormulas[name] as (...x: unknown[]) => unknown).bind(AgronomyFormulas))
