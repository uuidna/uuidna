import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TextFormulas — 8 exact-integer formulas of the text domain, each at a hex address crossing to cross; develops the text leads. */

const PROOF = "text counts: bytes(x, y) = x · y; words(x, y) = x / y; base64(x, y) = ceil(x / y); lines(x, y) = x / y; tokens(x, y) = x / y; entropybits(x, y) = x · y; chunks(x, y) = ceil(x / y); pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'text', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `text.${name}`, params })

export class TextFormulas {
  /** bytes(x, y) = x · y. */
  static bytes(x: number, y: number): CrossFormula { return f('text-bytes', 'bytes(x, y) = x · y', x * y, nat(x, y), 'bytes', [x, y]) }
  /** words(x, y) = x / y. */
  static words(x: number, y: number): CrossFormula { return f('text-words', 'words(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'words', [x, y]) }
  /** base64(x, y) = ceil(x / y). */
  static base64(x: number, y: number): CrossFormula { return f('text-base64', 'base64(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'base64', [x, y]) }
  /** lines(x, y) = x / y. */
  static lines(x: number, y: number): CrossFormula { return f('text-lines', 'lines(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lines', [x, y]) }
  /** tokens(x, y) = x / y. */
  static tokens(x: number, y: number): CrossFormula { return f('text-tokens', 'tokens(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'tokens', [x, y]) }
  /** entropybits(x, y) = x · y. */
  static entropybits(x: number, y: number): CrossFormula { return f('text-entropybits', 'entropybits(x, y) = x · y', x * y, nat(x, y), 'entropybits', [x, y]) }
  /** chunks(x, y) = ceil(x / y). */
  static chunks(x: number, y: number): CrossFormula { return f('text-chunks', 'chunks(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'chunks', [x, y]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('text-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['base64', 'bytes', 'chunks', 'entropybits', 'lines', 'pairs', 'tokens', 'words'] as const)
  hexRegisterOf('text', name, (TextFormulas[name] as (...x: unknown[]) => unknown).bind(TextFormulas))
