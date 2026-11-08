import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KALMAN — THE RECURSIVE ESTIMATOR, AS ARITHMETIC. A filter is numbers: the gain that weighs a prediction against a
 *  measurement, the state carried forward, the estimate corrected, the error covariance shrunk, the innovation and the
 *  residual, the process noise accrued, and the steady-state gain it settles on. Crosses to `cybernetics` — a Kalman
 *  filter is feedback control made precise. A measure. */

const PROOF = 'kalman arithmetic (gain, predicted state, updated estimate, error covariance, innovation, measurement residual, process noise, steady-state gain); the recursive estimator as integers; a measure crossed to cybernetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'kalman', dst: 'cybernetics', formula, value, proof: PROOF, ...extra }, holds, { name: `kalman.${name}`, params })

export class KalmanFormulas {
  /** THE GAIN: how much of the innovation to trust, from prediction and measurement variance. value ⌊p · 100 / (p + r)⌋. */
  static gain(p: number, r: number): CrossFormula { return c('kalman-gain', 'gain(p, r) = ⌊p · 100 / (p + r)⌋', p + r > 0 ? Math.floor((p * 100) / (p + r)) : 0, nat(p, r) && p + r > 0, 'gain', [p, r]) }
  /** PREDICTED STATE: the state carried forward by the model. value x + u · dt. */
  static predictedstate(x: number, u: number, dt: number): CrossFormula { return c('kalman-predictedstate', 'predictedstate(x, u, dt) = x + u · dt', x + u * dt, nat(x, u, dt), 'predictedstate', [x, u, dt]) }
  /** UPDATED ESTIMATE: the prediction corrected by a gained innovation. value pred + ⌊gain · innov / 100⌋. */
  static updatedestimate(pred: number, gain: number, innov: number): CrossFormula { return c('kalman-updatedestimate', 'updatedestimate(pred, gain, innov) = pred + ⌊gain · innov / 100⌋', pred + Math.floor((gain * innov) / 100), nat(pred, gain, innov), 'updatedestimate', [pred, gain, innov]) }
  /** ERROR COVARIANCE: the prior covariance shrunk by the gain. value ⌊(100 − gain) · p / 100⌋. */
  static errorcovariance(p: number, gain: number): CrossFormula { return c('kalman-errorcovariance', 'errorcovariance(p, gain) = ⌊(100 − gain) · p / 100⌋', Math.floor((Math.max(0, 100 - gain) * p) / 100), nat(p, gain) && gain <= 100, 'errorcovariance', [p, gain]) }
  /** INNOVATION: the measurement surprise against the prediction. value max(0, measured − predicted). */
  static innovation(measured: number, predicted: number): CrossFormula { return c('kalman-innovation', 'innovation(measured, predicted) = max(0, measured − predicted)', Math.max(0, measured - predicted), nat(measured, predicted), 'innovation', [measured, predicted]) }
  /** MEASUREMENT RESIDUAL: the measurement against the corrected estimate. value max(0, measured − estimate). */
  static measurementresidual(measured: number, estimate: number): CrossFormula { return c('kalman-measurementresidual', 'measurementresidual(measured, estimate) = max(0, measured − estimate)', Math.max(0, measured - estimate), nat(measured, estimate), 'measurementresidual', [measured, estimate]) }
  /** PROCESS NOISE: the noise accrued over the step. value q · dt. */
  static processnoise(q: number, dt: number): CrossFormula { return c('kalman-processnoise', 'processnoise(q, dt) = q · dt', q * dt, nat(q, dt), 'processnoise', [q, dt]) }
  /** STEADY-STATE GAIN: the gain the filter settles on from process and measurement noise. value ⌊q · 100 / (q + r)⌋. */
  static steadygain(q: number, r: number): CrossFormula { return c('kalman-steadygain', 'steadygain(q, r) = ⌊q · 100 / (q + r)⌋', q + r > 0 ? Math.floor((q * 100) / (q + r)) : 0, nat(q, r) && q + r > 0, 'steadygain', [q, r]) }
}

for (const name of ['errorcovariance', 'gain', 'innovation', 'measurementresidual', 'predictedstate', 'processnoise', 'steadygain', 'updatedestimate'] as const)
  hexRegisterOf('kalman', name, (KalmanFormulas[name] as (...x: unknown[]) => unknown).bind(KalmanFormulas))
