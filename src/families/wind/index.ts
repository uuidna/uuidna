import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WindFormulas — 8 exact-integer formulas of the wind domain, each at a hex address crossing to cross; develops the wind leads. */

const PROOF = "wind counts: power(x, y, z) = x · y · z; turbines(x, y) = x + y; capacity(x, y) = x · 100 / y; rated(x, y) = x · y; tipratio(x, y) = x / y; farm(x, y) = x · y; blades(x, y) = x + y; pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'wind', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `wind.${name}`, params })

export class WindFormulas {
  /** power(x, y, z) = x · y · z. */
  static power(x: number, y: number, z: number): CrossFormula { return f('wind-power', 'power(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'power', [x, y, z]) }
  /** turbines(x, y) = x + y. */
  static turbines(x: number, y: number): CrossFormula { return f('wind-turbines', 'turbines(x, y) = x + y', x + y, nat(x, y), 'turbines', [x, y]) }
  /** capacity(x, y) = x · 100 / y. */
  static capacity(x: number, y: number): CrossFormula { return f('wind-capacity', 'capacity(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'capacity', [x, y]) }
  /** rated(x, y) = x · y. */
  static rated(x: number, y: number): CrossFormula { return f('wind-rated', 'rated(x, y) = x · y', x * y, nat(x, y), 'rated', [x, y]) }
  /** tipratio(x, y) = x / y. */
  static tipratio(x: number, y: number): CrossFormula { return f('wind-tipratio', 'tipratio(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'tipratio', [x, y]) }
  /** farm(x, y) = x · y. */
  static farm(x: number, y: number): CrossFormula { return f('wind-farm', 'farm(x, y) = x · y', x * y, nat(x, y), 'farm', [x, y]) }
  /** blades(x, y) = x + y. */
  static blades(x: number, y: number): CrossFormula { return f('wind-blades', 'blades(x, y) = x + y', x + y, nat(x, y), 'blades', [x, y]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('wind-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['blades', 'capacity', 'farm', 'pairs', 'power', 'rated', 'tipratio', 'turbines'] as const)
  hexRegisterOf('wind', name, (WindFormulas[name] as (...x: unknown[]) => unknown).bind(WindFormulas))
