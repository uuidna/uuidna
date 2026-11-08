import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AntibodyFormulas — 8 exact-integer formulas of the antibody domain, each at a hex address crossing to cross; develops the antibody leads. */

const PROOF = "antibody counts: affinity(x, y) = x / y; isotypes(x, y) = x + y; chains(x, y) = x · y; epitopes(x, y) = x · y; titer(x, y) = x · y; halflife(x, y) = x · y; neutralization(x, y) = x · 100 / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'antibody', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `antibody.${name}`, params })

export class AntibodyFormulas {
  /** affinity(x, y) = x / y. */
  static affinity(x: number, y: number): CrossFormula { return f('antibody-affinity', 'affinity(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'affinity', [x, y]) }
  /** isotypes(x, y) = x + y. */
  static isotypes(x: number, y: number): CrossFormula { return f('antibody-isotypes', 'isotypes(x, y) = x + y', x + y, nat(x, y), 'isotypes', [x, y]) }
  /** chains(x, y) = x · y. */
  static chains(x: number, y: number): CrossFormula { return f('antibody-chains', 'chains(x, y) = x · y', x * y, nat(x, y), 'chains', [x, y]) }
  /** epitopes(x, y) = x · y. */
  static epitopes(x: number, y: number): CrossFormula { return f('antibody-epitopes', 'epitopes(x, y) = x · y', x * y, nat(x, y), 'epitopes', [x, y]) }
  /** titer(x, y) = x · y. */
  static titer(x: number, y: number): CrossFormula { return f('antibody-titer', 'titer(x, y) = x · y', x * y, nat(x, y), 'titer', [x, y]) }
  /** halflife(x, y) = x · y. */
  static halflife(x: number, y: number): CrossFormula { return f('antibody-halflife', 'halflife(x, y) = x · y', x * y, nat(x, y), 'halflife', [x, y]) }
  /** neutralization(x, y) = x · 100 / y. */
  static neutralization(x: number, y: number): CrossFormula { return f('antibody-neutralization', 'neutralization(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'neutralization', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('antibody-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['affinity', 'chains', 'combos', 'epitopes', 'halflife', 'isotypes', 'neutralization', 'titer'] as const)
  hexRegisterOf('antibody', name, (AntibodyFormulas[name] as (...x: unknown[]) => unknown).bind(AntibodyFormulas))
