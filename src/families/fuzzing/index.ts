import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FUZZING — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'fuzzing arithmetic (iterations, inputspace, crashcombos, coveragepct, seedcount, mutationpaths, uniquecrashes, throughput); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fuzzing', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `fuzzing.${name}`, params })

export class FuzzingFormulas {
  static iterations(x: number, y: number): CrossFormula { return c('fuzzing-iterations', 'iterations(x, y) = x · y', x * y, nat(x, y), 'iterations', [x, y]) }
  static inputspace(x: number): CrossFormula { return c('fuzzing-inputspace', 'inputspace(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'inputspace', [x]) }
  static crashcombos(x: number, y: number): CrossFormula { return c('fuzzing-crashcombos', 'crashcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'crashcombos', [x, y]) }
  static coveragepct(x: number, y: number): CrossFormula { return c('fuzzing-coveragepct', 'coveragepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coveragepct', [x, y]) }
  static seedcount(x: number, y: number): CrossFormula { return c('fuzzing-seedcount', 'seedcount(x, y) = x + y', x + y, nat(x, y), 'seedcount', [x, y]) }
  static mutationpaths(x: number, y: number): CrossFormula { return c('fuzzing-mutationpaths', 'mutationpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'mutationpaths', [x, y]) }
  static uniquecrashes(x: number, y: number): CrossFormula { return c('fuzzing-uniquecrashes', 'uniquecrashes(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'uniquecrashes', [x, y]) }
  static throughput(x: number, y: number): CrossFormula { return c('fuzzing-throughput', 'throughput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
}

for (const name of ['coveragepct', 'crashcombos', 'inputspace', 'iterations', 'mutationpaths', 'seedcount', 'throughput', 'uniquecrashes'] as const)
  hexRegisterOf('fuzzing', name, (FuzzingFormulas[name] as (...x: unknown[]) => unknown).bind(FuzzingFormulas))
