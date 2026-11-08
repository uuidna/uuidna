import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GPS — SATELLITE POSITIONING, AS ARITHMETIC (chosen by the registry, not by hand). A fix is numbers: the satellites in
 *  view, how many a trilaterated fix needs, dilution of precision, whether the fix is good, the pseudorange a signal
 *  travelled, time to first fix, the resulting accuracy, and the satellites above an elevation mask. Crosses to
 *  `navigation` — gps is what navigation positions from. A measure. */

const PROOF = 'gps arithmetic (visible satellites, trilateration minimum, dilution of precision, fix quality, pseudorange, time to first fix, accuracy, elevation mask); a measure crossed to navigation'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gps', dst: 'navigation', formula, value, proof: PROOF, ...extra }, holds, { name: `gps.${name}`, params })

export class GpsFormulas {
  /** VISIBLE SATELLITES: those in the constellation that are not blocked. value max(0, total − blocked). */
  static satellites(total: number, blocked: number): CrossFormula { return c('gps-satellites', 'satellites(total, blocked) = max(0, total − blocked)', Math.max(0, total - blocked), nat(total, blocked) && blocked <= total, 'satellites', [total, blocked]) }
  /** TRILATERATION: the minimum satellites a fix needs in `dims` dimensions (one more, for the clock bias). value dims + 1. */
  static trilateration(dims: number): CrossFormula { return c('gps-trilateration', 'trilateration(dims) = dims + 1', dims + 1, nat(dims), 'trilateration', [dims]) }
  /** HDOP: horizontal dilution of precision, geometry spread over the satellites used. value ⌊spread / satellites⌋. */
  static hdop(spread: number, satellites: number): CrossFormula { return c('gps-hdop', 'hdop(spread, satellites) = ⌊spread / satellites⌋', satellites > 0 ? Math.floor(spread / satellites) : 0, nat(spread, satellites) && satellites > 0, 'hdop', [spread, satellites]) }
  /** FIX QUALITY: 1 when the satellites used meet the minimum for a fix. value [satellites ≥ min]. */
  static fixquality(satellites: number, min: number): CrossFormula { return c('gps-fixquality', 'fixquality(satellites, min) = [satellites ≥ min]', satellites >= min ? 1 : 0, nat(satellites, min), 'fixquality', [satellites, min]) }
  /** PSEUDORANGE: the distance a signal travelled, time at a speed. value time · speed. */
  static pseudorange(time: number, speed: number): CrossFormula { return c('gps-pseudorange', 'pseudorange(time, speed) = time · speed', time * speed, nat(time, speed), 'pseudorange', [time, speed]) }
  /** TIME TO FIRST FIX: almanac, ephemeris and search seconds together. value almanac + ephemeris + search. */
  static ttff(almanac: number, ephemeris: number, search: number): CrossFormula { return c('gps-ttff', 'ttff(almanac, ephemeris, search) = almanac + ephemeris + search', almanac + ephemeris + search, nat(almanac, ephemeris, search), 'ttff', [almanac, ephemeris, search]) }
  /** ACCURACY: metres, the dilution of precision times the user-equivalent range error. value hdop · uere. */
  static accuracy(hdop: number, uere: number): CrossFormula { return c('gps-accuracy', 'accuracy(hdop, uere) = hdop · uere', hdop * uere, nat(hdop, uere), 'accuracy', [hdop, uere]) }
  /** ELEVATION MASK: the satellites left once those below the mask are dropped. value max(0, total − below). */
  static elevationmask(total: number, below: number): CrossFormula { return c('gps-elevationmask', 'elevationmask(total, below) = max(0, total − below)', Math.max(0, total - below), nat(total, below) && below <= total, 'elevationmask', [total, below]) }
}

for (const name of ['accuracy', 'elevationmask', 'fixquality', 'hdop', 'pseudorange', 'satellites', 'trilateration', 'ttff'] as const)
  hexRegisterOf('gps', name, (GpsFormulas[name] as (...x: unknown[]) => unknown).bind(GpsFormulas))
