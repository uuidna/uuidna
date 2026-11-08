import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AXIOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'axiology arithmetic (valuetypes, rankings, valuepairs, hierarchydepth, intrinsicextrinsic, preferenceorderings, normsubsets, commensurability); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'axiology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `axiology.${name}`, params })

export class AxiologyFormulas {
  static valuetypes(x: number, y: number): CrossFormula { return c('axiology-valuetypes', 'valuetypes(x, y) = x + y', x + y, nat(x, y), 'valuetypes', [x, y]) }
  static rankings(x: number): CrossFormula { return c('axiology-rankings', 'rankings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'rankings', [x]) }
  static valuepairs(x: number, y: number): CrossFormula { return c('axiology-valuepairs', 'valuepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'valuepairs', [x, y]) }
  static hierarchydepth(x: number, y: number): CrossFormula { return c('axiology-hierarchydepth', 'hierarchydepth(x, y) = x + y', x + y, nat(x, y), 'hierarchydepth', [x, y]) }
  static intrinsicextrinsic(x: number, y: number): CrossFormula { return c('axiology-intrinsicextrinsic', 'intrinsicextrinsic(x, y) = x · y', x * y, nat(x, y), 'intrinsicextrinsic', [x, y]) }
  static preferenceorderings(x: number, y: number): CrossFormula { return c('axiology-preferenceorderings', 'preferenceorderings(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'preferenceorderings', [x, y]) }
  static normsubsets(x: number): CrossFormula { return c('axiology-normsubsets', 'normsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'normsubsets', [x]) }
  static commensurability(x: number, y: number): CrossFormula { return c('axiology-commensurability', 'commensurability(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'commensurability', [x, y]) }
}

for (const name of ['commensurability', 'hierarchydepth', 'intrinsicextrinsic', 'normsubsets', 'preferenceorderings', 'rankings', 'valuepairs', 'valuetypes'] as const)
  hexRegisterOf('axiology', name, (AxiologyFormulas[name] as (...x: unknown[]) => unknown).bind(AxiologyFormulas))
