import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CALLIGRAPHY — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'calligraphy arithmetic (strokecount, penangle, xheight, letterspacing, strokeorderings, flourishsubsets, glyphpairs, slantdegree); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'calligraphy', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `calligraphy.${name}`, params })

export class CalligraphyFormulas {
  static strokecount(x: number, y: number): CrossFormula { return c('calligraphy-strokecount', 'strokecount(x, y) = x + y', x + y, nat(x, y), 'strokecount', [x, y]) }
  static penangle(x: number, y: number): CrossFormula { return c('calligraphy-penangle', 'penangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'penangle', [x, y]) }
  static xheight(x: number, y: number): CrossFormula { return c('calligraphy-xheight', 'xheight(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'xheight', [x, y]) }
  static letterspacing(x: number, y: number): CrossFormula { return c('calligraphy-letterspacing', 'letterspacing(x, y) = x · y', x * y, nat(x, y), 'letterspacing', [x, y]) }
  static strokeorderings(x: number): CrossFormula { return c('calligraphy-strokeorderings', 'strokeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'strokeorderings', [x]) }
  static flourishsubsets(x: number): CrossFormula { return c('calligraphy-flourishsubsets', 'flourishsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'flourishsubsets', [x]) }
  static glyphpairs(x: number, y: number): CrossFormula { return c('calligraphy-glyphpairs', 'glyphpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'glyphpairs', [x, y]) }
  static slantdegree(x: number, y: number): CrossFormula { return c('calligraphy-slantdegree', 'slantdegree(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'slantdegree', [x, y]) }
}

for (const name of ['flourishsubsets', 'glyphpairs', 'letterspacing', 'penangle', 'slantdegree', 'strokecount', 'strokeorderings', 'xheight'] as const)
  hexRegisterOf('calligraphy', name, (CalligraphyFormulas[name] as (...x: unknown[]) => unknown).bind(CalligraphyFormulas))
