import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SYLLABARY — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'syllabary arithmetic (syllables, cvcombos, consonants, vowels, gridcells, orderingchoices, charsubsets, coverage); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'syllabary', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `syllabary.${name}`, params })

export class SyllabaryFormulas {
  static syllables(x: number, y: number): CrossFormula { return c('syllabary-syllables', 'syllables(x, y) = x · y', x * y, nat(x, y), 'syllables', [x, y]) }
  static cvcombos(x: number, y: number): CrossFormula { return c('syllabary-cvcombos', 'cvcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'cvcombos', [x, y]) }
  static consonants(x: number, y: number): CrossFormula { return c('syllabary-consonants', 'consonants(x, y) = x + y', x + y, nat(x, y), 'consonants', [x, y]) }
  static vowels(x: number, y: number): CrossFormula { return c('syllabary-vowels', 'vowels(x, y) = x + y', x + y, nat(x, y), 'vowels', [x, y]) }
  static gridcells(x: number, y: number): CrossFormula { return c('syllabary-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  static orderingchoices(x: number): CrossFormula { return c('syllabary-orderingchoices', 'orderingchoices(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'orderingchoices', [x]) }
  static charsubsets(x: number): CrossFormula { return c('syllabary-charsubsets', 'charsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'charsubsets', [x]) }
  static coverage(x: number, y: number): CrossFormula { return c('syllabary-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
}

for (const name of ['charsubsets', 'consonants', 'coverage', 'cvcombos', 'gridcells', 'orderingchoices', 'syllables', 'vowels'] as const)
  hexRegisterOf('syllabary', name, (SyllabaryFormulas[name] as (...x: unknown[]) => unknown).bind(SyllabaryFormulas))
