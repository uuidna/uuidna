import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BUDDHISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'buddhism arithmetic (nobletruths, pathfactors, preceptsubsets, suttacount, pathorderings, aggregates, rebirthrealms, meditationcombos); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'buddhism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `buddhism.${name}`, params })

export class BuddhismFormulas {
  static nobletruths(x: number, y: number): CrossFormula { return c('buddhism-nobletruths', 'nobletruths(x, y) = x + y', x + y, nat(x, y), 'nobletruths', [x, y]) }
  static pathfactors(x: number, y: number): CrossFormula { return c('buddhism-pathfactors', 'pathfactors(x, y) = x + y', x + y, nat(x, y), 'pathfactors', [x, y]) }
  static preceptsubsets(x: number): CrossFormula { return c('buddhism-preceptsubsets', 'preceptsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'preceptsubsets', [x]) }
  static suttacount(x: number, y: number): CrossFormula { return c('buddhism-suttacount', 'suttacount(x, y) = x · y', x * y, nat(x, y), 'suttacount', [x, y]) }
  static pathorderings(x: number): CrossFormula { return c('buddhism-pathorderings', 'pathorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'pathorderings', [x]) }
  static aggregates(x: number, y: number): CrossFormula { return c('buddhism-aggregates', 'aggregates(x, y) = x + y', x + y, nat(x, y), 'aggregates', [x, y]) }
  static rebirthrealms(x: number, y: number): CrossFormula { return c('buddhism-rebirthrealms', 'rebirthrealms(x, y) = x + y', x + y, nat(x, y), 'rebirthrealms', [x, y]) }
  static meditationcombos(x: number, y: number): CrossFormula { return c('buddhism-meditationcombos', 'meditationcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'meditationcombos', [x, y]) }
}

for (const name of ['aggregates', 'meditationcombos', 'nobletruths', 'pathfactors', 'pathorderings', 'preceptsubsets', 'rebirthrealms', 'suttacount'] as const)
  hexRegisterOf('buddhism', name, (BuddhismFormulas[name] as (...x: unknown[]) => unknown).bind(BuddhismFormulas))
