import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MICROSCOPY — SEEING THE SMALL, AS ARITHMETIC. The light microscope is numbers: total magnification from the lenses,
 *  the resolvable distance, the numerical aperture that gathers the light, the field you see, the depth in focus, the
 *  magnification through a camera, the working distance under the objective, and the size of a sensor pixel. Crosses to
 *  `optics` — microscopy is optics put to the eyepiece. A measure. */

const PROOF = 'microscopy arithmetic (magnification, resolution, numerical aperture, field of view, depth of field, total magnification, working distance, pixel size); seeing the small as integers; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'microscopy', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `microscopy.${name}`, params })

export class MicroscopyFormulas {
  /** MAGNIFICATION: the objective lens times the eyepiece. value objective · eyepiece. */
  static magnification(objective: number, eyepiece: number): CrossFormula { return c('microscopy-magnification', 'magnification(objective, eyepiece) = objective · eyepiece', objective * eyepiece, nat(objective, eyepiece), 'magnification', [objective, eyepiece]) }
  /** RESOLUTION: the Abbe limit, wavelength over twice the aperture. value ⌊wavelength / (2 · na)⌋. */
  static resolution(wavelength: number, na: number): CrossFormula { return c('microscopy-resolution', 'resolution(wavelength, na) = ⌊wavelength / (2 · na)⌋', na > 0 ? Math.floor(wavelength / (2 * na)) : 0, nat(wavelength, na) && na > 0, 'resolution', [wavelength, na]) }
  /** NUMERICAL APERTURE: the index of the medium times the half-angle it gathers. value index · angle. */
  static numericalaperture(index: number, angle: number): CrossFormula { return c('microscopy-numericalaperture', 'numericalaperture(index, angle) = index · angle', index * angle, nat(index, angle), 'numericalaperture', [index, angle]) }
  /** FIELD OF VIEW: the field number over the objective magnification, in microns. value ⌊fieldnumber · 1000 / mag⌋. */
  static fieldofview(fieldnumber: number, mag: number): CrossFormula { return c('microscopy-fieldofview', 'fieldofview(fieldnumber, mag) = ⌊fieldnumber · 1000 / mag⌋', mag > 0 ? Math.floor((fieldnumber * 1000) / mag) : 0, nat(fieldnumber, mag) && mag > 0, 'fieldofview', [fieldnumber, mag]) }
  /** DEPTH OF FIELD: the wavelength over the aperture squared. value ⌊wavelength / (na · na)⌋. */
  static depthoffield(wavelength: number, na: number): CrossFormula { return c('microscopy-depthoffield', 'depthoffield(wavelength, na) = ⌊wavelength / (na · na)⌋', na > 0 ? Math.floor(wavelength / (na * na)) : 0, nat(wavelength, na) && na > 0, 'depthoffield', [wavelength, na]) }
  /** TOTAL MAGNIFICATION: the objective, the eyepiece and the camera adapter together. value objective · eyepiece · camera. */
  static totalmag(objective: number, eyepiece: number, camera: number): CrossFormula { return c('microscopy-totalmag', 'totalmag(objective, eyepiece, camera) = objective · eyepiece · camera', objective * eyepiece * camera, nat(objective, eyepiece, camera), 'totalmag', [objective, eyepiece, camera]) }
  /** WORKING DISTANCE: the focal length over the medium index. value ⌊focal / index⌋. */
  static workingdistance(focal: number, index: number): CrossFormula { return c('microscopy-workingdistance', 'workingdistance(focal, index) = ⌊focal / index⌋', index > 0 ? Math.floor(focal / index) : 0, nat(focal, index) && index > 0, 'workingdistance', [focal, index]) }
  /** PIXEL SIZE: the sensor width over the pixel count. value ⌊sensorwidth / pixels⌋. */
  static pixelsize(sensorwidth: number, pixels: number): CrossFormula { return c('microscopy-pixelsize', 'pixelsize(sensorwidth, pixels) = ⌊sensorwidth / pixels⌋', pixels > 0 ? Math.floor(sensorwidth / pixels) : 0, nat(sensorwidth, pixels) && pixels > 0, 'pixelsize', [sensorwidth, pixels]) }
}

for (const name of ['depthoffield', 'fieldofview', 'magnification', 'numericalaperture', 'pixelsize', 'resolution', 'totalmag', 'workingdistance'] as const)
  hexRegisterOf('microscopy', name, (MicroscopyFormulas[name] as (...x: unknown[]) => unknown).bind(MicroscopyFormulas))
