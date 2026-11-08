import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FOODSAFETY — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'foodsafety arithmetic (dangerzonehours, pathogenpairs, cookingtempc, coolingtime, contaminationrate, haccppoints, logreduction, compliancepct); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'foodsafety', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `foodsafety.${name}`, params })

export class FoodsafetyFormulas {
  static dangerzonehours(x: number, y: number): CrossFormula { return c('foodsafety-dangerzonehours', 'dangerzonehours(x, y) = x + y', x + y, nat(x, y), 'dangerzonehours', [x, y]) }
  static pathogenpairs(x: number, y: number): CrossFormula { return c('foodsafety-pathogenpairs', 'pathogenpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'pathogenpairs', [x, y]) }
  static cookingtempc(x: number, y: number): CrossFormula { return c('foodsafety-cookingtempc', 'cookingtempc(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'cookingtempc', [x, y]) }
  static coolingtime(x: number, y: number): CrossFormula { return c('foodsafety-coolingtime', 'coolingtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'coolingtime', [x, y]) }
  static contaminationrate(x: number, y: number): CrossFormula { return c('foodsafety-contaminationrate', 'contaminationrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'contaminationrate', [x, y]) }
  static haccppoints(x: number, y: number): CrossFormula { return c('foodsafety-haccppoints', 'haccppoints(x, y) = x + y', x + y, nat(x, y), 'haccppoints', [x, y]) }
  static logreduction(x: number): CrossFormula { return c('foodsafety-logreduction', 'logreduction(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'logreduction', [x]) }
  static compliancepct(x: number, y: number): CrossFormula { return c('foodsafety-compliancepct', 'compliancepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'compliancepct', [x, y]) }
}

for (const name of ['compliancepct', 'contaminationrate', 'cookingtempc', 'coolingtime', 'dangerzonehours', 'haccppoints', 'logreduction', 'pathogenpairs'] as const)
  hexRegisterOf('foodsafety', name, (FoodsafetyFormulas[name] as (...x: unknown[]) => unknown).bind(FoodsafetyFormulas))
