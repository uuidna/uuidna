import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SHOGI — scaffolded integer measures crossed to graphtheory. Every output an exact finite nonnegative integer. */

const PROOF = 'shogi arithmetic (squares, pieces, promotions, dropcombos, movepaths, handsubsets, rankcount, branchingfactor); scaffolded from the integer-op palette; a measure crossed to graphtheory'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'shogi', dst: 'graphtheory', formula, value, proof: PROOF, ...extra }, holds, { name: `shogi.${name}`, params })

export class ShogiFormulas {
  static squares(x: number, y: number): CrossFormula { return c('shogi-squares', 'squares(x, y) = x · y', x * y, nat(x, y), 'squares', [x, y]) }
  static pieces(x: number, y: number): CrossFormula { return c('shogi-pieces', 'pieces(x, y) = x · y', x * y, nat(x, y), 'pieces', [x, y]) }
  static promotions(x: number, y: number): CrossFormula { return c('shogi-promotions', 'promotions(x, y) = x + y', x + y, nat(x, y), 'promotions', [x, y]) }
  static dropcombos(x: number, y: number): CrossFormula { return c('shogi-dropcombos', 'dropcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dropcombos', [x, y]) }
  static movepaths(x: number, y: number): CrossFormula { return c('shogi-movepaths', 'movepaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'movepaths', [x, y]) }
  static handsubsets(x: number): CrossFormula { return c('shogi-handsubsets', 'handsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'handsubsets', [x]) }
  static rankcount(x: number, y: number): CrossFormula { return c('shogi-rankcount', 'rankcount(x, y) = x + y', x + y, nat(x, y), 'rankcount', [x, y]) }
  static branchingfactor(x: number, y: number): CrossFormula { return c('shogi-branchingfactor', 'branchingfactor(x, y) = x + y', x + y, nat(x, y), 'branchingfactor', [x, y]) }
}

for (const name of ['branchingfactor', 'dropcombos', 'handsubsets', 'movepaths', 'pieces', 'promotions', 'rankcount', 'squares'] as const)
  hexRegisterOf('shogi', name, (ShogiFormulas[name] as (...x: unknown[]) => unknown).bind(ShogiFormulas))
