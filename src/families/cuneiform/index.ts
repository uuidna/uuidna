import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CUNEIFORM — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'cuneiform arithmetic (signs, wedgesper, signpairs, periodcount, tabletsubsets, strokeorderings, logovalues, attestationratio); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cuneiform', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `cuneiform.${name}`, params })

export class CuneiformFormulas {
  static signs(x: number, y: number): CrossFormula { return c('cuneiform-signs', 'signs(x, y) = x · y', x * y, nat(x, y), 'signs', [x, y]) }
  static wedgesper(x: number, y: number): CrossFormula { return c('cuneiform-wedgesper', 'wedgesper(x, y) = x + y', x + y, nat(x, y), 'wedgesper', [x, y]) }
  static signpairs(x: number, y: number): CrossFormula { return c('cuneiform-signpairs', 'signpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'signpairs', [x, y]) }
  static periodcount(x: number, y: number): CrossFormula { return c('cuneiform-periodcount', 'periodcount(x, y) = x + y', x + y, nat(x, y), 'periodcount', [x, y]) }
  static tabletsubsets(x: number): CrossFormula { return c('cuneiform-tabletsubsets', 'tabletsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tabletsubsets', [x]) }
  static strokeorderings(x: number): CrossFormula { return c('cuneiform-strokeorderings', 'strokeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'strokeorderings', [x]) }
  static logovalues(x: number, y: number): CrossFormula { return c('cuneiform-logovalues', 'logovalues(x, y) = x + y', x + y, nat(x, y), 'logovalues', [x, y]) }
  static attestationratio(x: number, y: number): CrossFormula { return c('cuneiform-attestationratio', 'attestationratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'attestationratio', [x, y]) }
}

for (const name of ['attestationratio', 'logovalues', 'periodcount', 'signpairs', 'signs', 'strokeorderings', 'tabletsubsets', 'wedgesper'] as const)
  hexRegisterOf('cuneiform', name, (CuneiformFormulas[name] as (...x: unknown[]) => unknown).bind(CuneiformFormulas))
