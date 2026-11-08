import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LUMINOSITY — THE RADIANT OUTPUT OF A STAR, AS ARITHMETIC. How bright a star burns is numbers: the Stefan–Boltzmann
 *  output of a hot surface, the apparent brightness at a distance, the inverse-square fall-off, the bolometric sum across
 *  bands, the Eddington ceiling a mass can sustain, the radius a temperature implies, the ratio of two fluxes, and the
 *  luminosity class a threshold decides. Crosses to `astrophysics` — luminosity is what astrophysics measures. A measure. */

const PROOF = 'luminosity arithmetic (Stefan–Boltzmann output, apparent brightness, inverse-square fall-off, bolometric sum, Eddington limit, radius from temperature, flux ratio, luminosity class); integer proxies with small exponents; a measure crossed to astrophysics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'luminosity', dst: 'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `luminosity.${name}`, params })

export class LuminosityFormulas {
  /** APPARENT BRIGHTNESS: luminosity seen across a distance (4π dropped). value ⌊lum / dist²⌋. */
  static apparentbrightness(lum: number, dist: number): CrossFormula { return c('luminosity-apparentbrightness', 'apparentbrightness(lum, dist) = ⌊lum / dist²⌋', dist > 0 ? Math.floor(lum / (dist * dist)) : 0, nat(lum, dist) && dist > 0, 'apparentbrightness', [lum, dist]) }
  /** BOLOMETRIC luminosity: the sum of output across bands. value band1 + band2 + band3. */
  static bolometric(band1: number, band2: number, band3: number): CrossFormula { return c('luminosity-bolometric', 'bolometric(band1, band2, band3) = band1 + band2 + band3', band1 + band2 + band3, nat(band1, band2, band3), 'bolometric', [band1, band2, band3]) }
  /** EDDINGTON LIMIT: the luminosity ceiling a mass can sustain. value mass · 32000. */
  static eddingtonlimit(mass: number): CrossFormula { return c('luminosity-eddingtonlimit', 'eddingtonlimit(mass) = mass · 32000', mass * 32000, nat(mass), 'eddingtonlimit', [mass]) }
  /** FLUX RATIO: one flux over another. value ⌊flux1 / flux2⌋. */
  static fluxratio(flux1: number, flux2: number): CrossFormula { return c('luminosity-fluxratio', 'fluxratio(flux1, flux2) = ⌊flux1 / flux2⌋', flux2 > 0 ? Math.floor(flux1 / flux2) : 0, nat(flux1, flux2) && flux2 > 0, 'fluxratio', [flux1, flux2]) }
  /** INVERSE SQUARE: how flux falls from a near to a far distance. value ⌊far² / near²⌋. */
  static inversesquare(near: number, far: number): CrossFormula { return c('luminosity-inversesquare', 'inversesquare(near, far) = ⌊far² / near²⌋', near > 0 ? Math.floor((far * far) / (near * near)) : 0, nat(near, far) && near > 0, 'inversesquare', [near, far]) }
  /** LUMINOSITY CLASS: 1 when output reaches the threshold. value [lum ≥ threshold]. */
  static luminosityclass(lum: number, threshold: number): CrossFormula { return c('luminosity-luminosityclass', 'luminosityclass(lum, threshold) = [lum ≥ threshold]', lum >= threshold ? 1 : 0, nat(lum, threshold), 'luminosityclass', [lum, threshold]) }
  /** RADIUS FROM TEMP: the radius a luminosity and temperature imply. value ⌊lum / temp²⌋. */
  static radiusfromtemp(lum: number, temp: number): CrossFormula { return c('luminosity-radiusfromtemp', 'radiusfromtemp(lum, temp) = ⌊lum / temp²⌋', temp > 0 ? Math.floor(lum / (temp * temp)) : 0, nat(lum, temp) && temp > 0, 'radiusfromtemp', [lum, temp]) }
  /** STEFAN–BOLTZMANN: the output of a hot surface. value area · temp⁴. */
  static stefanboltzmann(area: number, temp: number): CrossFormula { return c('luminosity-stefanboltzmann', 'stefanboltzmann(area, temp) = area · temp⁴', area * temp ** 4, nat(area, temp), 'stefanboltzmann', [area, temp]) }
}

for (const name of ['apparentbrightness', 'bolometric', 'eddingtonlimit', 'fluxratio', 'inversesquare', 'luminosityclass', 'radiusfromtemp', 'stefanboltzmann'] as const)
  hexRegisterOf('luminosity', name, (LuminosityFormulas[name] as (...x: unknown[]) => unknown).bind(LuminosityFormulas))
