import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CompositeFormulas — 8 exact-integer formulas of the composite domain, each at a hex address crossing to cross; develops the composite leads. */

const PROOF = "composite counts: plies(x, y) = x + y; fiberpct(x, y) = x · 100 / y; strength(x, y) = x · y; modulus(x, y) = x · y; layers(x, y) = x · y; weight(x, y) = x / y; orientations(x) = x!; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'composite', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `composite.${name}`, params })

export class CompositeFormulas {
  /** plies(x, y) = x + y. */
  static plies(x: number, y: number): CrossFormula { return f('composite-plies', 'plies(x, y) = x + y', x + y, nat(x, y), 'plies', [x, y]) }
  /** fiberpct(x, y) = x · 100 / y. */
  static fiberpct(x: number, y: number): CrossFormula { return f('composite-fiberpct', 'fiberpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'fiberpct', [x, y]) }
  /** strength(x, y) = x · y. */
  static strength(x: number, y: number): CrossFormula { return f('composite-strength', 'strength(x, y) = x · y', x * y, nat(x, y), 'strength', [x, y]) }
  /** modulus(x, y) = x · y. */
  static modulus(x: number, y: number): CrossFormula { return f('composite-modulus', 'modulus(x, y) = x · y', x * y, nat(x, y), 'modulus', [x, y]) }
  /** layers(x, y) = x · y. */
  static layers(x: number, y: number): CrossFormula { return f('composite-layers', 'layers(x, y) = x · y', x * y, nat(x, y), 'layers', [x, y]) }
  /** weight(x, y) = x / y. */
  static weight(x: number, y: number): CrossFormula { return f('composite-weight', 'weight(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'weight', [x, y]) }
  /** orientations(x) = x!. */
  static orientations(x: number): CrossFormula { return f('composite-orientations', 'orientations(x) = x!', x <= 12 ? factOf(x) : 0, nat(x) && x <= 12, 'orientations', [x]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('composite-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'fiberpct', 'layers', 'modulus', 'orientations', 'plies', 'strength', 'weight'] as const)
  hexRegisterOf('composite', name, (CompositeFormulas[name] as (...x: unknown[]) => unknown).bind(CompositeFormulas))
