import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SWINE — PIG HUSBANDRY AS ARITHMETIC. Raising pigs is numbers: the litter a sow raises, feed turned into gain, the gain a
 *  day adds, the share of piglets weaned, how lean a carcass runs, how often sows farrow, herd mortality, and market weight.
 *  Crosses to `agriculture` — swine is one of the farm's measures. A measure. */

const PROOF = 'swine arithmetic (litter, feed conversion, average daily gain, weaning, leanness, farrowing, mortality, market weight); pig husbandry as a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'swine', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `swine.${name}`, params })

export class SwineFormulas {
  /** LITTER: piglets per sow. value ⌊piglets / sows⌋. */
  static litter(piglets: number, sows: number): CrossFormula { return c('swine-litter', 'litter(piglets, sows) = ⌊piglets / sows⌋', sows > 0 ? Math.floor(piglets / sows) : 0, nat(piglets, sows) && sows > 0, 'litter', [piglets, sows]) }
  /** FEED CONVERSION: feed per unit of gain, as a percentage. value ⌊feed · 100 / gain⌋. */
  static feedconversion(feed: number, gain: number): CrossFormula { return c('swine-feedconversion', 'feedconversion(feed, gain) = ⌊feed · 100 / gain⌋', gain > 0 ? Math.floor((feed * 100) / gain) : 0, nat(feed, gain) && gain > 0, 'feedconversion', [feed, gain]) }
  /** AVERAGE DAILY GAIN: gain over the days. value ⌊gain / days⌋. */
  static averagedailygain(gain: number, days: number): CrossFormula { return c('swine-averagedailygain', 'averagedailygain(gain, days) = ⌊gain / days⌋', days > 0 ? Math.floor(gain / days) : 0, nat(gain, days) && days > 0, 'averagedailygain', [gain, days]) }
  /** WEANING: the share of piglets weaned. value ⌊weaned · 100 / born⌋. */
  static weaning(weaned: number, born: number): CrossFormula { return c('swine-weaning', 'weaning(weaned, born) = ⌊weaned · 100 / born⌋', born > 0 ? Math.floor((weaned * 100) / born) : 0, nat(weaned, born) && born > 0 && weaned <= born, 'weaning', [weaned, born]) }
  /** LEANNESS: lean meat as a share of the carcass. value ⌊lean · 100 / carcass⌋. */
  static leanness(lean: number, carcass: number): CrossFormula { return c('swine-leanness', 'leanness(lean, carcass) = ⌊lean · 100 / carcass⌋', carcass > 0 ? Math.floor((lean * 100) / carcass) : 0, nat(lean, carcass) && carcass > 0 && lean <= carcass, 'leanness', [lean, carcass]) }
  /** FARROWING: litters per sow, as a percentage (the farrowing rate). value ⌊litters · 100 / sows⌋. */
  static farrowing(litters: number, sows: number): CrossFormula { return c('swine-farrowing', 'farrowing(litters, sows) = ⌊litters · 100 / sows⌋', sows > 0 ? Math.floor((litters * 100) / sows) : 0, nat(litters, sows) && sows > 0, 'farrowing', [litters, sows]) }
  /** MORTALITY: the share of the herd that died. value ⌊died · 100 / herd⌋. */
  static mortality(died: number, herd: number): CrossFormula { return c('swine-mortality', 'mortality(died, herd) = ⌊died · 100 / herd⌋', herd > 0 ? Math.floor((died * 100) / herd) : 0, nat(died, herd) && herd > 0 && died <= herd, 'mortality', [died, herd]) }
  /** MARKET WEIGHT: the weight a pig goes to market at. value weight. */
  static market(weight: number): CrossFormula { return c('swine-market', 'market(weight) = weight', weight, nat(weight), 'market', [weight]) }
}

for (const name of ['averagedailygain', 'farrowing', 'feedconversion', 'leanness', 'litter', 'market', 'mortality', 'weaning'] as const)
  hexRegisterOf('swine', name, (SwineFormulas[name] as (...x: unknown[]) => unknown).bind(SwineFormulas))
