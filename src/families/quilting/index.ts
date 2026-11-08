import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QUILTING — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'quilting arithmetic (blockcount, patchpairs, seamlength, patternorderings, colorsubsets, gridcells, borderwidth, symmetryratio); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'quilting', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `quilting.${name}`, params })

export class QuiltingFormulas {
  static blockcount(x: number, y: number): CrossFormula { return c('quilting-blockcount', 'blockcount(x, y) = x · y', x * y, nat(x, y), 'blockcount', [x, y]) }
  static patchpairs(x: number, y: number): CrossFormula { return c('quilting-patchpairs', 'patchpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'patchpairs', [x, y]) }
  static seamlength(x: number, y: number): CrossFormula { return c('quilting-seamlength', 'seamlength(x, y) = x · y', x * y, nat(x, y), 'seamlength', [x, y]) }
  static patternorderings(x: number): CrossFormula { return c('quilting-patternorderings', 'patternorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'patternorderings', [x]) }
  static colorsubsets(x: number): CrossFormula { return c('quilting-colorsubsets', 'colorsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'colorsubsets', [x]) }
  static gridcells(x: number, y: number): CrossFormula { return c('quilting-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  static borderwidth(x: number, y: number): CrossFormula { return c('quilting-borderwidth', 'borderwidth(x, y) = x + y', x + y, nat(x, y), 'borderwidth', [x, y]) }
  static symmetryratio(x: number, y: number): CrossFormula { return c('quilting-symmetryratio', 'symmetryratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'symmetryratio', [x, y]) }
}

for (const name of ['blockcount', 'borderwidth', 'colorsubsets', 'gridcells', 'patchpairs', 'patternorderings', 'seamlength', 'symmetryratio'] as const)
  hexRegisterOf('quilting', name, (QuiltingFormulas[name] as (...x: unknown[]) => unknown).bind(QuiltingFormulas))
