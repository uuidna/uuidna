import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OPHTHALMOLOGY — THE EYE AS ARITHMETIC. Correcting sight is numbers: lens power in diopters, Snellen acuity, intraocular
 *  pressure, the spherical equivalent of a refraction, pupillary distance, corneal astigmatism, the amplitude of
 *  accommodation, and the cylinder of a spherocylindrical lens. Crosses to `optics` — the eye is an optical system. A measure. */

const PROOF = 'ophthalmology arithmetic (diopter, visual acuity, intraocular pressure, refractive error, pupil distance, astigmatism, accommodation, cylinder power); the eye as an optical system crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ophthalmology', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `ophthalmology.${name}`, params })

export class OphthalmologyFormulas {
  /** AMPLITUDE OF ACCOMMODATION: near-point diopters less far-point diopters (100 cm basis). value max(0, ⌊100 / near⌋ − ⌊100 / far⌋). */
  static accommodation(near: number, far: number): CrossFormula { return c('ophthalmology-accommodation', 'accommodation(near, far) = max(0, ⌊100 / near⌋ − ⌊100 / far⌋)', Math.max(0, (near > 0 ? Math.floor(100 / near) : 0) - (far > 0 ? Math.floor(100 / far) : 0)), nat(near, far) && near > 0 && far > 0, 'accommodation', [near, far]) }
  /** CORNEAL ASTIGMATISM: the steep keratometry reading less the flat one. value max(0, steep − flat). */
  static astigmatism(flat: number, steep: number): CrossFormula { return c('ophthalmology-astigmatism', 'astigmatism(flat, steep) = max(0, steep − flat)', Math.max(0, steep - flat), nat(flat, steep) && steep >= flat, 'astigmatism', [flat, steep]) }
  /** CYLINDER POWER: the meridian power of a spherocylinder, sphere plus cylinder. value sphere + cyl. */
  static cylinderpower(sphere: number, cyl: number): CrossFormula { return c('ophthalmology-cylinderpower', 'cylinderpower(sphere, cyl) = sphere + cyl', sphere + cyl, nat(sphere, cyl), 'cylinderpower', [sphere, cyl]) }
  /** LENS POWER in diopters at a focal length in millimetres. value ⌊1000 / focal⌋. */
  static diopter(focal: number): CrossFormula { return c('ophthalmology-diopter', 'diopter(focal) = ⌊1000 / focal⌋', focal > 0 ? Math.floor(1000 / focal) : 0, nat(focal) && focal > 0, 'diopter', [focal]) }
  /** INTRAOCULAR PRESSURE: the mean of readings in mmHg. value ⌊sum / count⌋. */
  static iop(sum: number, count: number): CrossFormula { return c('ophthalmology-iop', 'iop(sum, count) = ⌊sum / count⌋', count > 0 ? Math.floor(sum / count) : 0, nat(sum, count) && count > 0, 'iop', [sum, count]) }
  /** PUPILLARY DISTANCE: the binocular PD, two monocular distances summed. value right + left. */
  static pupildistance(right: number, left: number): CrossFormula { return c('ophthalmology-pupildistance', 'pupildistance(right, left) = right + left', right + left, nat(right, left), 'pupildistance', [right, left]) }
  /** SPHERICAL EQUIVALENT: sphere plus half the cylinder. value sphere + ⌊cyl / 2⌋. */
  static refractiveerror(sphere: number, cyl: number): CrossFormula { return c('ophthalmology-refractiveerror', 'refractiveerror(sphere, cyl) = sphere + ⌊cyl / 2⌋', sphere + Math.floor(cyl / 2), nat(sphere, cyl), 'refractiveerror', [sphere, cyl]) }
  /** VISUAL ACUITY: the Snellen fraction as a percentage. value ⌊top · 100 / bottom⌋. */
  static visualacuity(top: number, bottom: number): CrossFormula { return c('ophthalmology-visualacuity', 'visualacuity(top, bottom) = ⌊top · 100 / bottom⌋', bottom > 0 ? Math.floor((top * 100) / bottom) : 0, nat(top, bottom) && bottom > 0, 'visualacuity', [top, bottom]) }
}

for (const name of ['accommodation', 'astigmatism', 'cylinderpower', 'diopter', 'iop', 'pupildistance', 'refractiveerror', 'visualacuity'] as const)
  hexRegisterOf('ophthalmology', name, (OphthalmologyFormulas[name] as (...x: unknown[]) => unknown).bind(OphthalmologyFormulas))
