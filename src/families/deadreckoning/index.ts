import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEADRECKONING — POSITION WITHOUT A FIX, AS ARITHMETIC (course and speed over elapsed time, the oldest navigation).
 *  It is numbers: the distance run, the drift angle off the track, the position error against a fix, the time a run takes,
 *  the speed made good, the set-and-drift of a current, the estimated position, and the course correction to steer back.
 *  Crosses to `navigation` — dead reckoning is the reckoning navigation does between fixes. A measure. */

const PROOF = 'dead reckoning arithmetic (distance run, drift angle, position error, elapsed time, speed made good, set and drift, estimated position, course correction); position carried forward from course and speed; a measure crossed to navigation'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'deadreckoning', dst: 'navigation', formula, value, proof: PROOF, ...extra }, holds, { name: `deadreckoning.${name}`, params })

export class DeadreckoningFormulas {
  /** DISTANCE RUN: speed over the ground for a span of time. value speed · time. */
  static distance(speed: number, time: number): CrossFormula { return c('deadreckoning-distance', 'distance(speed, time) = speed · time', speed * time, nat(speed, time), 'distance', [speed, time]) }
  /** DRIFT ANGLE: cross-track offset over the distance run, in arcminutes. value ⌊cross · 60 / dist⌋. */
  static driftangle(cross: number, dist: number): CrossFormula { return c('deadreckoning-driftangle', 'driftangle(cross, dist) = ⌊cross · 60 / dist⌋', dist > 0 ? Math.floor((cross * 60) / dist) : 0, nat(cross, dist) && dist > 0, 'driftangle', [cross, dist]) }
  /** POSITION ERROR: the gap between the reckoned position and the fix. value |reckoned − fix|. */
  static positionerror(reckoned: number, fix: number): CrossFormula { return c('deadreckoning-positionerror', 'positionerror(reckoned, fix) = |reckoned − fix|', Math.max(reckoned, fix) - Math.min(reckoned, fix), nat(reckoned, fix), 'positionerror', [reckoned, fix]) }
  /** ELAPSED TIME: the distance to run over the speed made good. value ⌊dist / speed⌋. */
  static elapsedtime(dist: number, speed: number): CrossFormula { return c('deadreckoning-elapsedtime', 'elapsedtime(dist, speed) = ⌊dist / speed⌋', speed > 0 ? Math.floor(dist / speed) : 0, nat(dist, speed) && speed > 0, 'elapsedtime', [dist, speed]) }
  /** SPEED MADE GOOD: the distance made good over the time run. value ⌊dist / time⌋. */
  static speedmadegood(dist: number, time: number): CrossFormula { return c('deadreckoning-speedmadegood', 'speedmadegood(dist, time) = ⌊dist / time⌋', time > 0 ? Math.floor(dist / time) : 0, nat(dist, time) && time > 0, 'speedmadegood', [dist, time]) }
  /** SET AND DRIFT: the current's set carries the vessel at its drift rate over the hours. value set · hours. */
  static setandrift(set: number, hours: number): CrossFormula { return c('deadreckoning-setandrift', 'setandrift(set, hours) = set · hours', set * hours, nat(set, hours), 'setandrift', [set, hours]) }
  /** ESTIMATED POSITION: the start carried forward by the distance run. value start + dist. */
  static estimatedposition(start: number, dist: number): CrossFormula { return c('deadreckoning-estimatedposition', 'estimatedposition(start, dist) = start + dist', start + dist, nat(start, dist), 'estimatedposition', [start, dist]) }
  /** COURSE CORRECTION: the heading change to steer from the actual course onto the desired one. value |desired − actual|. */
  static coursecorrection(desired: number, actual: number): CrossFormula { return c('deadreckoning-coursecorrection', 'coursecorrection(desired, actual) = |desired − actual|', Math.max(desired, actual) - Math.min(desired, actual), nat(desired, actual), 'coursecorrection', [desired, actual]) }
}

for (const name of ['coursecorrection', 'distance', 'driftangle', 'elapsedtime', 'estimatedposition', 'positionerror', 'setandrift', 'speedmadegood'] as const)
  hexRegisterOf('deadreckoning', name, (DeadreckoningFormulas[name] as (...x: unknown[]) => unknown).bind(DeadreckoningFormulas))
