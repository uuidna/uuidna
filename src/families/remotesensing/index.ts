import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REMOTE SENSING — EARTH OBSERVATION AS ARITHMETIC (chosen by the registry, not by hand). Reading the planet from orbit is
 *  numbers: the vegetation index of a scene, the ground resolution of a sensor, reflectance, classification accuracy, the
 *  bands a sensor carries, the revisit period, cloud cover, and the swath an angle sweeps. Crosses to `geography` — remote
 *  sensing is how geography is measured from above. A measure. */

const PROOF = 'remote sensing arithmetic (ndvi, ground resolution, reflectance, classification accuracy, bands, revisit, cloud cover, swath); an earth-observation domain; a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'remotesensing', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `remotesensing.${name}`, params })

export class RemotesensingFormulas {
  /** NDVI: the normalised difference vegetation index as a percentage. value ⌊(nir − red) · 100 / (nir + red)⌋. */
  static ndvi(nir: number, red: number): CrossFormula { return c('remotesensing-ndvi', 'ndvi(nir, red) = ⌊(nir − red) · 100 / (nir + red)⌋', (nir + red) > 0 ? Math.floor(((nir - red) * 100) / (nir + red)) : 0, nat(nir, red) && (nir + red) > 0 && nir >= red, 'ndvi', [nir, red]) }
  /** GROUND RESOLUTION: swath over the pixels across it. value ⌊swath / pixels⌋. */
  static resolution(swath: number, pixels: number): CrossFormula { return c('remotesensing-resolution', 'resolution(swath, pixels) = ⌊swath / pixels⌋', pixels > 0 ? Math.floor(swath / pixels) : 0, nat(swath, pixels) && pixels > 0, 'resolution', [swath, pixels]) }
  /** REFLECTANCE as a percentage. value ⌊reflected · 100 / incident⌋. */
  static reflectance(reflected: number, incident: number): CrossFormula { return c('remotesensing-reflectance', 'reflectance(reflected, incident) = ⌊reflected · 100 / incident⌋', incident > 0 ? Math.floor((reflected * 100) / incident) : 0, nat(reflected, incident) && incident > 0 && reflected <= incident, 'reflectance', [reflected, incident]) }
  /** CLASSIFICATION ACCURACY: correctly labelled pixels as a percentage. value ⌊correct · 100 / pixels⌋. */
  static classification(correct: number, pixels: number): CrossFormula { return c('remotesensing-classification', 'classification(correct, pixels) = ⌊correct · 100 / pixels⌋', pixels > 0 ? Math.floor((correct * 100) / pixels) : 0, nat(correct, pixels) && pixels > 0 && correct <= pixels, 'classification', [correct, pixels]) }
  /** BANDS: the spectral bands a sensor carries. value count. */
  static bands(count: number): CrossFormula { return c('remotesensing-bands', 'bands(count) = count', count, nat(count), 'bands', [count]) }
  /** REVISIT: the days between passes over a point. value days. */
  static revisit(days: number): CrossFormula { return c('remotesensing-revisit', 'revisit(days) = days', days, nat(days), 'revisit', [days]) }
  /** CLOUD COVER as a percentage of the scene. value ⌊cloudy · 100 / total⌋. */
  static cloudcover(cloudy: number, total: number): CrossFormula { return c('remotesensing-cloudcover', 'cloudcover(cloudy, total) = ⌊cloudy · 100 / total⌋', total > 0 ? Math.floor((cloudy * 100) / total) : 0, nat(cloudy, total) && total > 0 && cloudy <= total, 'cloudcover', [cloudy, total]) }
  /** SWATH: the ground width an off-nadir angle sweeps from altitude. value altitude · angle. */
  static swath(altitude: number, angle: number): CrossFormula { return c('remotesensing-swath', 'swath(altitude, angle) = altitude · angle', altitude * angle, nat(altitude, angle), 'swath', [altitude, angle]) }
}

for (const name of ['bands', 'classification', 'cloudcover', 'ndvi', 'reflectance', 'resolution', 'revisit', 'swath'] as const)
  hexRegisterOf('remotesensing', name, (RemotesensingFormulas[name] as (...x: unknown[]) => unknown).bind(RemotesensingFormulas))
