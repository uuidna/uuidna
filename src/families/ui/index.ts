import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** UI — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'ui arithmetic (clickdepth, layoutcombos, elementcount, responsiveness, navpaths, gridcells, colorsubsets, accessibilityscore); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ui', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `ui.${name}`, params })

export class UiFormulas {
  static clickdepth(x: number, y: number): CrossFormula { return c('ui-clickdepth', 'clickdepth(x, y) = x + y', x + y, nat(x, y), 'clickdepth', [x, y]) }
  static layoutcombos(x: number, y: number): CrossFormula { return c('ui-layoutcombos', 'layoutcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'layoutcombos', [x, y]) }
  static elementcount(x: number, y: number): CrossFormula { return c('ui-elementcount', 'elementcount(x, y) = x · y', x * y, nat(x, y), 'elementcount', [x, y]) }
  static responsiveness(x: number, y: number): CrossFormula { return c('ui-responsiveness', 'responsiveness(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'responsiveness', [x, y]) }
  static navpaths(x: number, y: number): CrossFormula { return c('ui-navpaths', 'navpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'navpaths', [x, y]) }
  static gridcells(x: number, y: number): CrossFormula { return c('ui-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  static colorsubsets(x: number): CrossFormula { return c('ui-colorsubsets', 'colorsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'colorsubsets', [x]) }
  static accessibilityscore(x: number, y: number): CrossFormula { return c('ui-accessibilityscore', 'accessibilityscore(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'accessibilityscore', [x, y]) }
}

for (const name of ['accessibilityscore', 'clickdepth', 'colorsubsets', 'elementcount', 'gridcells', 'layoutcombos', 'navpaths', 'responsiveness'] as const)
  hexRegisterOf('ui', name, (UiFormulas[name] as (...x: unknown[]) => unknown).bind(UiFormulas))
