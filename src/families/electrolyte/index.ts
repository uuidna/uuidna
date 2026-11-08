import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ElectrolyteFormulas — 8 exact-integer formulas of the electrolyte domain, each at a hex address crossing to cross; develops the electrolyte leads. */

const PROOF = "electrolyte counts: conductivity(x, y) = x · y; molarity(x, y) = x / y; ions(x, y) = x · y; voltage(x, y) = x · y; ph(x, y) = x / y; mobility(x, y) = x / y; cells(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'electrolyte', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `electrolyte.${name}`, params })

export class ElectrolyteFormulas {
  /** conductivity(x, y) = x · y. */
  static conductivity(x: number, y: number): CrossFormula { return f('electrolyte-conductivity', 'conductivity(x, y) = x · y', x * y, nat(x, y), 'conductivity', [x, y]) }
  /** molarity(x, y) = x / y. */
  static molarity(x: number, y: number): CrossFormula { return f('electrolyte-molarity', 'molarity(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'molarity', [x, y]) }
  /** ions(x, y) = x · y. */
  static ions(x: number, y: number): CrossFormula { return f('electrolyte-ions', 'ions(x, y) = x · y', x * y, nat(x, y), 'ions', [x, y]) }
  /** voltage(x, y) = x · y. */
  static voltage(x: number, y: number): CrossFormula { return f('electrolyte-voltage', 'voltage(x, y) = x · y', x * y, nat(x, y), 'voltage', [x, y]) }
  /** ph(x, y) = x / y. */
  static ph(x: number, y: number): CrossFormula { return f('electrolyte-ph', 'ph(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ph', [x, y]) }
  /** mobility(x, y) = x / y. */
  static mobility(x: number, y: number): CrossFormula { return f('electrolyte-mobility', 'mobility(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'mobility', [x, y]) }
  /** cells(x, y) = x + y. */
  static cells(x: number, y: number): CrossFormula { return f('electrolyte-cells', 'cells(x, y) = x + y', x + y, nat(x, y), 'cells', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('electrolyte-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['cells', 'combos', 'conductivity', 'ions', 'mobility', 'molarity', 'ph', 'voltage'] as const)
  hexRegisterOf('electrolyte', name, (ElectrolyteFormulas[name] as (...x: unknown[]) => unknown).bind(ElectrolyteFormulas))
