import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CometFormulas — 8 exact-integer formulas of the comet domain, each at a hex address crossing to cross; develops the comet leads. */

const PROOF = "comet counts: period(x, y) = x · y; tail(x, y) = x · y; nucleus(x, y) = x · y; perihelion(x, y) = x / y; orbits(x, y) = x + y; outgassing(x, y) = x · 100 / y; aphelion(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'comet', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `comet.${name}`, params })

export class CometFormulas {
  /** period(x, y) = x · y. */
  static period(x: number, y: number): CrossFormula { return f('comet-period', 'period(x, y) = x · y', x * y, nat(x, y), 'period', [x, y]) }
  /** tail(x, y) = x · y. */
  static tail(x: number, y: number): CrossFormula { return f('comet-tail', 'tail(x, y) = x · y', x * y, nat(x, y), 'tail', [x, y]) }
  /** nucleus(x, y) = x · y. */
  static nucleus(x: number, y: number): CrossFormula { return f('comet-nucleus', 'nucleus(x, y) = x · y', x * y, nat(x, y), 'nucleus', [x, y]) }
  /** perihelion(x, y) = x / y. */
  static perihelion(x: number, y: number): CrossFormula { return f('comet-perihelion', 'perihelion(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'perihelion', [x, y]) }
  /** orbits(x, y) = x + y. */
  static orbits(x: number, y: number): CrossFormula { return f('comet-orbits', 'orbits(x, y) = x + y', x + y, nat(x, y), 'orbits', [x, y]) }
  /** outgassing(x, y) = x · 100 / y. */
  static outgassing(x: number, y: number): CrossFormula { return f('comet-outgassing', 'outgassing(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'outgassing', [x, y]) }
  /** aphelion(x, y) = x · y. */
  static aphelion(x: number, y: number): CrossFormula { return f('comet-aphelion', 'aphelion(x, y) = x · y', x * y, nat(x, y), 'aphelion', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('comet-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['aphelion', 'combos', 'nucleus', 'orbits', 'outgassing', 'perihelion', 'period', 'tail'] as const)
  hexRegisterOf('comet', name, (CometFormulas[name] as (...x: unknown[]) => unknown).bind(CometFormulas))
