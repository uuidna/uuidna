import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACTIVATION — THE NONLINEARITIES OF A NEURON, AS ARITHMETIC (what fires and how hard). A pre-activation is a number;
 *  the activation is what the unit passes on: rectified, leaked, stepped, a hard sigmoid ramp, saturated, thresholded,
 *  clamped to a band, or passed only outside a dead zone. Crosses to `neuroscience` — activation is how a neuron answers. A map. */

const PROOF = 'activation arithmetic (relu, leaky relu, step, hard sigmoid, saturate, threshold, clamp, dead zone); the nonlinearity a unit applies to its pre-activation; a map crossed to neuroscience'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'activation', dst: 'neuroscience', formula, value, proof: PROOF, ...extra }, holds, { name: `activation.${name}`, params })

export class ActivationFormulas {
  /** RELU: the rectified pre-activation above a bias. value max(0, x − bias). */
  static relu(x: number, bias: number): CrossFormula { return c('activation-relu', 'relu(x, bias) = max(0, x − bias)', Math.max(0, x - bias), nat(x, bias), 'relu', [x, bias]) }
  /** LEAKY RELU: rectified above the bias, otherwise a leaked fraction of x. value x ≥ bias ? x − bias : ⌊x / div⌋. */
  static leakyrelu(x: number, bias: number, div: number): CrossFormula { return c('activation-leakyrelu', 'leakyrelu(x, bias, div) = x ≥ bias ? x − bias : ⌊x / div⌋', x >= bias ? Math.max(0, x - bias) : (div > 0 ? Math.floor(x / div) : 0), nat(x, bias, div) && div > 0, 'leakyrelu', [x, bias, div]) }
  /** STEP: the unit fires when the pre-activation reaches the threshold. value [x ≥ thr]. */
  static step(x: number, thr: number): CrossFormula { return c('activation-step', 'step(x, thr) = [x ≥ thr]', x >= thr ? 1 : 0, nat(x, thr), 'step', [x, thr]) }
  /** HARD SIGMOID: a linear ramp from 0 to 100 over [0, hi], clamped. value x ≥ hi ? 100 : ⌊x · 100 / hi⌋. */
  static hardsigmoid(x: number, hi: number): CrossFormula { return c('activation-hardsigmoid', 'hardsigmoid(x, hi) = x ≥ hi ? 100 : ⌊x · 100 / hi⌋', hi > 0 ? (x >= hi ? 100 : Math.floor((x * 100) / hi)) : 0, nat(x, hi) && hi > 0, 'hardsigmoid', [x, hi]) }
  /** SATURATE: the pre-activation capped from above. value min(x, cap). */
  static saturate(x: number, cap: number): CrossFormula { return c('activation-saturate', 'saturate(x, cap) = min(x, cap)', Math.min(x, cap), nat(x, cap), 'saturate', [x, cap]) }
  /** THRESHOLD: passed through above the threshold, otherwise replaced by a resting value. value x ≥ thr ? x : val. */
  static threshold(x: number, thr: number, val: number): CrossFormula { return c('activation-threshold', 'threshold(x, thr, val) = x ≥ thr ? x : val', x >= thr ? x : val, nat(x, thr, val), 'threshold', [x, thr, val]) }
  /** CLAMP: the pre-activation held inside a band. value min(max(x, lo), hi). */
  static clamp(x: number, lo: number, hi: number): CrossFormula { return c('activation-clamp', 'clamp(x, lo, hi) = min(max(x, lo), hi)', Math.min(Math.max(x, lo), hi), nat(x, lo, hi) && lo <= hi, 'clamp', [x, lo, hi]) }
  /** DEAD ZONE: silent at or below a width, otherwise passed through. value x > width ? x : 0. */
  static deadzone(x: number, width: number): CrossFormula { return c('activation-deadzone', 'deadzone(x, width) = x > width ? x : 0', x > width ? x : 0, nat(x, width), 'deadzone', [x, width]) }
}

for (const name of ['clamp', 'deadzone', 'hardsigmoid', 'leakyrelu', 'relu', 'saturate', 'step', 'threshold'] as const)
  hexRegisterOf('activation', name, (ActivationFormulas[name] as (...x: unknown[]) => unknown).bind(ActivationFormulas))
