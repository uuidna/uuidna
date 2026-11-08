import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEMIOTICS — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'semiotics arithmetic (signs, signifierpairs, codesubsets, denotationlevels, paradigmorderings, syntagmlength, iconindexsymbol, interpretantratio); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'semiotics', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `semiotics.${name}`, params })

export class SemioticsFormulas {
  static signs(x: number, y: number): CrossFormula { return c('semiotics-signs', 'signs(x, y) = x + y', x + y, nat(x, y), 'signs', [x, y]) }
  static signifierpairs(x: number, y: number): CrossFormula { return c('semiotics-signifierpairs', 'signifierpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'signifierpairs', [x, y]) }
  static codesubsets(x: number): CrossFormula { return c('semiotics-codesubsets', 'codesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'codesubsets', [x]) }
  static denotationlevels(x: number, y: number): CrossFormula { return c('semiotics-denotationlevels', 'denotationlevels(x, y) = x + y', x + y, nat(x, y), 'denotationlevels', [x, y]) }
  static paradigmorderings(x: number): CrossFormula { return c('semiotics-paradigmorderings', 'paradigmorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'paradigmorderings', [x]) }
  static syntagmlength(x: number, y: number): CrossFormula { return c('semiotics-syntagmlength', 'syntagmlength(x, y) = x · y', x * y, nat(x, y), 'syntagmlength', [x, y]) }
  static iconindexsymbol(x: number, y: number): CrossFormula { return c('semiotics-iconindexsymbol', 'iconindexsymbol(x, y) = x + y', x + y, nat(x, y), 'iconindexsymbol', [x, y]) }
  static interpretantratio(x: number, y: number): CrossFormula { return c('semiotics-interpretantratio', 'interpretantratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'interpretantratio', [x, y]) }
}

for (const name of ['codesubsets', 'denotationlevels', 'iconindexsymbol', 'interpretantratio', 'paradigmorderings', 'signifierpairs', 'signs', 'syntagmlength'] as const)
  hexRegisterOf('semiotics', name, (SemioticsFormulas[name] as (...x: unknown[]) => unknown).bind(SemioticsFormulas))
