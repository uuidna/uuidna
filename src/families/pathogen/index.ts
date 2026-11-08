import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PathogenFormulas — 8 exact-integer formulas of the pathogen domain, each at a hex address crossing to cross; develops the pathogen leads. */

const PROOF = "pathogen counts: r0(x, y) = x / y; incubation(x, y) = x + y; mortality(x, y) = x · 100 / y; transmission(x, y) = x · 100 / y; generations(x, y) = x · y; strains(x, y) = x + y; reservoir(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'pathogen', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `pathogen.${name}`, params })

export class PathogenFormulas {
  /** r0(x, y) = x / y. */
  static r0(x: number, y: number): CrossFormula { return f('pathogen-r0', 'r0(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'r0', [x, y]) }
  /** incubation(x, y) = x + y. */
  static incubation(x: number, y: number): CrossFormula { return f('pathogen-incubation', 'incubation(x, y) = x + y', x + y, nat(x, y), 'incubation', [x, y]) }
  /** mortality(x, y) = x · 100 / y. */
  static mortality(x: number, y: number): CrossFormula { return f('pathogen-mortality', 'mortality(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'mortality', [x, y]) }
  /** transmission(x, y) = x · 100 / y. */
  static transmission(x: number, y: number): CrossFormula { return f('pathogen-transmission', 'transmission(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'transmission', [x, y]) }
  /** generations(x, y) = x · y. */
  static generations(x: number, y: number): CrossFormula { return f('pathogen-generations', 'generations(x, y) = x · y', x * y, nat(x, y), 'generations', [x, y]) }
  /** strains(x, y) = x + y. */
  static strains(x: number, y: number): CrossFormula { return f('pathogen-strains', 'strains(x, y) = x + y', x + y, nat(x, y), 'strains', [x, y]) }
  /** reservoir(x, y) = x + y. */
  static reservoir(x: number, y: number): CrossFormula { return f('pathogen-reservoir', 'reservoir(x, y) = x + y', x + y, nat(x, y), 'reservoir', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('pathogen-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'generations', 'incubation', 'mortality', 'r0', 'reservoir', 'strains', 'transmission'] as const)
  hexRegisterOf('pathogen', name, (PathogenFormulas[name] as (...x: unknown[]) => unknown).bind(PathogenFormulas))
