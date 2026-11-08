import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ColorFormulas — 8 exact-integer formulas of the color domain, each at a hex address crossing to cross; develops the color leads. */

const PROOF = "color counts: channels(x, y) = x + y; depth(x, y) = x · y; palette(x) = 2^x; levels(x) = 2^x; hexdigits(x, y) = x · y; gradient(x, y) = x + y; contrast(x, y) = max(0, x − y); pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'color', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `color.${name}`, params })

export class ColorFormulas {
  /** channels(x, y) = x + y. */
  static channels(x: number, y: number): CrossFormula { return f('color-channels', 'channels(x, y) = x + y', x + y, nat(x, y), 'channels', [x, y]) }
  /** depth(x, y) = x · y. */
  static depth(x: number, y: number): CrossFormula { return f('color-depth', 'depth(x, y) = x · y', x * y, nat(x, y), 'depth', [x, y]) }
  /** palette(x) = 2^x. */
  static palette(x: number): CrossFormula { return f('color-palette', 'palette(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'palette', [x]) }
  /** levels(x) = 2^x. */
  static levels(x: number): CrossFormula { return f('color-levels', 'levels(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'levels', [x]) }
  /** hexdigits(x, y) = x · y. */
  static hexdigits(x: number, y: number): CrossFormula { return f('color-hexdigits', 'hexdigits(x, y) = x · y', x * y, nat(x, y), 'hexdigits', [x, y]) }
  /** gradient(x, y) = x + y. */
  static gradient(x: number, y: number): CrossFormula { return f('color-gradient', 'gradient(x, y) = x + y', x + y, nat(x, y), 'gradient', [x, y]) }
  /** contrast(x, y) = max(0, x − y). */
  static contrast(x: number, y: number): CrossFormula { return f('color-contrast', 'contrast(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'contrast', [x, y]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('color-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['channels', 'contrast', 'depth', 'gradient', 'hexdigits', 'levels', 'pairs', 'palette'] as const)
  hexRegisterOf('color', name, (ColorFormulas[name] as (...x: unknown[]) => unknown).bind(ColorFormulas))
