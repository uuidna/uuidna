import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RATIONALISM — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'rationalism arithmetic (axioms, deductionchains, innateideas, proofpaths, premisesubsets, inferencepairs, aprioriratio, necessitylevels); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rationalism', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `rationalism.${name}`, params })

export class RationalismFormulas {
  static axioms(x: number, y: number): CrossFormula { return c('rationalism-axioms', 'axioms(x, y) = x + y', x + y, nat(x, y), 'axioms', [x, y]) }
  static deductionchains(x: number): CrossFormula { return c('rationalism-deductionchains', 'deductionchains(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'deductionchains', [x]) }
  static innateideas(x: number, y: number): CrossFormula { return c('rationalism-innateideas', 'innateideas(x, y) = x · y', x * y, nat(x, y), 'innateideas', [x, y]) }
  static proofpaths(x: number, y: number): CrossFormula { return c('rationalism-proofpaths', 'proofpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'proofpaths', [x, y]) }
  static premisesubsets(x: number): CrossFormula { return c('rationalism-premisesubsets', 'premisesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'premisesubsets', [x]) }
  static inferencepairs(x: number, y: number): CrossFormula { return c('rationalism-inferencepairs', 'inferencepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'inferencepairs', [x, y]) }
  static aprioriratio(x: number, y: number): CrossFormula { return c('rationalism-aprioriratio', 'aprioriratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'aprioriratio', [x, y]) }
  static necessitylevels(x: number, y: number): CrossFormula { return c('rationalism-necessitylevels', 'necessitylevels(x, y) = x + y', x + y, nat(x, y), 'necessitylevels', [x, y]) }
}

for (const name of ['aprioriratio', 'axioms', 'deductionchains', 'inferencepairs', 'innateideas', 'necessitylevels', 'premisesubsets', 'proofpaths'] as const)
  hexRegisterOf('rationalism', name, (RationalismFormulas[name] as (...x: unknown[]) => unknown).bind(RationalismFormulas))
