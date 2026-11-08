import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** StarFormulas — 8 exact-integer formulas of the star domain, each at a hex address crossing to cross; develops the star leads. */

const PROOF = "star counts: luminosity(x, y) = x · y; magnitude(x, y) = max(0, x − y); parsecs(x, y) = x / y; mass(x, y) = x · y; classes(x, y) = x + y; lifetime(x, y) = x · y; radius(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'star', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `star.${name}`, params })

export class StarFormulas {
  /** luminosity(x, y) = x · y. */
  static luminosity(x: number, y: number): CrossFormula { return f('star-luminosity', 'luminosity(x, y) = x · y', x * y, nat(x, y), 'luminosity', [x, y]) }
  /** magnitude(x, y) = max(0, x − y). */
  static magnitude(x: number, y: number): CrossFormula { return f('star-magnitude', 'magnitude(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'magnitude', [x, y]) }
  /** parsecs(x, y) = x / y. */
  static parsecs(x: number, y: number): CrossFormula { return f('star-parsecs', 'parsecs(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'parsecs', [x, y]) }
  /** mass(x, y) = x · y. */
  static mass(x: number, y: number): CrossFormula { return f('star-mass', 'mass(x, y) = x · y', x * y, nat(x, y), 'mass', [x, y]) }
  /** classes(x, y) = x + y. */
  static classes(x: number, y: number): CrossFormula { return f('star-classes', 'classes(x, y) = x + y', x + y, nat(x, y), 'classes', [x, y]) }
  /** lifetime(x, y) = x · y. */
  static lifetime(x: number, y: number): CrossFormula { return f('star-lifetime', 'lifetime(x, y) = x · y', x * y, nat(x, y), 'lifetime', [x, y]) }
  /** radius(x, y) = x · y. */
  static radius(x: number, y: number): CrossFormula { return f('star-radius', 'radius(x, y) = x · y', x * y, nat(x, y), 'radius', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('star-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['classes', 'combos', 'lifetime', 'luminosity', 'magnitude', 'mass', 'parsecs', 'radius'] as const)
  hexRegisterOf('star', name, (StarFormulas[name] as (...x: unknown[]) => unknown).bind(StarFormulas))
