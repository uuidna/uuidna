import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RADIOLOGY — MEDICAL IMAGING AS ARITHMETIC. Imaging and radiation are numbers: absorbed dose behind shielding, the
 *  contrast of a signal over its noise, how much a beam is attenuated, shielding half-value layers, spatial resolution,
 *  the exposure a tube delivers (mAs), scan coverage, and radiotracer uptake. Crosses to `med` — radiology is a
 *  measure the clinic reads. A measure. */

const PROOF = 'radiology arithmetic (dose behind shielding, contrast, attenuation, half-value layers, resolution, exposure mAs, coverage, uptake); medical imaging as integers; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'radiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `radiology.${name}`, params })

export class RadiologyFormulas {
  /** ATTENUATION: how much of the beam the body stops. value max(0, incident − transmitted). */
  static attenuation(incident: number, transmitted: number): CrossFormula { return c('radiology-attenuation', 'attenuation(incident, transmitted) = max(0, incident − transmitted)', Math.max(0, incident - transmitted), nat(incident, transmitted), 'attenuation', [incident, transmitted]) }
  /** CONTRAST: the signal over the noise, as a percentage. value ⌊signal · 100 / noise⌋. */
  static contrast(signal: number, noise: number): CrossFormula { return c('radiology-contrast', 'contrast(signal, noise) = ⌊signal · 100 / noise⌋', noise > 0 ? Math.floor((signal * 100) / noise) : 0, nat(signal, noise) && noise > 0, 'contrast', [signal, noise]) }
  /** COVERAGE: the fraction of the field scanned, as a percentage. value ⌊scanned · 100 / total⌋. */
  static coverage(scanned: number, total: number): CrossFormula { return c('radiology-coverage', 'coverage(scanned, total) = ⌊scanned · 100 / total⌋', total > 0 ? Math.floor((scanned * 100) / total) : 0, nat(scanned, total) && total > 0 && scanned <= total, 'coverage', [scanned, total]) }
  /** DOSE: absorbed exposure behind shielding. value ⌊exposure / shielding⌋. */
  static dose(exposure: number, shielding: number): CrossFormula { return c('radiology-dose', 'dose(exposure, shielding) = ⌊exposure / shielding⌋', shielding > 0 ? Math.floor(exposure / shielding) : 0, nat(exposure, shielding) && shielding > 0, 'dose', [exposure, shielding]) }
  /** EXPOSURE: the tube current over the exposure time, in mAs. value current · seconds. */
  static exposure(current: number, seconds: number): CrossFormula { return c('radiology-exposure', 'exposure(current, seconds) = current · seconds', current * seconds, nat(current, seconds), 'exposure', [current, seconds]) }
  /** HALF-LIFE: thickness doubled per shielding layer. value thickness · 2^layers. */
  static halflife(thickness: number, layers: number): CrossFormula { return c('radiology-halflife', 'halflife(thickness, layers) = thickness · 2^layers', thickness * (2 ** layers), nat(thickness, layers), 'halflife', [thickness, layers]) }
  /** RESOLUTION: pixels over the field of view. value ⌊pixels / field⌋. */
  static resolution(pixels: number, field: number): CrossFormula { return c('radiology-resolution', 'resolution(pixels, field) = ⌊pixels / field⌋', field > 0 ? Math.floor(pixels / field) : 0, nat(pixels, field) && field > 0, 'resolution', [pixels, field]) }
  /** UPTAKE: tracer absorbed over tracer injected, as a percentage. value ⌊absorbed · 100 / injected⌋. */
  static uptake(absorbed: number, injected: number): CrossFormula { return c('radiology-uptake', 'uptake(absorbed, injected) = ⌊absorbed · 100 / injected⌋', injected > 0 ? Math.floor((absorbed * 100) / injected) : 0, nat(absorbed, injected) && injected > 0 && absorbed <= injected, 'uptake', [absorbed, injected]) }
}

for (const name of ['attenuation', 'contrast', 'coverage', 'dose', 'exposure', 'halflife', 'resolution', 'uptake'] as const)
  hexRegisterOf('radiology', name, (RadiologyFormulas[name] as (...x: unknown[]) => unknown).bind(RadiologyFormulas))
