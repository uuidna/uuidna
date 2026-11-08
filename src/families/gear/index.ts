import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GearFormulas — 8 exact-integer formulas of the gear domain, each at a hex address crossing to cross; develops the gear leads. */

const PROOF = "gear counts: ratio(x, y) = x / y; torque(x, y) = x · y; rpm(x, y) = x / y; teeth(x, y) = x + y; mesh(x, y) = x · y; stages(x) = 2^x; backlash(x, y) = max(0, x − y); pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'gear', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `gear.${name}`, params })

export class GearFormulas {
  /** ratio(x, y) = x / y. */
  static ratio(x: number, y: number): CrossFormula { return f('gear-ratio', 'ratio(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  /** torque(x, y) = x · y. */
  static torque(x: number, y: number): CrossFormula { return f('gear-torque', 'torque(x, y) = x · y', x * y, nat(x, y), 'torque', [x, y]) }
  /** rpm(x, y) = x / y. */
  static rpm(x: number, y: number): CrossFormula { return f('gear-rpm', 'rpm(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rpm', [x, y]) }
  /** teeth(x, y) = x + y. */
  static teeth(x: number, y: number): CrossFormula { return f('gear-teeth', 'teeth(x, y) = x + y', x + y, nat(x, y), 'teeth', [x, y]) }
  /** mesh(x, y) = x · y. */
  static mesh(x: number, y: number): CrossFormula { return f('gear-mesh', 'mesh(x, y) = x · y', x * y, nat(x, y), 'mesh', [x, y]) }
  /** stages(x) = 2^x. */
  static stages(x: number): CrossFormula { return f('gear-stages', 'stages(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'stages', [x]) }
  /** backlash(x, y) = max(0, x − y). */
  static backlash(x: number, y: number): CrossFormula { return f('gear-backlash', 'backlash(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'backlash', [x, y]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('gear-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['backlash', 'mesh', 'pairs', 'ratio', 'rpm', 'stages', 'teeth', 'torque'] as const)
  hexRegisterOf('gear', name, (GearFormulas[name] as (...x: unknown[]) => unknown).bind(GearFormulas))
