import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EXOPLANET — A DISTANT WORLD, AS ARITHMETIC (chosen by the transit-survey registry, not by hand). Finding a planet is
 *  numbers: how deep its shadow dims the star, how long its year, where it must orbit to hold water, its size against the
 *  star, how long the shadow lasts, how hot it bakes, its mass against the star, and the wobble it pulls. Crosses to
 *  `astronomy` — an exoplanet is what astronomy measures. A measure. */

const PROOF = 'exoplanet arithmetic (transit depth, orbital period, habitable zone, radius ratio, transit duration, equilibrium temp, mass ratio, radial-velocity semi-amplitude); a transit-survey domain; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'exoplanet', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `exoplanet.${name}`, params })

export class ExoplanetFormulas {
  /** TRANSIT DEPTH: the star's dimming, (Rp/Rs)² in ppm. value ⌊planetRadius² · 1000000 / starRadius²⌋. */
  static transitdepth(planetRadius: number, starRadius: number): CrossFormula { return c('exoplanet-transitdepth', 'transitdepth(planetRadius, starRadius) = ⌊planetRadius² · 1000000 / starRadius²⌋', starRadius > 0 ? Math.floor((planetRadius * planetRadius * 1000000) / (starRadius * starRadius)) : 0, nat(planetRadius, starRadius) && starRadius > 0, 'transitdepth', [planetRadius, starRadius]) }
  /** ORBITAL PERIOD: the year, orbit path over speed. value ⌊circumference / speed⌋. */
  static orbitalperiod(circumference: number, speed: number): CrossFormula { return c('exoplanet-orbitalperiod', 'orbitalperiod(circumference, speed) = ⌊circumference / speed⌋', speed > 0 ? Math.floor(circumference / speed) : 0, nat(circumference, speed) && speed > 0, 'orbitalperiod', [circumference, speed]) }
  /** HABITABLE ZONE: the distance where flux holds water, luminosity over flux. value ⌊luminosity / flux⌋. */
  static habitablezone(luminosity: number, flux: number): CrossFormula { return c('exoplanet-habitablezone', 'habitablezone(luminosity, flux) = ⌊luminosity / flux⌋', flux > 0 ? Math.floor(luminosity / flux) : 0, nat(luminosity, flux) && flux > 0, 'habitablezone', [luminosity, flux]) }
  /** RADIUS RATIO: the planet against the star, in permille. value ⌊planetRadius · 1000 / starRadius⌋. */
  static radiusratio(planetRadius: number, starRadius: number): CrossFormula { return c('exoplanet-radiusratio', 'radiusratio(planetRadius, starRadius) = ⌊planetRadius · 1000 / starRadius⌋', starRadius > 0 ? Math.floor((planetRadius * 1000) / starRadius) : 0, nat(planetRadius, starRadius) && starRadius > 0, 'radiusratio', [planetRadius, starRadius]) }
  /** TRANSIT DURATION: how long the shadow lasts, the chord fraction of the period. value ⌊period · chord / 1000⌋. */
  static transitduration(period: number, chord: number): CrossFormula { return c('exoplanet-transitduration', 'transitduration(period, chord) = ⌊period · chord / 1000⌋', Math.floor((period * chord) / 1000), nat(period, chord), 'transitduration', [period, chord]) }
  /** EQUILIBRIUM TEMP: how hot it bakes, the star's heat diluted by distance. value ⌊starTemp / dilution⌋. */
  static equilibriumtemp(starTemp: number, dilution: number): CrossFormula { return c('exoplanet-equilibriumtemp', 'equilibriumtemp(starTemp, dilution) = ⌊starTemp / dilution⌋', dilution > 0 ? Math.floor(starTemp / dilution) : 0, nat(starTemp, dilution) && dilution > 0, 'equilibriumtemp', [starTemp, dilution]) }
  /** MASS RATIO: the planet against the star, in ppm. value ⌊planetMass · 1000000 / starMass⌋. */
  static massratio(planetMass: number, starMass: number): CrossFormula { return c('exoplanet-massratio', 'massratio(planetMass, starMass) = ⌊planetMass · 1000000 / starMass⌋', starMass > 0 ? Math.floor((planetMass * 1000000) / starMass) : 0, nat(planetMass, starMass) && starMass > 0, 'massratio', [planetMass, starMass]) }
  /** SEMI-AMPLITUDE: the wobble the planet pulls on the star. value ⌊planetMass · 1000 / (period · starMass)⌋. */
  static semiamplitude(planetMass: number, period: number, starMass: number): CrossFormula { return c('exoplanet-semiamplitude', 'semiamplitude(planetMass, period, starMass) = ⌊planetMass · 1000 / (period · starMass)⌋', period > 0 && starMass > 0 ? Math.floor((planetMass * 1000) / (period * starMass)) : 0, nat(planetMass, period, starMass) && period > 0 && starMass > 0, 'semiamplitude', [planetMass, period, starMass]) }
}

for (const name of ['equilibriumtemp', 'habitablezone', 'massratio', 'orbitalperiod', 'radiusratio', 'semiamplitude', 'transitdepth', 'transitduration'] as const)
  hexRegisterOf('exoplanet', name, (ExoplanetFormulas[name] as (...x: unknown[]) => unknown).bind(ExoplanetFormulas))
