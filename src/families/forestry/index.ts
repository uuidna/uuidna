import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FORESTRY — FOREST MANAGEMENT, AS ARITHMETIC (chosen by the registry, not by hand). A managed forest is numbers: the log
 *  volume a tree holds, trees per hectare, the carbon a stand stores, yearly growth, canopy cover, the harvest a cut takes,
 *  whether a stand is ready to rotate, and the seedlings a replant plants. Crosses to `environment` — forestry is what the
 *  environment grows. A measure. */

const PROOF = 'forestry arithmetic (log volume, stocking density, carbon, growth, canopy, harvest, rotation, regeneration); forest management as a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'forestry', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `forestry.${name}`, params })

export class ForestryFormulas {
  /** LOG VOLUME: a tree's volume approximated from diameter and height. value ⌊diameter² · height / 1000⌋. */
  static volume(diameter: number, height: number): CrossFormula { return c('forestry-volume', 'volume(diameter, height) = ⌊diameter² · height / 1000⌋', Math.floor((diameter * diameter * height) / 1000), nat(diameter, height), 'volume', [diameter, height]) }
  /** STOCKING DENSITY: trees per hectare. value ⌊trees / hectares⌋. */
  static density(trees: number, hectares: number): CrossFormula { return c('forestry-density', 'density(trees, hectares) = ⌊trees / hectares⌋', hectares > 0 ? Math.floor(trees / hectares) : 0, nat(trees, hectares) && hectares > 0, 'density', [trees, hectares]) }
  /** CARBON: carbon stored in biomass at a factor (percent). value ⌊biomass · factor / 100⌋. */
  static carbon(biomass: number, factor: number): CrossFormula { return c('forestry-carbon', 'carbon(biomass, factor) = ⌊biomass · factor / 100⌋', Math.floor((biomass * factor) / 100), nat(biomass, factor), 'carbon', [biomass, factor]) }
  /** GROWTH: the increase over the previous measure, never negative. value max(0, current − previous). */
  static growth(current: number, previous: number): CrossFormula { return c('forestry-growth', 'growth(current, previous) = max(0, current − previous)', Math.max(0, current - previous), nat(current, previous), 'growth', [current, previous]) }
  /** CANOPY cover as a percentage. value ⌊covered · 100 / total⌋. */
  static canopy(covered: number, total: number): CrossFormula { return c('forestry-canopy', 'canopy(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'canopy', [covered, total]) }
  /** HARVEST: the volume a cut takes at a percentage. value ⌊volume · pct / 100⌋. */
  static harvest(volume: number, pct: number): CrossFormula { return c('forestry-harvest', 'harvest(volume, pct) = ⌊volume · pct / 100⌋', Math.floor((volume * pct) / 100), nat(volume, pct), 'harvest', [volume, pct]) }
  /** ROTATION: 1 when a stand's age meets its maturity. value [age ≥ maturity]. */
  static rotation(age: number, maturity: number): CrossFormula { return c('forestry-rotation', 'rotation(age, maturity) = [age ≥ maturity]', age >= maturity ? 1 : 0, nat(age, maturity), 'rotation', [age, maturity]) }
  /** REGENERATION: the seedlings a replant plants over an area. value seedlings · hectares. */
  static regeneration(seedlings: number, hectares: number): CrossFormula { return c('forestry-regeneration', 'regeneration(seedlings, hectares) = seedlings · hectares', seedlings * hectares, nat(seedlings, hectares), 'regeneration', [seedlings, hectares]) }
}

for (const name of ['canopy', 'carbon', 'density', 'growth', 'harvest', 'regeneration', 'rotation', 'volume'] as const)
  hexRegisterOf('forestry', name, (ForestryFormulas[name] as (...x: unknown[]) => unknown).bind(ForestryFormulas))
