import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HIEROGLYPHS — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'hieroglyphs arithmetic (signs, determinatives, cartouchepairs, phonemsigns, categorysubsets, readingorderings, biliterals, decipheredratio); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hieroglyphs', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `hieroglyphs.${name}`, params })

export class HieroglyphsFormulas {
  static signs(x: number, y: number): CrossFormula { return c('hieroglyphs-signs', 'signs(x, y) = x · y', x * y, nat(x, y), 'signs', [x, y]) }
  static determinatives(x: number, y: number): CrossFormula { return c('hieroglyphs-determinatives', 'determinatives(x, y) = x + y', x + y, nat(x, y), 'determinatives', [x, y]) }
  static cartouchepairs(x: number, y: number): CrossFormula { return c('hieroglyphs-cartouchepairs', 'cartouchepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'cartouchepairs', [x, y]) }
  static phonemsigns(x: number, y: number): CrossFormula { return c('hieroglyphs-phonemsigns', 'phonemsigns(x, y) = x + y', x + y, nat(x, y), 'phonemsigns', [x, y]) }
  static categorysubsets(x: number): CrossFormula { return c('hieroglyphs-categorysubsets', 'categorysubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'categorysubsets', [x]) }
  static readingorderings(x: number): CrossFormula { return c('hieroglyphs-readingorderings', 'readingorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'readingorderings', [x]) }
  static biliterals(x: number, y: number): CrossFormula { return c('hieroglyphs-biliterals', 'biliterals(x, y) = x + y', x + y, nat(x, y), 'biliterals', [x, y]) }
  static decipheredratio(x: number, y: number): CrossFormula { return c('hieroglyphs-decipheredratio', 'decipheredratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'decipheredratio', [x, y]) }
}

for (const name of ['biliterals', 'cartouchepairs', 'categorysubsets', 'decipheredratio', 'determinatives', 'phonemsigns', 'readingorderings', 'signs'] as const)
  hexRegisterOf('hieroglyphs', name, (HieroglyphsFormulas[name] as (...x: unknown[]) => unknown).bind(HieroglyphsFormulas))
