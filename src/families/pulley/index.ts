import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PulleyFormulas — 8 exact-integer formulas of the pulley domain, each at a hex address crossing to cross; develops the pulley leads. */

const PROOF = "pulley counts: ratio(x, y) = x / y; effort(x, y) = x / y; wheels(x, y) = x + y; load(x, y) = x · y; segments(x, y) = x · y; advantage(x, y) = x / y; tension(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'pulley', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `pulley.${name}`, params })

export class PulleyFormulas {
  /** ratio(x, y) = x / y. */
  static ratio(x: number, y: number): CrossFormula { return f('pulley-ratio', 'ratio(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  /** effort(x, y) = x / y. */
  static effort(x: number, y: number): CrossFormula { return f('pulley-effort', 'effort(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'effort', [x, y]) }
  /** wheels(x, y) = x + y. */
  static wheels(x: number, y: number): CrossFormula { return f('pulley-wheels', 'wheels(x, y) = x + y', x + y, nat(x, y), 'wheels', [x, y]) }
  /** load(x, y) = x · y. */
  static load(x: number, y: number): CrossFormula { return f('pulley-load', 'load(x, y) = x · y', x * y, nat(x, y), 'load', [x, y]) }
  /** segments(x, y) = x · y. */
  static segments(x: number, y: number): CrossFormula { return f('pulley-segments', 'segments(x, y) = x · y', x * y, nat(x, y), 'segments', [x, y]) }
  /** advantage(x, y) = x / y. */
  static advantage(x: number, y: number): CrossFormula { return f('pulley-advantage', 'advantage(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'advantage', [x, y]) }
  /** tension(x, y) = x / y. */
  static tension(x: number, y: number): CrossFormula { return f('pulley-tension', 'tension(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'tension', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('pulley-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['advantage', 'combos', 'effort', 'load', 'ratio', 'segments', 'tension', 'wheels'] as const)
  hexRegisterOf('pulley', name, (PulleyFormulas[name] as (...x: unknown[]) => unknown).bind(PulleyFormulas))
