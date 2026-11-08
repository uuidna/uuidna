import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ModularFormulas — 8 exact-integer formulas of the modular domain, each at a hex address crossing to cross; develops the modular leads. */

const PROOF = "modular counts: residue(x, y) = x mod y; inverse(x, y) = x / y; classes(x, y) = x mod y; order(x, y) = x / y; power(x) = 2^x; gcd(x, y) = min(x, y); ring(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'modular', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `modular.${name}`, params })

export class ModularFormulas {
  /** residue(x, y) = x mod y. */
  static residue(x: number, y: number): CrossFormula { return f('modular-residue', 'residue(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'residue', [x, y]) }
  /** inverse(x, y) = x / y. */
  static inverse(x: number, y: number): CrossFormula { return f('modular-inverse', 'inverse(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'inverse', [x, y]) }
  /** classes(x, y) = x mod y. */
  static classes(x: number, y: number): CrossFormula { return f('modular-classes', 'classes(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'classes', [x, y]) }
  /** order(x, y) = x / y. */
  static order(x: number, y: number): CrossFormula { return f('modular-order', 'order(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'order', [x, y]) }
  /** power(x) = 2^x. */
  static power(x: number): CrossFormula { return f('modular-power', 'power(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'power', [x]) }
  /** gcd(x, y) = min(x, y). */
  static gcd(x: number, y: number): CrossFormula { return f('modular-gcd', 'gcd(x, y) = min(x, y)', Math.min(x, y), nat(x, y), 'gcd', [x, y]) }
  /** ring(x, y) = x + y. */
  static ring(x: number, y: number): CrossFormula { return f('modular-ring', 'ring(x, y) = x + y', x + y, nat(x, y), 'ring', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('modular-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['classes', 'combos', 'gcd', 'inverse', 'order', 'power', 'residue', 'ring'] as const)
  hexRegisterOf('modular', name, (ModularFormulas[name] as (...x: unknown[]) => unknown).bind(ModularFormulas))
