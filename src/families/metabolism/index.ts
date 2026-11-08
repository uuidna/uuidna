import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MetabolismFormulas — 8 exact-integer formulas of the metabolism domain, each at a hex address crossing to cross; develops the metabolism leads. */

const PROOF = "metabolism counts: bmr(x, y) = x · y; atp(x, y) = x · y; calories(x, y) = x · y; pathways(x, y) = x + y; glucose(x, y) = x / y; oxygen(x, y) = x · y; enzymes(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'metabolism', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `metabolism.${name}`, params })

export class MetabolismFormulas {
  /** bmr(x, y) = x · y. */
  static bmr(x: number, y: number): CrossFormula { return f('metabolism-bmr', 'bmr(x, y) = x · y', x * y, nat(x, y), 'bmr', [x, y]) }
  /** atp(x, y) = x · y. */
  static atp(x: number, y: number): CrossFormula { return f('metabolism-atp', 'atp(x, y) = x · y', x * y, nat(x, y), 'atp', [x, y]) }
  /** calories(x, y) = x · y. */
  static calories(x: number, y: number): CrossFormula { return f('metabolism-calories', 'calories(x, y) = x · y', x * y, nat(x, y), 'calories', [x, y]) }
  /** pathways(x, y) = x + y. */
  static pathways(x: number, y: number): CrossFormula { return f('metabolism-pathways', 'pathways(x, y) = x + y', x + y, nat(x, y), 'pathways', [x, y]) }
  /** glucose(x, y) = x / y. */
  static glucose(x: number, y: number): CrossFormula { return f('metabolism-glucose', 'glucose(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'glucose', [x, y]) }
  /** oxygen(x, y) = x · y. */
  static oxygen(x: number, y: number): CrossFormula { return f('metabolism-oxygen', 'oxygen(x, y) = x · y', x * y, nat(x, y), 'oxygen', [x, y]) }
  /** enzymes(x, y) = x · y. */
  static enzymes(x: number, y: number): CrossFormula { return f('metabolism-enzymes', 'enzymes(x, y) = x · y', x * y, nat(x, y), 'enzymes', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('metabolism-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['atp', 'bmr', 'calories', 'combos', 'enzymes', 'glucose', 'oxygen', 'pathways'] as const)
  hexRegisterOf('metabolism', name, (MetabolismFormulas[name] as (...x: unknown[]) => unknown).bind(MetabolismFormulas))
