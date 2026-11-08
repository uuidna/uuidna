import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HUSBANDRY — RAISING LIVESTOCK, AS ARITHMETIC. Keeping animals is numbers: how densely they stock a paddock, how much
 *  feed turns into gain, weaning weight, how a herd grows, mortality, the pasture-rotation cycle, water needed, and the
 *  floor space each animal is allowed. Crosses to `agriculture` — husbandry is the animal half of the farm. A measure. */

const PROOF = 'husbandry arithmetic (stocking density, feed conversion, weaning weight, herd growth, mortality, pasture rotation, water requirement, space allowance); the animal half of the farm; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'husbandry', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `husbandry.${name}`, params })

export class HusbandryFormulas {
  /** STOCKING DENSITY: animals per 100 units of area. value ⌊animals · 100 / area⌋. */
  static stockingdensity(animals: number, area: number): CrossFormula { return c('husbandry-stockingdensity', 'stockingdensity(animals, area) = ⌊animals · 100 / area⌋', area > 0 ? Math.floor((animals * 100) / area) : 0, nat(animals, area) && area > 0, 'stockingdensity', [animals, area]) }
  /** FEED CONVERSION: feed per unit of gain, ×100. value ⌊feed · 100 / gain⌋. */
  static feedconversion(feed: number, gain: number): CrossFormula { return c('husbandry-feedconversion', 'feedconversion(feed, gain) = ⌊feed · 100 / gain⌋', gain > 0 ? Math.floor((feed * 100) / gain) : 0, nat(feed, gain) && gain > 0, 'feedconversion', [feed, gain]) }
  /** WEANING WEIGHT: birth weight plus days of average daily gain. value birth + days · adg. */
  static weaningweight(birth: number, days: number, adg: number): CrossFormula { return c('husbandry-weaningweight', 'weaningweight(birth, days, adg) = birth + days · adg', birth + days * adg, nat(birth, days, adg), 'weaningweight', [birth, days, adg]) }
  /** HERD GROWTH: the herd after births and deaths. value max(0, herd + births − deaths). */
  static herdgrowth(herd: number, births: number, deaths: number): CrossFormula { return c('husbandry-herdgrowth', 'herdgrowth(herd, births, deaths) = max(0, herd + births − deaths)', Math.max(0, herd + births - deaths), nat(herd, births, deaths), 'herdgrowth', [herd, births, deaths]) }
  /** MORTALITY as a percentage. value ⌊deaths · 100 / total⌋. */
  static mortality(deaths: number, total: number): CrossFormula { return c('husbandry-mortality', 'mortality(deaths, total) = ⌊deaths · 100 / total⌋', total > 0 ? Math.floor((deaths * 100) / total) : 0, nat(deaths, total) && total > 0 && deaths <= total, 'mortality', [deaths, total]) }
  /** PASTURE ROTATION: the cycle length across paddocks at days each. value paddocks · days. */
  static pasturerotation(paddocks: number, days: number): CrossFormula { return c('husbandry-pasturerotation', 'pasturerotation(paddocks, days) = paddocks · days', paddocks * days, nat(paddocks, days), 'pasturerotation', [paddocks, days]) }
  /** WATER REQUIREMENT: animals at a per-head daily need. value animals · perhead. */
  static waterrequirement(animals: number, perhead: number): CrossFormula { return c('husbandry-waterrequirement', 'waterrequirement(animals, perhead) = animals · perhead', animals * perhead, nat(animals, perhead), 'waterrequirement', [animals, perhead]) }
  /** SPACE ALLOWANCE: floor area each animal is allowed. value ⌊area / animals⌋. */
  static spaceallowance(area: number, animals: number): CrossFormula { return c('husbandry-spaceallowance', 'spaceallowance(area, animals) = ⌊area / animals⌋', animals > 0 ? Math.floor(area / animals) : 0, nat(area, animals) && animals > 0, 'spaceallowance', [area, animals]) }
}

for (const name of ['feedconversion', 'herdgrowth', 'mortality', 'pasturerotation', 'spaceallowance', 'stockingdensity', 'waterrequirement', 'weaningweight'] as const)
  hexRegisterOf('husbandry', name, (HusbandryFormulas[name] as (...x: unknown[]) => unknown).bind(HusbandryFormulas))
