import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BOTANY — PLANT GROWTH AS ARITHMETIC. The life of a crop is numbers: light captured into sugar, seeds that sprout,
 *  water moved through leaves, biomass gained, leaf area, chlorophyll efficiency, yield per field, and flowers set to
 *  fruit. Crosses to `agriculture` — botany is what a farm grows. A measure. */

const PROOF = 'botany arithmetic (photosynthesis, germination, transpiration, growth, leaf area, chlorophyll, crop yield, pollination); plant growth as integers; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'botany', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `botany.${name}`, params })

export class BotanyFormulas {
  /** PHOTOSYNTHESIS: a proxy for sugar made, light times chlorophyll. value light · chlorophyll. */
  static photosynthesis(light: number, chlorophyll: number): CrossFormula { return c('botany-photosynthesis', 'photosynthesis(light, chlorophyll) = light · chlorophyll', light * chlorophyll, nat(light, chlorophyll), 'photosynthesis', [light, chlorophyll]) }
  /** GERMINATION rate as a percentage. value ⌊sprouted · 100 / sown⌋. */
  static germination(sprouted: number, sown: number): CrossFormula { return c('botany-germination', 'germination(sprouted, sown) = ⌊sprouted · 100 / sown⌋', sown > 0 ? Math.floor((sprouted * 100) / sown) : 0, nat(sprouted, sown) && sown > 0 && sprouted <= sown, 'germination', [sprouted, sown]) }
  /** TRANSPIRATION: water moved over a leaf area at a rate. value area · rate. */
  static transpiration(area: number, rate: number): CrossFormula { return c('botany-transpiration', 'transpiration(area, rate) = area · rate', area * rate, nat(area, rate), 'transpiration', [area, rate]) }
  /** GROWTH: biomass gained from initial to final. value max(0, final − initial). */
  static growth(final: number, initial: number): CrossFormula { return c('botany-growth', 'growth(final, initial) = max(0, final − initial)', Math.max(0, final - initial), nat(final, initial), 'growth', [final, initial]) }
  /** LEAF AREA: length times width. value length · width. */
  static leafarea(length: number, width: number): CrossFormula { return c('botany-leafarea', 'leafarea(length, width) = length · width', length * width, nat(length, width), 'leafarea', [length, width]) }
  /** CHLOROPHYLL efficiency: light absorbed over incident, as a percentage. value ⌊absorbed · 100 / incident⌋. */
  static chlorophyll(absorbed: number, incident: number): CrossFormula { return c('botany-chlorophyll', 'chlorophyll(absorbed, incident) = ⌊absorbed · 100 / incident⌋', incident > 0 ? Math.floor((absorbed * 100) / incident) : 0, nat(absorbed, incident) && incident > 0 && absorbed <= incident, 'chlorophyll', [absorbed, incident]) }
  /** CROP YIELD: harvest over the field area. value ⌊harvest / area⌋. */
  static cropyield(harvest: number, area: number): CrossFormula { return c('botany-cropyield', 'cropyield(harvest, area) = ⌊harvest / area⌋', area > 0 ? Math.floor(harvest / area) : 0, nat(harvest, area) && area > 0, 'cropyield', [harvest, area]) }
  /** POLLINATION: flowers set to fruit, as a percentage. value ⌊fertilized · 100 / flowers⌋. */
  static pollination(fertilized: number, flowers: number): CrossFormula { return c('botany-pollination', 'pollination(fertilized, flowers) = ⌊fertilized · 100 / flowers⌋', flowers > 0 ? Math.floor((fertilized * 100) / flowers) : 0, nat(fertilized, flowers) && flowers > 0 && fertilized <= flowers, 'pollination', [fertilized, flowers]) }
}

for (const name of ['chlorophyll', 'cropyield', 'germination', 'growth', 'leafarea', 'photosynthesis', 'pollination', 'transpiration'] as const)
  hexRegisterOf('botany', name, (BotanyFormulas[name] as (...x: unknown[]) => unknown).bind(BotanyFormulas))
