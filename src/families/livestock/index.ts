import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LIVESTOCK — HERD AND PASTURE MANAGEMENT, AS ARITHMETIC. Running a herd is numbers: how many animals a pasture carries,
 *  the feed to put on weight, the weight gained, how many are lost, how many breed and are born, whether forage meets
 *  demand, how many are weaned, and the product each animal yields. Crosses to `agriculture` — livestock is what the land
 *  feeds. A measure. */

const PROOF = 'livestock arithmetic (stocking density, feed conversion, weight gain, mortality, fertility, forage balance, weaning, output per head); a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'livestock', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `livestock.${name}`, params })

export class LivestockFormulas {
  /** FEED CONVERSION RATIO (×100): feed per unit of gain. value ⌊feed · 100 / gain⌋. */
  static feedconversion(feed: number, gain: number): CrossFormula { return c('livestock-feedconversion', 'feedconversion(feed, gain) = ⌊feed · 100 / gain⌋', gain > 0 ? Math.floor((feed * 100) / gain) : 0, nat(feed, gain) && gain > 0, 'feedconversion', [feed, gain]) }
  /** FERTILITY as a percentage: births per breeding female. value ⌊births · 100 / females⌋. */
  static fertility(births: number, females: number): CrossFormula { return c('livestock-fertility', 'fertility(births, females) = ⌊births · 100 / females⌋', females > 0 ? Math.floor((births * 100) / females) : 0, nat(births, females) && females > 0, 'fertility', [births, females]) }
  /** FORAGE BALANCE as a percentage: available over demand. value ⌊available · 100 / demand⌋. */
  static forage(available: number, demand: number): CrossFormula { return c('livestock-forage', 'forage(available, demand) = ⌊available · 100 / demand⌋', demand > 0 ? Math.floor((available * 100) / demand) : 0, nat(available, demand) && demand > 0, 'forage', [available, demand]) }
  /** MORTALITY as a percentage: lost from the herd. value ⌊died · 100 / herd⌋. */
  static mortality(died: number, herd: number): CrossFormula { return c('livestock-mortality', 'mortality(died, herd) = ⌊died · 100 / herd⌋', herd > 0 ? Math.floor((died * 100) / herd) : 0, nat(died, herd) && herd > 0 && died <= herd, 'mortality', [died, herd]) }
  /** OUTPUT per head: product over the animals producing it. value ⌊product / animals⌋. */
  static output(product: number, animals: number): CrossFormula { return c('livestock-output', 'output(product, animals) = ⌊product / animals⌋', animals > 0 ? Math.floor(product / animals) : 0, nat(product, animals) && animals > 0, 'output', [product, animals]) }
  /** STOCKING DENSITY: animals per hectare of pasture. value ⌊animals / hectares⌋. */
  static stocking(animals: number, hectares: number): CrossFormula { return c('livestock-stocking', 'stocking(animals, hectares) = ⌊animals / hectares⌋', hectares > 0 ? Math.floor(animals / hectares) : 0, nat(animals, hectares) && hectares > 0, 'stocking', [animals, hectares]) }
  /** WEANING RATE as a percentage: weaned of those born. value ⌊weaned · 100 / born⌋. */
  static weaning(weaned: number, born: number): CrossFormula { return c('livestock-weaning', 'weaning(weaned, born) = ⌊weaned · 100 / born⌋', born > 0 ? Math.floor((weaned * 100) / born) : 0, nat(weaned, born) && born > 0 && weaned <= born, 'weaning', [weaned, born]) }
  /** WEIGHT GAIN: final weight less the initial. value max(0, final − initial). */
  static weightgain(final: number, initial: number): CrossFormula { return c('livestock-weightgain', 'weightgain(final, initial) = max(0, final − initial)', Math.max(0, final - initial), nat(final, initial), 'weightgain', [final, initial]) }
}

for (const name of ['feedconversion', 'fertility', 'forage', 'mortality', 'output', 'stocking', 'weaning', 'weightgain'] as const)
  hexRegisterOf('livestock', name, (LivestockFormulas[name] as (...x: unknown[]) => unknown).bind(LivestockFormulas))
