import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FrictionFormulas — 8 exact-integer formulas of the friction domain, each at a hex address crossing to cross; develops the friction leads. */

const PROOF = "friction counts: force(x, y) = x · y; coefficient(x, y) = x · 100 / y; heat(x, y) = x · y; distance(x, y) = x / y; normal(x, y) = x · y; work(x, y) = x · y; surfaces(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'friction', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `friction.${name}`, params })

export class FrictionFormulas {
  /** force(x, y) = x · y. */
  static force(x: number, y: number): CrossFormula { return f('friction-force', 'force(x, y) = x · y', x * y, nat(x, y), 'force', [x, y]) }
  /** coefficient(x, y) = x · 100 / y. */
  static coefficient(x: number, y: number): CrossFormula { return f('friction-coefficient', 'coefficient(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coefficient', [x, y]) }
  /** heat(x, y) = x · y. */
  static heat(x: number, y: number): CrossFormula { return f('friction-heat', 'heat(x, y) = x · y', x * y, nat(x, y), 'heat', [x, y]) }
  /** distance(x, y) = x / y. */
  static distance(x: number, y: number): CrossFormula { return f('friction-distance', 'distance(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'distance', [x, y]) }
  /** normal(x, y) = x · y. */
  static normal(x: number, y: number): CrossFormula { return f('friction-normal', 'normal(x, y) = x · y', x * y, nat(x, y), 'normal', [x, y]) }
  /** work(x, y) = x · y. */
  static work(x: number, y: number): CrossFormula { return f('friction-work', 'work(x, y) = x · y', x * y, nat(x, y), 'work', [x, y]) }
  /** surfaces(x, y) = x + y. */
  static surfaces(x: number, y: number): CrossFormula { return f('friction-surfaces', 'surfaces(x, y) = x + y', x + y, nat(x, y), 'surfaces', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('friction-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['coefficient', 'combos', 'distance', 'force', 'heat', 'normal', 'surfaces', 'work'] as const)
  hexRegisterOf('friction', name, (FrictionFormulas[name] as (...x: unknown[]) => unknown).bind(FrictionFormulas))
