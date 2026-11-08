import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BioFormulas — 8 exact-integer formulas of the bio domain, each at a hex address crossing to cross; develops the bio leads. */

const PROOF = "bio counts: doubling(x) = 2^x; generations(x, y) = x + y; dosage(x, y) = x · y; bmi(x, y) = x / y; cells(x, y) = x · y; colonies(x, y) = x · y; halflife(x, y) = x / y; population(x, y, z) = x · y · z"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'bio', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `bio.${name}`, params })

export class BioFormulas {
  /** doubling(x) = 2^x. */
  static doubling(x: number): CrossFormula { return f('bio-doubling', 'doubling(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'doubling', [x]) }
  /** generations(x, y) = x + y. */
  static generations(x: number, y: number): CrossFormula { return f('bio-generations', 'generations(x, y) = x + y', x + y, nat(x, y), 'generations', [x, y]) }
  /** dosage(x, y) = x · y. */
  static dosage(x: number, y: number): CrossFormula { return f('bio-dosage', 'dosage(x, y) = x · y', x * y, nat(x, y), 'dosage', [x, y]) }
  /** bmi(x, y) = x / y. */
  static bmi(x: number, y: number): CrossFormula { return f('bio-bmi', 'bmi(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'bmi', [x, y]) }
  /** cells(x, y) = x · y. */
  static cells(x: number, y: number): CrossFormula { return f('bio-cells', 'cells(x, y) = x · y', x * y, nat(x, y), 'cells', [x, y]) }
  /** colonies(x, y) = x · y. */
  static colonies(x: number, y: number): CrossFormula { return f('bio-colonies', 'colonies(x, y) = x · y', x * y, nat(x, y), 'colonies', [x, y]) }
  /** halflife(x, y) = x / y. */
  static halflife(x: number, y: number): CrossFormula { return f('bio-halflife', 'halflife(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'halflife', [x, y]) }
  /** population(x, y, z) = x · y · z. */
  static population(x: number, y: number, z: number): CrossFormula { return f('bio-population', 'population(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'population', [x, y, z]) }
}

for (const name of ['bmi', 'cells', 'colonies', 'dosage', 'doubling', 'generations', 'halflife', 'population'] as const)
  hexRegisterOf('bio', name, (BioFormulas[name] as (...x: unknown[]) => unknown).bind(BioFormulas))
