import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PistonFormulas — 8 exact-integer formulas of the piston domain, each at a hex address crossing to cross; develops the piston leads. */

const PROOF = "piston counts: displacement(x, y) = x · y; stroke(x, y) = x · y; bore(x, y) = x · y; compression(x, y) = x / y; force(x, y) = x · y; cycles(x, y) = x · y; rings(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'piston', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `piston.${name}`, params })

export class PistonFormulas {
  /** displacement(x, y) = x · y. */
  static displacement(x: number, y: number): CrossFormula { return f('piston-displacement', 'displacement(x, y) = x · y', x * y, nat(x, y), 'displacement', [x, y]) }
  /** stroke(x, y) = x · y. */
  static stroke(x: number, y: number): CrossFormula { return f('piston-stroke', 'stroke(x, y) = x · y', x * y, nat(x, y), 'stroke', [x, y]) }
  /** bore(x, y) = x · y. */
  static bore(x: number, y: number): CrossFormula { return f('piston-bore', 'bore(x, y) = x · y', x * y, nat(x, y), 'bore', [x, y]) }
  /** compression(x, y) = x / y. */
  static compression(x: number, y: number): CrossFormula { return f('piston-compression', 'compression(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'compression', [x, y]) }
  /** force(x, y) = x · y. */
  static force(x: number, y: number): CrossFormula { return f('piston-force', 'force(x, y) = x · y', x * y, nat(x, y), 'force', [x, y]) }
  /** cycles(x, y) = x · y. */
  static cycles(x: number, y: number): CrossFormula { return f('piston-cycles', 'cycles(x, y) = x · y', x * y, nat(x, y), 'cycles', [x, y]) }
  /** rings(x, y) = x + y. */
  static rings(x: number, y: number): CrossFormula { return f('piston-rings', 'rings(x, y) = x + y', x + y, nat(x, y), 'rings', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('piston-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['bore', 'combos', 'compression', 'cycles', 'displacement', 'force', 'rings', 'stroke'] as const)
  hexRegisterOf('piston', name, (PistonFormulas[name] as (...x: unknown[]) => unknown).bind(PistonFormulas))
