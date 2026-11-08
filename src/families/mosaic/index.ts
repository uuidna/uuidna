import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MOSAIC — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'mosaic arithmetic (tilecount, tessellationangle, groutratio, colorcombos, symmetryorderings, gridcells, tilesubsets, coverage); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mosaic', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `mosaic.${name}`, params })

export class MosaicFormulas {
  static tilecount(x: number, y: number): CrossFormula { return c('mosaic-tilecount', 'tilecount(x, y) = x · y', x * y, nat(x, y), 'tilecount', [x, y]) }
  static tessellationangle(x: number, y: number): CrossFormula { return c('mosaic-tessellationangle', 'tessellationangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'tessellationangle', [x, y]) }
  static groutratio(x: number, y: number): CrossFormula { return c('mosaic-groutratio', 'groutratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'groutratio', [x, y]) }
  static colorcombos(x: number, y: number): CrossFormula { return c('mosaic-colorcombos', 'colorcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'colorcombos', [x, y]) }
  static symmetryorderings(x: number): CrossFormula { return c('mosaic-symmetryorderings', 'symmetryorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'symmetryorderings', [x]) }
  static gridcells(x: number, y: number): CrossFormula { return c('mosaic-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  static tilesubsets(x: number): CrossFormula { return c('mosaic-tilesubsets', 'tilesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tilesubsets', [x]) }
  static coverage(x: number, y: number): CrossFormula { return c('mosaic-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
}

for (const name of ['colorcombos', 'coverage', 'gridcells', 'groutratio', 'symmetryorderings', 'tessellationangle', 'tilecount', 'tilesubsets'] as const)
  hexRegisterOf('mosaic', name, (MosaicFormulas[name] as (...x: unknown[]) => unknown).bind(MosaicFormulas))
