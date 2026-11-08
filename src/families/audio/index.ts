import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AudioFormulas — 8 exact-integer formulas of the audio domain, each at a hex address crossing to cross; develops the audio leads. */

const PROOF = "audio counts: samples(x, y) = x · y; streambytes(x, y, z) = x · y · z; bitrate(x, y) = x · y; frames(x, y) = x / y; channels(x, y) = x + y; duration(x, y) = x / y; bitdepth(x, y) = x · y; blocks(x, y) = ceil(x / y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'audio', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `audio.${name}`, params })

export class AudioFormulas {
  /** samples(x, y) = x · y. */
  static samples(x: number, y: number): CrossFormula { return f('audio-samples', 'samples(x, y) = x · y', x * y, nat(x, y), 'samples', [x, y]) }
  /** streambytes(x, y, z) = x · y · z. */
  static streambytes(x: number, y: number, z: number): CrossFormula { return f('audio-streambytes', 'streambytes(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'streambytes', [x, y, z]) }
  /** bitrate(x, y) = x · y. */
  static bitrate(x: number, y: number): CrossFormula { return f('audio-bitrate', 'bitrate(x, y) = x · y', x * y, nat(x, y), 'bitrate', [x, y]) }
  /** frames(x, y) = x / y. */
  static frames(x: number, y: number): CrossFormula { return f('audio-frames', 'frames(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frames', [x, y]) }
  /** channels(x, y) = x + y. */
  static channels(x: number, y: number): CrossFormula { return f('audio-channels', 'channels(x, y) = x + y', x + y, nat(x, y), 'channels', [x, y]) }
  /** duration(x, y) = x / y. */
  static duration(x: number, y: number): CrossFormula { return f('audio-duration', 'duration(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'duration', [x, y]) }
  /** bitdepth(x, y) = x · y. */
  static bitdepth(x: number, y: number): CrossFormula { return f('audio-bitdepth', 'bitdepth(x, y) = x · y', x * y, nat(x, y), 'bitdepth', [x, y]) }
  /** blocks(x, y) = ceil(x / y). */
  static blocks(x: number, y: number): CrossFormula { return f('audio-blocks', 'blocks(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'blocks', [x, y]) }
}

for (const name of ['bitdepth', 'bitrate', 'blocks', 'channels', 'duration', 'frames', 'samples', 'streambytes'] as const)
  hexRegisterOf('audio', name, (AudioFormulas[name] as (...x: unknown[]) => unknown).bind(AudioFormulas))
