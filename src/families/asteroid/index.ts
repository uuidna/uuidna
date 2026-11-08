import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AsteroidFormulas — 8 exact-integer formulas of the asteroid domain, each at a hex address crossing to cross; develops the asteroid leads. */

const PROOF = "asteroid counts: diameter(x, y) = x · y; belt(x, y) = x + y; count(x, y) = x · y; albedo(x, y) = x · 100 / y; rotation(x, y) = x / y; families(x, y) = x + y; mass(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'asteroid', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `asteroid.${name}`, params })

export class AsteroidFormulas {
  /** diameter(x, y) = x · y. */
  static diameter(x: number, y: number): CrossFormula { return f('asteroid-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
  /** belt(x, y) = x + y. */
  static belt(x: number, y: number): CrossFormula { return f('asteroid-belt', 'belt(x, y) = x + y', x + y, nat(x, y), 'belt', [x, y]) }
  /** count(x, y) = x · y. */
  static count(x: number, y: number): CrossFormula { return f('asteroid-count', 'count(x, y) = x · y', x * y, nat(x, y), 'count', [x, y]) }
  /** albedo(x, y) = x · 100 / y. */
  static albedo(x: number, y: number): CrossFormula { return f('asteroid-albedo', 'albedo(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'albedo', [x, y]) }
  /** rotation(x, y) = x / y. */
  static rotation(x: number, y: number): CrossFormula { return f('asteroid-rotation', 'rotation(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rotation', [x, y]) }
  /** families(x, y) = x + y. */
  static families(x: number, y: number): CrossFormula { return f('asteroid-families', 'families(x, y) = x + y', x + y, nat(x, y), 'families', [x, y]) }
  /** mass(x, y) = x · y. */
  static mass(x: number, y: number): CrossFormula { return f('asteroid-mass', 'mass(x, y) = x · y', x * y, nat(x, y), 'mass', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('asteroid-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['albedo', 'belt', 'combos', 'count', 'diameter', 'families', 'mass', 'rotation'] as const)
  hexRegisterOf('asteroid', name, (AsteroidFormulas[name] as (...x: unknown[]) => unknown).bind(AsteroidFormulas))
