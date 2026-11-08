import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RadarFormulas — 8 exact-integer formulas of the radar domain, each at a hex address crossing to cross; develops the radar leads. */

const PROOF = "radar counts: range(x, y) = x · y; pulses(x, y) = x · y; resolution(x, y) = x / y; sweeps(x, y) = x + y; targets(x, y) = x · y; dwell(x, y) = x / y; channels(x) = 2^x; pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'radar', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `radar.${name}`, params })

export class RadarFormulas {
  /** range(x, y) = x · y. */
  static range(x: number, y: number): CrossFormula { return f('radar-range', 'range(x, y) = x · y', x * y, nat(x, y), 'range', [x, y]) }
  /** pulses(x, y) = x · y. */
  static pulses(x: number, y: number): CrossFormula { return f('radar-pulses', 'pulses(x, y) = x · y', x * y, nat(x, y), 'pulses', [x, y]) }
  /** resolution(x, y) = x / y. */
  static resolution(x: number, y: number): CrossFormula { return f('radar-resolution', 'resolution(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'resolution', [x, y]) }
  /** sweeps(x, y) = x + y. */
  static sweeps(x: number, y: number): CrossFormula { return f('radar-sweeps', 'sweeps(x, y) = x + y', x + y, nat(x, y), 'sweeps', [x, y]) }
  /** targets(x, y) = x · y. */
  static targets(x: number, y: number): CrossFormula { return f('radar-targets', 'targets(x, y) = x · y', x * y, nat(x, y), 'targets', [x, y]) }
  /** dwell(x, y) = x / y. */
  static dwell(x: number, y: number): CrossFormula { return f('radar-dwell', 'dwell(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dwell', [x, y]) }
  /** channels(x) = 2^x. */
  static channels(x: number): CrossFormula { return f('radar-channels', 'channels(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'channels', [x]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('radar-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['channels', 'dwell', 'pairs', 'pulses', 'range', 'resolution', 'sweeps', 'targets'] as const)
  hexRegisterOf('radar', name, (RadarFormulas[name] as (...x: unknown[]) => unknown).bind(RadarFormulas))
