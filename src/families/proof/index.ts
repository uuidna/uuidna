import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROOF — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'proof arithmetic (steps, lemmas, caseorderings, dependencypairs, branchsubsets, qed, axiomsused, inferencepaths); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'proof', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `proof.${name}`, params })

export class ProofFormulas {
  static steps(x: number, y: number): CrossFormula { return c('proof-steps', 'steps(x, y) = x + y', x + y, nat(x, y), 'steps', [x, y]) }
  static lemmas(x: number, y: number): CrossFormula { return c('proof-lemmas', 'lemmas(x, y) = x · y', x * y, nat(x, y), 'lemmas', [x, y]) }
  static caseorderings(x: number): CrossFormula { return c('proof-caseorderings', 'caseorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'caseorderings', [x]) }
  static dependencypairs(x: number, y: number): CrossFormula { return c('proof-dependencypairs', 'dependencypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dependencypairs', [x, y]) }
  static branchsubsets(x: number): CrossFormula { return c('proof-branchsubsets', 'branchsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'branchsubsets', [x]) }
  static qed(x: number, y: number): CrossFormula { return c('proof-qed', 'qed(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'qed', [x, y]) }
  static axiomsused(x: number, y: number): CrossFormula { return c('proof-axiomsused', 'axiomsused(x, y) = x + y', x + y, nat(x, y), 'axiomsused', [x, y]) }
  static inferencepaths(x: number, y: number): CrossFormula { return c('proof-inferencepaths', 'inferencepaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'inferencepaths', [x, y]) }
}

for (const name of ['axiomsused', 'branchsubsets', 'caseorderings', 'dependencypairs', 'inferencepaths', 'lemmas', 'qed', 'steps'] as const)
  hexRegisterOf('proof', name, (ProofFormulas[name] as (...x: unknown[]) => unknown).bind(ProofFormulas))
