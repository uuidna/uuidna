import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SHORTHAND — scaffolded integer measures crossed to signal. Every output an exact finite nonnegative integer. */

const PROOF = 'shorthand arithmetic (strokesperword, compression, symbolcount, speedwpm, abbreviationsubsets, strokesaved, outlinepairs, legibilityratio); scaffolded from the integer-op palette; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'shorthand', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `shorthand.${name}`, params })

export class ShorthandFormulas {
  static strokesperword(x: number, y: number): CrossFormula { return c('shorthand-strokesperword', 'strokesperword(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'strokesperword', [x, y]) }
  static compression(x: number, y: number): CrossFormula { return c('shorthand-compression', 'compression(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'compression', [x, y]) }
  static symbolcount(x: number, y: number): CrossFormula { return c('shorthand-symbolcount', 'symbolcount(x, y) = x · y', x * y, nat(x, y), 'symbolcount', [x, y]) }
  static speedwpm(x: number, y: number): CrossFormula { return c('shorthand-speedwpm', 'speedwpm(x, y) = x · y', x * y, nat(x, y), 'speedwpm', [x, y]) }
  static abbreviationsubsets(x: number): CrossFormula { return c('shorthand-abbreviationsubsets', 'abbreviationsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'abbreviationsubsets', [x]) }
  static strokesaved(x: number, y: number): CrossFormula { return c('shorthand-strokesaved', 'strokesaved(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'strokesaved', [x, y]) }
  static outlinepairs(x: number, y: number): CrossFormula { return c('shorthand-outlinepairs', 'outlinepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'outlinepairs', [x, y]) }
  static legibilityratio(x: number, y: number): CrossFormula { return c('shorthand-legibilityratio', 'legibilityratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'legibilityratio', [x, y]) }
}

for (const name of ['abbreviationsubsets', 'compression', 'legibilityratio', 'outlinepairs', 'speedwpm', 'strokesaved', 'strokesperword', 'symbolcount'] as const)
  hexRegisterOf('shorthand', name, (ShorthandFormulas[name] as (...x: unknown[]) => unknown).bind(ShorthandFormulas))
