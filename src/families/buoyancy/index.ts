import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BuoyancyFormulas — 8 exact-integer formulas of the buoyancy domain, each at a hex address crossing to cross; develops the buoyancy leads. */

const PROOF = "buoyancy counts: force(x, y) = x · y; displaced(x, y) = x · y; density(x, y) = x / y; volume(x, y, z) = x · y · z; weight(x, y) = x · y; margin(x, y) = max(0, x − y); floats(x, y) = [x ≥ y]; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'buoyancy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `buoyancy.${name}`, params })

export class BuoyancyFormulas {
  /** force(x, y) = x · y. */
  static force(x: number, y: number): CrossFormula { return f('buoyancy-force', 'force(x, y) = x · y', x * y, nat(x, y), 'force', [x, y]) }
  /** displaced(x, y) = x · y. */
  static displaced(x: number, y: number): CrossFormula { return f('buoyancy-displaced', 'displaced(x, y) = x · y', x * y, nat(x, y), 'displaced', [x, y]) }
  /** density(x, y) = x / y. */
  static density(x: number, y: number): CrossFormula { return f('buoyancy-density', 'density(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'density', [x, y]) }
  /** volume(x, y, z) = x · y · z. */
  static volume(x: number, y: number, z: number): CrossFormula { return f('buoyancy-volume', 'volume(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'volume', [x, y, z]) }
  /** weight(x, y) = x · y. */
  static weight(x: number, y: number): CrossFormula { return f('buoyancy-weight', 'weight(x, y) = x · y', x * y, nat(x, y), 'weight', [x, y]) }
  /** margin(x, y) = max(0, x − y). */
  static margin(x: number, y: number): CrossFormula { return f('buoyancy-margin', 'margin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'margin', [x, y]) }
  /** floats(x, y) = [x ≥ y]. */
  static floats(x: number, y: number): CrossFormula { return f('buoyancy-floats', 'floats(x, y) = [x ≥ y]', x >= y ? 1 : 0, nat(x, y), 'floats', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('buoyancy-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'density', 'displaced', 'floats', 'force', 'margin', 'volume', 'weight'] as const)
  hexRegisterOf('buoyancy', name, (BuoyancyFormulas[name] as (...x: unknown[]) => unknown).bind(BuoyancyFormulas))
