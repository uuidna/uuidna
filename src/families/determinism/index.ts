import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DETERMINISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'determinism arithmetic (causallinks, statechains, eventpairs, freedomdegrees, predictabilityratio, causalsubsets, branchingfactor, necessitylevel); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'determinism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `determinism.${name}`, params })

export class DeterminismFormulas {
  static causallinks(x: number, y: number): CrossFormula { return c('determinism-causallinks', 'causallinks(x, y) = x · y', x * y, nat(x, y), 'causallinks', [x, y]) }
  static statechains(x: number): CrossFormula { return c('determinism-statechains', 'statechains(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'statechains', [x]) }
  static eventpairs(x: number, y: number): CrossFormula { return c('determinism-eventpairs', 'eventpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'eventpairs', [x, y]) }
  static freedomdegrees(x: number, y: number): CrossFormula { return c('determinism-freedomdegrees', 'freedomdegrees(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'freedomdegrees', [x, y]) }
  static predictabilityratio(x: number, y: number): CrossFormula { return c('determinism-predictabilityratio', 'predictabilityratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'predictabilityratio', [x, y]) }
  static causalsubsets(x: number): CrossFormula { return c('determinism-causalsubsets', 'causalsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'causalsubsets', [x]) }
  static branchingfactor(x: number, y: number): CrossFormula { return c('determinism-branchingfactor', 'branchingfactor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'branchingfactor', [x, y]) }
  static necessitylevel(x: number, y: number): CrossFormula { return c('determinism-necessitylevel', 'necessitylevel(x, y) = x + y', x + y, nat(x, y), 'necessitylevel', [x, y]) }
}

for (const name of ['branchingfactor', 'causallinks', 'causalsubsets', 'eventpairs', 'freedomdegrees', 'necessitylevel', 'predictabilityratio', 'statechains'] as const)
  hexRegisterOf('determinism', name, (DeterminismFormulas[name] as (...x: unknown[]) => unknown).bind(DeterminismFormulas))
