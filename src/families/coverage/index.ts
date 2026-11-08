import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COVERAGE — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'coverage arithmetic (lines, branches, functionpairs, pathsubsets, uncovered, testcount, mutationscore, combinatorialt); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'coverage', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `coverage.${name}`, params })

export class CoverageFormulas {
  static lines(x: number, y: number): CrossFormula { return c('coverage-lines', 'lines(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'lines', [x, y]) }
  static branches(x: number, y: number): CrossFormula { return c('coverage-branches', 'branches(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'branches', [x, y]) }
  static functionpairs(x: number, y: number): CrossFormula { return c('coverage-functionpairs', 'functionpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'functionpairs', [x, y]) }
  static pathsubsets(x: number): CrossFormula { return c('coverage-pathsubsets', 'pathsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'pathsubsets', [x]) }
  static uncovered(x: number, y: number): CrossFormula { return c('coverage-uncovered', 'uncovered(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'uncovered', [x, y]) }
  static testcount(x: number, y: number): CrossFormula { return c('coverage-testcount', 'testcount(x, y) = x · y', x * y, nat(x, y), 'testcount', [x, y]) }
  static mutationscore(x: number, y: number): CrossFormula { return c('coverage-mutationscore', 'mutationscore(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'mutationscore', [x, y]) }
  static combinatorialt(x: number, y: number): CrossFormula { return c('coverage-combinatorialt', 'combinatorialt(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'combinatorialt', [x, y]) }
}

for (const name of ['branches', 'combinatorialt', 'functionpairs', 'lines', 'mutationscore', 'pathsubsets', 'testcount', 'uncovered'] as const)
  hexRegisterOf('coverage', name, (CoverageFormulas[name] as (...x: unknown[]) => unknown).bind(CoverageFormulas))
