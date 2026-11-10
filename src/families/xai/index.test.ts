import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { XaiFormulas } from './index.js'

/** Explainable AI as exact combinatorics — SHAP coalitions, interactions, saliency pixels, LIME samples, attributions, anchors, heads, baselines. */
test('xai: coalitions, interactions, saliency, lime samples, attributions, anchors, heads, baselines', async (t) => {
  assert.equal(XaiFormulas.coalitions(4).value, 16, '2^4 coalitions SHAP sums over')
  assert.equal(XaiFormulas.coalitions(0).value, 1, 'the empty coalition')
  assert.equal(XaiFormulas.interactions(5).value, 10, '5 features, pairwise')
  assert.equal(XaiFormulas.saliency(8, 8).value, 64, 'an 8×8 saliency map')
  assert.equal(XaiFormulas.limeSamples(4, 100).value, 400, '4 features × 100 perturbations')
  assert.equal(XaiFormulas.attributions(4, 3).value, 12, '4 features × 3 classes')
  assert.equal(XaiFormulas.anchors(4).value, 15, '2^4 − 1 non-empty anchor rules')
  assert.equal(XaiFormulas.heads(12, 8).value, 96, '12 layers × 8 heads')
  assert.equal(XaiFormulas.baselines(4).value, 5, 'four features plus the all-off baseline')
  assert.equal(XaiFormulas.coalitions(4).dst, 'cross')
  assert.equal(hexFamiliesOf().get('xai')?.length, 8)
  for (const [name, params, expected] of [['coalitions', [4], 16], ['interactions', [5], 10], ['heads', [12, 8], 96]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'xai', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `xai.${name} at ${uuid}`)
    uuidReceiptOf(`xai ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 2^4 coalitions (A000079), 5 features→10 interactions, 12×8 heads')
})
