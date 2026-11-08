import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AdhesiveFormulas — 8 exact-integer formulas of the adhesive domain, each at a hex address crossing to cross; develops the adhesive leads. */

const PROOF = "adhesive counts: bondstrength(x, y) = x · y; cure(x, y) = x / y; coverage(x, y) = x · y; viscosity(x, y) = x · y; peel(x, y) = x / y; layers(x, y) = x + y; shear(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'adhesive', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `adhesive.${name}`, params })

export class AdhesiveFormulas {
  /** bondstrength(x, y) = x · y. */
  static bondstrength(x: number, y: number): CrossFormula { return f('adhesive-bondstrength', 'bondstrength(x, y) = x · y', x * y, nat(x, y), 'bondstrength', [x, y]) }
  /** cure(x, y) = x / y. */
  static cure(x: number, y: number): CrossFormula { return f('adhesive-cure', 'cure(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'cure', [x, y]) }
  /** coverage(x, y) = x · y. */
  static coverage(x: number, y: number): CrossFormula { return f('adhesive-coverage', 'coverage(x, y) = x · y', x * y, nat(x, y), 'coverage', [x, y]) }
  /** viscosity(x, y) = x · y. */
  static viscosity(x: number, y: number): CrossFormula { return f('adhesive-viscosity', 'viscosity(x, y) = x · y', x * y, nat(x, y), 'viscosity', [x, y]) }
  /** peel(x, y) = x / y. */
  static peel(x: number, y: number): CrossFormula { return f('adhesive-peel', 'peel(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'peel', [x, y]) }
  /** layers(x, y) = x + y. */
  static layers(x: number, y: number): CrossFormula { return f('adhesive-layers', 'layers(x, y) = x + y', x + y, nat(x, y), 'layers', [x, y]) }
  /** shear(x, y) = x · y. */
  static shear(x: number, y: number): CrossFormula { return f('adhesive-shear', 'shear(x, y) = x · y', x * y, nat(x, y), 'shear', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('adhesive-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['bondstrength', 'combos', 'coverage', 'cure', 'layers', 'peel', 'shear', 'viscosity'] as const)
  hexRegisterOf('adhesive', name, (AdhesiveFormulas[name] as (...x: unknown[]) => unknown).bind(AdhesiveFormulas))
