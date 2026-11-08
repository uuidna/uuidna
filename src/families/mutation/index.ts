import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MutationFormulas — 8 exact-integer formulas of the mutation domain, each at a hex address crossing to cross; develops the mutation leads. */

const PROOF = "mutation counts: rate(x, y) = x / y; types(x, y) = x + y; substitutions(x, y) = x · y; frequency(x, y) = x · 1000 / y; hotspots(x, y) = x · y; silent(x, y) = x · 100 / y; generations(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'mutation', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `mutation.${name}`, params })

export class MutationFormulas {
  /** rate(x, y) = x / y. */
  static rate(x: number, y: number): CrossFormula { return f('mutation-rate', 'rate(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rate', [x, y]) }
  /** types(x, y) = x + y. */
  static types(x: number, y: number): CrossFormula { return f('mutation-types', 'types(x, y) = x + y', x + y, nat(x, y), 'types', [x, y]) }
  /** substitutions(x, y) = x · y. */
  static substitutions(x: number, y: number): CrossFormula { return f('mutation-substitutions', 'substitutions(x, y) = x · y', x * y, nat(x, y), 'substitutions', [x, y]) }
  /** frequency(x, y) = x · 1000 / y. */
  static frequency(x: number, y: number): CrossFormula { return f('mutation-frequency', 'frequency(x, y) = x · 1000 / y', y > 0 ? Math.floor((x * 1000) / y) : 0, nat(x, y) && y > 0, 'frequency', [x, y]) }
  /** hotspots(x, y) = x · y. */
  static hotspots(x: number, y: number): CrossFormula { return f('mutation-hotspots', 'hotspots(x, y) = x · y', x * y, nat(x, y), 'hotspots', [x, y]) }
  /** silent(x, y) = x · 100 / y. */
  static silent(x: number, y: number): CrossFormula { return f('mutation-silent', 'silent(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'silent', [x, y]) }
  /** generations(x, y) = x · y. */
  static generations(x: number, y: number): CrossFormula { return f('mutation-generations', 'generations(x, y) = x · y', x * y, nat(x, y), 'generations', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('mutation-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'frequency', 'generations', 'hotspots', 'rate', 'silent', 'substitutions', 'types'] as const)
  hexRegisterOf('mutation', name, (MutationFormulas[name] as (...x: unknown[]) => unknown).bind(MutationFormulas))
