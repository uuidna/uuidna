import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUTRITION — FOOD AS ARITHMETIC (chosen by the registry, not by hand). Eating is numbers: the energy in grams of a
 *  macronutrient, the calories protein, carbs, and fat each carry, the deficit between what is burned and what is taken
 *  in, a macro's share of the plate, water per kilo of body, and the resting burn. Crosses to `med` — nutrition is what
 *  medicine prescribes. A measure. */

const PROOF = 'nutrition arithmetic (macro energy, protein/carb/fat calories, deficit, macro share, hydration, basal rate); a food measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nutrition', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `nutrition.${name}`, params })

export class NutritionFormulas {
  /** ENERGY: grams of a macronutrient at its calories per gram. value grams · perGram. */
  static energy(grams: number, perGram: number): CrossFormula { return c('nutrition-energy', 'energy(grams, perGram) = grams · perGram', grams * perGram, nat(grams, perGram), 'energy', [grams, perGram]) }
  /** PROTEIN: 4 kcal per gram. value grams · 4. */
  static protein(grams: number): CrossFormula { return c('nutrition-protein', 'protein(grams) = grams · 4', grams * 4, nat(grams), 'protein', [grams]) }
  /** CARBS: 4 kcal per gram. value grams · 4. */
  static carbs(grams: number): CrossFormula { return c('nutrition-carbs', 'carbs(grams) = grams · 4', grams * 4, nat(grams), 'carbs', [grams]) }
  /** FAT: 9 kcal per gram. value grams · 9. */
  static fat(grams: number): CrossFormula { return c('nutrition-fat', 'fat(grams) = grams · 9', grams * 9, nat(grams), 'fat', [grams]) }
  /** DEFICIT: what is burned beyond what is taken in. value max(0, burn − intake). */
  static deficit(intake: number, burn: number): CrossFormula { return c('nutrition-deficit', 'deficit(intake, burn) = max(0, burn − intake)', Math.max(0, burn - intake), nat(intake, burn), 'deficit', [intake, burn]) }
  /** MACROS: a macro's share of the total, as a percentage. value ⌊macro · 100 / total⌋. */
  static macros(macro: number, total: number): CrossFormula { return c('nutrition-macros', 'macros(macro, total) = ⌊macro · 100 / total⌋', total > 0 ? Math.floor((macro * 100) / total) : 0, nat(macro, total) && total > 0 && macro <= total, 'macros', [macro, total]) }
  /** HYDRATION: millilitres of water per kilo of body. value ⌊ml / weight⌋. */
  static hydration(ml: number, weight: number): CrossFormula { return c('nutrition-hydration', 'hydration(ml, weight) = ⌊ml / weight⌋', weight > 0 ? Math.floor(ml / weight) : 0, nat(ml, weight) && weight > 0, 'hydration', [ml, weight]) }
  /** BMR: the basal burn at a per-kilo factor. value weight · factor. */
  static bmr(weight: number, factor: number): CrossFormula { return c('nutrition-bmr', 'bmr(weight, factor) = weight · factor', weight * factor, nat(weight, factor), 'bmr', [weight, factor]) }
}

for (const name of ['bmr', 'carbs', 'deficit', 'energy', 'fat', 'hydration', 'macros', 'protein'] as const)
  hexRegisterOf('nutrition', name, (NutritionFormulas[name] as (...x: unknown[]) => unknown).bind(NutritionFormulas))
