import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VERIFICATION — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'verification arithmetic (assertions, casecombos, stateorderings, coveragepct, invariantsubsets, counterexamples, proofobligations, passrate); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'verification', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `verification.${name}`, params })

export class VerificationFormulas {
  static assertions(x: number, y: number): CrossFormula { return c('verification-assertions', 'assertions(x, y) = x · y', x * y, nat(x, y), 'assertions', [x, y]) }
  static casecombos(x: number, y: number): CrossFormula { return c('verification-casecombos', 'casecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'casecombos', [x, y]) }
  static stateorderings(x: number): CrossFormula { return c('verification-stateorderings', 'stateorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stateorderings', [x]) }
  static coveragepct(x: number, y: number): CrossFormula { return c('verification-coveragepct', 'coveragepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coveragepct', [x, y]) }
  static invariantsubsets(x: number): CrossFormula { return c('verification-invariantsubsets', 'invariantsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'invariantsubsets', [x]) }
  static counterexamples(x: number, y: number): CrossFormula { return c('verification-counterexamples', 'counterexamples(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'counterexamples', [x, y]) }
  static proofobligations(x: number, y: number): CrossFormula { return c('verification-proofobligations', 'proofobligations(x, y) = x + y', x + y, nat(x, y), 'proofobligations', [x, y]) }
  static passrate(x: number, y: number): CrossFormula { return c('verification-passrate', 'passrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'passrate', [x, y]) }
}

for (const name of ['assertions', 'casecombos', 'counterexamples', 'coveragepct', 'invariantsubsets', 'passrate', 'proofobligations', 'stateorderings'] as const)
  hexRegisterOf('verification', name, (VerificationFormulas[name] as (...x: unknown[]) => unknown).bind(VerificationFormulas))
