import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMBROIDERY — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'embroidery arithmetic (stitchcount, threadcolors, stitchtypes, patternpairs, densitypersqcm, motifsubsets, stitchorderings, coverage); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'embroidery', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `embroidery.${name}`, params })

export class EmbroideryFormulas {
  static stitchcount(x: number, y: number): CrossFormula { return c('embroidery-stitchcount', 'stitchcount(x, y) = x · y', x * y, nat(x, y), 'stitchcount', [x, y]) }
  static threadcolors(x: number, y: number): CrossFormula { return c('embroidery-threadcolors', 'threadcolors(x, y) = x + y', x + y, nat(x, y), 'threadcolors', [x, y]) }
  static stitchtypes(x: number, y: number): CrossFormula { return c('embroidery-stitchtypes', 'stitchtypes(x, y) = x + y', x + y, nat(x, y), 'stitchtypes', [x, y]) }
  static patternpairs(x: number, y: number): CrossFormula { return c('embroidery-patternpairs', 'patternpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'patternpairs', [x, y]) }
  static densitypersqcm(x: number, y: number): CrossFormula { return c('embroidery-densitypersqcm', 'densitypersqcm(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'densitypersqcm', [x, y]) }
  static motifsubsets(x: number): CrossFormula { return c('embroidery-motifsubsets', 'motifsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'motifsubsets', [x]) }
  static stitchorderings(x: number): CrossFormula { return c('embroidery-stitchorderings', 'stitchorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stitchorderings', [x]) }
  static coverage(x: number, y: number): CrossFormula { return c('embroidery-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
}

for (const name of ['coverage', 'densitypersqcm', 'motifsubsets', 'patternpairs', 'stitchcount', 'stitchorderings', 'stitchtypes', 'threadcolors'] as const)
  hexRegisterOf('embroidery', name, (EmbroideryFormulas[name] as (...x: unknown[]) => unknown).bind(EmbroideryFormulas))
