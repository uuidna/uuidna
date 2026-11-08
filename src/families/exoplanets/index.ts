import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EXOPLANETS — DETECTING AND SIZING WORLDS AROUND OTHER STARS, AS ARITHMETIC (integer proxies for the standard
 *  observables). A planet is numbers: the dip it drills in its star's light, its year, the half-width of its orbit,
 *  its size, how long a transit lasts, the wobble it tugs on its star, the starlight it bathes in, and how tightly
 *  its mass is packed. Crosses to `astronomy` — an exoplanet is a body astronomy observes. A measure. */

const PROOF = 'exoplanets arithmetic (transit depth, orbital period, semi-major axis, radius, transit duration, radial velocity, insolation, density); integer proxies for the standard observables; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'exoplanets', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `exoplanets.${name}`, params })

export class ExoplanetsFormulas {
  /** TRANSIT DEPTH: the fractional dip (ppm) a planet drills in its star's light, (Rp/Rs)². value ⌊rplanet² · 1000000 / rstar²⌋. */
  static transitdepth(rplanet: number, rstar: number): CrossFormula { return c('exoplanets-transitdepth', 'transitdepth(rplanet, rstar) = ⌊rplanet² · 1000000 / rstar²⌋', rstar > 0 ? Math.floor((rplanet * rplanet * 1000000) / (rstar * rstar)) : 0, nat(rplanet, rstar) && rstar > 0, 'transitdepth', [rplanet, rstar]) }
  /** ORBITAL PERIOD: the time to walk the orbit path at the orbital speed. value ⌊path / speed⌋. */
  static period(path: number, speed: number): CrossFormula { return c('exoplanets-period', 'period(path, speed) = ⌊path / speed⌋', speed > 0 ? Math.floor(path / speed) : 0, nat(path, speed) && speed > 0, 'period', [path, speed]) }
  /** SEMI-MAJOR AXIS: the mean of aphelion and perihelion. value ⌊(aphelion + perihelion) / 2⌋. */
  static semimajor(aphelion: number, perihelion: number): CrossFormula { return c('exoplanets-semimajor', 'semimajor(aphelion, perihelion) = ⌊(aphelion + perihelion) / 2⌋', Math.floor((aphelion + perihelion) / 2), nat(aphelion, perihelion), 'semimajor', [aphelion, perihelion]) }
  /** PLANET RADIUS: half the measured diameter. value ⌊diameter / 2⌋. */
  static radius(diameter: number): CrossFormula { return c('exoplanets-radius', 'radius(diameter) = ⌊diameter / 2⌋', Math.floor(diameter / 2), nat(diameter), 'radius', [diameter]) }
  /** TRANSIT DURATION: how long the crossing lasts, period · rstar / a. value ⌊period · rstar / a⌋. */
  static transitduration(period: number, rstar: number, a: number): CrossFormula { return c('exoplanets-transitduration', 'transitduration(period, rstar, a) = ⌊period · rstar / a⌋', a > 0 ? Math.floor((period * rstar) / a) : 0, nat(period, rstar, a) && a > 0, 'transitduration', [period, rstar, a]) }
  /** RADIAL VELOCITY: the stellar wobble semi-amplitude, scaled by the mass ratio. value ⌊mplanet · 1000 / mstar⌋. */
  static radialvelocity(mplanet: number, mstar: number): CrossFormula { return c('exoplanets-radialvelocity', 'radialvelocity(mplanet, mstar) = ⌊mplanet · 1000 / mstar⌋', mstar > 0 ? Math.floor((mplanet * 1000) / mstar) : 0, nat(mplanet, mstar) && mstar > 0, 'radialvelocity', [mplanet, mstar]) }
  /** INSOLATION: the starlight a planet bathes in, luminosity over distance². value ⌊luminosity / distance²⌋. */
  static insolation(luminosity: number, distance: number): CrossFormula { return c('exoplanets-insolation', 'insolation(luminosity, distance) = ⌊luminosity / distance²⌋', distance > 0 ? Math.floor(luminosity / (distance * distance)) : 0, nat(luminosity, distance) && distance > 0, 'insolation', [luminosity, distance]) }
  /** DENSITY: mass packed into volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('exoplanets-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
}

for (const name of ['density', 'insolation', 'period', 'radialvelocity', 'radius', 'semimajor', 'transitdepth', 'transitduration'] as const)
  hexRegisterOf('exoplanets', name, (ExoplanetsFormulas[name] as (...x: unknown[]) => unknown).bind(ExoplanetsFormulas))
