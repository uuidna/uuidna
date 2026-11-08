import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POULTRY — THE FLOCK AS ARITHMETIC (chosen by the agriculture registry, not by hand). Running a flock is numbers: the
 *  lay rate, hatchability, feed conversion, mortality, stocking density, dressing yield, total egg mass, and flock
 *  uniformity. Crosses to `agriculture` — poultry is what agriculture husbands. A measure. */

const PROOF = 'poultry arithmetic (lay rate, hatchability, feed conversion, mortality, stocking density, dressing yield, egg mass, uniformity); an agriculture domain; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'poultry', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `poultry.${name}`, params })

export class PoultryFormulas {
  /** LAY RATE as a percentage: eggs over hens. value ⌊eggs · 100 / hens⌋. */
  static laying(eggs: number, hens: number): CrossFormula { return c('poultry-laying', 'laying(eggs, hens) = ⌊eggs · 100 / hens⌋', hens > 0 ? Math.floor((eggs * 100) / hens) : 0, nat(eggs, hens) && hens > 0, 'laying', [eggs, hens]) }
  /** HATCHABILITY as a percentage: hatched over set. value ⌊hatched · 100 / set⌋. */
  static hatchability(hatched: number, set: number): CrossFormula { return c('poultry-hatchability', 'hatchability(hatched, set) = ⌊hatched · 100 / set⌋', set > 0 ? Math.floor((hatched * 100) / set) : 0, nat(hatched, set) && set > 0 && hatched <= set, 'hatchability', [hatched, set]) }
  /** FEED CONVERSION: feed over eggs. value ⌊feed / eggs⌋. */
  static feedconversion(feed: number, eggs: number): CrossFormula { return c('poultry-feedconversion', 'feedconversion(feed, eggs) = ⌊feed / eggs⌋', eggs > 0 ? Math.floor(feed / eggs) : 0, nat(feed, eggs) && eggs > 0, 'feedconversion', [feed, eggs]) }
  /** MORTALITY as a percentage: died over flock. value ⌊died · 100 / flock⌋. */
  static mortality(died: number, flock: number): CrossFormula { return c('poultry-mortality', 'mortality(died, flock) = ⌊died · 100 / flock⌋', flock > 0 ? Math.floor((died * 100) / flock) : 0, nat(died, flock) && flock > 0 && died <= flock, 'mortality', [died, flock]) }
  /** STOCKING DENSITY: birds over area. value ⌊birds / area⌋. */
  static density(birds: number, area: number): CrossFormula { return c('poultry-density', 'density(birds, area) = ⌊birds / area⌋', area > 0 ? Math.floor(birds / area) : 0, nat(birds, area) && area > 0, 'density', [birds, area]) }
  /** DRESSING YIELD as a percentage: carcass over live. value ⌊carcass · 100 / live⌋. */
  static dressing(carcass: number, live: number): CrossFormula { return c('poultry-dressing', 'dressing(carcass, live) = ⌊carcass · 100 / live⌋', live > 0 ? Math.floor((carcass * 100) / live) : 0, nat(carcass, live) && live > 0 && carcass <= live, 'dressing', [carcass, live]) }
  /** EGG MASS: eggs at a weight each. value eggs · weight. */
  static eggmass(eggs: number, weight: number): CrossFormula { return c('poultry-eggmass', 'eggmass(eggs, weight) = eggs · weight', eggs * weight, nat(eggs, weight), 'eggmass', [eggs, weight]) }
  /** UNIFORMITY as a percentage: within range over total. value ⌊withinrange · 100 / total⌋. */
  static uniformity(withinrange: number, total: number): CrossFormula { return c('poultry-uniformity', 'uniformity(withinrange, total) = ⌊withinrange · 100 / total⌋', total > 0 ? Math.floor((withinrange * 100) / total) : 0, nat(withinrange, total) && total > 0 && withinrange <= total, 'uniformity', [withinrange, total]) }
}

for (const name of ['density', 'dressing', 'eggmass', 'feedconversion', 'hatchability', 'laying', 'mortality', 'uniformity'] as const)
  hexRegisterOf('poultry', name, (PoultryFormulas[name] as (...x: unknown[]) => unknown).bind(PoultryFormulas))
