import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTOMETRY — MEASURING STARLIGHT, AS ARITHMETIC (the brightness of things). Light is numbers: the magnitude of a
 *  source, its flux, its colour, the absolute magnitude, the distance modulus, the apparent magnitude, the extinction
 *  along the line of sight, and the signal-to-noise of the measurement. Crosses to `astronomy` — photometry is how
 *  astronomy reads the sky. A measure. */

const PROOF = 'photometry arithmetic (magnitude, flux, colour index, absolute magnitude, distance modulus, apparent magnitude, extinction, signal-to-noise); measuring starlight; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photometry', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `photometry.${name}`, params })

export class PhotometryFormulas {
  /** MAGNITUDE: instrumental magnitude, the zero point less the counts. value max(0, zeropoint − counts). */
  static magnitude(zeropoint: number, counts: number): CrossFormula { return c('photometry-magnitude', 'magnitude(zeropoint, counts) = max(0, zeropoint − counts)', Math.max(0, zeropoint - counts), nat(zeropoint, counts), 'magnitude', [zeropoint, counts]) }
  /** FLUX: photons per unit area per unit time. value ⌊photons / (area · time)⌋. */
  static flux(photons: number, area: number, time: number): CrossFormula { return c('photometry-flux', 'flux(photons, area, time) = ⌊photons / (area · time)⌋', area > 0 && time > 0 ? Math.floor(photons / (area * time)) : 0, nat(photons, area, time) && area > 0 && time > 0, 'flux', [photons, area, time]) }
  /** COLOUR INDEX: the blue magnitude less the red. value max(0, blue − red). */
  static colorindex(blue: number, red: number): CrossFormula { return c('photometry-colorindex', 'colorindex(blue, red) = max(0, blue − red)', Math.max(0, blue - red), nat(blue, red), 'colorindex', [blue, red]) }
  /** ABSOLUTE MAGNITUDE: the apparent magnitude less the distance modulus. value max(0, apparent − distmod). */
  static absolutemagnitude(apparent: number, distmod: number): CrossFormula { return c('photometry-absolutemagnitude', 'absolutemagnitude(apparent, distmod) = max(0, apparent − distmod)', Math.max(0, apparent - distmod), nat(apparent, distmod), 'absolutemagnitude', [apparent, distmod]) }
  /** DISTANCE MODULUS: the apparent magnitude less the absolute. value max(0, apparent − absolute). */
  static distancemodulus(apparent: number, absolute: number): CrossFormula { return c('photometry-distancemodulus', 'distancemodulus(apparent, absolute) = max(0, apparent − absolute)', Math.max(0, apparent - absolute), nat(apparent, absolute), 'distancemodulus', [apparent, absolute]) }
  /** APPARENT MAGNITUDE: the absolute magnitude plus the distance modulus. value absolute + distmod. */
  static apparentmagnitude(absolute: number, distmod: number): CrossFormula { return c('photometry-apparentmagnitude', 'apparentmagnitude(absolute, distmod) = absolute + distmod', absolute + distmod, nat(absolute, distmod), 'apparentmagnitude', [absolute, distmod]) }
  /** EXTINCTION: the extinction coefficient over the air mass. value coefficient · airmass. */
  static extinction(coefficient: number, airmass: number): CrossFormula { return c('photometry-extinction', 'extinction(coefficient, airmass) = coefficient · airmass', coefficient * airmass, nat(coefficient, airmass), 'extinction', [coefficient, airmass]) }
  /** SIGNAL-TO-NOISE: the signal over the noise. value ⌊signal / noise⌋. */
  static signaltonoise(signal: number, noise: number): CrossFormula { return c('photometry-signaltonoise', 'signaltonoise(signal, noise) = ⌊signal / noise⌋', noise > 0 ? Math.floor(signal / noise) : 0, nat(signal, noise) && noise > 0, 'signaltonoise', [signal, noise]) }
}

for (const name of ['absolutemagnitude', 'apparentmagnitude', 'colorindex', 'distancemodulus', 'extinction', 'flux', 'magnitude', 'signaltonoise'] as const)
  hexRegisterOf('photometry', name, (PhotometryFormulas[name] as (...x: unknown[]) => unknown).bind(PhotometryFormulas))
