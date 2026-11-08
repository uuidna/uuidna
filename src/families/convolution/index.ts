import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONVOLUTION — THE SLIDING WINDOW, AS ARITHMETIC. A convolution is numbers: the output size a kernel leaves, the
 *  receptive field it grows, the padding that keeps shape, the stride that subsamples, the weights a kernel holds, the
 *  feature map it writes, what pooling shrinks, and the reach dilation buys. Crosses to `linearalgebra` — a convolution
 *  is a structured matrix multiply. A measure. */

const PROOF = 'convolution arithmetic (output size, receptive field, padding, stride, kernel params, feature map, pooling, dilation); the sliding window as a structured matrix multiply; a measure crossed to linearalgebra'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'convolution', dst: 'linearalgebra', formula, value, proof: PROOF, ...extra }, holds, { name: `convolution.${name}`, params })

export class ConvolutionFormulas {
  /** OUTPUT SIZE: what a kernel of size k leaves over a width w at stride s. value ⌊(w − k)/s⌋ + 1. */
  static outputsize(w: number, k: number, s: number): CrossFormula { return c('convolution-outputsize', 'outputsize(w, k, s) = ⌊max(0, w − k)/s⌋ + 1', s > 0 ? Math.floor(Math.max(0, w - k) / s) + 1 : 0, nat(w, k, s) && s > 0, 'outputsize', [w, k, s]) }
  /** RECEPTIVE FIELD: the input a stacked kernel sees. value 1 + layers · (k − 1). */
  static receptivefield(k: number, layers: number): CrossFormula { return c('convolution-receptivefield', 'receptivefield(k, layers) = 1 + layers · (k − 1)', 1 + layers * Math.max(0, k - 1), nat(k, layers), 'receptivefield', [k, layers]) }
  /** PADDING: the per-side pad that keeps shape for an odd kernel. value ⌊k / 2⌋. */
  static padding(k: number): CrossFormula { return c('convolution-padding', 'padding(k) = ⌊k / 2⌋', Math.floor(k / 2), nat(k), 'padding', [k]) }
  /** STRIDE: the subsample that takes a width w down to out. value ⌊w / out⌋. */
  static stride(w: number, out: number): CrossFormula { return c('convolution-stride', 'stride(w, out) = ⌊w / out⌋', out > 0 ? Math.floor(w / out) : 0, nat(w, out) && out > 0, 'stride', [w, out]) }
  /** KERNEL PARAMS: the weights a k·k kernel holds over cin→cout channels. value k · k · cin · cout. */
  static kernelparams(k: number, cin: number, cout: number): CrossFormula { return c('convolution-kernelparams', 'kernelparams(k, cin, cout) = k · k · cin · cout', k * k * cin * cout, nat(k, cin, cout), 'kernelparams', [k, cin, cout]) }
  /** FEATURE MAP: the activations an out·out map writes over channels. value out · out · channels. */
  static featuremap(out: number, channels: number): CrossFormula { return c('convolution-featuremap', 'featuremap(out, channels) = out · out · channels', out * out * channels, nat(out, channels), 'featuremap', [out, channels]) }
  /** POOLING: the width left after a pool of size p. value ⌊w / p⌋. */
  static pooling(w: number, p: number): CrossFormula { return c('convolution-pooling', 'pooling(w, p) = ⌊w / p⌋', p > 0 ? Math.floor(w / p) : 0, nat(w, p) && p > 0, 'pooling', [w, p]) }
  /** DILATION: the effective reach of a kernel k dilated by d. value k + (k − 1) · (d − 1). */
  static dilation(k: number, d: number): CrossFormula { return c('convolution-dilation', 'dilation(k, d) = k + (k − 1) · (d − 1)', k + Math.max(0, k - 1) * Math.max(0, d - 1), nat(k, d), 'dilation', [k, d]) }
}

for (const name of ['dilation', 'featuremap', 'kernelparams', 'outputsize', 'padding', 'pooling', 'receptivefield', 'stride'] as const)
  hexRegisterOf('convolution', name, (ConvolutionFormulas[name] as (...x: unknown[]) => unknown).bind(ConvolutionFormulas))
