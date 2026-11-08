import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GalaxyFormulas — 8 exact-integer formulas of the galaxy domain, each at a hex address crossing to cross; develops the galaxy leads. */

const PROOF = "galaxy counts: stars(x, y) = x · y; arms(x, y) = x + y; diameter(x, y) = x · y; redshift(x, y) = x · 1000 / y; types(x, y) = x + y; clusters(x, y) = x · y; blackholes(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'galaxy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `galaxy.${name}`, params })

export class GalaxyFormulas {
  /** stars(x, y) = x · y. */
  static stars(x: number, y: number): CrossFormula { return f('galaxy-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) }
  /** arms(x, y) = x + y. */
  static arms(x: number, y: number): CrossFormula { return f('galaxy-arms', 'arms(x, y) = x + y', x + y, nat(x, y), 'arms', [x, y]) }
  /** diameter(x, y) = x · y. */
  static diameter(x: number, y: number): CrossFormula { return f('galaxy-diameter', 'diameter(x, y) = x · y', x * y, nat(x, y), 'diameter', [x, y]) }
  /** redshift(x, y) = x · 1000 / y. */
  static redshift(x: number, y: number): CrossFormula { return f('galaxy-redshift', 'redshift(x, y) = x · 1000 / y', y > 0 ? Math.floor((x * 1000) / y) : 0, nat(x, y) && y > 0, 'redshift', [x, y]) }
  /** types(x, y) = x + y. */
  static types(x: number, y: number): CrossFormula { return f('galaxy-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) }
  /** clusters(x, y) = x · y. */
  static clusters(x: number, y: number): CrossFormula { return f('galaxy-clusters', 'clusters(x, y) = x · y', x * y, nat(x, y), 'clusters', [x, y]) }
  /** blackholes(x, y) = x + y. */
  static blackholes(x: number, y: number): CrossFormula { return f('galaxy-blackholes', 'blackholes(x, y) = x + y', x + y, nat(x, y), 'blackholes', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('galaxy-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['arms', 'blackholes', 'clusters', 'combos', 'diameter', 'redshift', 'stars', 'types'] as const)
  hexRegisterOf('galaxy', name, (GalaxyFormulas[name] as (...x: unknown[]) => unknown).bind(GalaxyFormulas))
