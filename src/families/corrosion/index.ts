import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CorrosionFormulas — 8 exact-integer formulas of the corrosion domain, each at a hex address crossing to cross; develops the corrosion leads. */

const PROOF = "corrosion counts: rate(x, y) = x / y; loss(x, y) = x · y; pits(x, y) = x · y; potential(x, y) = max(0, x − y); lifetime(x, y) = x / y; coating(x, y) = x · 100 / y; zones(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'corrosion', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `corrosion.${name}`, params })

export class CorrosionFormulas {
  /** rate(x, y) = x / y. */
  static rate(x: number, y: number): CrossFormula { return f('corrosion-rate', 'rate(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rate', [x, y]) }
  /** loss(x, y) = x · y. */
  static loss(x: number, y: number): CrossFormula { return f('corrosion-loss', 'loss(x, y) = x · y', x * y, nat(x, y), 'loss', [x, y]) }
  /** pits(x, y) = x · y. */
  static pits(x: number, y: number): CrossFormula { return f('corrosion-pits', 'pits(x, y) = x · y', x * y, nat(x, y), 'pits', [x, y]) }
  /** potential(x, y) = max(0, x − y). */
  static potential(x: number, y: number): CrossFormula { return f('corrosion-potential', 'potential(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'potential', [x, y]) }
  /** lifetime(x, y) = x / y. */
  static lifetime(x: number, y: number): CrossFormula { return f('corrosion-lifetime', 'lifetime(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lifetime', [x, y]) }
  /** coating(x, y) = x · 100 / y. */
  static coating(x: number, y: number): CrossFormula { return f('corrosion-coating', 'coating(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coating', [x, y]) }
  /** zones(x, y) = x + y. */
  static zones(x: number, y: number): CrossFormula { return f('corrosion-zones', 'zones(x, y) = x + y', x + y, nat(x, y), 'zones', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('corrosion-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['coating', 'combos', 'lifetime', 'loss', 'pits', 'potential', 'rate', 'zones'] as const)
  hexRegisterOf('corrosion', name, (CorrosionFormulas[name] as (...x: unknown[]) => unknown).bind(CorrosionFormulas))
