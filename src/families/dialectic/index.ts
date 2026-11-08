import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DIALECTIC — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'dialectic arithmetic (thesisantithesis, syntheses, argumentpairs, stageorderings, contradictioncount, premisepaths, resolutiondepth, validmoves); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dialectic', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `dialectic.${name}`, params })

export class DialecticFormulas {
  static thesisantithesis(x: number, y: number): CrossFormula { return c('dialectic-thesisantithesis', 'thesisantithesis(x, y) = x + y', x + y, nat(x, y), 'thesisantithesis', [x, y]) }
  static syntheses(x: number, y: number): CrossFormula { return c('dialectic-syntheses', 'syntheses(x, y) = x · y', x * y, nat(x, y), 'syntheses', [x, y]) }
  static argumentpairs(x: number, y: number): CrossFormula { return c('dialectic-argumentpairs', 'argumentpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'argumentpairs', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('dialectic-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static contradictioncount(x: number, y: number): CrossFormula { return c('dialectic-contradictioncount', 'contradictioncount(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'contradictioncount', [x, y]) }
  static premisepaths(x: number, y: number): CrossFormula { return c('dialectic-premisepaths', 'premisepaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'premisepaths', [x, y]) }
  static resolutiondepth(x: number, y: number): CrossFormula { return c('dialectic-resolutiondepth', 'resolutiondepth(x, y) = x + y', x + y, nat(x, y), 'resolutiondepth', [x, y]) }
  static validmoves(x: number): CrossFormula { return c('dialectic-validmoves', 'validmoves(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'validmoves', [x]) }
}

for (const name of ['argumentpairs', 'contradictioncount', 'premisepaths', 'resolutiondepth', 'stageorderings', 'syntheses', 'thesisantithesis', 'validmoves'] as const)
  hexRegisterOf('dialectic', name, (DialecticFormulas[name] as (...x: unknown[]) => unknown).bind(DialecticFormulas))
