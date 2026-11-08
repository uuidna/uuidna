import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HORTICULTURE — GROWING PLANTS, AS ARITHMETIC. The garden is numbers: how far apart to set plants in a bed, what fraction
 *  of seeds sprout, how much of a canopy was pruned, water and feed per unit of ground, the acid-to-base ratio of the soil,
 *  the light a crop banks over its season, and how many cuttings took root. Crosses to `botany` — horticulture is botany put
 *  to work. A measure. */

const PROOF = 'horticulture arithmetic (plant spacing, germination, pruning, irrigation, fertilizer, soil pH, light-days, propagation); growing plants as integers; a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'horticulture', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `horticulture.${name}`, params })

export class HorticultureFormulas {
  /** PLANT SPACING: the ground each plant gets in a bed. value ⌊area / plants⌋. */
  static spacing(area: number, plants: number): CrossFormula { return c('horticulture-spacing', 'spacing(area, plants) = ⌊area / plants⌋', plants > 0 ? Math.floor(area / plants) : 0, nat(area, plants) && plants > 0, 'spacing', [area, plants]) }
  /** GERMINATION as a percentage of seeds that sprout. value ⌊sprouted · 100 / seeds⌋. */
  static germination(sprouted: number, seeds: number): CrossFormula { return c('horticulture-germination', 'germination(sprouted, seeds) = ⌊sprouted · 100 / seeds⌋', seeds > 0 ? Math.floor((sprouted * 100) / seeds) : 0, nat(sprouted, seeds) && seeds > 0 && sprouted <= seeds, 'germination', [sprouted, seeds]) }
  /** PRUNING: the fraction of the canopy removed. value ⌊removed · 100 / total⌋. */
  static pruning(removed: number, total: number): CrossFormula { return c('horticulture-pruning', 'pruning(removed, total) = ⌊removed · 100 / total⌋', total > 0 ? Math.floor((removed * 100) / total) : 0, nat(removed, total) && total > 0 && removed <= total, 'pruning', [removed, total]) }
  /** IRRIGATION: water volume per unit of ground. value ⌊volume / area⌋. */
  static irrigation(volume: number, area: number): CrossFormula { return c('horticulture-irrigation', 'irrigation(volume, area) = ⌊volume / area⌋', area > 0 ? Math.floor(volume / area) : 0, nat(volume, area) && area > 0, 'irrigation', [volume, area]) }
  /** FERTILIZER: nutrient per unit of ground. value ⌊nutrient / area⌋. */
  static fertilizer(nutrient: number, area: number): CrossFormula { return c('horticulture-fertilizer', 'fertilizer(nutrient, area) = ⌊nutrient / area⌋', area > 0 ? Math.floor(nutrient / area) : 0, nat(nutrient, area) && area > 0, 'fertilizer', [nutrient, area]) }
  /** SOIL pH: the acid-to-base ratio, scaled. value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('horticulture-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** LIGHT-DAYS: the light a crop banks over its season. value hours · days. */
  static lightdays(hours: number, days: number): CrossFormula { return c('horticulture-lightdays', 'lightdays(hours, days) = hours · days', hours * days, nat(hours, days), 'lightdays', [hours, days]) }
  /** PROPAGATION: the fraction of cuttings that take root. value ⌊rooted · 100 / cuttings⌋. */
  static propagation(rooted: number, cuttings: number): CrossFormula { return c('horticulture-propagation', 'propagation(rooted, cuttings) = ⌊rooted · 100 / cuttings⌋', cuttings > 0 ? Math.floor((rooted * 100) / cuttings) : 0, nat(rooted, cuttings) && cuttings > 0 && rooted <= cuttings, 'propagation', [rooted, cuttings]) }
}

for (const name of ['fertilizer', 'germination', 'irrigation', 'lightdays', 'ph', 'propagation', 'pruning', 'spacing'] as const)
  hexRegisterOf('horticulture', name, (HorticultureFormulas[name] as (...x: unknown[]) => unknown).bind(HorticultureFormulas))
