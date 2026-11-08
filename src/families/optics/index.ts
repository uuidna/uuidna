import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OpticsFormulas — 8 exact-integer formulas of the optics domain, each at a hex address crossing to cross; develops the optics leads. */

const PROOF = "optics counts: magnify(x, y) = x · y; fnumber(x, y) = x / y; dpi(x, y) = x / y; megapixels(x, y) = x · y; resolution(x, y) = x · y; aperturesteps(x) = 2^x; fov(x, y) = max(0, x − y); elements(x, y) = x + y"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'optics', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `optics.${name}`, params })

export class OpticsFormulas {
  /** magnify(x, y) = x · y. */
  static magnify(x: number, y: number): CrossFormula { return f('optics-magnify', 'magnify(x, y) = x · y', x * y, nat(x, y), 'magnify', [x, y]) }
  /** fnumber(x, y) = x / y. */
  static fnumber(x: number, y: number): CrossFormula { return f('optics-fnumber', 'fnumber(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'fnumber', [x, y]) }
  /** dpi(x, y) = x / y. */
  static dpi(x: number, y: number): CrossFormula { return f('optics-dpi', 'dpi(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dpi', [x, y]) }
  /** megapixels(x, y) = x · y. */
  static megapixels(x: number, y: number): CrossFormula { return f('optics-megapixels', 'megapixels(x, y) = x · y', x * y, nat(x, y), 'megapixels', [x, y]) }
  /** resolution(x, y) = x · y. */
  static resolution(x: number, y: number): CrossFormula { return f('optics-resolution', 'resolution(x, y) = x · y', x * y, nat(x, y), 'resolution', [x, y]) }
  /** aperturesteps(x) = 2^x. */
  static aperturesteps(x: number): CrossFormula { return f('optics-aperturesteps', 'aperturesteps(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'aperturesteps', [x]) }
  /** fov(x, y) = max(0, x − y). */
  static fov(x: number, y: number): CrossFormula { return f('optics-fov', 'fov(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'fov', [x, y]) }
  /** elements(x, y) = x + y. */
  static elements(x: number, y: number): CrossFormula { return f('optics-elements', 'elements(x, y) = x + y', x + y, nat(x, y), 'elements', [x, y]) }
}

for (const name of ['aperturesteps', 'dpi', 'elements', 'fnumber', 'fov', 'magnify', 'megapixels', 'resolution'] as const)
  hexRegisterOf('optics', name, (OpticsFormulas[name] as (...x: unknown[]) => unknown).bind(OpticsFormulas))
