import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TorsionFormulas — 8 exact-integer formulas of the torsion domain, each at a hex address crossing to cross; develops the torsion leads. */

const PROOF = "torsion counts: torque(x, y) = x · y; angle(x, y) = x / y; shear(x, y) = x / y; modulus(x, y) = x · y; radius(x, y) = x · y; twist(x, y) = max(0, x − y); sections(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'torsion', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `torsion.${name}`, params })

export class TorsionFormulas {
  /** torque(x, y) = x · y. */
  static torque(x: number, y: number): CrossFormula { return f('torsion-torque', 'torque(x, y) = x · y', x * y, nat(x, y), 'torque', [x, y]) }
  /** angle(x, y) = x / y. */
  static angle(x: number, y: number): CrossFormula { return f('torsion-angle', 'angle(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'angle', [x, y]) }
  /** shear(x, y) = x / y. */
  static shear(x: number, y: number): CrossFormula { return f('torsion-shear', 'shear(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'shear', [x, y]) }
  /** modulus(x, y) = x · y. */
  static modulus(x: number, y: number): CrossFormula { return f('torsion-modulus', 'modulus(x, y) = x · y', x * y, nat(x, y), 'modulus', [x, y]) }
  /** radius(x, y) = x · y. */
  static radius(x: number, y: number): CrossFormula { return f('torsion-radius', 'radius(x, y) = x · y', x * y, nat(x, y), 'radius', [x, y]) }
  /** twist(x, y) = max(0, x − y). */
  static twist(x: number, y: number): CrossFormula { return f('torsion-twist', 'twist(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'twist', [x, y]) }
  /** sections(x, y) = x + y. */
  static sections(x: number, y: number): CrossFormula { return f('torsion-sections', 'sections(x, y) = x + y', x + y, nat(x, y), 'sections', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('torsion-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['angle', 'combos', 'modulus', 'radius', 'sections', 'shear', 'torque', 'twist'] as const)
  hexRegisterOf('torsion', name, (TorsionFormulas[name] as (...x: unknown[]) => unknown).bind(TorsionFormulas))
