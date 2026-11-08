import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRADIENT — DESCENT AS ARITHMETIC (chosen by the optimizer registry, not by hand). Training is numbers: the step a run
 *  takes, the parameter update, the learning rate, momentum, the gradient norm, clipping, weight decay, and the batches an
 *  epoch holds. Crosses to `linearalgebra` — a gradient is a vector, and descent moves along it. A measure. */

const PROOF = 'gradient arithmetic (step, parameter update, learning rate, momentum, gradient norm, clip, weight decay, epoch batches); the optimizer registry\'s uncovered domain; a measure crossed to linearalgebra'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gradient', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds, { name: `gradient.${name}`, params })

export class GradientFormulas {
  /** STEP: the distance a run covers over its iterations at a fixed size. value iters · size. */
  static step(iters: number, size: number): CrossFormula { return c('gradient-step', 'step(iters, size) = iters · size', iters * size, nat(iters, size), 'step', [iters, size]) }
  /** UPDATE: a parameter after one descent step, floored at zero. value max(0, param − lr · grad). */
  static update(param: number, lr: number, grad: number): CrossFormula { return c('gradient-update', 'update(param, lr, grad) = max(0, param − lr · grad)', Math.max(0, param - lr * grad), nat(param, lr, grad), 'update', [param, lr, grad]) }
  /** LEARNING RATE: a base rate divided by a decay factor. value ⌊base / decay⌋. */
  static learningrate(base: number, decay: number): CrossFormula { return c('gradient-learningrate', 'learningrate(base, decay) = ⌊base / decay⌋', decay > 0 ? Math.floor(base / decay) : 0, nat(base, decay) && decay > 0, 'learningrate', [base, decay]) }
  /** MOMENTUM: carried velocity plus the current gradient. value mu · velocity + grad. */
  static momentum(mu: number, velocity: number, grad: number): CrossFormula { return c('gradient-momentum', 'momentum(mu, velocity, grad) = mu · velocity + grad', mu * velocity + grad, nat(mu, velocity, grad), 'momentum', [mu, velocity, grad]) }
  /** NORM: the squared length of a two-component gradient. value gx² + gy². */
  static norm(gx: number, gy: number): CrossFormula { return c('gradient-norm', 'norm(gx, gy) = gx² + gy²', gx * gx + gy * gy, nat(gx, gy), 'norm', [gx, gy]) }
  /** CLIP: a gradient held at a threshold ceiling. value min(grad, threshold). */
  static clip(grad: number, threshold: number): CrossFormula { return c('gradient-clip', 'clip(grad, threshold) = min(grad, threshold)', Math.min(grad, threshold), nat(grad, threshold), 'clip', [grad, threshold]) }
  /** DECAY: a weight shrunk by a decay amount, floored at zero. value max(0, weight − rate). */
  static decay(weight: number, rate: number): CrossFormula { return c('gradient-decay', 'decay(weight, rate) = max(0, weight − rate)', Math.max(0, weight - rate), nat(weight, rate), 'decay', [weight, rate]) }
  /** EPOCH: the batches one epoch holds over a dataset. value ⌈samples / batch⌉. */
  static epoch(samples: number, batch: number): CrossFormula { return c('gradient-epoch', 'epoch(samples, batch) = ⌈samples / batch⌉', batch > 0 ? Math.ceil(samples / batch) : 0, nat(samples, batch) && batch > 0, 'epoch', [samples, batch]) }
}

for (const name of ['clip', 'decay', 'epoch', 'learningrate', 'momentum', 'norm', 'step', 'update'] as const)
  hexRegisterOf('gradient', name, (GradientFormulas[name] as (...x: unknown[]) => unknown).bind(GradientFormulas))
