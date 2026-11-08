import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TelescopeFormulas — 8 exact-integer formulas of the telescope domain, each at a hex address crossing to cross; develops the telescope leads. */

const PROOF = "telescope counts: aperture(x, y) = x · y; magnification(x, y) = x / y; focalratio(x, y) = x / y; resolution(x, y) = x / y; lightgrasp(x, y) = x · y; mirrors(x, y) = x + y; fieldofview(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'telescope', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `telescope.${name}`, params })

export class TelescopeFormulas {
  /** aperture(x, y) = x · y. */
  static aperture(x: number, y: number): CrossFormula { return f('telescope-aperture', 'aperture(x, y) = x · y', x * y, nat(x, y), 'aperture', [x, y]) }
  /** magnification(x, y) = x / y. */
  static magnification(x: number, y: number): CrossFormula { return f('telescope-magnification', 'magnification(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'magnification', [x, y]) }
  /** focalratio(x, y) = x / y. */
  static focalratio(x: number, y: number): CrossFormula { return f('telescope-focalratio', 'focalratio(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'focalratio', [x, y]) }
  /** resolution(x, y) = x / y. */
  static resolution(x: number, y: number): CrossFormula { return f('telescope-resolution', 'resolution(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'resolution', [x, y]) }
  /** lightgrasp(x, y) = x · y. */
  static lightgrasp(x: number, y: number): CrossFormula { return f('telescope-lightgrasp', 'lightgrasp(x, y) = x · y', x * y, nat(x, y), 'lightgrasp', [x, y]) }
  /** mirrors(x, y) = x + y. */
  static mirrors(x: number, y: number): CrossFormula { return f('telescope-mirrors', 'mirrors(x, y) = x + y', x + y, nat(x, y), 'mirrors', [x, y]) }
  /** fieldofview(x, y) = x / y. */
  static fieldofview(x: number, y: number): CrossFormula { return f('telescope-fieldofview', 'fieldofview(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'fieldofview', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('telescope-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['aperture', 'combos', 'fieldofview', 'focalratio', 'lightgrasp', 'magnification', 'mirrors', 'resolution'] as const)
  hexRegisterOf('telescope', name, (TelescopeFormulas[name] as (...x: unknown[]) => unknown).bind(TelescopeFormulas))
