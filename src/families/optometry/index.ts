import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OPTOMETRY — SEEING, AS ARITHMETIC. The eye measured: visual acuity on the Snellen 20/x scale, lens power in diopters,
 *  astigmatism from cylinder over axis, the accommodation range from near to far, pupil diameter, contrast as a percentage,
 *  refraction from incidence over the medium's index, and the field of view in degrees. Crosses to `med` — optometry is a
 *  medical measure. A measure. */

const PROOF = 'optometry arithmetic (acuity, diopter, astigmatism, accommodation, pupil, contrast, refraction, field); the eye as integers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'optometry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `optometry.${name}`, params })

export class OptometryFormulas {
  /** VISUAL ACUITY: the Snellen 20/x proxy from the test and letter distances. value ⌊testdistance · 20 / letterdistance⌋. */
  static acuity(testdistance: number, letterdistance: number): CrossFormula { return c('optometry-acuity', 'acuity(testdistance, letterdistance) = ⌊testdistance · 20 / letterdistance⌋', letterdistance > 0 ? Math.floor((testdistance * 20) / letterdistance) : 0, nat(testdistance, letterdistance) && letterdistance > 0, 'acuity', [testdistance, letterdistance]) }
  /** DIOPTER: lens power from focal length in millimetres (×1000). value ⌊1000000 / focalmm⌋. */
  static diopter(focalmm: number): CrossFormula { return c('optometry-diopter', 'diopter(focalmm) = ⌊1000000 / focalmm⌋', focalmm > 0 ? Math.floor(1000000 / focalmm) : 0, nat(focalmm) && focalmm > 0, 'diopter', [focalmm]) }
  /** ASTIGMATISM: cylinder over axis. value ⌊cylinder · 100 / axis⌋. */
  static astigmatism(cylinder: number, axis: number): CrossFormula { return c('optometry-astigmatism', 'astigmatism(cylinder, axis) = ⌊cylinder · 100 / axis⌋', axis > 0 ? Math.floor((cylinder * 100) / axis) : 0, nat(cylinder, axis) && axis > 0, 'astigmatism', [cylinder, axis]) }
  /** ACCOMMODATION: the range from near to far. value max(0, near − far). */
  static accommodation(near: number, far: number): CrossFormula { return c('optometry-accommodation', 'accommodation(near, far) = max(0, near − far)', Math.max(0, near - far), nat(near, far), 'accommodation', [near, far]) }
  /** PUPIL: diameter, held as a natural. value diameter. */
  static pupil(diameter: number): CrossFormula { return c('optometry-pupil', 'pupil(diameter) = diameter', diameter, nat(diameter), 'pupil', [diameter]) }
  /** CONTRAST as a percentage: visible over total. value ⌊visible · 100 / total⌋. */
  static contrast(visible: number, total: number): CrossFormula { return c('optometry-contrast', 'contrast(visible, total) = ⌊visible · 100 / total⌋', total > 0 ? Math.floor((visible * 100) / total) : 0, nat(visible, total) && total > 0 && visible <= total, 'contrast', [visible, total]) }
  /** REFRACTION: incidence over the medium's index (×1000). value ⌊incident · 1000 / index⌋. */
  static refraction(incident: number, index: number): CrossFormula { return c('optometry-refraction', 'refraction(incident, index) = ⌊incident · 1000 / index⌋', index > 0 ? Math.floor((incident * 1000) / index) : 0, nat(incident, index) && index > 0, 'refraction', [incident, index]) }
  /** FIELD of view, in degrees, held as a natural. value degrees. */
  static field(degrees: number): CrossFormula { return c('optometry-field', 'field(degrees) = degrees', degrees, nat(degrees), 'field', [degrees]) }
}

for (const name of ['accommodation', 'acuity', 'astigmatism', 'contrast', 'diopter', 'field', 'pupil', 'refraction'] as const)
  hexRegisterOf('optometry', name, (OptometryFormulas[name] as (...x: unknown[]) => unknown).bind(OptometryFormulas))
