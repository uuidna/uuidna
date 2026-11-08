import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PumpFormulas — 8 exact-integer formulas of the pump domain, each at a hex address crossing to cross; develops the pump leads. */

const PROOF = "pump counts: flow(x, y) = x · y; head(x, y) = max(0, x − y); power(x, y) = x · y; stages(x, y) = x + y; efficiency(x, y) = x · 100 / y; impellers(x, y) = x + y; throughput(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'pump', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `pump.${name}`, params })

export class PumpFormulas {
  /** flow(x, y) = x · y. */
  static flow(x: number, y: number): CrossFormula { return f('pump-flow', 'flow(x, y) = x · y', x * y, nat(x, y), 'flow', [x, y]) }
  /** head(x, y) = max(0, x − y). */
  static head(x: number, y: number): CrossFormula { return f('pump-head', 'head(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'head', [x, y]) }
  /** power(x, y) = x · y. */
  static power(x: number, y: number): CrossFormula { return f('pump-power', 'power(x, y) = x · y', x * y, nat(x, y), 'power', [x, y]) }
  /** stages(x, y) = x + y. */
  static stages(x: number, y: number): CrossFormula { return f('pump-stages', 'stages(x, y) = x + y', x + y, nat(x, y), 'stages', [x, y]) }
  /** efficiency(x, y) = x · 100 / y. */
  static efficiency(x: number, y: number): CrossFormula { return f('pump-efficiency', 'efficiency(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  /** impellers(x, y) = x + y. */
  static impellers(x: number, y: number): CrossFormula { return f('pump-impellers', 'impellers(x, y) = x + y', x + y, nat(x, y), 'impellers', [x, y]) }
  /** throughput(x, y) = x / y. */
  static throughput(x: number, y: number): CrossFormula { return f('pump-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('pump-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'efficiency', 'flow', 'head', 'impellers', 'power', 'stages', 'throughput'] as const)
  hexRegisterOf('pump', name, (PumpFormulas[name] as (...x: unknown[]) => unknown).bind(PumpFormulas))
