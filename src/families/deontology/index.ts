import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEONTOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'deontology arithmetic (duties, maximorderings, dutypairs, universalizability, imperativesubsets, obligationchains, rightsduties, conflictcount); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'deontology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `deontology.${name}`, params })

export class DeontologyFormulas {
  static duties(x: number, y: number): CrossFormula { return c('deontology-duties', 'duties(x, y) = x + y', x + y, nat(x, y), 'duties', [x, y]) }
  static maximorderings(x: number): CrossFormula { return c('deontology-maximorderings', 'maximorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'maximorderings', [x]) }
  static dutypairs(x: number, y: number): CrossFormula { return c('deontology-dutypairs', 'dutypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dutypairs', [x, y]) }
  static universalizability(x: number, y: number): CrossFormula { return c('deontology-universalizability', 'universalizability(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'universalizability', [x, y]) }
  static imperativesubsets(x: number): CrossFormula { return c('deontology-imperativesubsets', 'imperativesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'imperativesubsets', [x]) }
  static obligationchains(x: number, y: number): CrossFormula { return c('deontology-obligationchains', 'obligationchains(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'obligationchains', [x, y]) }
  static rightsduties(x: number, y: number): CrossFormula { return c('deontology-rightsduties', 'rightsduties(x, y) = x · y', x * y, nat(x, y), 'rightsduties', [x, y]) }
  static conflictcount(x: number, y: number): CrossFormula { return c('deontology-conflictcount', 'conflictcount(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'conflictcount', [x, y]) }
}

for (const name of ['conflictcount', 'duties', 'dutypairs', 'imperativesubsets', 'maximorderings', 'obligationchains', 'rightsduties', 'universalizability'] as const)
  hexRegisterOf('deontology', name, (DeontologyFormulas[name] as (...x: unknown[]) => unknown).bind(DeontologyFormulas))
