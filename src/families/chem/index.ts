import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ChemFormulas — 8 exact-integer formulas of the chem domain, each at a hex address crossing to cross; develops the chem leads. */

const PROOF = "chem counts: moles(x, y) = x / y; molarity(x, y) = x / y; mass(x, y) = x · y; dilution(x, y) = x / y; valence(x, y) = min(x, y); yield(x, y) = x · 100 / y; isotopes(x, y) = x + y; bonds(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'chem', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `chem.${name}`, params })

export class ChemFormulas {
  /** moles(x, y) = x / y. */
  static moles(x: number, y: number): CrossFormula { return f('chem-moles', 'moles(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'moles', [x, y]) }
  /** molarity(x, y) = x / y. */
  static molarity(x: number, y: number): CrossFormula { return f('chem-molarity', 'molarity(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'molarity', [x, y]) }
  /** mass(x, y) = x · y. */
  static mass(x: number, y: number): CrossFormula { return f('chem-mass', 'mass(x, y) = x · y', x * y, nat(x, y), 'mass', [x, y]) }
  /** dilution(x, y) = x / y. */
  static dilution(x: number, y: number): CrossFormula { return f('chem-dilution', 'dilution(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dilution', [x, y]) }
  /** valence(x, y) = min(x, y). */
  static valence(x: number, y: number): CrossFormula { return f('chem-valence', 'valence(x, y) = min(x, y)', Math.min(x, y), nat(x, y), 'valence', [x, y]) }
  /** yield(x, y) = x · 100 / y. */
  static yield(x: number, y: number): CrossFormula { return f('chem-yield', 'yield(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yield', [x, y]) }
  /** isotopes(x, y) = x + y. */
  static isotopes(x: number, y: number): CrossFormula { return f('chem-isotopes', 'isotopes(x, y) = x + y', x + y, nat(x, y), 'isotopes', [x, y]) }
  /** bonds(x, y) = C(x, y). */
  static bonds(x: number, y: number): CrossFormula { return f('chem-bonds', 'bonds(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'bonds', [x, y]) }
}

for (const name of ['bonds', 'dilution', 'isotopes', 'mass', 'molarity', 'moles', 'valence', 'yield'] as const)
  hexRegisterOf('chem', name, (ChemFormulas[name] as (...x: unknown[]) => unknown).bind(ChemFormulas))
