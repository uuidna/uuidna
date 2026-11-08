import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SurveyFormulas — 8 exact-integer formulas of the survey domain, each at a hex address crossing to cross; develops the survey leads. */

const PROOF = "survey counts: bearings(x, y) = x · y; stations(x, y) = x + y; arcseconds(x, y) = x · y; traverse(x, y) = x · y; gridcells(x, y) = x · y; area(x, y) = x · y; angles(x, y, z) = x + y + z; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'survey', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `survey.${name}`, params })

export class SurveyFormulas {
  /** bearings(x, y) = x · y. */
  static bearings(x: number, y: number): CrossFormula { return f('survey-bearings', 'bearings(x, y) = x · y', x * y, nat(x, y), 'bearings', [x, y]) }
  /** stations(x, y) = x + y. */
  static stations(x: number, y: number): CrossFormula { return f('survey-stations', 'stations(x, y) = x + y', x + y, nat(x, y), 'stations', [x, y]) }
  /** arcseconds(x, y) = x · y. */
  static arcseconds(x: number, y: number): CrossFormula { return f('survey-arcseconds', 'arcseconds(x, y) = x · y', x * y, nat(x, y), 'arcseconds', [x, y]) }
  /** traverse(x, y) = x · y. */
  static traverse(x: number, y: number): CrossFormula { return f('survey-traverse', 'traverse(x, y) = x · y', x * y, nat(x, y), 'traverse', [x, y]) }
  /** gridcells(x, y) = x · y. */
  static gridcells(x: number, y: number): CrossFormula { return f('survey-gridcells', 'gridcells(x, y) = x · y', x * y, nat(x, y), 'gridcells', [x, y]) }
  /** area(x, y) = x · y. */
  static area(x: number, y: number): CrossFormula { return f('survey-area', 'area(x, y) = x · y', x * y, nat(x, y), 'area', [x, y]) }
  /** angles(x, y, z) = x + y + z. */
  static angles(x: number, y: number, z: number): CrossFormula { return f('survey-angles', 'angles(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'angles', [x, y, z]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('survey-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['angles', 'arcseconds', 'area', 'bearings', 'combos', 'gridcells', 'stations', 'traverse'] as const)
  hexRegisterOf('survey', name, (SurveyFormulas[name] as (...x: unknown[]) => unknown).bind(SurveyFormulas))
