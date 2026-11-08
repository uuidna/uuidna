import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** APICULTURE — BEEKEEPING, AS ARITHMETIC (chosen by the registry, not by hand). Running an apiary is numbers: honey off the
 *  frames, the colony's population, foraging trips per bee, flowers pollinated, the mite load, the swarming rate, overwinter
 *  survival, and the queen's daily lay. Crosses to `entomology` — apiculture is the insects entomology studies. A measure. */

const PROOF = 'apiculture arithmetic (honey yield, population, foraging, pollination, mite load, swarming, overwinter survival, queen lay); a beekeeping measure crossed to entomology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'apiculture', dst: 'entomology', formula, value, proof: PROOF, ...extra }, holds, { name: `apiculture.${name}`, params })

export class ApicultureFormulas {
  /** HONEY YIELD: frames at a weight each. value frames · perframe. */
  static honey(frames: number, perframe: number): CrossFormula { return c('apiculture-honey', 'honey(frames, perframe) = frames · perframe', frames * perframe, nat(frames, perframe), 'honey', [frames, perframe]) }
  /** POPULATION: brood scaled by a workers-per-brood ratio. value brood · ratio. */
  static population(brood: number, ratio: number): CrossFormula { return c('apiculture-population', 'population(brood, ratio) = brood · ratio', brood * ratio, nat(brood, ratio), 'population', [brood, ratio]) }
  /** FORAGING: trips per bee. value ⌊trips / bees⌋. */
  static foraging(trips: number, bees: number): CrossFormula { return c('apiculture-foraging', 'foraging(trips, bees) = ⌊trips / bees⌋', bees > 0 ? Math.floor(trips / bees) : 0, nat(trips, bees) && bees > 0, 'foraging', [trips, bees]) }
  /** POLLINATION: flowers visited across the foragers. value flowers · bees. */
  static pollination(flowers: number, bees: number): CrossFormula { return c('apiculture-pollination', 'pollination(flowers, bees) = flowers · bees', flowers * bees, nat(flowers, bees), 'pollination', [flowers, bees]) }
  /** MITE LOAD per hundred bees. value ⌊mites · 100 / bees⌋. */
  static mite(mites: number, bees: number): CrossFormula { return c('apiculture-mite', 'mite(mites, bees) = ⌊mites · 100 / bees⌋', bees > 0 ? Math.floor((mites * 100) / bees) : 0, nat(mites, bees) && bees > 0, 'mite', [mites, bees]) }
  /** SWARMING rate as a percentage of colonies. value ⌊swarmed · 100 / colonies⌋. */
  static swarming(swarmed: number, colonies: number): CrossFormula { return c('apiculture-swarming', 'swarming(swarmed, colonies) = ⌊swarmed · 100 / colonies⌋', colonies > 0 ? Math.floor((swarmed * 100) / colonies) : 0, nat(swarmed, colonies) && colonies > 0 && swarmed <= colonies, 'swarming', [swarmed, colonies]) }
  /** OVERWINTER survival as a percentage of hives. value ⌊survived · 100 / hives⌋. */
  static overwinter(survived: number, hives: number): CrossFormula { return c('apiculture-overwinter', 'overwinter(survived, hives) = ⌊survived · 100 / hives⌋', hives > 0 ? Math.floor((survived * 100) / hives) : 0, nat(survived, hives) && hives > 0 && survived <= hives, 'overwinter', [survived, hives]) }
  /** QUEEN LAY: eggs per day. value ⌊eggs / days⌋. */
  static queen(eggs: number, days: number): CrossFormula { return c('apiculture-queen', 'queen(eggs, days) = ⌊eggs / days⌋', days > 0 ? Math.floor(eggs / days) : 0, nat(eggs, days) && days > 0, 'queen', [eggs, days]) }
}

for (const name of ['foraging', 'honey', 'mite', 'overwinter', 'pollination', 'population', 'queen', 'swarming'] as const)
  hexRegisterOf('apiculture', name, (ApicultureFormulas[name] as (...x: unknown[]) => unknown).bind(ApicultureFormulas))
