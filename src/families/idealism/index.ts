import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** IDEALISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'idealism arithmetic (mindcategories, phenomenasubsets, dialecticstages, conceptpairs, absolutelevels, representationmodes, syntheticunity, thesisorderings); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'idealism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `idealism.${name}`, params })

export class IdealismFormulas {
  static mindcategories(x: number, y: number): CrossFormula { return c('idealism-mindcategories', 'mindcategories(x, y) = x + y', x + y, nat(x, y), 'mindcategories', [x, y]) }
  static phenomenasubsets(x: number): CrossFormula { return c('idealism-phenomenasubsets', 'phenomenasubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'phenomenasubsets', [x]) }
  static dialecticstages(x: number): CrossFormula { return c('idealism-dialecticstages', 'dialecticstages(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'dialecticstages', [x]) }
  static conceptpairs(x: number, y: number): CrossFormula { return c('idealism-conceptpairs', 'conceptpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'conceptpairs', [x, y]) }
  static absolutelevels(x: number, y: number): CrossFormula { return c('idealism-absolutelevels', 'absolutelevels(x, y) = x + y', x + y, nat(x, y), 'absolutelevels', [x, y]) }
  static representationmodes(x: number, y: number): CrossFormula { return c('idealism-representationmodes', 'representationmodes(x, y) = x · y', x * y, nat(x, y), 'representationmodes', [x, y]) }
  static syntheticunity(x: number, y: number): CrossFormula { return c('idealism-syntheticunity', 'syntheticunity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'syntheticunity', [x, y]) }
  static thesisorderings(x: number, y: number): CrossFormula { return c('idealism-thesisorderings', 'thesisorderings(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'thesisorderings', [x, y]) }
}

for (const name of ['absolutelevels', 'conceptpairs', 'dialecticstages', 'mindcategories', 'phenomenasubsets', 'representationmodes', 'syntheticunity', 'thesisorderings'] as const)
  hexRegisterOf('idealism', name, (IdealismFormulas[name] as (...x: unknown[]) => unknown).bind(IdealismFormulas))
