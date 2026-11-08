import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MoonFormulas — 8 exact-integer formulas of the moon domain, each at a hex address crossing to cross; develops the moon leads. */

const PROOF = "moon counts: phase(x, y) = x mod y; distance(x, y) = x · y; period(x, y) = x + y; diameter(x, y) = x · y; tides(x, y) = x · y; libration(x, y) = max(0, x − y); craters(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'moon', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `moon.${name}`, params })

export class MoonFormulas {
  /** phase(x, y) = x mod y. */
  static phase(x: number, y: number): CrossFormula { return f('moon-phase', 'phase(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'phase', [x, y]) }
  /** distance(x, y) = x · y. */
  static distance(x: number, y: number): CrossFormula { return f('moon-distance', 'distance(x, y) = x · y', x * y, nat(x, y), 'distance', [x, y]) }
  /** period(x, y) = x + y. */
  static period(x: number, y: number): CrossFormula { return f('moon-period', 'period(x, y) = x + y', x + y, nat(x, y), 'period', [x, y]) }
  /** diameter(x, y) = x · y. */
  static diameter(x: number, y: number): CrossFormula { return f('moon-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
  /** tides(x, y) = x · y. */
  static tides(x: number, y: number): CrossFormula { return f('moon-tides', 'tides(x, y) = x · y', x * y, nat(x, y), 'tides', [x, y]) }
  /** libration(x, y) = max(0, x − y). */
  static libration(x: number, y: number): CrossFormula { return f('moon-libration', 'libration(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'libration', [x, y]) }
  /** craters(x, y) = x · y. */
  static craters(x: number, y: number): CrossFormula { return f('moon-craters', 'craters(x, y) = x · y', x * y, nat(x, y), 'craters', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('moon-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'craters', 'diameter', 'distance', 'libration', 'period', 'phase', 'tides'] as const)
  hexRegisterOf('moon', name, (MoonFormulas[name] as (...x: unknown[]) => unknown).bind(MoonFormulas))
