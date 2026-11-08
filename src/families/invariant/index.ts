import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INVARIANT — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'invariant arithmetic (conditions, preconditionpairs, stateorderings, holdratio, clausesubsets, violations, strengthlevels, checkpaths); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'invariant', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `invariant.${name}`, params })

export class InvariantFormulas {
  static conditions(x: number, y: number): CrossFormula { return c('invariant-conditions', 'conditions(x, y) = x + y', x + y, nat(x, y), 'conditions', [x, y]) }
  static preconditionpairs(x: number, y: number): CrossFormula { return c('invariant-preconditionpairs', 'preconditionpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'preconditionpairs', [x, y]) }
  static stateorderings(x: number): CrossFormula { return c('invariant-stateorderings', 'stateorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stateorderings', [x]) }
  static holdratio(x: number, y: number): CrossFormula { return c('invariant-holdratio', 'holdratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'holdratio', [x, y]) }
  static clausesubsets(x: number): CrossFormula { return c('invariant-clausesubsets', 'clausesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'clausesubsets', [x]) }
  static violations(x: number, y: number): CrossFormula { return c('invariant-violations', 'violations(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'violations', [x, y]) }
  static strengthlevels(x: number, y: number): CrossFormula { return c('invariant-strengthlevels', 'strengthlevels(x, y) = x + y', x + y, nat(x, y), 'strengthlevels', [x, y]) }
  static checkpaths(x: number, y: number): CrossFormula { return c('invariant-checkpaths', 'checkpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'checkpaths', [x, y]) }
}

for (const name of ['checkpaths', 'clausesubsets', 'conditions', 'holdratio', 'preconditionpairs', 'stateorderings', 'strengthlevels', 'violations'] as const)
  hexRegisterOf('invariant', name, (InvariantFormulas[name] as (...x: unknown[]) => unknown).bind(InvariantFormulas))
