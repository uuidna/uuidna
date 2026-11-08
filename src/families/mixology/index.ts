import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MIXOLOGY — THE DRINK AS ARITHMETIC (chosen by the recipe registry, not by hand). Mixing a cocktail is numbers: the ABV
 *  from alcohol over volume, the dilution water adds, the parts ratio of spirit to mixer, the sugar a syrup carries, the
 *  servings a bottle pours, the total pour of parts at a unit, the sweet-over-sour balance, and the alcohol a serving holds.
 *  Crosses to `cuisine` — a drink is a dish you pour. A measure. */

const PROOF = 'mixology arithmetic (ABV, dilution, parts ratio, sugar content, servings, pour, sweet/sour balance, strength); the recipe registry\'s uncovered domain; a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mixology', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `mixology.${name}`, params })

export class MixologyFormulas {
  /** ALCOHOL BY VOLUME as a percentage. value ⌊alcohol · 100 / volume⌋. */
  static abv(alcohol: number, volume: number): CrossFormula { return c('mixology-abv', 'abv(alcohol, volume) = ⌊alcohol · 100 / volume⌋', volume > 0 ? Math.floor((alcohol * 100) / volume) : 0, nat(alcohol, volume) && volume > 0 && alcohol <= volume, 'abv', [alcohol, volume]) }
  /** DILUTION: the water as a percentage of the finished drink. value ⌊water · 100 / (spirit + water)⌋. */
  static dilution(spirit: number, water: number): CrossFormula { return c('mixology-dilution', 'dilution(spirit, water) = ⌊water · 100 / (spirit + water)⌋', spirit + water > 0 ? Math.floor((water * 100) / (spirit + water)) : 0, nat(spirit, water) && spirit + water > 0, 'dilution', [spirit, water]) }
  /** PARTS RATIO: parts of spirit per part of mixer. value ⌊spirit / mixer⌋. */
  static ratio(spirit: number, mixer: number): CrossFormula { return c('mixology-ratio', 'ratio(spirit, mixer) = ⌊spirit / mixer⌋', mixer > 0 ? Math.floor(spirit / mixer) : 0, nat(spirit, mixer) && mixer > 0, 'ratio', [spirit, mixer]) }
  /** SUGAR CONTENT: grams of sugar a syrup carries at a concentration. value ⌊syrup · concentration / 100⌋. */
  static sugarcontent(syrup: number, concentration: number): CrossFormula { return c('mixology-sugarcontent', 'sugarcontent(syrup, concentration) = ⌊syrup · concentration / 100⌋', Math.floor((syrup * concentration) / 100), nat(syrup, concentration) && concentration <= 100, 'sugarcontent', [syrup, concentration]) }
  /** SERVINGS: the drinks a bottle pours at a size each. value ⌊bottle / perDrink⌋. */
  static servings(bottle: number, perDrink: number): CrossFormula { return c('mixology-servings', 'servings(bottle, perDrink) = ⌊bottle / perDrink⌋', perDrink > 0 ? Math.floor(bottle / perDrink) : 0, nat(bottle, perDrink) && perDrink > 0, 'servings', [bottle, perDrink]) }
  /** POUR: total volume of parts at a unit each. value parts · unit. */
  static pour(parts: number, unit: number): CrossFormula { return c('mixology-pour', 'pour(parts, unit) = parts · unit', parts * unit, nat(parts, unit), 'pour', [parts, unit]) }
  /** BALANCE: the surplus of sweet over sour. value max(0, sweet − sour). */
  static balance(sweet: number, sour: number): CrossFormula { return c('mixology-balance', 'balance(sweet, sour) = max(0, sweet − sour)', Math.max(0, sweet - sour), nat(sweet, sour), 'balance', [sweet, sour]) }
  /** STRENGTH: the pure alcohol a serving holds at an ABV. value ⌊abv · volume / 100⌋. */
  static strength(abv: number, volume: number): CrossFormula { return c('mixology-strength', 'strength(abv, volume) = ⌊abv · volume / 100⌋', Math.floor((abv * volume) / 100), nat(abv, volume) && abv <= 100, 'strength', [abv, volume]) }
}

for (const name of ['abv', 'balance', 'dilution', 'pour', 'ratio', 'servings', 'strength', 'sugarcontent'] as const)
  hexRegisterOf('mixology', name, (MixologyFormulas[name] as (...x: unknown[]) => unknown).bind(MixologyFormulas))
