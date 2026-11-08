import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASTRONOMY — THE SKY AS ARITHMETIC. Measuring the heavens is integers: how much brighter one star is than another, a
 *  luminosity proxy from radius and temperature, distance by parallax, redshift of a line, the pull of a body (escape),
 *  an orbit split across bodies, bulk density, and how much light a surface throws back (albedo). Crosses to `gravity` —
 *  astronomy is what gravity shapes. A measure. */

const PROOF = 'astronomy arithmetic (magnitude, luminosity proxy, parallax, redshift, escape, orbital, density, albedo); the sky as integers; a measure crossed to gravity'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'astronomy', dst: 'gravity', formula, value, proof: PROOF, ...extra }, holds, { name: `astronomy.${name}`, params })

export class AstronomyFormulas {
  /** MAGNITUDE DIFFERENCE: how many magnitudes brighter (clamped at 0). value max(0, fainter − brighter). */
  static magnitude(brighter: number, fainter: number): CrossFormula { return c('astronomy-magnitude', 'magnitude(brighter, fainter) = max(0, fainter − brighter)', Math.max(0, fainter - brighter), nat(brighter, fainter), 'magnitude', [brighter, fainter]) }
  /** LUMINOSITY proxy: radius² · temperature. value radius · radius · temp. */
  static luminosity(radius: number, temp: number): CrossFormula { return c('astronomy-luminosity', 'luminosity(radius, temp) = radius² · temp', radius * radius * temp, nat(radius, temp), 'luminosity', [radius, temp]) }
  /** PARALLAX: arcsec ×1000 from a baseline over a distance. value ⌊baseline · 1000 / distance⌋. */
  static parallax(baseline: number, distance: number): CrossFormula { return c('astronomy-parallax', 'parallax(baseline, distance) = ⌊baseline · 1000 / distance⌋', distance > 0 ? Math.floor((baseline * 1000) / distance) : 0, nat(baseline, distance) && distance > 0, 'parallax', [baseline, distance]) }
  /** REDSHIFT: z ×1000 from an observed over a rest wavelength. value ⌊(observed − rest) · 1000 / rest⌋. */
  static redshift(observed: number, rest: number): CrossFormula { return c('astronomy-redshift', 'redshift(observed, rest) = ⌊(observed − rest) · 1000 / rest⌋', rest > 0 ? Math.floor(((observed - rest) * 1000) / rest) : 0, nat(observed, rest) && rest > 0 && observed >= rest, 'redshift', [observed, rest]) }
  /** ESCAPE proxy: mass over radius. value ⌊mass / radius⌋. */
  static escape(mass: number, radius: number): CrossFormula { return c('astronomy-escape', 'escape(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'escape', [mass, radius]) }
  /** ORBITAL: a period split across bodies. value ⌊period / count⌋. */
  static orbital(period: number, count: number): CrossFormula { return c('astronomy-orbital', 'orbital(period, count) = ⌊period / count⌋', count > 0 ? Math.floor(period / count) : 0, nat(period, count) && count > 0, 'orbital', [period, count]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('astronomy-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** ALBEDO as a percentage: reflected over incident. value ⌊reflected · 100 / incident⌋. */
  static albedo(reflected: number, incident: number): CrossFormula { return c('astronomy-albedo', 'albedo(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ? Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <= incident, 'albedo', [reflected, incident]) }
}

for (const name of ['albedo', 'density', 'escape', 'luminosity', 'magnitude', 'orbital', 'parallax', 'redshift'] as const)
  hexRegisterOf('astronomy', name, (AstronomyFormulas[name] as (...x: unknown[]) => unknown).bind(AstronomyFormulas))
