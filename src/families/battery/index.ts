import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BatteryFormulas — 8 exact-integer formulas of the battery domain, each at a hex address crossing to cross; develops the battery leads. */

const PROOF = "battery counts: capacity(x, y) = x · y; cells(x, y) = x + y; runtime(x, y) = x / y; cyclelife(x, y) = x · y; voltage(x, y) = x · y; chargepct(x, y) = x · 100 / y; packs(x, y) = x · y; seriescombos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'battery', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `battery.${name}`, params })

export class BatteryFormulas {
  /** capacity(x, y) = x · y. */
  static capacity(x: number, y: number): CrossFormula { return f('battery-capacity', 'capacity(x, y) = x · y', x * y, nat(x, y), 'capacity', [x, y]) }
  /** cells(x, y) = x + y. */
  static cells(x: number, y: number): CrossFormula { return f('battery-cells', 'cells(x, y) = x + y', x + y, nat(x, y), 'cells', [x, y]) }
  /** runtime(x, y) = x / y. */
  static runtime(x: number, y: number): CrossFormula { return f('battery-runtime', 'runtime(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'runtime', [x, y]) }
  /** cyclelife(x, y) = x · y. */
  static cyclelife(x: number, y: number): CrossFormula { return f('battery-cyclelife', 'cyclelife(x, y) = x · y', x * y, nat(x, y), 'cyclelife', [x, y]) }
  /** voltage(x, y) = x · y. */
  static voltage(x: number, y: number): CrossFormula { return f('battery-voltage', 'voltage(x, y) = x · y', x * y, nat(x, y), 'voltage', [x, y]) }
  /** chargepct(x, y) = x · 100 / y. */
  static chargepct(x: number, y: number): CrossFormula { return f('battery-chargepct', 'chargepct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'chargepct', [x, y]) }
  /** packs(x, y) = x · y. */
  static packs(x: number, y: number): CrossFormula { return f('battery-packs', 'packs(x, y) = x · y', x * y, nat(x, y), 'packs', [x, y]) }
  /** seriescombos(x, y) = C(x, y). */
  static seriescombos(x: number, y: number): CrossFormula { return f('battery-seriescombos', 'seriescombos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'seriescombos', [x, y]) }
}

for (const name of ['capacity', 'cells', 'chargepct', 'cyclelife', 'packs', 'runtime', 'seriescombos', 'voltage'] as const)
  hexRegisterOf('battery', name, (BatteryFormulas[name] as (...x: unknown[]) => unknown).bind(BatteryFormulas))
