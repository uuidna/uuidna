import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AntennaFormulas — 8 exact-integer formulas of the antenna domain, each at a hex address crossing to cross; develops the antenna leads. */

const PROOF = "antenna counts: gain(x, y) = x · y; elements(x, y) = x + y; frequency(x, y) = x · y; wavelength(x, y) = x / y; arrays(x, y) = x · y; beamwidth(x, y) = max(0, x − y); bands(x, y) = x + y; pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'antenna', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `antenna.${name}`, params })

export class AntennaFormulas {
  /** gain(x, y) = x · y. */
  static gain(x: number, y: number): CrossFormula { return f('antenna-gain', 'gain(x, y) = x · y', x * y, nat(x, y), 'gain', [x, y]) }
  /** elements(x, y) = x + y. */
  static elements(x: number, y: number): CrossFormula { return f('antenna-elements', 'elements(x, y) = x + y', x + y, nat(x, y), 'elements', [x, y]) }
  /** frequency(x, y) = x · y. */
  static frequency(x: number, y: number): CrossFormula { return f('antenna-frequency', 'frequency(x, y) = x · y', x * y, nat(x, y), 'frequency', [x, y]) }
  /** wavelength(x, y) = x / y. */
  static wavelength(x: number, y: number): CrossFormula { return f('antenna-wavelength', 'wavelength(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'wavelength', [x, y]) }
  /** arrays(x, y) = x · y. */
  static arrays(x: number, y: number): CrossFormula { return f('antenna-arrays', 'arrays(x, y) = x · y', x * y, nat(x, y), 'arrays', [x, y]) }
  /** beamwidth(x, y) = max(0, x − y). */
  static beamwidth(x: number, y: number): CrossFormula { return f('antenna-beamwidth', 'beamwidth(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'beamwidth', [x, y]) }
  /** bands(x, y) = x + y. */
  static bands(x: number, y: number): CrossFormula { return f('antenna-bands', 'bands(x, y) = x + y', x + y, nat(x, y), 'bands', [x, y]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('antenna-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['arrays', 'bands', 'beamwidth', 'elements', 'frequency', 'gain', 'pairs', 'wavelength'] as const)
  hexRegisterOf('antenna', name, (AntennaFormulas[name] as (...x: unknown[]) => unknown).bind(AntennaFormulas))
