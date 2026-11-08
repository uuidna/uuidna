import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CatalystFormulas — 8 exact-integer formulas of the catalyst domain, each at a hex address crossing to cross; develops the catalyst leads. */

const PROOF = "catalyst counts: turnover(x, y) = x · y; sites(x, y) = x · y; efficiency(x, y) = x · 100 / y; activation(x, y) = max(0, x − y); selectivity(x, y) = x · 100 / y; loading(x, y) = x / y; cycles(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'catalyst', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `catalyst.${name}`, params })

export class CatalystFormulas {
  /** turnover(x, y) = x · y. */
  static turnover(x: number, y: number): CrossFormula { return f('catalyst-turnover', 'turnover(x, y) = x · y', x * y, nat(x, y), 'turnover', [x, y]) }
  /** sites(x, y) = x · y. */
  static sites(x: number, y: number): CrossFormula { return f('catalyst-sites', 'sites(x, y) = x · y', x * y, nat(x, y), 'sites', [x, y]) }
  /** efficiency(x, y) = x · 100 / y. */
  static efficiency(x: number, y: number): CrossFormula { return f('catalyst-efficiency', 'efficiency(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  /** activation(x, y) = max(0, x − y). */
  static activation(x: number, y: number): CrossFormula { return f('catalyst-activation', 'activation(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'activation', [x, y]) }
  /** selectivity(x, y) = x · 100 / y. */
  static selectivity(x: number, y: number): CrossFormula { return f('catalyst-selectivity', 'selectivity(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'selectivity', [x, y]) }
  /** loading(x, y) = x / y. */
  static loading(x: number, y: number): CrossFormula { return f('catalyst-loading', 'loading(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'loading', [x, y]) }
  /** cycles(x, y) = x · y. */
  static cycles(x: number, y: number): CrossFormula { return f('catalyst-cycles', 'cycles(x, y) = x · y', x * y, nat(x, y), 'cycles', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('catalyst-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['activation', 'combos', 'cycles', 'efficiency', 'loading', 'selectivity', 'sites', 'turnover'] as const)
  hexRegisterOf('catalyst', name, (CatalystFormulas[name] as (...x: unknown[]) => unknown).bind(CatalystFormulas))
