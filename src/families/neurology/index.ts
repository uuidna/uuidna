import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NEUROLOGY — THE NERVOUS SYSTEM, AS ARITHMETIC (chosen by the public-API registry, not by hand). Clinical neurology is
 *  numbers: the Glasgow coma scale, a reflex grade, nerve conduction velocity, seizure frequency, an NIHSS stroke proxy,
 *  evoked latency, cerebral perfusion, and recovery. Crosses to `med` — neurology is a branch of medicine. A measure. */

const PROOF = 'neurology arithmetic (Glasgow coma scale, reflex grade, nerve conduction velocity, seizure frequency, NIHSS stroke proxy, evoked latency, cerebral perfusion, recovery); a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'neurology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `neurology.${name}`, params })

export class NeurologyFormulas {
  /** GLASGOW COMA SCALE: eye, verbal and motor response. value eye + verbal + motor. */
  static glasgow(eye: number, verbal: number, motor: number): CrossFormula { return c('neurology-glasgow', 'glasgow(eye, verbal, motor) = eye + verbal + motor', eye + verbal + motor, nat(eye, verbal, motor) && eye >= 1 && eye <= 4 && verbal >= 1 && verbal <= 5 && motor >= 1 && motor <= 6, 'glasgow', [eye, verbal, motor]) }
  /** REFLEX GRADE: the 0..4 deep-tendon reflex scale. value score. */
  static reflex(score: number): CrossFormula { return c('neurology-reflex', 'reflex(score) = score', score, nat(score) && score <= 4, 'reflex', [score]) }
  /** NERVE CONDUCTION VELOCITY: distance over time. value ⌊distance / time⌋. */
  static conduction(distance: number, time: number): CrossFormula { return c('neurology-conduction', 'conduction(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'conduction', [distance, time]) }
  /** SEIZURE FREQUENCY: episodes over a period, as a percentage. value ⌊episodes · 100 / period⌋. */
  static seizure(episodes: number, period: number): CrossFormula { return c('neurology-seizure', 'seizure(episodes, period) = ⌊episodes · 100 / period⌋', period > 0 ? Math.floor((episodes * 100) / period) : 0, nat(episodes, period) && period > 0, 'seizure', [episodes, period]) }
  /** STROKE (NIHSS proxy): deficits over total, as a percentage. value ⌊deficits · 100 / total⌋. */
  static stroke(deficits: number, total: number): CrossFormula { return c('neurology-stroke', 'stroke(deficits, total) = ⌊deficits · 100 / total⌋', total > 0 ? Math.floor((deficits * 100) / total) : 0, nat(deficits, total) && total > 0 && deficits <= total, 'stroke', [deficits, total]) }
  /** EVOKED LATENCY: the response time in milliseconds. value ms. */
  static latency(ms: number): CrossFormula { return c('neurology-latency', 'latency(ms) = ms', ms, nat(ms), 'latency', [ms]) }
  /** CEREBRAL PERFUSION: flow over tissue mass. value ⌊flow / mass⌋. */
  static perfusion(flow: number, mass: number): CrossFormula { return c('neurology-perfusion', 'perfusion(flow, mass) = ⌊flow / mass⌋', mass > 0 ? Math.floor(flow / mass) : 0, nat(flow, mass) && mass > 0, 'perfusion', [flow, mass]) }
  /** RECOVERY: function regained over function lost, as a percentage. value ⌊regained · 100 / lost⌋. */
  static recovery(regained: number, lost: number): CrossFormula { return c('neurology-recovery', 'recovery(regained, lost) = ⌊regained · 100 / lost⌋', lost > 0 ? Math.floor((regained * 100) / lost) : 0, nat(regained, lost) && lost > 0 && regained <= lost, 'recovery', [regained, lost]) }
}

for (const name of ['conduction', 'glasgow', 'latency', 'perfusion', 'recovery', 'reflex', 'seizure', 'stroke'] as const)
  hexRegisterOf('neurology', name, (NeurologyFormulas[name] as (...x: unknown[]) => unknown).bind(NeurologyFormulas))
