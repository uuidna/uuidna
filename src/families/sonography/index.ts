import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SONOGRAPHY — ULTRASOUND IMAGING, AS ARITHMETIC (chosen by the imaging registry, not by hand). A pulse of sound is
 *  numbers: how deep the echo reaches, the resolution of the picture, frames per second, how the beam attenuates, the
 *  acoustic impedance of tissue, the Doppler shift of moving blood, axial resolution, and penetration. Crosses to
 *  `radiology` — sonography is the moving picture radiology reads. A measure. */

const PROOF = 'sonography arithmetic (echo depth, resolution, frame rate, attenuation, acoustic impedance, Doppler shift, axial resolution, penetration); a pulse-echo measure crossed to radiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sonography', dst: 'radiology', formula, value, proof: PROOF, ...extra }, holds, { name: `sonography.${name}`, params })

export class SonographyFormulas {
  /** ECHO DEPTH: the round-trip of a pulse at the speed of sound, halved. value ⌊speed · time / 2⌋. */
  static depth(speed: number, time: number): CrossFormula { return c('sonography-depth', 'depth(speed, time) = ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) }
  /** RESOLUTION: the image width spread over the scan lines. value ⌊width / lines⌋. */
  static resolution(width: number, lines: number): CrossFormula { return c('sonography-resolution', 'resolution(width, lines) = ⌊width / lines⌋', lines > 0 ? Math.floor(width / lines) : 0, nat(width, lines) && lines > 0, 'resolution', [width, lines]) }
  /** FRAME RATE: the speed of sound over the two-way travel of every line to depth. value ⌊speed / (2 · depth · lines)⌋. */
  static framerate(speed: number, depth: number, lines: number): CrossFormula { return c('sonography-framerate', 'framerate(speed, depth, lines) = ⌊speed / (2 · depth · lines)⌋', depth > 0 && lines > 0 ? Math.floor(speed / (2 * depth * lines)) : 0, nat(speed, depth, lines) && depth > 0 && lines > 0, 'framerate', [speed, depth, lines]) }
  /** ATTENUATION: a coefficient over frequency and distance. value coef · freq · dist. */
  static attenuation(coef: number, freq: number, dist: number): CrossFormula { return c('sonography-attenuation', 'attenuation(coef, freq, dist) = coef · freq · dist', coef * freq * dist, nat(coef, freq, dist), 'attenuation', [coef, freq, dist]) }
  /** ACOUSTIC IMPEDANCE: density times the speed of sound in the tissue. value density · speed. */
  static impedance(density: number, speed: number): CrossFormula { return c('sonography-impedance', 'impedance(density, speed) = density · speed', density * speed, nat(density, speed), 'impedance', [density, speed]) }
  /** DOPPLER SHIFT: twice the transmitted frequency times velocity over the speed of sound. value ⌊2 · freq · velocity / speed⌋. */
  static dopplershift(freq: number, velocity: number, speed: number): CrossFormula { return c('sonography-dopplershift', 'dopplershift(freq, velocity, speed) = ⌊2 · freq · velocity / speed⌋', speed > 0 ? Math.floor((2 * freq * velocity) / speed) : 0, nat(freq, velocity, speed) && speed > 0, 'dopplershift', [freq, velocity, speed]) }
  /** AXIAL RESOLUTION: the spatial pulse length (wavelength over cycles) halved. value ⌊wavelength · cycles / 2⌋. */
  static axialres(wavelength: number, cycles: number): CrossFormula { return c('sonography-axialres', 'axialres(wavelength, cycles) = ⌊wavelength · cycles / 2⌋', Math.floor((wavelength * cycles) / 2), nat(wavelength, cycles), 'axialres', [wavelength, cycles]) }
  /** PENETRATION: how deep imaging reaches, falling as frequency rises. value ⌊constant / freq⌋. */
  static penetration(constant: number, freq: number): CrossFormula { return c('sonography-penetration', 'penetration(constant, freq) = ⌊constant / freq⌋', freq > 0 ? Math.floor(constant / freq) : 0, nat(constant, freq) && freq > 0, 'penetration', [constant, freq]) }
}

for (const name of ['attenuation', 'axialres', 'depth', 'dopplershift', 'framerate', 'impedance', 'penetration', 'resolution'] as const)
  hexRegisterOf('sonography', name, (SonographyFormulas[name] as (...x: unknown[]) => unknown).bind(SonographyFormulas))
