import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EclipseFormulas — 8 exact-integer formulas of the eclipse domain, each at a hex address crossing to cross; develops the eclipse leads. */

const PROOF = "eclipse counts: saros(x, y) = x + y; duration(x, y) = x / y; magnitude(x, y) = x · 100 / y; types(x, y) = x + y; path(x, y) = x · y; frequency(x, y) = x / y; contacts(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'eclipse', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `eclipse.${name}`, params })

export class EclipseFormulas {
  /** saros(x, y) = x + y. */
  static saros(x: number, y: number): CrossFormula { return f('eclipse-saros', 'saros(x, y) = x + y', x + y, nat(x, y), 'saros', [x, y]) }
  /** duration(x, y) = x / y. */
  static duration(x: number, y: number): CrossFormula { return f('eclipse-duration', 'duration(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'duration', [x, y]) }
  /** magnitude(x, y) = x · 100 / y. */
  static magnitude(x: number, y: number): CrossFormula { return f('eclipse-magnitude', 'magnitude(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'magnitude', [x, y]) }
  /** types(x, y) = x + y. */
  static types(x: number, y: number): CrossFormula { return f('eclipse-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) }
  /** path(x, y) = x · y. */
  static path(x: number, y: number): CrossFormula { return f('eclipse-path', 'path(x, y) = x · y', x * y, nat(x, y), 'path', [x, y]) }
  /** frequency(x, y) = x / y. */
  static frequency(x: number, y: number): CrossFormula { return f('eclipse-frequency', 'frequency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frequency', [x, y]) }
  /** contacts(x, y) = x + y. */
  static contacts(x: number, y: number): CrossFormula { return f('eclipse-contacts', 'contacts(x, y) = x + y', x + y, nat(x, y), 'contacts', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('eclipse-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'contacts', 'duration', 'frequency', 'magnitude', 'path', 'saros', 'types'] as const)
  hexRegisterOf('eclipse', name, (EclipseFormulas[name] as (...x: unknown[]) => unknown).bind(EclipseFormulas))
