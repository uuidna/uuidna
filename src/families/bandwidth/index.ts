import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BandwidthFormulas — 8 exact-integer formulas of the bandwidth domain, each at a hex address crossing to cross; develops the bandwidth leads. */

const PROOF = "bandwidth counts: bits(x, y) = x · y; utilization(x, y) = x · 100 / y; duplex(x, y) = x · y; channels(x, y) = x · y; overhead(x, y) = max(0, x − y); goodput(x, y) = x / y; lanes(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'bandwidth', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `bandwidth.${name}`, params })

export class BandwidthFormulas {
  /** bits(x, y) = x · y. */
  static bits(x: number, y: number): CrossFormula { return f('bandwidth-bits', 'bits(x, y) = x · y', x * y, nat(x, y), 'bits', [x, y]) }
  /** utilization(x, y) = x · 100 / y. */
  static utilization(x: number, y: number): CrossFormula { return f('bandwidth-utilization', 'utilization(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'utilization', [x, y]) }
  /** duplex(x, y) = x · y. */
  static duplex(x: number, y: number): CrossFormula { return f('bandwidth-duplex', 'duplex(x, y) = x · y', x * y, nat(x, y), 'duplex', [x, y]) }
  /** channels(x, y) = x · y. */
  static channels(x: number, y: number): CrossFormula { return f('bandwidth-channels', 'channels(x, y) = x · y', x * y, nat(x, y), 'channels', [x, y]) }
  /** overhead(x, y) = max(0, x − y). */
  static overhead(x: number, y: number): CrossFormula { return f('bandwidth-overhead', 'overhead(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'overhead', [x, y]) }
  /** goodput(x, y) = x / y. */
  static goodput(x: number, y: number): CrossFormula { return f('bandwidth-goodput', 'goodput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'goodput', [x, y]) }
  /** lanes(x, y) = x · y. */
  static lanes(x: number, y: number): CrossFormula { return f('bandwidth-lanes', 'lanes(x, y) = x · y', x * y, nat(x, y), 'lanes', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('bandwidth-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['bits', 'channels', 'combos', 'duplex', 'goodput', 'lanes', 'overhead', 'utilization'] as const)
  hexRegisterOf('bandwidth', name, (BandwidthFormulas[name] as (...x: unknown[]) => unknown).bind(BandwidthFormulas))
