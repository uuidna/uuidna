import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CINEMATOGRAPHY — THE CAMERA AS ARITHMETIC. Shooting a frame is numbers: the f-stop a lens runs at, the light a frame
 *  gathers, the depth that stays sharp, the frames a clip plays per second, the shutter speed an angle sets, the equivalent
 *  focal length on a cropped sensor, the sensitivity a gain multiplies, and the aspect ratio of the frame. Crosses to
 *  `optics` — cinematography is applied optics. A measure. */

const PROOF = 'cinematography arithmetic (f-stop, exposure, depth of field, frame rate, shutter angle, focal length, iso, aspect); the camera as light measured; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cinematography', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `cinematography.${name}`, params })

export class CinematographyFormulas {
  /** F-STOP: the f-number a lens runs at, focal length over aperture diameter. value ⌊focal / diameter⌋. */
  static fstop(focal: number, diameter: number): CrossFormula { return c('cinematography-fstop', 'fstop(focal, diameter) = ⌊focal / diameter⌋', diameter > 0 ? Math.floor(focal / diameter) : 0, nat(focal, diameter) && diameter > 0, 'fstop', [focal, diameter]) }
  /** EXPOSURE: the relative light a frame gathers, aperture area at a shutter time. value aperture · time. */
  static exposure(aperture: number, time: number): CrossFormula { return c('cinematography-exposure', 'exposure(aperture, time) = aperture · time', aperture * time, nat(aperture, time), 'exposure', [aperture, time]) }
  /** DEPTH OF FIELD: the sharp range, far limit less the near limit (mm). value max(0, far − near). */
  static depthoffield(far: number, near: number): CrossFormula { return c('cinematography-depthoffield', 'depthoffield(far, near) = max(0, far − near)', Math.max(0, far - near), nat(far, near), 'depthoffield', [far, near]) }
  /** FRAME RATE: the frames a clip plays per second. value ⌊frames / seconds⌋. */
  static framerate(frames: number, seconds: number): CrossFormula { return c('cinematography-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋', seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames, seconds]) }
  /** SHUTTER ANGLE: the shutter-speed denominator a blade angle sets at a frame rate. value ⌊360 · fps / angle⌋. */
  static shutterangle(fps: number, angle: number): CrossFormula { return c('cinematography-shutterangle', 'shutterangle(fps, angle) = ⌊360 · fps / angle⌋', angle > 0 ? Math.floor((360 * fps) / angle) : 0, nat(fps, angle) && angle > 0, 'shutterangle', [fps, angle]) }
  /** FOCAL LENGTH: the full-frame equivalent on a cropped sensor. value focal · crop. */
  static focallength(focal: number, crop: number): CrossFormula { return c('cinematography-focallength', 'focallength(focal, crop) = focal · crop', focal * crop, nat(focal, crop), 'focallength', [focal, crop]) }
  /** ISO: the sensitivity a gain multiplies from a base. value base · gain. */
  static iso(base: number, gain: number): CrossFormula { return c('cinematography-iso', 'iso(base, gain) = base · gain', base * gain, nat(base, gain), 'iso', [base, gain]) }
  /** ASPECT: the frame aspect ratio as hundredths, width over height. value ⌊width · 100 / height⌋. */
  static aspect(width: number, height: number): CrossFormula { return c('cinematography-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) }
}

for (const name of ['aspect', 'depthoffield', 'exposure', 'focallength', 'framerate', 'fstop', 'iso', 'shutterangle'] as const)
  hexRegisterOf('cinematography', name, (CinematographyFormulas[name] as (...x: unknown[]) => unknown).bind(CinematographyFormulas))
