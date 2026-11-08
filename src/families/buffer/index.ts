import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BufferFormulas — 8 exact-integer formulas of the buffer domain, each at a hex address crossing to cross; develops the buffer leads. */

const PROOF = "buffer counts: size(x) = 2^x; slots(x, y) = x / y; watermark(x, y) = x · 100 / y; overflow(x, y) = max(0, x − y); ring(x, y) = x / y; pages(x, y) = ceil(x / y); refills(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'buffer', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `buffer.${name}`, params })

export class BufferFormulas {
  /** size(x) = 2^x. */
  static size(x: number): CrossFormula { return f('buffer-size', 'size(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'size', [x]) }
  /** slots(x, y) = x / y. */
  static slots(x: number, y: number): CrossFormula { return f('buffer-slots', 'slots(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'slots', [x, y]) }
  /** watermark(x, y) = x · 100 / y. */
  static watermark(x: number, y: number): CrossFormula { return f('buffer-watermark', 'watermark(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'watermark', [x, y]) }
  /** overflow(x, y) = max(0, x − y). */
  static overflow(x: number, y: number): CrossFormula { return f('buffer-overflow', 'overflow(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'overflow', [x, y]) }
  /** ring(x, y) = x / y. */
  static ring(x: number, y: number): CrossFormula { return f('buffer-ring', 'ring(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ring', [x, y]) }
  /** pages(x, y) = ceil(x / y). */
  static pages(x: number, y: number): CrossFormula { return f('buffer-pages', 'pages(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'pages', [x, y]) }
  /** refills(x, y) = x / y. */
  static refills(x: number, y: number): CrossFormula { return f('buffer-refills', 'refills(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'refills', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('buffer-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'overflow', 'pages', 'refills', 'ring', 'size', 'slots', 'watermark'] as const)
  hexRegisterOf('buffer', name, (BufferFormulas[name] as (...x: unknown[]) => unknown).bind(BufferFormulas))
