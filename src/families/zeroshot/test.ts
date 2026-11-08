import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ZeroshotFormulas } from './index.js'

/** Zero-shot learning as exact combinatorics — embeddings, attributes, transfer pairs, comparisons, seen classes, prompts, signatures, partitions. */
test('zeroshot: embeddings, attributes, transfer pairs, comparisons, seen classes, prompts, signatures, partitions', async (t) => {
  assert.equal(ZeroshotFormulas.embeddings(10, 64).value, 640, '10 classes × 64 dims')
  assert.equal(ZeroshotFormulas.attributes(10, 5).value, 50, '10 classes × 5 attributes')
  assert.equal(ZeroshotFormulas.transferPairs(8, 2).value, 16, '8 seen × 2 unseen')
  assert.equal(ZeroshotFormulas.comparisons(100, 10).value, 1000, '100 queries × 10 classes')
  assert.equal(ZeroshotFormulas.seenClasses(10, 3).value, 7, '10 classes less 3 unseen')
  assert.equal(ZeroshotFormulas.seenClasses(3, 5).value, 0, 'more unseen than classes, floored')
  assert.equal(ZeroshotFormulas.prompts(8, 10).value, 80, '8 templates × 10 classes')
  assert.equal(ZeroshotFormulas.signatures(4).value, 16, '2^4 attribute signatures')
  assert.equal(ZeroshotFormulas.partitions(10, 5).value, 2, '10 classes over 5 folds')
  assert.equal(ZeroshotFormulas.partitions(10, 0).value, 0, 'no fold, no divide')
  assert.equal(ZeroshotFormulas.embeddings(10, 64).dst, 'cross')
  assert.equal(hexFamiliesOf().get('zeroshot')?.length, 8)
  for (const [name, params, expected] of [['attributes', [10, 5], 50], ['signatures', [4], 16], ['embeddings', [10, 64], 640]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'zeroshot', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `zeroshot.${name} at ${uuid}`)
    uuidReceiptOf(`zeroshot ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 10×64 embeddings, 2^4 signatures, 10/5 partitions')
})
