import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPECTROSCOPY — LIGHT MEASURED AS ARITHMETIC. The energy of a photon, the wavenumber of a wave, how much a sample absorbs,
 *  the concentration Beer's law reads back, the resolution a grating reaches, the Doppler shift of a line, the intensity on
 *  a detector, and the natural linewidth a cavity leaves. Crosses to `optics` — spectroscopy is optics put to numbers. A measure. */

const PROOF = 'spectroscopy arithmetic (photon energy, wavenumber, absorbance, Beer concentration, resolution, line shift, intensity, linewidth); a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'spectroscopy', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `spectroscopy.${name}`, params })

export class SpectroscopyFormulas {
  /** PHOTON ENERGY: frequency at Planck's quantum (E = hf proxy). value frequency · planck. */
  static energy(frequency: number, planck: number): CrossFormula { return c('spectroscopy-energy', 'energy(frequency, planck) = frequency · planck', frequency * planck, nat(frequency, planck), 'energy', [frequency, planck]) }
  /** WAVENUMBER: cycles over a length. value ⌊cycles / length⌋. */
  static wavenumber(cycles: number, length: number): CrossFormula { return c('spectroscopy-wavenumber', 'wavenumber(cycles, length) = ⌊cycles / length⌋', length > 0 ? Math.floor(cycles / length) : 0, nat(cycles, length) && length > 0, 'wavenumber', [cycles, length]) }
  /** ABSORBANCE: incident over transmitted, scaled. value ⌊incident · 100 / transmitted⌋. */
  static absorbance(incident: number, transmitted: number): CrossFormula { return c('spectroscopy-absorbance', 'absorbance(incident, transmitted) = ⌊incident · 100 / transmitted⌋', transmitted > 0 ? Math.floor((incident * 100) / transmitted) : 0, nat(incident, transmitted) && transmitted > 0, 'absorbance', [incident, transmitted]) }
  /** BEER'S LAW: concentration from absorbance over path. value ⌊absorbance / path⌋. */
  static beer(absorbance: number, path: number): CrossFormula { return c('spectroscopy-beer', 'beer(absorbance, path) = ⌊absorbance / path⌋', path > 0 ? Math.floor(absorbance / path) : 0, nat(absorbance, path) && path > 0, 'beer', [absorbance, path]) }
  /** RESOLUTION: wavelength over its smallest resolvable step. value ⌊wavelength / delta⌋. */
  static resolution(wavelength: number, delta: number): CrossFormula { return c('spectroscopy-resolution', 'resolution(wavelength, delta) = ⌊wavelength / delta⌋', delta > 0 ? Math.floor(wavelength / delta) : 0, nat(wavelength, delta) && delta > 0, 'resolution', [wavelength, delta]) }
  /** LINE SHIFT: observed against reference (may be negative). value observed − reference. */
  static shift(observed: number, reference: number): CrossFormula { return c('spectroscopy-shift', 'shift(observed, reference) = observed − reference', observed - reference, nat(observed, reference), 'shift', [observed, reference]) }
  /** INTENSITY: photons over a detector area. value ⌊photons / area⌋. */
  static intensity(photons: number, area: number): CrossFormula { return c('spectroscopy-intensity', 'intensity(photons, area) = ⌊photons / area⌋', area > 0 ? Math.floor(photons / area) : 0, nat(photons, area) && area > 0, 'intensity', [photons, area]) }
  /** LINEWIDTH: frequency over the quality factor. value ⌊frequency / quality⌋. */
  static linewidth(frequency: number, quality: number): CrossFormula { return c('spectroscopy-linewidth', 'linewidth(frequency, quality) = ⌊frequency / quality⌋', quality > 0 ? Math.floor(frequency / quality) : 0, nat(frequency, quality) && quality > 0, 'linewidth', [frequency, quality]) }
}

for (const name of ['absorbance', 'beer', 'energy', 'intensity', 'linewidth', 'resolution', 'shift', 'wavenumber'] as const)
  hexRegisterOf('spectroscopy', name, (SpectroscopyFormulas[name] as (...x: unknown[]) => unknown).bind(SpectroscopyFormulas))
