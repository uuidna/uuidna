import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CROPYIELD — GROWING FOOD, AS ARITHMETIC (chosen by the agronomy registry, not by hand). A field's harvest is numbers:
 *  yield per hectare, total production, the harvest index, the gap to potential, plant density, the root-to-shoot biomass
 *  ratio, moisture-corrected mass, and the harvest adjusted for loss. Crosses to `agronomy` — cropyield is what agronomy
 *  grows. A measure. */

const PROOF = 'cropyield arithmetic (per-hectare yield, total production, harvest index, yield gap, plant density, biomass ratio, moisture-corrected mass, loss-adjusted harvest); an agronomy domain; a measure crossed to agronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cropyield', dst: 'agronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `cropyield.${name}`, params })

export class CropyieldFormulas {
  /** PER-HECTARE YIELD: production over the area farmed. value ⌊production / area⌋. */
  static perhectare(production: number, area: number): CrossFormula { return c('cropyield-perhectare', 'perhectare(production, area) = ⌊production / area⌋', area > 0 ? Math.floor(production / area) : 0, nat(production, area) && area > 0, 'perhectare', [production, area]) }
  /** TOTAL PRODUCTION: a per-hectare yield over the area farmed. value perHectare · area. */
  static totalproduction(perHectare: number, area: number): CrossFormula { return c('cropyield-totalproduction', 'totalproduction(perHectare, area) = perHectare · area', perHectare * area, nat(perHectare, area), 'totalproduction', [perHectare, area]) }
  /** HARVEST INDEX: grain as a percentage of total biomass. value ⌊grain · 100 / biomass⌋. */
  static harvestindex(grain: number, biomass: number): CrossFormula { return c('cropyield-harvestindex', 'harvestindex(grain, biomass) = ⌊grain · 100 / biomass⌋', biomass > 0 ? Math.floor((grain * 100) / biomass) : 0, nat(grain, biomass) && biomass > 0 && grain <= biomass, 'harvestindex', [grain, biomass]) }
  /** YIELD GAP: the shortfall of the actual yield from its potential. value max(0, potential − actual). */
  static yieldgap(potential: number, actual: number): CrossFormula { return c('cropyield-yieldgap', 'yieldgap(potential, actual) = max(0, potential − actual)', Math.max(0, potential - actual), nat(potential, actual), 'yieldgap', [potential, actual]) }
  /** PLANT DENSITY: plants over the area farmed. value ⌊plants / area⌋. */
  static plantdensity(plants: number, area: number): CrossFormula { return c('cropyield-plantdensity', 'plantdensity(plants, area) = ⌊plants / area⌋', area > 0 ? Math.floor(plants / area) : 0, nat(plants, area) && area > 0, 'plantdensity', [plants, area]) }
  /** BIOMASS RATIO: root as a percentage of shoot. value ⌊root · 100 / shoot⌋. */
  static biomassratio(root: number, shoot: number): CrossFormula { return c('cropyield-biomassratio', 'biomassratio(root, shoot) = ⌊root · 100 / shoot⌋', shoot > 0 ? Math.floor((root * 100) / shoot) : 0, nat(root, shoot) && shoot > 0, 'biomassratio', [root, shoot]) }
  /** MOISTURE-CORRECTED MASS: wet mass taken down to its dry fraction. value ⌊wet · (100 − moisture) / 100⌋. */
  static moisturecorrected(wet: number, moisture: number): CrossFormula { return c('cropyield-moisturecorrected', 'moisturecorrected(wet, moisture) = ⌊wet · (100 − moisture) / 100⌋', Math.floor((wet * Math.max(0, 100 - moisture)) / 100), nat(wet, moisture) && moisture <= 100, 'moisturecorrected', [wet, moisture]) }
  /** LOSS-ADJUSTED HARVEST: the gross harvest after loss. value max(0, gross − loss). */
  static lossadjusted(gross: number, loss: number): CrossFormula { return c('cropyield-lossadjusted', 'lossadjusted(gross, loss) = max(0, gross − loss)', Math.max(0, gross - loss), nat(gross, loss) && loss <= gross, 'lossadjusted', [gross, loss]) }
}

for (const name of ['biomassratio', 'harvestindex', 'lossadjusted', 'moisturecorrected', 'perhectare', 'plantdensity', 'totalproduction', 'yieldgap'] as const)
  hexRegisterOf('cropyield', name, (CropyieldFormulas[name] as (...x: unknown[]) => unknown).bind(CropyieldFormulas))
