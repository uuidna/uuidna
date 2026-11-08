import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** SURVEYING — THE FIELD BOOK AS ARITHMETIC (chosen by the land-survey registry, not by hand). Running a traverse is
 *  numbers: the forward bearing off a back-bearing, the chained length of the legs, the height of instrument carried
 *  bench to bench, the grade of a run, a parcel's area, the contour lines a cut crosses, the offset stakes along a
 *  station line, and the closure precision of the loop. Crosses to `civil` — surveying is what civil engineering sets
 *  out from. A measure. */

const PROOF = 'surveying arithmetic (forward bearing, chained traverse, elevation by height of instrument, grade, parcel area, contour lines, offset stakes, closure precision); the land-survey domain; a measure crossed to civil'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'surveying', dst: 'civil', formula, value, proof: PROOF, ...extra }, holds, { name: `surveying.${name}`, params })

export class SurveyingFormulas {
  /** FORWARD BEARING: the back-bearing turned through the interior angle, wrapped to the circle. value (back + angle) mod 360. */
  static bearing(back: number, angle: number): CrossFormula { return c('surveying-bearing', 'bearing(back, angle) = (back + angle) mod 360', (back + angle) % fullTurn, nat(back, angle), 'bearing', [back, angle]) }
  /** TRAVERSE: the chained length of the legs at a chain each. value legs · chain. */
  static traverse(legs: number, chain: number): CrossFormula { return c('surveying-traverse', 'traverse(legs, chain) = legs · chain', legs * chain, nat(legs, chain), 'traverse', [legs, chain]) }
  /** ELEVATION by height of instrument: the bench plus backsight less foresight. value max(0, bench + bs − fs). */
  static elevation(bench: number, bs: number, fs: number): CrossFormula { return c('surveying-elevation', 'elevation(bench, bs, fs) = max(0, bench + bs − fs)', Math.max(0, bench + bs - fs), nat(bench, bs, fs), 'elevation', [bench, bs, fs]) }
  /** GRADE as a percentage: the rise over the run. value ⌊rise · 100 / run⌋. */
  static grade(rise: number, run: number): CrossFormula { return c('surveying-grade', 'grade(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'grade', [rise, run]) }
  /** PARCEL AREA of a triangle: half the base times the height. value ⌊base · height / 2⌋. */
  static area(base: number, height: number): CrossFormula { return c('surveying-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base, height), 'area', [base, height]) }
  /** CONTOUR LINES a cut crosses between two elevations at an interval. value ⌊max(0, high − low) / interval⌋. */
  static contour(high: number, low: number, interval: number): CrossFormula { return c('surveying-contour', 'contour(high, low, interval) = ⌊max(0, high − low) / interval⌋', interval > 0 ? Math.floor(Math.max(0, high - low) / interval) : 0, nat(high, low, interval) && interval > 0 && high >= low, 'contour', [high, low, interval]) }
  /** OFFSET STAKES along a station line at an interval. value ⌊station / interval⌋. */
  static offset(station: number, interval: number): CrossFormula { return c('surveying-offset', 'offset(station, interval) = ⌊station / interval⌋', interval > 0 ? Math.floor(station / interval) : 0, nat(station, interval) && interval > 0, 'offset', [station, interval]) }
  /** CLOSURE precision of the loop: the perimeter over the misclosure (reported as 1:value). value ⌊perimeter / misclose⌋. */
  static closure(perimeter: number, misclose: number): CrossFormula { return c('surveying-closure', 'closure(perimeter, misclose) = ⌊perimeter / misclose⌋', misclose > 0 ? Math.floor(perimeter / misclose) : 0, nat(perimeter, misclose) && misclose > 0, 'closure', [perimeter, misclose]) }
}

for (const name of ['area', 'bearing', 'closure', 'contour', 'elevation', 'grade', 'offset', 'traverse'] as const)
  hexRegisterOf('surveying', name, (SurveyingFormulas[name] as (...x: unknown[]) => unknown).bind(SurveyingFormulas))
