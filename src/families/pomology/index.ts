import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POMOLOGY — THE SCIENCE OF FRUIT, AS ARITHMETIC. Growing fruit is numbers: the yield a block bears, sugar as °Brix, the
 *  blossoms that set, the fruits thinned off, average caliper, flesh firmness, the harvest index, and how many trees a
 *  planting holds. Crosses to `botany` — pomology is applied botany. A measure. */

const PROOF = 'pomology arithmetic (yield, brix, fruit set, thinning, caliper, firmness, harvest index, tree density); the orchard measured; a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pomology', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `pomology.${name}`, params })

export class PomologyFormulas {
  /** YIELD: fruits a block bears at so many trees, each bearing so many fruits. value trees · perTree. */
  static yield(trees: number, perTree: number): CrossFormula { return c('pomology-yield', 'yield(trees, perTree) = trees · perTree', trees * perTree, nat(trees, perTree), 'yield', [trees, perTree]) }
  /** BRIX: sugar as a percentage of juice (°Brix). value ⌊sugar · 100 / volume⌋. */
  static brix(sugar: number, volume: number): CrossFormula { return c('pomology-brix', 'brix(sugar, volume) = ⌊sugar · 100 / volume⌋', volume > 0 ? Math.floor((sugar * 100) / volume) : 0, nat(sugar, volume) && volume > 0 && sugar <= volume, 'brix', [sugar, volume]) }
  /** FRUIT SET: blossoms that became fruit, as a percentage. value ⌊set · 100 / blossoms⌋. */
  static fruitset(set: number, blossoms: number): CrossFormula { return c('pomology-fruitset', 'fruitset(set, blossoms) = ⌊set · 100 / blossoms⌋', blossoms > 0 ? Math.floor((set * 100) / blossoms) : 0, nat(set, blossoms) && blossoms > 0 && set <= blossoms, 'fruitset', [set, blossoms]) }
  /** THINNING: fruits removed to leave a crop load. value max(0, fruits − keep). */
  static thinning(fruits: number, keep: number): CrossFormula { return c('pomology-thinning', 'thinning(fruits, keep) = max(0, fruits − keep)', Math.max(0, fruits - keep), nat(fruits, keep), 'thinning', [fruits, keep]) }
  /** CALIPER: average fruit diameter, total millimetres over the count. value ⌊diameter / count⌋. */
  static caliper(diameter: number, count: number): CrossFormula { return c('pomology-caliper', 'caliper(diameter, count) = ⌊diameter / count⌋', count > 0 ? Math.floor(diameter / count) : 0, nat(diameter, count) && count > 0, 'caliper', [diameter, count]) }
  /** FIRMNESS: flesh pressure, force over the probe area. value ⌊force / area⌋. */
  static firmness(force: number, area: number): CrossFormula { return c('pomology-firmness', 'firmness(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'firmness', [force, area]) }
  /** HARVEST INDEX: fruit mass as a percentage of total biomass. value ⌊fruit · 100 / total⌋. */
  static harvestindex(fruit: number, total: number): CrossFormula { return c('pomology-harvestindex', 'harvestindex(fruit, total) = ⌊fruit · 100 / total⌋', total > 0 ? Math.floor((fruit * 100) / total) : 0, nat(fruit, total) && total > 0 && fruit <= total, 'harvestindex', [fruit, total]) }
  /** TREE DENSITY: trees a planting holds, area over the spacing each tree takes. value ⌊area / spacing⌋. */
  static treedensity(area: number, spacing: number): CrossFormula { return c('pomology-treedensity', 'treedensity(area, spacing) = ⌊area / spacing⌋', spacing > 0 ? Math.floor(area / spacing) : 0, nat(area, spacing) && spacing > 0, 'treedensity', [area, spacing]) }
}

for (const name of ['brix', 'caliper', 'firmness', 'fruitset', 'harvestindex', 'thinning', 'treedensity', 'yield'] as const)
  hexRegisterOf('pomology', name, (PomologyFormulas[name] as (...x: unknown[]) => unknown).bind(PomologyFormulas))
