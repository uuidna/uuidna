import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CrystalFormulas — 8 exact-integer formulas of the crystal domain, each at a hex address crossing to cross; develops the crystal leads. */

const PROOF = "crystal counts: lattice(x, y, z) = x · y · z; atoms(x, y) = x · y; planes(x, y) = x + y; spacing(x, y) = x / y; symmetry(x, y) = x + y; defects(x, y) = x / y; faces(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'crystal', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `crystal.${name}`, params })

export class CrystalFormulas {
  /** lattice(x, y, z) = x · y · z. */
  static lattice(x: number, y: number, z: number): CrossFormula { return f('crystal-lattice', 'lattice(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'lattice', [x, y, z]) }
  /** atoms(x, y) = x · y. */
  static atoms(x: number, y: number): CrossFormula { return f('crystal-atoms', 'atoms(x, y) = x · y', x * y, nat(x, y), 'atoms', [x, y]) }
  /** planes(x, y) = x + y. */
  static planes(x: number, y: number): CrossFormula { return f('crystal-planes', 'planes(x, y) = x + y', x + y, nat(x, y), 'planes', [x, y]) }
  /** spacing(x, y) = x / y. */
  static spacing(x: number, y: number): CrossFormula { return f('crystal-spacing', 'spacing(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'spacing', [x, y]) }
  /** symmetry(x, y) = x + y. */
  static symmetry(x: number, y: number): CrossFormula { return f('crystal-symmetry', 'symmetry(x, y) = x + y', x + y, nat(x, y), 'symmetry', [x, y]) }
  /** defects(x, y) = x / y. */
  static defects(x: number, y: number): CrossFormula { return f('crystal-defects', 'defects(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'defects', [x, y]) }
  /** faces(x, y) = x + y. */
  static faces(x: number, y: number): CrossFormula { return f('crystal-faces', 'faces(x, y) = x + y', x + y, nat(x, y), 'faces', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('crystal-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['atoms', 'combos', 'defects', 'faces', 'lattice', 'planes', 'spacing', 'symmetry'] as const)
  hexRegisterOf('crystal', name, (CrystalFormulas[name] as (...x: unknown[]) => unknown).bind(CrystalFormulas))
