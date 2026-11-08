import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ProjectileFormulas — 8 exact-integer formulas of the projectile domain, each at a hex address crossing to cross; develops the projectile leads. */

const PROOF = "projectile counts: range(x, y) = x · y; height(x, y) = x / y; time(x, y) = x / y; velocity(x, y) = x · y; angle(x, y) = max(0, x − y); impact(x, y) = x · y; arc(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'projectile', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `projectile.${name}`, params })

export class ProjectileFormulas {
  /** range(x, y) = x · y. */
  static range(x: number, y: number): CrossFormula { return f('projectile-range', 'range(x, y) = x · y', x * y, nat(x, y), 'range', [x, y]) }
  /** height(x, y) = x / y. */
  static height(x: number, y: number): CrossFormula { return f('projectile-height', 'height(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'height', [x, y]) }
  /** time(x, y) = x / y. */
  static time(x: number, y: number): CrossFormula { return f('projectile-time', 'time(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'time', [x, y]) }
  /** velocity(x, y) = x · y. */
  static velocity(x: number, y: number): CrossFormula { return f('projectile-velocity', 'velocity(x, y) = x · y', x * y, nat(x, y), 'velocity', [x, y]) }
  /** angle(x, y) = max(0, x − y). */
  static angle(x: number, y: number): CrossFormula { return f('projectile-angle', 'angle(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'angle', [x, y]) }
  /** impact(x, y) = x · y. */
  static impact(x: number, y: number): CrossFormula { return f('projectile-impact', 'impact(x, y) = x · y', x * y, nat(x, y), 'impact', [x, y]) }
  /** arc(x, y) = x + y. */
  static arc(x: number, y: number): CrossFormula { return f('projectile-arc', 'arc(x, y) = x + y', x + y, nat(x, y), 'arc', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('projectile-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['angle', 'arc', 'combos', 'height', 'impact', 'range', 'time', 'velocity'] as const)
  hexRegisterOf('projectile', name, (ProjectileFormulas[name] as (...x: unknown[]) => unknown).bind(ProjectileFormulas))
