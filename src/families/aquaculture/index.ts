import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AQUACULTURE — RAISING FISH, AS ARITHMETIC (chosen by the farm registry, not by hand). A fish farm is numbers: feed
 *  conversion ratio, stocking density, dissolved oxygen against demand, growth over a cycle, survival to harvest, standing
 *  biomass, the daily feeding rate, and ammonia concentration. Crosses to `fishery` — aquaculture feeds the catch. A measure. */

const PROOF = 'aquaculture arithmetic (feed conversion, density, oxygen, growth, survival, biomass, feeding rate, ammonia); a farm registry domain; a measure crossed to fishery'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aquaculture', dst: 'fishery', formula, value, proof: PROOF, ...extra }, holds, { name: `aquaculture.${name}`, params })

export class AquacultureFormulas {
  /** FEED CONVERSION RATIO: feed given per unit of gain, ·100. value ⌊feed · 100 / gain⌋. */
  static fcr(feed: number, gain: number): CrossFormula { return c('aquaculture-fcr', 'fcr(feed, gain) = ⌊feed · 100 / gain⌋', gain > 0 ? Math.floor((feed * 100) / gain) : 0, nat(feed, gain) && gain > 0, 'fcr', [feed, gain]) }
  /** STOCKING DENSITY: fish per unit of volume. value ⌊fish / volume⌋. */
  static density(fish: number, volume: number): CrossFormula { return c('aquaculture-density', 'density(fish, volume) = ⌊fish / volume⌋', volume > 0 ? Math.floor(fish / volume) : 0, nat(fish, volume) && volume > 0, 'density', [fish, volume]) }
  /** OXYGEN: dissolved against demand, as a percentage. value ⌊dissolved · 100 / demand⌋. */
  static oxygen(dissolved: number, demand: number): CrossFormula { return c('aquaculture-oxygen', 'oxygen(dissolved, demand) = ⌊dissolved · 100 / demand⌋', demand > 0 ? Math.floor((dissolved * 100) / demand) : 0, nat(dissolved, demand) && demand > 0, 'oxygen', [dissolved, demand]) }
  /** GROWTH: weight gained over the cycle. value max(0, final − initial). */
  static growth(final: number, initial: number): CrossFormula { return c('aquaculture-growth', 'growth(final, initial) = max(0, final − initial)', Math.max(0, final - initial), nat(final, initial), 'growth', [final, initial]) }
  /** SURVIVAL: harvested of stocked, as a percentage. value ⌊harvested · 100 / stocked⌋. */
  static survival(harvested: number, stocked: number): CrossFormula { return c('aquaculture-survival', 'survival(harvested, stocked) = ⌊harvested · 100 / stocked⌋', stocked > 0 ? Math.floor((harvested * 100) / stocked) : 0, nat(harvested, stocked) && stocked > 0 && harvested <= stocked, 'survival', [harvested, stocked]) }
  /** BIOMASS: count at a weight each. value count · weight. */
  static biomass(count: number, weight: number): CrossFormula { return c('aquaculture-biomass', 'biomass(count, weight) = count · weight', count * weight, nat(count, weight), 'biomass', [count, weight]) }
  /** FEEDING RATE: ration against biomass, as a percentage. value ⌊ration · 100 / biomass⌋. */
  static feeding(ration: number, biomass_: number): CrossFormula { return c('aquaculture-feeding', 'feeding(ration, biomass) = ⌊ration · 100 / biomass⌋', biomass_ > 0 ? Math.floor((ration * 100) / biomass_) : 0, nat(ration, biomass_) && biomass_ > 0, 'feeding', [ration, biomass_]) }
  /** AMMONIA: produced over the volume it dilutes into. value ⌊produced / volume⌋. */
  static ammonia(produced: number, volume: number): CrossFormula { return c('aquaculture-ammonia', 'ammonia(produced, volume) = ⌊produced / volume⌋', volume > 0 ? Math.floor(produced / volume) : 0, nat(produced, volume) && volume > 0, 'ammonia', [produced, volume]) }
}

for (const name of ['ammonia', 'biomass', 'density', 'fcr', 'feeding', 'growth', 'oxygen', 'survival'] as const)
  hexRegisterOf('aquaculture', name, (AquacultureFormulas[name] as (...x: unknown[]) => unknown).bind(AquacultureFormulas))
