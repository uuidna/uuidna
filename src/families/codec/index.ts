import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CodecFormulas — 8 exact-integer formulas of the codec domain, each at a hex address crossing to cross; develops the codec leads. */

const PROOF = "codec counts: bitrate(x, y) = x · y; frames(x, y) = x / y; ratio(x, y) = x / y; channels(x, y) = x + y; blocksize(x) = 2^x; samples(x, y) = x · y; latency(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'codec', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `codec.${name}`, params })

export class CodecFormulas {
  /** bitrate(x, y) = x · y. */
  static bitrate(x: number, y: number): CrossFormula { return f('codec-bitrate', 'bitrate(x, y) = x · y', x * y, nat(x, y), 'bitrate', [x, y]) }
  /** frames(x, y) = x / y. */
  static frames(x: number, y: number): CrossFormula { return f('codec-frames', 'frames(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frames', [x, y]) }
  /** ratio(x, y) = x / y. */
  static ratio(x: number, y: number): CrossFormula { return f('codec-ratio', 'ratio(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  /** channels(x, y) = x + y. */
  static channels(x: number, y: number): CrossFormula { return f('codec-channels', 'channels(x, y) = x + y', x + y, nat(x, y), 'channels', [x, y]) }
  /** blocksize(x) = 2^x. */
  static blocksize(x: number): CrossFormula { return f('codec-blocksize', 'blocksize(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'blocksize', [x]) }
  /** samples(x, y) = x · y. */
  static samples(x: number, y: number): CrossFormula { return f('codec-samples', 'samples(x, y) = x · y', x * y, nat(x, y), 'samples', [x, y]) }
  /** latency(x, y) = x / y. */
  static latency(x: number, y: number): CrossFormula { return f('codec-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'latency', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('codec-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['bitrate', 'blocksize', 'channels', 'combos', 'frames', 'latency', 'ratio', 'samples'] as const)
  hexRegisterOf('codec', name, (CodecFormulas[name] as (...x: unknown[]) => unknown).bind(CodecFormulas))
