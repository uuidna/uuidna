import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACOUSTICS — SOUND AS ARITHMETIC (chosen by the public-API registry, not by hand). A travelling wave is numbers:
 *  wavelength from speed and frequency, frequency from speed and wavelength, loudness in decibels, the Doppler shift,
 *  reverberation time by Sabine, attenuation with distance, acoustic impedance, and the resonance of a stretched string.
 *  Crosses to `seismology` — acoustics is the wave the ground also carries. A measure. */

const PROOF = 'acoustics arithmetic (wavelength, frequency, decibel, doppler, reverb, attenuation, impedance, resonance); sound as a travelling wave; a measure crossed to seismology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'acoustics', dst: 'seismology', formula, value, proof: PROOF, ...extra }, holds, { name: `acoustics.${name}`, params })

export class AcousticsFormulas {
  /** WAVELENGTH: the speed of sound over its frequency. value ⌊speed / frequency⌋. */
  static wavelength(speed: number, frequency: number): CrossFormula { return c('acoustics-wavelength', 'wavelength(speed, frequency) = ⌊speed / frequency⌋', frequency > 0 ? Math.floor(speed / frequency) : 0, nat(speed, frequency) && frequency > 0, 'wavelength', [speed, frequency]) }
  /** FREQUENCY: the speed of sound over its wavelength. value ⌊speed / wavelength⌋. */
  static frequency(speed: number, wavelength: number): CrossFormula { return c('acoustics-frequency', 'frequency(speed, wavelength) = ⌊speed / wavelength⌋', wavelength > 0 ? Math.floor(speed / wavelength) : 0, nat(speed, wavelength) && wavelength > 0, 'frequency', [speed, wavelength]) }
  /** DECIBEL: loudness as a power ratio. value ⌊10 · log₁₀(power / reference)⌋. */
  static decibel(power: number, reference: number): CrossFormula { return c('acoustics-decibel', 'decibel(power, reference) = ⌊10 · log₁₀(power / reference)⌋', reference > 0 && power > 0 ? Math.floor(10 * Math.log10(power / reference)) : 0, nat(power, reference) && reference > 0 && power > 0, 'decibel', [power, reference]) }
  /** DOPPLER: the shifted signal, emitted plus the velocity proxy. value emitted + velocity. */
  static doppler(emitted: number, velocity: number): CrossFormula { return c('acoustics-doppler', 'doppler(emitted, velocity) = emitted + velocity', emitted + velocity, nat(emitted, velocity), 'doppler', [emitted, velocity]) }
  /** REVERB: Sabine reverberation proxy, the room volume over its absorption. value ⌊volume · 161 / (absorption · 1000)⌋. */
  static reverb(volume: number, absorption: number): CrossFormula { return c('acoustics-reverb', 'reverb(volume, absorption) = ⌊volume · 161 / (absorption · 1000)⌋', absorption > 0 ? Math.floor((volume * 161) / (absorption * 1000)) : 0, nat(volume, absorption) && absorption > 0, 'reverb', [volume, absorption]) }
  /** ATTENUATION: the source level less the distance travelled, never below zero. value max(0, source − distance). */
  static attenuation(source: number, distance: number): CrossFormula { return c('acoustics-attenuation', 'attenuation(source, distance) = max(0, source − distance)', Math.max(0, source - distance), nat(source, distance), 'attenuation', [source, distance]) }
  /** IMPEDANCE: acoustic impedance, density times the speed of sound. value density · speed. */
  static impedance(density: number, speed: number): CrossFormula { return c('acoustics-impedance', 'impedance(density, speed) = density · speed', density * speed, nat(density, speed), 'impedance', [density, speed]) }
  /** RESONANCE: a stretched string's resonance, tension over mass. value ⌊tension / mass⌋. */
  static resonance(tension: number, mass: number): CrossFormula { return c('acoustics-resonance', 'resonance(tension, mass) = ⌊tension / mass⌋', mass > 0 ? Math.floor(tension / mass) : 0, nat(tension, mass) && mass > 0, 'resonance', [tension, mass]) }
}

for (const name of ['attenuation', 'decibel', 'doppler', 'frequency', 'impedance', 'resonance', 'reverb', 'wavelength'] as const)
  hexRegisterOf('acoustics', name, (AcousticsFormulas[name] as (...x: unknown[]) => unknown).bind(AcousticsFormulas))
