import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SolarFormulas — 8 exact-integer formulas of the solar domain, each at a hex address crossing to cross; develops the solar leads. */

const PROOF = "solar counts: output(x, y) = x · y; efficiency(x, y) = x · 100 / y; daily(x, y) = x · y; array(x, y) = x · y; panels(x, y) = x + y; irradiance(x, y) = x · y; strings(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'solar', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `solar.${name}`, params })

export class SolarFormulas {
  /** output(x, y) = x · y. */
  static output(x: number, y: number): CrossFormula { return f('solar-output', 'output(x, y) = x · y', x * y, nat(x, y), 'output', [x, y]) }
  /** efficiency(x, y) = x · 100 / y. */
  static efficiency(x: number, y: number): CrossFormula { return f('solar-efficiency', 'efficiency(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  /** daily(x, y) = x · y. */
  static daily(x: number, y: number): CrossFormula { return f('solar-daily', 'daily(x, y) = x · y', x * y, nat(x, y), 'daily', [x, y]) }
  /** array(x, y) = x · y. */
  static array(x: number, y: number): CrossFormula { return f('solar-array', 'array(x, y) = x · y', x * y, nat(x, y), 'array', [x, y]) }
  /** panels(x, y) = x + y. */
  static panels(x: number, y: number): CrossFormula { return f('solar-panels', 'panels(x, y) = x + y', x + y, nat(x, y), 'panels', [x, y]) }
  /** irradiance(x, y) = x · y. */
  static irradiance(x: number, y: number): CrossFormula { return f('solar-irradiance', 'irradiance(x, y) = x · y', x * y, nat(x, y), 'irradiance', [x, y]) }
  /** strings(x, y) = x · y. */
  static strings(x: number, y: number): CrossFormula { return f('solar-strings', 'strings(x, y) = x · y', x * y, nat(x, y), 'strings', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('solar-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['array', 'combos', 'daily', 'efficiency', 'irradiance', 'output', 'panels', 'strings'] as const)
  hexRegisterOf('solar', name, (SolarFormulas[name] as (...x: unknown[]) => unknown).bind(SolarFormulas))
