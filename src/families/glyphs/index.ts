import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GLYPHS — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'glyphs arithmetic (count, strokeorderings, radicalcombos, unicodeplanes, componentsubsets, strokesperglyph, variantcount, rendercoverage); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'glyphs', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `glyphs.${name}`, params })

export class GlyphsFormulas {
  static count(x: number, y: number): CrossFormula { return c('glyphs-count', 'count(x, y) = x · y', x * y, nat(x, y), 'count', [x, y]) }
  static strokeorderings(x: number): CrossFormula { return c('glyphs-strokeorderings', 'strokeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'strokeorderings', [x]) }
  static radicalcombos(x: number, y: number): CrossFormula { return c('glyphs-radicalcombos', 'radicalcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'radicalcombos', [x, y]) }
  static unicodeplanes(x: number, y: number): CrossFormula { return c('glyphs-unicodeplanes', 'unicodeplanes(x, y) = x + y', x + y, nat(x, y), 'unicodeplanes', [x, y]) }
  static componentsubsets(x: number): CrossFormula { return c('glyphs-componentsubsets', 'componentsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'componentsubsets', [x]) }
  static strokesperglyph(x: number, y: number): CrossFormula { return c('glyphs-strokesperglyph', 'strokesperglyph(x, y) = x + y', x + y, nat(x, y), 'strokesperglyph', [x, y]) }
  static variantcount(x: number, y: number): CrossFormula { return c('glyphs-variantcount', 'variantcount(x, y) = x · y', x * y, nat(x, y), 'variantcount', [x, y]) }
  static rendercoverage(x: number, y: number): CrossFormula { return c('glyphs-rendercoverage', 'rendercoverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'rendercoverage', [x, y]) }
}

for (const name of ['componentsubsets', 'count', 'radicalcombos', 'rendercoverage', 'strokeorderings', 'strokesperglyph', 'unicodeplanes', 'variantcount'] as const)
  hexRegisterOf('glyphs', name, (GlyphsFormulas[name] as (...x: unknown[]) => unknown).bind(GlyphsFormulas))
