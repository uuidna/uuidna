import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BeamFormulas — 8 exact-integer formulas of the beam domain, each at a hex address crossing to cross; develops the beam leads. */

const PROOF = "beam counts: moment(x, y) = x · y; deflection(x, y) = x / y; span(x, y) = x · y; load(x, y) = x · y; supports(x, y) = x + y; sections(x, y) = x + y; safety(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'beam', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `beam.${name}`, params })

export class BeamFormulas {
  /** moment(x, y) = x · y. */
  static moment(x: number, y: number): CrossFormula { return f('beam-moment', 'moment(x, y) = x · y', x * y, nat(x, y), 'moment', [x, y]) }
  /** deflection(x, y) = x / y. */
  static deflection(x: number, y: number): CrossFormula { return f('beam-deflection', 'deflection(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'deflection', [x, y]) }
  /** span(x, y) = x · y. */
  static span(x: number, y: number): CrossFormula { return f('beam-span', 'span(x, y) = x · y', x * y, nat(x, y), 'span', [x, y]) }
  /** load(x, y) = x · y. */
  static load(x: number, y: number): CrossFormula { return f('beam-load', 'load(x, y) = x · y', x * y, nat(x, y), 'load', [x, y]) }
  /** supports(x, y) = x + y. */
  static supports(x: number, y: number): CrossFormula { return f('beam-supports', 'supports(x, y) = x + y', x + y, nat(x, y), 'supports', [x, y]) }
  /** sections(x, y) = x + y. */
  static sections(x: number, y: number): CrossFormula { return f('beam-sections', 'sections(x, y) = x + y', x + y, nat(x, y), 'sections', [x, y]) }
  /** safety(x, y) = x / y. */
  static safety(x: number, y: number): CrossFormula { return f('beam-safety', 'safety(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'safety', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('beam-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'deflection', 'load', 'moment', 'safety', 'sections', 'span', 'supports'] as const)
  hexRegisterOf('beam', name, (BeamFormulas[name] as (...x: unknown[]) => unknown).bind(BeamFormulas))
