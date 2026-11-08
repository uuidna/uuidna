import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CUISINE — COOKING AS ARITHMETIC (chosen by the kitchen, not by hand). A recipe is numbers: scaling per serving, baker's
 *  hydration, cooked yield, oven temperature in celsius, portions per guest, the fat-to-flour ratio, a fermentation proof
 *  proxy, and how far a sauce reduces. Crosses to `nutrition` — cuisine is what nutrition measures. A measure. */

const PROOF = 'cuisine arithmetic (recipe scaling, baker\'s hydration, cooked yield, temperature, portion, fat ratio, proof, reduction); a kitchen measure crossed to nutrition'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cuisine', dst: 'nutrition', formula, value, proof: PROOF, ...extra }, holds, { name: `cuisine.${name}`, params })

export class CuisineFormulas {
  /** COOKED YIELD as a percentage of raw. value ⌊cooked · 100 / raw⌋. */
  static cooked(cooked: number, raw: number): CrossFormula { return c('cuisine-cooked', 'cooked(cooked, raw) = ⌊cooked · 100 / raw⌋', raw > 0 ? Math.floor((cooked * 100) / raw) : 0, nat(cooked, raw) && raw > 0, 'cooked', [cooked, raw]) }
  /** BAKER'S HYDRATION: water as a percentage of flour. value ⌊water · 100 / flour⌋. */
  static hydration(water: number, flour: number): CrossFormula { return c('cuisine-hydration', 'hydration(water, flour) = ⌊water · 100 / flour⌋', flour > 0 ? Math.floor((water * 100) / flour) : 0, nat(water, flour) && flour > 0, 'hydration', [water, flour]) }
  /** PORTION: total divided among the guests. value ⌊total / guests⌋. */
  static portion(total: number, guests: number): CrossFormula { return c('cuisine-portion', 'portion(total, guests) = ⌊total / guests⌋', guests > 0 ? Math.floor(total / guests) : 0, nat(total, guests) && guests > 0, 'portion', [total, guests]) }
  /** FERMENTATION PROOF proxy: time by temperature. value time · temperature. */
  static proof(time: number, temperature_: number): CrossFormula { return c('cuisine-proof', 'proof(time, temperature) = time · temperature', time * temperature_, nat(time, temperature_), 'proof', [time, temperature_]) }
  /** FAT RATIO: fat as a percentage of flour. value ⌊fat · 100 / flour⌋. */
  static ratio(fat: number, flour: number): CrossFormula { return c('cuisine-ratio', 'ratio(fat, flour) = ⌊fat · 100 / flour⌋', flour > 0 ? Math.floor((fat * 100) / flour) : 0, nat(fat, flour) && flour > 0, 'ratio', [fat, flour]) }
  /** REDUCTION: how far a sauce reduces, as a percentage. value ⌊(initial − final) · 100 / initial⌋. */
  static reduction(initial: number, final: number): CrossFormula { return c('cuisine-reduction', 'reduction(initial, final) = ⌊(initial − final) · 100 / initial⌋', initial > 0 ? Math.floor(((initial - final) * 100) / initial) : 0, nat(initial, final) && initial > 0 && final <= initial, 'reduction', [initial, final]) }
  /** RECIPE SCALING: per-serving amount by the servings. value perServing · servings. */
  static scaling(perServing: number, servings: number): CrossFormula { return c('cuisine-scaling', 'scaling(perServing, servings) = perServing · servings', perServing * servings, nat(perServing, servings), 'scaling', [perServing, servings]) }
  /** TEMPERATURE: fahrenheit to celsius. value ⌊(fahrenheit − 32) · 5 / 9⌋. */
  static temperature(fahrenheit: number): CrossFormula { return c('cuisine-temperature', 'temperature(fahrenheit) = ⌊(fahrenheit − 32) · 5 / 9⌋', Math.floor(((fahrenheit - 32) * 5) / 9), nat(fahrenheit), 'temperature', [fahrenheit]) }
}

for (const name of ['cooked', 'hydration', 'portion', 'proof', 'ratio', 'reduction', 'scaling', 'temperature'] as const)
  hexRegisterOf('cuisine', name, (CuisineFormulas[name] as (...x: unknown[]) => unknown).bind(CuisineFormulas))
