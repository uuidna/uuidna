import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTOGRAPHY — MAKING LIGHT A PICTURE, AS ARITHMETIC. Exposure is a product; the f-number is focal over diameter; depth
 *  of field grows with aperture and distance; ISO is sensitivity itself; megapixels are width times height; the crop
 *  factor compares a sensor to full frame; dynamic range doubles with each stop; the rule of thirds places subjects.
 *  Crosses to `optics` — photography is optics put to work. A measure. */

const PROOF = 'photography arithmetic (exposure, f-number, depth of field, ISO, megapixels, crop factor, dynamic range, composition); light made a picture; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photography', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `photography.${name}`, params })

export class PhotographyFormulas {
  /** EXPOSURE: an EV proxy, aperture by shutter. value aperture · shutter. */
  static exposure(aperture: number, shutter: number): CrossFormula { return c('photography-exposure', 'exposure(aperture, shutter) = aperture · shutter', aperture * shutter, nat(aperture, shutter), 'exposure', [aperture, shutter]) }
  /** THE F-NUMBER: focal length over diameter, times ten. value ⌊focal · 10 / diameter⌋. */
  static fstop(focal: number, diameter: number): CrossFormula { return c('photography-fstop', 'fstop(focal, diameter) = ⌊focal · 10 / diameter⌋', diameter > 0 ? Math.floor((focal * 10) / diameter) : 0, nat(focal, diameter) && diameter > 0, 'fstop', [focal, diameter]) }
  /** DEPTH OF FIELD: distance over aperture. value ⌊distance / aperture⌋. */
  static depthoffield(aperture: number, distance: number): CrossFormula { return c('photography-depthoffield', 'depthoffield(aperture, distance) = ⌊distance / aperture⌋', aperture > 0 ? Math.floor(distance / aperture) : 0, nat(aperture, distance) && aperture > 0, 'depthoffield', [aperture, distance]) }
  /** ISO: the sensitivity itself. value sensitivity. */
  static iso(sensitivity: number): CrossFormula { return c('photography-iso', 'iso(sensitivity) = sensitivity', sensitivity, nat(sensitivity), 'iso', [sensitivity]) }
  /** MEGAPIXELS: width times height, in millions. value ⌊width · height / 1000000⌋. */
  static megapixels(width: number, height: number): CrossFormula { return c('photography-megapixels', 'megapixels(width, height) = ⌊width · height / 1000000⌋', Math.floor((width * height) / 1000000), nat(width, height), 'megapixels', [width, height]) }
  /** CROP FACTOR: full frame over sensor, times a hundred. value ⌊full · 100 / sensor⌋. */
  static crop(sensor: number, full: number): CrossFormula { return c('photography-crop', 'crop(sensor, full) = ⌊full · 100 / sensor⌋', sensor > 0 ? Math.floor((full * 100) / sensor) : 0, nat(sensor, full) && sensor > 0, 'crop', [sensor, full]) }
  /** DYNAMIC RANGE: doubling with each stop. value 2^stops. */
  static dynamicrange(stops: number): CrossFormula { return c('photography-dynamicrange', 'dynamicrange(stops) = 2^stops', 2 ** stops, nat(stops), 'dynamicrange', [stops]) }
  /** COMPOSITION: subjects over the thirds, times a hundred. value ⌊subjects · 100 / thirds⌋. */
  static composition(subjects: number, thirds: number): CrossFormula { return c('photography-composition', 'composition(subjects, thirds) = ⌊subjects · 100 / thirds⌋', thirds > 0 ? Math.floor((subjects * 100) / thirds) : 0, nat(subjects, thirds) && thirds > 0, 'composition', [subjects, thirds]) }
}

for (const name of ['composition', 'crop', 'depthoffield', 'dynamicrange', 'exposure', 'fstop', 'iso', 'megapixels'] as const)
  hexRegisterOf('photography', name, (PhotographyFormulas[name] as (...x: unknown[]) => unknown).bind(PhotographyFormulas))
