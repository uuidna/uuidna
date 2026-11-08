import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUMISMATICS — scaffolded integer measures crossed to archaeology. Every output an exact finite nonnegative integer. */

const PROOF = 'numismatics arithmetic (coincount, mintcombos, denominationorderings, hoardsize, weightgrains, purity, dierotations, varietysubsets); scaffolded from the integer-op palette; a measure crossed to archaeology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'numismatics', dst: 'archaeology', formula, value, proof: PROOF, ...extra }, holds, { name: `numismatics.${name}`, params })

export class NumismaticsFormulas {
  static coincount(x: number, y: number): CrossFormula { return c('numismatics-coincount', 'coincount(x, y) = x · y', x * y, nat(x, y), 'coincount', [x, y]) }
  static mintcombos(x: number, y: number): CrossFormula { return c('numismatics-mintcombos', 'mintcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'mintcombos', [x, y]) }
  static denominationorderings(x: number): CrossFormula { return c('numismatics-denominationorderings', 'denominationorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'denominationorderings', [x]) }
  static hoardsize(x: number, y: number): CrossFormula { return c('numismatics-hoardsize', 'hoardsize(x, y) = x + y', x + y, nat(x, y), 'hoardsize', [x, y]) }
  static weightgrains(x: number, y: number): CrossFormula { return c('numismatics-weightgrains', 'weightgrains(x, y) = x · y', x * y, nat(x, y), 'weightgrains', [x, y]) }
  static purity(x: number, y: number): CrossFormula { return c('numismatics-purity', 'purity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'purity', [x, y]) }
  static dierotations(x: number, y: number): CrossFormula { return c('numismatics-dierotations', 'dierotations(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dierotations', [x, y]) }
  static varietysubsets(x: number): CrossFormula { return c('numismatics-varietysubsets', 'varietysubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'varietysubsets', [x]) }
}

for (const name of ['coincount', 'denominationorderings', 'dierotations', 'hoardsize', 'mintcombos', 'purity', 'varietysubsets', 'weightgrains'] as const)
  hexRegisterOf('numismatics', name, (NumismaticsFormulas[name] as (...x: unknown[]) => unknown).bind(NumismaticsFormulas))
