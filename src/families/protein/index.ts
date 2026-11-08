import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ProteinFormulas — 8 exact-integer formulas of the protein domain, each at a hex address crossing to cross; develops the protein leads. */

const PROOF = "protein counts: residues(x, y) = x · y; mass(x, y) = x · y; domains(x, y) = x + y; foldstates(x) = 2^x; bonds(x, y) = x · y; helices(x, y) = x + y; contacts(x, y) = C(x, y); combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'protein', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `protein.${name}`, params })

export class ProteinFormulas {
  /** residues(x, y) = x · y. */
  static residues(x: number, y: number): CrossFormula { return f('protein-residues', 'residues(x, y) = x · y', x * y, nat(x, y), 'residues', [x, y]) }
  /** mass(x, y) = x · y. */
  static mass(x: number, y: number): CrossFormula { return f('protein-mass', 'mass(x, y) = x · y', x * y, nat(x, y), 'mass', [x, y]) }
  /** domains(x, y) = x + y. */
  static domains(x: number, y: number): CrossFormula { return f('protein-domains', 'domains(x, y) = x + y', x + y, nat(x, y), 'domains', [x, y]) }
  /** foldstates(x) = 2^x. */
  static foldstates(x: number): CrossFormula { return f('protein-foldstates', 'foldstates(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'foldstates', [x]) }
  /** bonds(x, y) = x · y. */
  static bonds(x: number, y: number): CrossFormula { return f('protein-bonds', 'bonds(x, y) = x · y', x * y, nat(x, y), 'bonds', [x, y]) }
  /** helices(x, y) = x + y. */
  static helices(x: number, y: number): CrossFormula { return f('protein-helices', 'helices(x, y) = x + y', x + y, nat(x, y), 'helices', [x, y]) }
  /** contacts(x, y) = C(x, y). */
  static contacts(x: number, y: number): CrossFormula { return f('protein-contacts', 'contacts(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'contacts', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('protein-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['bonds', 'combos', 'contacts', 'domains', 'foldstates', 'helices', 'mass', 'residues'] as const)
  hexRegisterOf('protein', name, (ProteinFormulas[name] as (...x: unknown[]) => unknown).bind(ProteinFormulas))
