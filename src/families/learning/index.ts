import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEARNING — MACHINE-LEARNING TRAINING, AS ARITHMETIC (chosen by the public-API registry, not by hand). Training a model is
 *  numbers: the epochs a dataset yields at a batch size, accuracy and loss as percentages, the train/test split, the parameter
 *  count, the F1 of precision and recall, the overfit gap, and training throughput. Crosses to `ml` — learning is what the
 *  model layer consumes. A measure. */

const PROOF = 'learning arithmetic (epochs, accuracy, loss, split, params, f1, overfit, throughput); a machine-learning training domain from the public-API registry; a measure crossed to ml'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'learning', dst: 'ml', formula, value, proof: PROOF, ...extra }, holds, { name: `learning.${name}`, params })

export class LearningFormulas {
  /** EPOCHS: the batches a dataset yields at a batch size. value ⌊samples / batch⌋. */
  static epochs(samples: number, batch: number): CrossFormula { return c('learning-epochs', 'epochs(samples, batch) = ⌊samples / batch⌋', batch > 0 ? Math.floor(samples / batch) : 0, nat(samples, batch) && batch > 0, 'epochs', [samples, batch]) }
  /** ACCURACY as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('learning-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** LOSS as a percentage. value ⌊errors · 100 / total⌋. */
  static loss(errors: number, total: number): CrossFormula { return c('learning-loss', 'loss(errors, total) = ⌊errors · 100 / total⌋', total > 0 ? Math.floor((errors * 100) / total) : 0, nat(errors, total) && total > 0 && errors <= total, 'loss', [errors, total]) }
  /** SPLIT: a percentage of the data. value ⌊data · pct / 100⌋. */
  static split(data: number, pct: number): CrossFormula { return c('learning-split', 'split(data, pct) = ⌊data · pct / 100⌋', Math.floor((data * pct) / 100), nat(data, pct) && pct <= 100, 'split', [data, pct]) }
  /** PARAMS: layers at a per-layer count. value layers · perLayer. */
  static params(layers: number, perLayer: number): CrossFormula { return c('learning-params', 'params(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers, perLayer), 'params', [layers, perLayer]) }
  /** F1: the harmonic mean of precision and recall. value [p + r > 0] ⌊2 · p · r / (p + r)⌋. */
  static f1(precision: number, recall: number): CrossFormula { return c('learning-f1', 'f1(precision, recall) = ⌊2 · precision · recall / (precision + recall)⌋', precision + recall > 0 ? Math.floor((2 * precision * recall) / (precision + recall)) : 0, nat(precision, recall), 'f1', [precision, recall]) }
  /** OVERFIT: the train-over-val gap, never negative. value max(0, train − val). */
  static overfit(train: number, val: number): CrossFormula { return c('learning-overfit', 'overfit(train, val) = max(0, train − val)', Math.max(0, train - val), nat(train, val), 'overfit', [train, val]) }
  /** THROUGHPUT: samples over seconds. value ⌊samples / seconds⌋. */
  static throughput(samples: number, seconds: number): CrossFormula { return c('learning-throughput', 'throughput(samples, seconds) = ⌊samples / seconds⌋', seconds > 0 ? Math.floor(samples / seconds) : 0, nat(samples, seconds) && seconds > 0, 'throughput', [samples, seconds]) }
}

for (const name of ['accuracy', 'epochs', 'f1', 'loss', 'overfit', 'params', 'split', 'throughput'] as const)
  hexRegisterOf('learning', name, (LearningFormulas[name] as (...x: unknown[]) => unknown).bind(LearningFormulas))
