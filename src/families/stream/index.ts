import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** StreamFormulas — 8 exact-integer formulas of the stream domain, each at a hex address crossing to cross; develops the stream leads. */

const PROOF = "stream counts: chunks(x, y) = ceil(x / y); buffers(x, y) = x · y; throughput(x, y) = x / y; windows(x, y) = x · y; backpressure(x, y) = x · 100 / y; segments(x, y) = x / y; pipes(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'stream', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `stream.${name}`, params })

export class StreamFormulas {
  /** chunks(x, y) = ceil(x / y). */
  static chunks(x: number, y: number): CrossFormula { return f('stream-chunks', 'chunks(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'chunks', [x, y]) }
  /** buffers(x, y) = x · y. */
  static buffers(x: number, y: number): CrossFormula { return f('stream-buffers', 'buffers(x, y) = x · y', x * y, nat(x, y), 'buffers', [x, y]) }
  /** throughput(x, y) = x / y. */
  static throughput(x: number, y: number): CrossFormula { return f('stream-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  /** windows(x, y) = x · y. */
  static windows(x: number, y: number): CrossFormula { return f('stream-windows', 'windows(x, y) = x · y', x * y, nat(x, y), 'windows', [x, y]) }
  /** backpressure(x, y) = x · 100 / y. */
  static backpressure(x: number, y: number): CrossFormula { return f('stream-backpressure', 'backpressure(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'backpressure', [x, y]) }
  /** segments(x, y) = x / y. */
  static segments(x: number, y: number): CrossFormula { return f('stream-segments', 'segments(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'segments', [x, y]) }
  /** pipes(x, y) = x + y. */
  static pipes(x: number, y: number): CrossFormula { return f('stream-pipes', 'pipes(x, y) = x + y', x + y, nat(x, y), 'pipes', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('stream-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['backpressure', 'buffers', 'chunks', 'combos', 'pipes', 'segments', 'throughput', 'windows'] as const)
  hexRegisterOf('stream', name, (StreamFormulas[name] as (...x: unknown[]) => unknown).bind(StreamFormulas))
