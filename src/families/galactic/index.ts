import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GALACTIC — A GALAXY AS ARITHMETIC (integer proxies, no floats). The dynamics of a galaxy are numbers: how fast the disk
 *  turns, the mass held inside a radius, how many stars a luminosity buys, the mass of the disk, the virial mass, the speed
 *  to escape, the surface brightness, and the share of metals. Crosses to `astrophysics` — galactic dynamics is what
 *  astrophysics measures. A measure. */

const PROOF = 'galactic arithmetic (rotation velocity, enclosed mass, star count, disk mass, virial mass, escape velocity, surface brightness, metallicity) as integer proxies; a measure crossed to astrophysics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'galactic', dst: 'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `galactic.${name}`, params })

export class GalacticFormulas {
  /** ROTATION VELOCITY: a flat-curve proxy, the enclosed mass over the radius. value ⌊mass / radius⌋. */
  static rotationvelocity(mass: number, radius: number): CrossFormula { return c('galactic-rotationvelocity', 'rotationvelocity(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'rotationvelocity', [mass, radius]) }
  /** ENCLOSED MASS: the velocity proxy carried out to a radius. value velocity · radius. */
  static masswithinradius(velocity: number, radius: number): CrossFormula { return c('galactic-masswithinradius', 'masswithinradius(velocity, radius) = velocity · radius', velocity * radius, nat(velocity, radius), 'masswithinradius', [velocity, radius]) }
  /** STAR COUNT: a luminosity at a per-star luminosity. value ⌊luminosity / perStar⌋. */
  static starcount(luminosity: number, perStar: number): CrossFormula { return c('galactic-starcount', 'starcount(luminosity, perStar) = ⌊luminosity / perStar⌋', perStar > 0 ? Math.floor(luminosity / perStar) : 0, nat(luminosity, perStar) && perStar > 0, 'starcount', [luminosity, perStar]) }
  /** DISK MASS: a surface density over an area. value surfaceDensity · area. */
  static diskmass(surfaceDensity: number, area: number): CrossFormula { return c('galactic-diskmass', 'diskmass(surfaceDensity, area) = surfaceDensity · area', surfaceDensity * area, nat(surfaceDensity, area), 'diskmass', [surfaceDensity, area]) }
  /** VIRIAL MASS: a velocity-dispersion-squared proxy carried out to a radius. value dispersion² · radius. */
  static virialmass(dispersion: number, radius: number): CrossFormula { return c('galactic-virialmass', 'virialmass(dispersion, radius) = dispersion² · radius', dispersion * dispersion * radius, nat(dispersion, radius), 'virialmass', [dispersion, radius]) }
  /** ESCAPE VELOCITY: twice the enclosed mass over the radius, a proxy. value ⌊2 · mass / radius⌋. */
  static escapevelocity(mass: number, radius: number): CrossFormula { return c('galactic-escapevelocity', 'escapevelocity(mass, radius) = ⌊2 · mass / radius⌋', radius > 0 ? Math.floor((2 * mass) / radius) : 0, nat(mass, radius) && radius > 0, 'escapevelocity', [mass, radius]) }
  /** SURFACE BRIGHTNESS: a luminosity spread over an area. value ⌊luminosity / area⌋. */
  static surfacebrightness(luminosity: number, area: number): CrossFormula { return c('galactic-surfacebrightness', 'surfacebrightness(luminosity, area) = ⌊luminosity / area⌋', area > 0 ? Math.floor(luminosity / area) : 0, nat(luminosity, area) && area > 0, 'surfacebrightness', [luminosity, area]) }
  /** METALLICITY as a percentage: the metal share of the total mass. value ⌊metals · 100 / total⌋. */
  static metallicity(metals: number, total: number): CrossFormula { return c('galactic-metallicity', 'metallicity(metals, total) = ⌊metals · 100 / total⌋', total > 0 ? Math.floor((metals * 100) / total) : 0, nat(metals, total) && total > 0 && metals <= total, 'metallicity', [metals, total]) }
}

for (const name of ['diskmass', 'escapevelocity', 'masswithinradius', 'metallicity', 'rotationvelocity', 'starcount', 'surfacebrightness', 'virialmass'] as const)
  hexRegisterOf('galactic', name, (GalacticFormulas[name] as (...x: unknown[]) => unknown).bind(GalacticFormulas))
