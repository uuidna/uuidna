import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PlanetFormulas — 8 exact-integer formulas of the planet domain, each at a hex address crossing to cross; develops the planet leads. */

const PROOF = "planet counts: orbit(x, y) = x · y; moons(x, y) = x + y; radius(x, y) = x · y; gravity(x, y) = x / y; axialtilt(x, y) = max(0, x − y); day(x, y) = x / y; rings(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'planet', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `planet.${name}`, params })

export class PlanetFormulas {
  /** orbit(x, y) = x · y. */
  static orbit(x: number, y: number): CrossFormula { return f('planet-orbit', 'orbit(x, y) = x · y', x * y, nat(x, y), 'orbit', [x, y]) }
  /** moons(x, y) = x + y. */
  static moons(x: number, y: number): CrossFormula { return f('planet-moons', 'moons(x, y) = x + y', x + y, nat(x, y), 'moons', [x, y]) }
  /** radius(x, y) = x · y. */
  static radius(x: number, y: number): CrossFormula { return f('planet-radius', 'radius(x, y) = x · y', x * y, nat(x, y), 'radius', [x, y]) }
  /** gravity(x, y) = x / y. */
  static gravity(x: number, y: number): CrossFormula { return f('planet-gravity', 'gravity(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'gravity', [x, y]) }
  /** axialtilt(x, y) = max(0, x − y). */
  static axialtilt(x: number, y: number): CrossFormula { return f('planet-axialtilt', 'axialtilt(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'axialtilt', [x, y]) }
  /** day(x, y) = x / y. */
  static day(x: number, y: number): CrossFormula { return f('planet-day', 'day(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'day', [x, y]) }
  /** rings(x, y) = x + y. */
  static rings(x: number, y: number): CrossFormula { return f('planet-rings', 'rings(x, y) = x + y', x + y, nat(x, y), 'rings', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('planet-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['axialtilt', 'combos', 'day', 'gravity', 'moons', 'orbit', 'radius', 'rings'] as const)
  hexRegisterOf('planet', name, (PlanetFormulas[name] as (...x: unknown[]) => unknown).bind(PlanetFormulas))
