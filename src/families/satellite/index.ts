import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SatelliteFormulas — 8 exact-integer formulas of the satellite domain, each at a hex address crossing to cross; develops the satellite leads. */

const PROOF = "satellite counts: altitude(x, y) = x · y; period(x, y) = x / y; velocity(x, y) = x · y; inclination(x, y) = max(0, x − y); coverage(x, y) = x · 100 / y; constellation(x, y) = x · y; bands(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'satellite', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `satellite.${name}`, params })

export class SatelliteFormulas {
  /** altitude(x, y) = x · y. */
  static altitude(x: number, y: number): CrossFormula { return f('satellite-altitude', 'altitude(x, y) = x · y', x * y, nat(x, y), 'altitude', [x, y]) }
  /** period(x, y) = x / y. */
  static period(x: number, y: number): CrossFormula { return f('satellite-period', 'period(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'period', [x, y]) }
  /** velocity(x, y) = x · y. */
  static velocity(x: number, y: number): CrossFormula { return f('satellite-velocity', 'velocity(x, y) = x · y', x * y, nat(x, y), 'velocity', [x, y]) }
  /** inclination(x, y) = max(0, x − y). */
  static inclination(x: number, y: number): CrossFormula { return f('satellite-inclination', 'inclination(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'inclination', [x, y]) }
  /** coverage(x, y) = x · 100 / y. */
  static coverage(x: number, y: number): CrossFormula { return f('satellite-coverage', 'coverage(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
  /** constellation(x, y) = x · y. */
  static constellation(x: number, y: number): CrossFormula { return f('satellite-constellation', 'constellation(x, y) = x · y', x * y, nat(x, y), 'constellation', [x, y]) }
  /** bands(x, y) = x + y. */
  static bands(x: number, y: number): CrossFormula { return f('satellite-bands', 'bands(x, y) = x + y', x + y, nat(x, y), 'bands', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('satellite-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['altitude', 'bands', 'combos', 'constellation', 'coverage', 'inclination', 'period', 'velocity'] as const)
  hexRegisterOf('satellite', name, (SatelliteFormulas[name] as (...x: unknown[]) => unknown).bind(SatelliteFormulas))
