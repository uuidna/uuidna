import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ULTRASONICS — SOUND ABOVE HEARING, AS ARITHMETIC. Pulses are numbers: the time a pulse takes there and back, the depth
 *  it reaches, its wavelength, how far it is attenuated, the Doppler shift off a moving target, the axial resolution, the
 *  acoustic impedance of the medium, and the near-field length of the probe. Crosses to `acoustics` — ultrasonics is
 *  acoustics above 20 kHz. A measure. */

const PROOF = 'ultrasonics arithmetic (time of flight, depth, wavelength, attenuation, Doppler shift, axial resolution, acoustic impedance, near field); sound above hearing; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ultrasonics', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `ultrasonics.${name}`, params })

export class UltrasonicsFormulas {
  /** TIME OF FLIGHT: a pulse there and back over a distance at the speed of sound. value ⌊2 · distance / speed⌋. */
  static timeofflight(distance: number, speed: number): CrossFormula { return c('ultrasonics-timeofflight', 'timeofflight(distance, speed) = ⌊2 · distance / speed⌋', speed > 0 ? Math.floor((2 * distance) / speed) : 0, nat(distance, speed) && speed > 0, 'timeofflight', [distance, speed]) }
  /** DEPTH: the half of the round trip the echo returns from. value ⌊speed · time / 2⌋. */
  static depth(speed: number, time: number): CrossFormula { return c('ultrasonics-depth', 'depth(speed, time) = ⌊speed · time / 2⌋', Math.floor((speed * time) / 2), nat(speed, time), 'depth', [speed, time]) }
  /** WAVELENGTH: the speed of sound over the frequency. value ⌊speed / freq⌋. */
  static wavelength(speed: number, freq: number): CrossFormula { return c('ultrasonics-wavelength', 'wavelength(speed, freq) = ⌊speed / freq⌋', freq > 0 ? Math.floor(speed / freq) : 0, nat(speed, freq) && freq > 0, 'wavelength', [speed, freq]) }
  /** ATTENUATION: the loss over a distance at a per-unit coefficient. value coeff · distance. */
  static attenuation(coeff: number, distance: number): CrossFormula { return c('ultrasonics-attenuation', 'attenuation(coeff, distance) = coeff · distance', coeff * distance, nat(coeff, distance), 'attenuation', [coeff, distance]) }
  /** DOPPLER SHIFT off a moving target. value ⌊2 · freq · velocity / speed⌋. */
  static dopplershift(freq: number, velocity: number, speed: number): CrossFormula { return c('ultrasonics-dopplershift', 'dopplershift(freq, velocity, speed) = ⌊2 · freq · velocity / speed⌋', speed > 0 ? Math.floor((2 * freq * velocity) / speed) : 0, nat(freq, velocity, speed) && speed > 0, 'dopplershift', [freq, velocity, speed]) }
  /** AXIAL RESOLUTION: half the spatial pulse length (cycles of a wavelength). value ⌊wavelength · cycles / 2⌋. */
  static axialresolution(wavelength: number, cycles: number): CrossFormula { return c('ultrasonics-axialresolution', 'axialresolution(wavelength, cycles) = ⌊wavelength · cycles / 2⌋', Math.floor((wavelength * cycles) / 2), nat(wavelength, cycles), 'axialresolution', [wavelength, cycles]) }
  /** ACOUSTIC IMPEDANCE: density times the speed of sound in the medium. value density · speed. */
  static acousticimpedance(density: number, speed: number): CrossFormula { return c('ultrasonics-acousticimpedance', 'acousticimpedance(density, speed) = density · speed', density * speed, nat(density, speed), 'acousticimpedance', [density, speed]) }
  /** NEAR FIELD: the length of the probe's near zone. value ⌊diameter² / (4 · wavelength)⌋. */
  static nearfield(diameter: number, wavelength: number): CrossFormula { return c('ultrasonics-nearfield', 'nearfield(diameter, wavelength) = ⌊diameter² / (4 · wavelength)⌋', wavelength > 0 ? Math.floor((diameter * diameter) / (4 * wavelength)) : 0, nat(diameter, wavelength) && wavelength > 0, 'nearfield', [diameter, wavelength]) }
}

for (const name of ['acousticimpedance', 'attenuation', 'axialresolution', 'depth', 'dopplershift', 'nearfield', 'timeofflight', 'wavelength'] as const)
  hexRegisterOf('ultrasonics', name, (UltrasonicsFormulas[name] as (...x: unknown[]) => unknown).bind(UltrasonicsFormulas))
