import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCRIPTURE — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'scripture arithmetic (wordtotal, versesperchapter, chaptersperbook, lexicaltypes, concordancepairs, translationways, crossreferences, readingplan); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'scripture', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `scripture.${name}`, params })

export class ScriptureFormulas {
  static wordtotal(x: number, y: number): CrossFormula { return c('scripture-wordtotal', 'wordtotal(x, y) = x · y', x * y, nat(x, y), 'wordtotal', [x, y]) }
  static versesperchapter(x: number, y: number): CrossFormula { return c('scripture-versesperchapter', 'versesperchapter(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'versesperchapter', [x, y]) }
  static chaptersperbook(x: number, y: number): CrossFormula { return c('scripture-chaptersperbook', 'chaptersperbook(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'chaptersperbook', [x, y]) }
  static lexicaltypes(x: number, y: number): CrossFormula { return c('scripture-lexicaltypes', 'lexicaltypes(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lexicaltypes', [x, y]) }
  static concordancepairs(x: number, y: number): CrossFormula { return c('scripture-concordancepairs', 'concordancepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'concordancepairs', [x, y]) }
  static translationways(x: number): CrossFormula { return c('scripture-translationways', 'translationways(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'translationways', [x]) }
  static crossreferences(x: number, y: number): CrossFormula { return c('scripture-crossreferences', 'crossreferences(x, y) = x · y', x * y, nat(x, y), 'crossreferences', [x, y]) }
  static readingplan(x: number, y: number): CrossFormula { return c('scripture-readingplan', 'readingplan(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'readingplan', [x, y]) }
}

for (const name of ['chaptersperbook', 'concordancepairs', 'crossreferences', 'lexicaltypes', 'readingplan', 'translationways', 'versesperchapter', 'wordtotal'] as const)
  hexRegisterOf('scripture', name, (ScriptureFormulas[name] as (...x: unknown[]) => unknown).bind(ScriptureFormulas))
