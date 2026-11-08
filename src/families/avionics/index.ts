import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** AVIONICS — FLIGHT INSTRUMENTS AS ARITHMETIC. The numbers a cockpit reads: airspeed from distance over time, altitude-hold
 *  deviation, heading error wrapped to the shortest turn, the glide ratio, fuel burn, climb rate, a transponder squawk's
 *  octal validity, and whether a nav deviation stays within tolerance. Crosses to `aerodynamics` — the instruments read the
 *  flow the airframe meets. A measure. */

const PROOF = 'avionics arithmetic (airspeed, altitude-hold deviation, heading error, glide ratio, fuel burn, climb rate, transponder squawk validity, nav tolerance); the cockpit\'s instruments as numbers; a measure crossed to aerodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'avionics', dst: 'aerodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `avionics.${name}`, params })

export class AvionicsFormulas {
  /** AIRSPEED: distance over time. value ⌊distance / time⌋. */
  static airspeed(distance: number, time: number): CrossFormula { return c('avionics-airspeed', 'airspeed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'airspeed', [distance, time]) }
  /** ALTITUDE HOLD: deviation from the target altitude. value |current − target|. */
  static altitudehold(current: number, target: number): CrossFormula { return c('avionics-altitudehold', 'altitudehold(current, target) = |current − target|', Math.abs(current - target), nat(current, target), 'altitudehold', [current, target]) }
  /** HEADING ERROR: the shortest turn to the target heading. value min(m, 360 − m), m = |target − actual| mod 360. */
  static headingerror(target: number, actual: number): CrossFormula { const m = Math.abs(target - actual) % fullTurn; return c('avionics-headingerror', 'headingerror(target, actual) = min(m, 360 − m), m = |target − actual| mod 360', Math.min(m, Math.max(0, 360 - m)), nat(target, actual), 'headingerror', [target, actual]) }
  /** GLIDE PATH: the glide ratio, horizontal distance over altitude lost. value ⌊distance / drop⌋. */
  static glidepath(distance: number, drop: number): CrossFormula { return c('avionics-glidepath', 'glidepath(distance, drop) = ⌊distance / drop⌋', drop > 0 ? Math.floor(distance / drop) : 0, nat(distance, drop) && drop > 0, 'glidepath', [distance, drop]) }
  /** FUEL FLOW: fuel burned at a rate over time. value rate · time. */
  static fuelflow(rate: number, time: number): CrossFormula { return c('avionics-fuelflow', 'fuelflow(rate, time) = rate · time', rate * time, nat(rate, time), 'fuelflow', [rate, time]) }
  /** CLIMB RATE: altitude gained over time. value ⌊gain / time⌋. */
  static climbrate(gain: number, time: number): CrossFormula { return c('avionics-climbrate', 'climbrate(gain, time) = ⌊gain / time⌋', time > 0 ? Math.floor(gain / time) : 0, nat(gain, time) && time > 0, 'climbrate', [gain, time]) }
  /** TRANSPONDER: 1 when the squawk is a valid octal code (each of four digits ≤ 7). value [valid]. */
  static transponder(code: number): CrossFormula { const d0 = code % 10, d1 = Math.floor(code / 10) % 10, d2 = Math.floor(code / 100) % 10, d3 = Math.floor(code / 1000) % 10; return c('avionics-transponder', 'transponder(code) = [code ≤ 7777 and each octal digit ≤ 7]', code <= 7777 && d0 <= 7 && d1 <= 7 && d2 <= 7 && d3 <= 7 ? 1 : 0, nat(code), 'transponder', [code]) }
  /** NAV TOLERANCE: 1 when the deviation stays within the limit. value [deviation ≤ limit]. */
  static navtolerance(deviation: number, limit: number): CrossFormula { return c('avionics-navtolerance', 'navtolerance(deviation, limit) = [deviation ≤ limit]', deviation <= limit ? 1 : 0, nat(deviation, limit), 'navtolerance', [deviation, limit]) }
}

for (const name of ['airspeed', 'altitudehold', 'climbrate', 'fuelflow', 'glidepath', 'headingerror', 'navtolerance', 'transponder'] as const)
  hexRegisterOf('avionics', name, (AvionicsFormulas[name] as (...x: unknown[]) => unknown).bind(AvionicsFormulas))
