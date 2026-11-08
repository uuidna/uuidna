import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MEALPLANNING — scaffolded integer measures crossed to nutrition. Every output an exact finite nonnegative integer. */

const PROOF = 'mealplanning arithmetic (meals, portions, caloriesperday, ingredientpairs, weeklyorderings, varietysubsets, prepminutes, budgetpermeal); scaffolded from the integer-op palette; a measure crossed to nutrition'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mealplanning', dst: 'nutrition', formula, value, proof: PROOF, ...extra }, holds, { name: `mealplanning.${name}`, params })

export class MealplanningFormulas {
  static meals(x: number, y: number): CrossFormula { return c('mealplanning-meals', 'meals(x, y) = x · y', x * y, nat(x, y), 'meals', [x, y]) }
  static portions(x: number, y: number): CrossFormula { return c('mealplanning-portions', 'portions(x, y) = x · y', x * y, nat(x, y), 'portions', [x, y]) }
  static caloriesperday(x: number, y: number): CrossFormula { return c('mealplanning-caloriesperday', 'caloriesperday(x, y) = x · y', x * y, nat(x, y), 'caloriesperday', [x, y]) }
  static ingredientpairs(x: number, y: number): CrossFormula { return c('mealplanning-ingredientpairs', 'ingredientpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'ingredientpairs', [x, y]) }
  static weeklyorderings(x: number): CrossFormula { return c('mealplanning-weeklyorderings', 'weeklyorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'weeklyorderings', [x]) }
  static varietysubsets(x: number): CrossFormula { return c('mealplanning-varietysubsets', 'varietysubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'varietysubsets', [x]) }
  static prepminutes(x: number, y: number): CrossFormula { return c('mealplanning-prepminutes', 'prepminutes(x, y) = x · y', x * y, nat(x, y), 'prepminutes', [x, y]) }
  static budgetpermeal(x: number, y: number): CrossFormula { return c('mealplanning-budgetpermeal', 'budgetpermeal(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'budgetpermeal', [x, y]) }
}

for (const name of ['budgetpermeal', 'caloriesperday', 'ingredientpairs', 'meals', 'portions', 'prepminutes', 'varietysubsets', 'weeklyorderings'] as const)
  hexRegisterOf('mealplanning', name, (MealplanningFormulas[name] as (...x: unknown[]) => unknown).bind(MealplanningFormulas))
