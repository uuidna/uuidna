import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NebulaFormulas — 8 exact-integer formulas of the nebula domain, each at a hex address crossing to cross; develops the nebula leads. */

const PROOF = "nebula counts: radius(x, y) = x · y; density(x, y) = x · y; types(x, y) = x + y; temperature(x, y) = x · y; ionization(x, y) = x · 100 / y; lightyears(x, y) = x · y; stars(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'nebula', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `nebula.${name}`, params })

export class NebulaFormulas {
  /** radius(x, y) = x · y. */
  static radius(x: number, y: number): CrossFormula { return f('nebula-radius', 'radius(x, y) = x · y', x * y, nat(x, y), 'radius', [x, y]) }
  /** density(x, y) = x · y. */
  static density(x: number, y: number): CrossFormula { return f('nebula-density', 'density(x, y) = x · y', x * y, nat(x, y), 'density', [x, y]) }
  /** types(x, y) = x + y. */
  static types(x: number, y: number): CrossFormula { return f('nebula-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) }
  /** temperature(x, y) = x · y. */
  static temperature(x: number, y: number): CrossFormula { return f('nebula-temperature', 'temperature(x, y) = x · y', x * y, nat(x, y), 'temperature', [x, y]) }
  /** ionization(x, y) = x · 100 / y. */
  static ionization(x: number, y: number): CrossFormula { return f('nebula-ionization', 'ionization(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ionization', [x, y]) }
  /** lightyears(x, y) = x · y. */
  static lightyears(x: number, y: number): CrossFormula { return f('nebula-lightyears', 'lightyears(x, y) = x · y', x * y, nat(x, y), 'lightyears', [x, y]) }
  /** stars(x, y) = x · y. */
  static stars(x: number, y: number): CrossFormula { return f('nebula-stars', 'stars(x, y) = x · y', x * y, nat(x, y), 'stars', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('nebula-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'density', 'ionization', 'lightyears', 'radius', 'stars', 'temperature', 'types'] as const)
  hexRegisterOf('nebula', name, (NebulaFormulas[name] as (...x: unknown[]) => unknown).bind(NebulaFormulas))
