import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DIETETICS — scaffolded integer measures crossed to nutrition. Every output an exact finite nonnegative integer. */

const PROOF = 'dietetics arithmetic (caloriesneeded, macropct, bmi, proteingrams, mealsperday, waterml, deficit, nutrientcombos); scaffolded from the integer-op palette; a measure crossed to nutrition'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dietetics', dst: 'nutrition', formula, value, proof: PROOF, ...extra }, holds, { name: `dietetics.${name}`, params })

export class DieteticsFormulas {
  static caloriesneeded(x: number, y: number): CrossFormula { return c('dietetics-caloriesneeded', 'caloriesneeded(x, y) = x · y', x * y, nat(x, y), 'caloriesneeded', [x, y]) }
  static macropct(x: number, y: number): CrossFormula { return c('dietetics-macropct', 'macropct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'macropct', [x, y]) }
  static bmi(x: number, y: number): CrossFormula { return c('dietetics-bmi', 'bmi(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'bmi', [x, y]) }
  static proteingrams(x: number, y: number): CrossFormula { return c('dietetics-proteingrams', 'proteingrams(x, y) = x · y', x * y, nat(x, y), 'proteingrams', [x, y]) }
  static mealsperday(x: number, y: number): CrossFormula { return c('dietetics-mealsperday', 'mealsperday(x, y) = x + y', x + y, nat(x, y), 'mealsperday', [x, y]) }
  static waterml(x: number, y: number): CrossFormula { return c('dietetics-waterml', 'waterml(x, y) = x · y', x * y, nat(x, y), 'waterml', [x, y]) }
  static deficit(x: number, y: number): CrossFormula { return c('dietetics-deficit', 'deficit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'deficit', [x, y]) }
  static nutrientcombos(x: number, y: number): CrossFormula { return c('dietetics-nutrientcombos', 'nutrientcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'nutrientcombos', [x, y]) }
}

for (const name of ['bmi', 'caloriesneeded', 'deficit', 'macropct', 'mealsperday', 'nutrientcombos', 'proteingrams', 'waterml'] as const)
  hexRegisterOf('dietetics', name, (DieteticsFormulas[name] as (...x: unknown[]) => unknown).bind(DieteticsFormulas))
