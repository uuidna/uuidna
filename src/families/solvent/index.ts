import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SolventFormulas — 8 exact-integer formulas of the solvent domain, each at a hex address crossing to cross; develops the solvent leads. */

const PROOF = "solvent counts: molarity(x, y) = x / y; dilution(x, y) = x / y; volume(x, y) = x · y; ph(x, y) = x / y; solubility(x, y) = x · y; polarity(x, y) = x · 100 / y; layers(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'solvent', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `solvent.${name}`, params })

export class SolventFormulas {
  /** molarity(x, y) = x / y. */
  static molarity(x: number, y: number): CrossFormula { return f('solvent-molarity', 'molarity(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'molarity', [x, y]) }
  /** dilution(x, y) = x / y. */
  static dilution(x: number, y: number): CrossFormula { return f('solvent-dilution', 'dilution(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dilution', [x, y]) }
  /** volume(x, y) = x · y. */
  static volume(x: number, y: number): CrossFormula { return f('solvent-volume', 'volume(x, y) = x · y', x * y, nat(x, y), 'volume', [x, y]) }
  /** ph(x, y) = x / y. */
  static ph(x: number, y: number): CrossFormula { return f('solvent-ph', 'ph(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ph', [x, y]) }
  /** solubility(x, y) = x · y. */
  static solubility(x: number, y: number): CrossFormula { return f('solvent-solubility', 'solubility(x, y) = x · y', x * y, nat(x, y), 'solubility', [x, y]) }
  /** polarity(x, y) = x · 100 / y. */
  static polarity(x: number, y: number): CrossFormula { return f('solvent-polarity', 'polarity(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'polarity', [x, y]) }
  /** layers(x, y) = x + y. */
  static layers(x: number, y: number): CrossFormula { return f('solvent-layers', 'layers(x, y) = x + y', x + y, nat(x, y), 'layers', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('solvent-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'dilution', 'layers', 'molarity', 'ph', 'polarity', 'solubility', 'volume'] as const)
  hexRegisterOf('solvent', name, (SolventFormulas[name] as (...x: unknown[]) => unknown).bind(SolventFormulas))
