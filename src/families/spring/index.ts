import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SpringFormulas — 8 exact-integer formulas of the spring domain, each at a hex address crossing to cross; develops the spring leads. */

const PROOF = "spring counts: force(x, y) = x · y; constant(x, y) = x · y; coils(x, y) = x + y; deflection(x, y) = x / y; energy(x, y) = x / y; series(x, y) = x + y; parallelsum(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'spring', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `spring.${name}`, params })

export class SpringFormulas {
  /** force(x, y) = x · y. */
  static force(x: number, y: number): CrossFormula { return f('spring-force', 'force(x, y) = x · y', x * y, nat(x, y), 'force', [x, y]) }
  /** constant(x, y) = x · y. */
  static constant(x: number, y: number): CrossFormula { return f('spring-constant', 'constant(x, y) = x · y', x * y, nat(x, y), 'constant', [x, y]) }
  /** coils(x, y) = x + y. */
  static coils(x: number, y: number): CrossFormula { return f('spring-coils', 'coils(x, y) = x + y', x + y, nat(x, y), 'coils', [x, y]) }
  /** deflection(x, y) = x / y. */
  static deflection(x: number, y: number): CrossFormula { return f('spring-deflection', 'deflection(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'deflection', [x, y]) }
  /** energy(x, y) = x / y. */
  static energy(x: number, y: number): CrossFormula { return f('spring-energy', 'energy(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'energy', [x, y]) }
  /** series(x, y) = x + y. */
  static series(x: number, y: number): CrossFormula { return f('spring-series', 'series(x, y) = x + y', x + y, nat(x, y), 'series', [x, y]) }
  /** parallelsum(x, y) = x + y. */
  static parallelsum(x: number, y: number): CrossFormula { return f('spring-parallelsum', 'parallelsum(x, y) = x + y', x + y, nat(x, y), 'parallelsum', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('spring-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['coils', 'combos', 'constant', 'deflection', 'energy', 'force', 'parallelsum', 'series'] as const)
  hexRegisterOf('spring', name, (SpringFormulas[name] as (...x: unknown[]) => unknown).bind(SpringFormulas))
