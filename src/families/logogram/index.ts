import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOGOGRAM — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'logogram arithmetic (symbols, compoundpairs, radicals, strokeorderings, semanticsubsets, readingsper, frequencyrank, literacyratio); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'logogram', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `logogram.${name}`, params })

export class LogogramFormulas {
  static symbols(x: number, y: number): CrossFormula { return c('logogram-symbols', 'symbols(x, y) = x · y', x * y, nat(x, y), 'symbols', [x, y]) }
  static compoundpairs(x: number, y: number): CrossFormula { return c('logogram-compoundpairs', 'compoundpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'compoundpairs', [x, y]) }
  static radicals(x: number, y: number): CrossFormula { return c('logogram-radicals', 'radicals(x, y) = x + y', x + y, nat(x, y), 'radicals', [x, y]) }
  static strokeorderings(x: number): CrossFormula { return c('logogram-strokeorderings', 'strokeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'strokeorderings', [x]) }
  static semanticsubsets(x: number): CrossFormula { return c('logogram-semanticsubsets', 'semanticsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'semanticsubsets', [x]) }
  static readingsper(x: number, y: number): CrossFormula { return c('logogram-readingsper', 'readingsper(x, y) = x + y', x + y, nat(x, y), 'readingsper', [x, y]) }
  static frequencyrank(x: number, y: number): CrossFormula { return c('logogram-frequencyrank', 'frequencyrank(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frequencyrank', [x, y]) }
  static literacyratio(x: number, y: number): CrossFormula { return c('logogram-literacyratio', 'literacyratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'literacyratio', [x, y]) }
}

for (const name of ['compoundpairs', 'frequencyrank', 'literacyratio', 'radicals', 'readingsper', 'semanticsubsets', 'strokeorderings', 'symbols'] as const)
  hexRegisterOf('logogram', name, (LogogramFormulas[name] as (...x: unknown[]) => unknown).bind(LogogramFormulas))
