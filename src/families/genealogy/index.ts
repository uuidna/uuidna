import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GENEALOGY — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'genealogy arithmetic (generations, descendants, lineagepaths, ancestorsatdepth, siblingpairs, cousindegree, marriagelinks, branchingfactor); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'genealogy', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `genealogy.${name}`, params })

export class GenealogyFormulas {
  static generations(x: number, y: number): CrossFormula { return c('genealogy-generations', 'generations(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'generations', [x, y]) }
  static descendants(x: number): CrossFormula { return c('genealogy-descendants', 'descendants(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'descendants', [x]) }
  static lineagepaths(x: number): CrossFormula { return c('genealogy-lineagepaths', 'lineagepaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'lineagepaths', [x]) }
  static ancestorsatdepth(x: number): CrossFormula { return c('genealogy-ancestorsatdepth', 'ancestorsatdepth(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'ancestorsatdepth', [x]) }
  static siblingpairs(x: number, y: number): CrossFormula { return c('genealogy-siblingpairs', 'siblingpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'siblingpairs', [x, y]) }
  static cousindegree(x: number, y: number): CrossFormula { return c('genealogy-cousindegree', 'cousindegree(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'cousindegree', [x, y]) }
  static marriagelinks(x: number, y: number): CrossFormula { return c('genealogy-marriagelinks', 'marriagelinks(x, y) = x · y', x * y, nat(x, y), 'marriagelinks', [x, y]) }
  static branchingfactor(x: number, y: number): CrossFormula { return c('genealogy-branchingfactor', 'branchingfactor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'branchingfactor', [x, y]) }
}

for (const name of ['ancestorsatdepth', 'branchingfactor', 'cousindegree', 'descendants', 'generations', 'lineagepaths', 'marriagelinks', 'siblingpairs'] as const)
  hexRegisterOf('genealogy', name, (GenealogyFormulas[name] as (...x: unknown[]) => unknown).bind(GenealogyFormulas))
