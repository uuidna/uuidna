import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSALMODY — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'psalmody arithmetic (psalmcount, versesum, acrosticletters, toneorderings, parallelismpairs, antiphonchoices, meterfeet, strophesubsets); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psalmody', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `psalmody.${name}`, params })

export class PsalmodyFormulas {
  static psalmcount(x: number, y: number): CrossFormula { return c('psalmody-psalmcount', 'psalmcount(x, y) = x + y', x + y, nat(x, y), 'psalmcount', [x, y]) }
  static versesum(x: number, y: number): CrossFormula { return c('psalmody-versesum', 'versesum(x, y) = x · y', x * y, nat(x, y), 'versesum', [x, y]) }
  static acrosticletters(x: number, y: number): CrossFormula { return c('psalmody-acrosticletters', 'acrosticletters(x, y) = x + y', x + y, nat(x, y), 'acrosticletters', [x, y]) }
  static toneorderings(x: number): CrossFormula { return c('psalmody-toneorderings', 'toneorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'toneorderings', [x]) }
  static parallelismpairs(x: number, y: number): CrossFormula { return c('psalmody-parallelismpairs', 'parallelismpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'parallelismpairs', [x, y]) }
  static antiphonchoices(x: number, y: number): CrossFormula { return c('psalmody-antiphonchoices', 'antiphonchoices(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'antiphonchoices', [x, y]) }
  static meterfeet(x: number, y: number): CrossFormula { return c('psalmody-meterfeet', 'meterfeet(x, y) = x · y', x * y, nat(x, y), 'meterfeet', [x, y]) }
  static strophesubsets(x: number): CrossFormula { return c('psalmody-strophesubsets', 'strophesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'strophesubsets', [x]) }
}

for (const name of ['acrosticletters', 'antiphonchoices', 'meterfeet', 'parallelismpairs', 'psalmcount', 'strophesubsets', 'toneorderings', 'versesum'] as const)
  hexRegisterOf('psalmody', name, (PsalmodyFormulas[name] as (...x: unknown[]) => unknown).bind(PsalmodyFormulas))
