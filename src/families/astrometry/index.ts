import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASTROMETRY — MEASURING WHERE THE STARS ARE, AS ARITHMETIC (positions, motions and the optics that read them, not by hand).
 *  Measuring the sky is numbers: the parallax of a baseline, the distance it implies, proper motion per year, magnitude
 *  against a reference, the airmass looked through, angular resolution, field of view and the pixel scale that samples it.
 *  Crosses to `astronomy` — astrometry is the measurement astronomy is built on. A measure. */

const PROOF = 'astrometry arithmetic (parallax, distance, proper motion, magnitude, airmass, resolution, field of view, pixel scale); positions and motions of the stars and the optics that read them; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'astrometry', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `astrometry.${name}`, params })

export class AstrometryFormulas {
  /** PARALLAX: the angle a baseline subtends at a distance. value ⌊baseline / distance⌋. */
  static parallax(baseline: number, distance: number): CrossFormula { return c('astrometry-parallax', 'parallax(baseline, distance) = ⌊baseline / distance⌋', distance > 0 ? Math.floor(baseline / distance) : 0, nat(baseline, distance) && distance > 0, 'parallax', [baseline, distance]) }
  /** DISTANCE: parsecs from a parallax (the 1000/p law). value ⌊1000 / parallax⌋. */
  static distance(parallax: number): CrossFormula { return c('astrometry-distance', 'distance(parallax) = ⌊1000 / parallax⌋', parallax > 0 ? Math.floor(1000 / parallax) : 0, nat(parallax) && parallax > 0, 'distance', [parallax]) }
  /** PROPER MOTION: the arc a star crosses per year. value ⌊shift / years⌋. */
  static propermotion(shift: number, years: number): CrossFormula { return c('astrometry-propermotion', 'propermotion(shift, years) = ⌊shift / years⌋', years > 0 ? Math.floor(shift / years) : 0, nat(shift, years) && years > 0, 'propermotion', [shift, years]) }
  /** MAGNITUDE: how much fainter than a reference. value max(0, ref − flux). */
  static magnitude(flux: number, ref: number): CrossFormula { return c('astrometry-magnitude', 'magnitude(flux, ref) = max(0, ref − flux)', Math.max(0, ref - flux), nat(flux, ref), 'magnitude', [flux, ref]) }
  /** AIRMASS: the atmosphere looked through on a slant path. value ⌈path / zenith⌉. */
  static airmass(path: number, zenith: number): CrossFormula { return c('astrometry-airmass', 'airmass(path, zenith) = ⌈path / zenith⌉', zenith > 0 ? Math.ceil(path / zenith) : 0, nat(path, zenith) && zenith > 0, 'airmass', [path, zenith]) }
  /** RESOLUTION: the angle an aperture resolves at a wavelength. value ⌊wavelength · 100 / aperture⌋. */
  static resolution(wavelength: number, aperture: number): CrossFormula { return c('astrometry-resolution', 'resolution(wavelength, aperture) = ⌊wavelength · 100 / aperture⌋', aperture > 0 ? Math.floor((wavelength * 100) / aperture) : 0, nat(wavelength, aperture) && aperture > 0, 'resolution', [wavelength, aperture]) }
  /** FIELD OF VIEW: the sky a sensor spans at a focal length. value ⌊sensor · 1000 / focal⌋. */
  static fieldofview(sensor: number, focal: number): CrossFormula { return c('astrometry-fieldofview', 'fieldofview(sensor, focal) = ⌊sensor · 1000 / focal⌋', focal > 0 ? Math.floor((sensor * 1000) / focal) : 0, nat(sensor, focal) && focal > 0, 'fieldofview', [sensor, focal]) }
  /** PIXEL SCALE: the sky one pixel samples across a field. value ⌊fov / pixels⌋. */
  static pixelscale(fov: number, pixels: number): CrossFormula { return c('astrometry-pixelscale', 'pixelscale(fov, pixels) = ⌊fov / pixels⌋', pixels > 0 ? Math.floor(fov / pixels) : 0, nat(fov, pixels) && pixels > 0, 'pixelscale', [fov, pixels]) }
}

for (const name of ['airmass', 'distance', 'fieldofview', 'magnitude', 'parallax', 'pixelscale', 'propermotion', 'resolution'] as const)
  hexRegisterOf('astrometry', name, (AstrometryFormulas[name] as (...x: unknown[]) => unknown).bind(AstrometryFormulas))
