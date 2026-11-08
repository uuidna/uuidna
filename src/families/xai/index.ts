import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** XAI — explainable AI as exact combinatorics, not a fabricated coverage number. The coalitions SHAP sums over (2^f),
 *  the pairwise feature interactions, the saliency-map pixels, the LIME perturbation samples, the attribution matrix
 *  cells, the non-empty anchor rules, the attention heads to attribute, and the reference baselines. Each an exact
 *  integer at a hex address; develops the XAI lead. */

const PROOF = 'xai counts: coalitions = 2^features (A000079); interactions = f(f−1)/2 (A000217); saliency = width·height; limeSamples = features·perturbations; attributions = features·classes; anchors = 2^features − 1 (A000225); heads = layers·perLayer; baselines = features + 1'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const pow2 = (k: number) => (k <= 30 ? 2 ** k : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'xai', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `xai.${name}`, params })

export class XaiFormulas {
  /** The coalitions SHAP sums over for `features`: 2^features (features ≤ 30). */
  static coalitions(features: number): CrossFormula { return f('xai-coalitions', 'coalitions(features) = 2^features', pow2(features), nat(features) && features <= 30, 'coalitions', [features]) }
  /** Pairwise interactions among `features`: features(features−1)/2. */
  static interactions(features: number): CrossFormula { return f('xai-interactions', 'interactions(features) = features(features−1)/2', (features * (features - 1)) / 2, nat(features), 'interactions', [features]) }
  /** Saliency-map pixels of a `width`×`height` input: width · height. */
  static saliency(width: number, height: number): CrossFormula { return f('xai-saliency', 'saliency(width, height) = width · height', width * height, nat(width, height), 'saliency', [width, height]) }
  /** LIME perturbation samples: `features` toggled over `perturbations` draws: features · perturbations. */
  static limeSamples(features: number, perturbations: number): CrossFormula { return f('xai-limeSamples', 'limeSamples(features, perturbations) = features · perturbations', features * perturbations, nat(features, perturbations), 'limeSamples', [features, perturbations]) }
  /** Attribution matrix cells over `features` and `classes`: features · classes. */
  static attributions(features: number, classes: number): CrossFormula { return f('xai-attributions', 'attributions(features, classes) = features · classes', features * classes, nat(features, classes), 'attributions', [features, classes]) }
  /** The non-empty anchor rules over `features`: 2^features − 1 (features ≤ 30). */
  static anchors(features: number): CrossFormula { return f('xai-anchors', 'anchors(features) = 2^features − 1', features <= 30 ? pow2(features) - 1 : 0, nat(features) && features <= 30, 'anchors', [features]) }
  /** Attention heads to attribute across `layers` of `perLayer` heads: layers · perLayer. */
  static heads(layers: number, perLayer: number): CrossFormula { return f('xai-heads', 'heads(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers, perLayer), 'heads', [layers, perLayer]) }
  /** Reference baselines for `features`: features + 1 (one per feature plus the all-off baseline). */
  static baselines(features: number): CrossFormula { return f('xai-baselines', 'baselines(features) = features + 1', features + 1, nat(features), 'baselines', [features]) }
}

for (const name of ['anchors', 'attributions', 'baselines', 'coalitions', 'heads', 'interactions', 'limeSamples', 'saliency'] as const)
  hexRegisterOf('xai', name, (XaiFormulas[name] as (...x: unknown[]) => unknown).bind(XaiFormulas))
