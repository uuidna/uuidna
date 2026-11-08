import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEMATRIA — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'gematria arithmetic (lettervalue, wordtotal, equivalences, cipherorderings, alphabetsize, valuesum, substitutions, reductionmod); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gematria', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `gematria.${name}`, params })

export class GematriaFormulas {
  static lettervalue(x: number, y: number): CrossFormula { return c('gematria-lettervalue', 'lettervalue(x, y) = x · y', x * y, nat(x, y), 'lettervalue', [x, y]) }
  static wordtotal(x: number, y: number, z: number): CrossFormula { return c('gematria-wordtotal', 'wordtotal(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'wordtotal', [x, y, z]) }
  static equivalences(x: number, y: number): CrossFormula { return c('gematria-equivalences', 'equivalences(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'equivalences', [x, y]) }
  static cipherorderings(x: number): CrossFormula { return c('gematria-cipherorderings', 'cipherorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'cipherorderings', [x]) }
  static alphabetsize(x: number, y: number): CrossFormula { return c('gematria-alphabetsize', 'alphabetsize(x, y) = x + y', x + y, nat(x, y), 'alphabetsize', [x, y]) }
  static valuesum(x: number, y: number): CrossFormula { return c('gematria-valuesum', 'valuesum(x, y) = x · y', x * y, nat(x, y), 'valuesum', [x, y]) }
  static substitutions(x: number, y: number): CrossFormula { return c('gematria-substitutions', 'substitutions(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'substitutions', [x, y]) }
  static reductionmod(x: number, y: number): CrossFormula { return c('gematria-reductionmod', 'reductionmod(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'reductionmod', [x, y]) }
}

for (const name of ['alphabetsize', 'cipherorderings', 'equivalences', 'lettervalue', 'reductionmod', 'substitutions', 'valuesum', 'wordtotal'] as const)
  hexRegisterOf('gematria', name, (GematriaFormulas[name] as (...x: unknown[]) => unknown).bind(GematriaFormulas))
