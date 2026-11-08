import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEODESY — THE SHAPE OF THE EARTH, AS ARITHMETIC (chosen by the registry, not by hand). Measuring the planet is numbers:
 *  the flattening of the ellipsoid, the length of a meridian arc, the geoid height above the ellipsoid, a datum shift in
 *  parts per million, grid convergence, orthometric elevation, baseline error, and the precision carried. Crosses to
 *  `geography` — geodesy is the frame geography is drawn on. A measure. */

const PROOF = 'geodesy arithmetic (ellipsoid flattening, meridian arc, geoid height, datum shift ppm, grid convergence, orthometric elevation, baseline error, precision); a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geodesy', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `geodesy.${name}`, params })

export class GeodesyFormulas {
  /** FLATTENING: how far the ellipsoid departs from a sphere, in ten-thousandths. value ⌊(equatorial − polar) · 10000 / equatorial⌋. */
  static flattening(equatorial: number, polar: number): CrossFormula { return c('geodesy-flattening', 'flattening(equatorial, polar) = ⌊(equatorial − polar) · 10000 / equatorial⌋', equatorial > 0 ? Math.floor(((equatorial - polar) * 10000) / equatorial) : 0, nat(equatorial, polar) && equatorial > 0 && polar <= equatorial, 'flattening', [equatorial, polar]) }
  /** ARC: meridian arc length for a span of degrees at a radius (proxy). value ⌊degrees · radius · 314 / 18000⌋. */
  static arc(degrees: number, radius: number): CrossFormula { return c('geodesy-arc', 'arc(degrees, radius) = ⌊degrees · radius · 314 / 18000⌋', Math.floor((degrees * radius * 314) / 18000), nat(degrees, radius), 'arc', [degrees, radius]) }
  /** GEOID: the geoid height above the ellipsoid. value height − undulation (may be negative). */
  static geoid(height: number, undulation: number): CrossFormula { return c('geodesy-geoid', 'geoid(height, undulation) = height − undulation', height - undulation, nat(height, undulation), 'geoid', [height, undulation]) }
  /** DATUM: a datum shift over a distance, in parts per million. value ⌊shift · 1000000 / distance⌋. */
  static datum(shift: number, distance: number): CrossFormula { return c('geodesy-datum', 'datum(shift, distance) = ⌊shift · 1000000 / distance⌋', distance > 0 ? Math.floor((shift * 1000000) / distance) : 0, nat(shift, distance) && distance > 0, 'datum', [shift, distance]) }
  /** CONVERGENCE: grid convergence from longitude and latitude. value ⌊longitude · latitude / 90⌋. */
  static convergence(longitude: number, latitude: number): CrossFormula { return c('geodesy-convergence', 'convergence(longitude, latitude) = ⌊longitude · latitude / 90⌋', Math.floor((longitude * latitude) / 90), nat(longitude, latitude), 'convergence', [longitude, latitude]) }
  /** ELEVATION: orthometric elevation, geoid height less the ellipsoidal. value geoid_ − ellipsoid (may be negative). */
  static elevation(geoid_: number, ellipsoid: number): CrossFormula { return c('geodesy-elevation', 'elevation(geoid_, ellipsoid) = geoid_ − ellipsoid', geoid_ - ellipsoid, nat(geoid_, ellipsoid), 'elevation', [geoid_, ellipsoid]) }
  /** BASELINE: baseline error over its length, in parts per million. value ⌊error · 1000000 / length⌋. */
  static baseline(error: number, length: number): CrossFormula { return c('geodesy-baseline', 'baseline(error, length) = ⌊error · 1000000 / length⌋', length > 0 ? Math.floor((error * 1000000) / length) : 0, nat(error, length) && length > 0, 'baseline', [error, length]) }
  /** PRECISION: the significant digits carried. value digits. */
  static precision(digits: number): CrossFormula { return c('geodesy-precision', 'precision(digits) = digits', digits, nat(digits), 'precision', [digits]) }
}

for (const name of ['arc', 'baseline', 'convergence', 'datum', 'elevation', 'flattening', 'geoid', 'precision'] as const)
  hexRegisterOf('geodesy', name, (GeodesyFormulas[name] as (...x: unknown[]) => unknown).bind(GeodesyFormulas))
