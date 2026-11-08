import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRANSLITERATION — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'transliteration arithmetic (mappings, charpairs, schemeorderings, ambiguouschars, reversibility, diacriticcount, schemesubsets, coverage); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'transliteration', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `transliteration.${name}`, params })

export class TransliterationFormulas {
  static mappings(x: number, y: number): CrossFormula { return c('transliteration-mappings', 'mappings(x, y) = x · y', x * y, nat(x, y), 'mappings', [x, y]) }
  static charpairs(x: number, y: number): CrossFormula { return c('transliteration-charpairs', 'charpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'charpairs', [x, y]) }
  static schemeorderings(x: number): CrossFormula { return c('transliteration-schemeorderings', 'schemeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'schemeorderings', [x]) }
  static ambiguouschars(x: number, y: number): CrossFormula { return c('transliteration-ambiguouschars', 'ambiguouschars(x, y) = x + y', x + y, nat(x, y), 'ambiguouschars', [x, y]) }
  static reversibility(x: number, y: number): CrossFormula { return c('transliteration-reversibility', 'reversibility(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'reversibility', [x, y]) }
  static diacriticcount(x: number, y: number): CrossFormula { return c('transliteration-diacriticcount', 'diacriticcount(x, y) = x + y', x + y, nat(x, y), 'diacriticcount', [x, y]) }
  static schemesubsets(x: number): CrossFormula { return c('transliteration-schemesubsets', 'schemesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'schemesubsets', [x]) }
  static coverage(x: number, y: number): CrossFormula { return c('transliteration-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
}

for (const name of ['ambiguouschars', 'charpairs', 'coverage', 'diacriticcount', 'mappings', 'reversibility', 'schemeorderings', 'schemesubsets'] as const)
  hexRegisterOf('transliteration', name, (TransliterationFormulas[name] as (...x: unknown[]) => unknown).bind(TransliterationFormulas))
