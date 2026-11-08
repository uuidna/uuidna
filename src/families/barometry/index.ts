import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BAROMETRY — AIR PRESSURE AS ARITHMETIC (chosen by the public-API registry, not by hand). Reading the barometer is
 *  numbers: reduce a station reading to sea level, the three-hour tendency, pressure at an altitude, pascals in millibars,
 *  the gradient between two stations, the station correction, the running trend, and millimetres of mercury in inches.
 *  Crosses to `weather` — barometry is what forecasts the weather. A measure. */

const PROOF = 'barometry arithmetic (sea-level reduction, tendency, altitude pressure, millibars, gradient, station pressure, trend, inches of mercury); the registry\'s uncovered pressure domain; a measure crossed to weather'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'barometry', dst: 'weather', formula, value, proof: PROOF, ...extra }, holds, { name: `barometry.${name}`, params })

export class BarometryFormulas {
  /** SEA-LEVEL REDUCTION: a station reading lifted to sea level, 1 hPa per 8 m. value station + ⌊altitude / 8⌋. */
  static sealevel(station: number, altitude: number): CrossFormula { return c('barometry-sealevel', 'sealevel(station, altitude) = station + ⌊altitude / 8⌋', station + Math.floor(altitude / 8), nat(station, altitude), 'sealevel', [station, altitude]) }
  /** TENDENCY: the three-hour rise from a past reading to now. value max(0, now − past). */
  static tendency(now: number, past: number): CrossFormula { return c('barometry-tendency', 'tendency(now, past) = max(0, now − past)', Math.max(0, now - past), nat(now, past), 'tendency', [now, past]) }
  /** ALTITUDE PRESSURE: a sea-level reading brought down to an altitude, 1 hPa per 8 m. value max(0, sealevel − ⌊altitude / 8⌋). */
  static altitudepressure(sealevel: number, altitude: number): CrossFormula { return c('barometry-altitudepressure', 'altitudepressure(sealevel, altitude) = max(0, sealevel − ⌊altitude / 8⌋)', Math.max(0, sealevel - Math.floor(altitude / 8)), nat(sealevel, altitude), 'altitudepressure', [sealevel, altitude]) }
  /** MILLIBARS: kilopascals as millibars (1 kPa = 10 mb). value kpa · 10. */
  static millibars(kpa: number): CrossFormula { return c('barometry-millibars', 'millibars(kpa) = kpa · 10', kpa * 10, nat(kpa), 'millibars', [kpa]) }
  /** PRESSURE GRADIENT: a pressure difference per unit distance. value ⌊delta / distance⌋. */
  static pressuregradient(delta: number, distance: number): CrossFormula { return c('barometry-pressuregradient', 'pressuregradient(delta, distance) = ⌊delta / distance⌋', distance > 0 ? Math.floor(delta / distance) : 0, nat(delta, distance) && distance > 0, 'pressuregradient', [delta, distance]) }
  /** STATION PRESSURE: a sea-level reading less its station correction. value max(0, sealevel − correction). */
  static stationpressure(sealevel: number, correction: number): CrossFormula { return c('barometry-stationpressure', 'stationpressure(sealevel, correction) = max(0, sealevel − correction)', Math.max(0, sealevel - correction), nat(sealevel, correction), 'stationpressure', [sealevel, correction]) }
  /** TREND: the running mean over a run of readings. value ⌊total / readings⌋. */
  static trend(total: number, readings: number): CrossFormula { return c('barometry-trend', 'trend(total, readings) = ⌊total / readings⌋', readings > 0 ? Math.floor(total / readings) : 0, nat(total, readings) && readings > 0, 'trend', [total, readings]) }
  /** INCHES OF MERCURY: hectopascals as milli-inches of mercury (1 hPa = 0.02953 inHg). value ⌊hpa · 1000 / 3386⌋. */
  static inchesmercury(hpa: number): CrossFormula { return c('barometry-inchesmercury', 'inchesmercury(hpa) = ⌊hpa · 1000 / 3386⌋', Math.floor((hpa * 1000) / 3386), nat(hpa), 'inchesmercury', [hpa]) }
}

for (const name of ['altitudepressure', 'inchesmercury', 'millibars', 'pressuregradient', 'sealevel', 'stationpressure', 'tendency', 'trend'] as const)
  hexRegisterOf('barometry', name, (BarometryFormulas[name] as (...x: unknown[]) => unknown).bind(BarometryFormulas))
