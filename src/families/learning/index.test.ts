import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LearningFormulas } from './index.js'
import '../../mcp/families.js'

test('learning: epochs, accuracy, loss, split, params, f1, overfit, throughput — crossing to ml', async (t) => {
  assert.equal(LearningFormulas.epochs(60000, 32).value, 1875, 'batches per epoch')
  assert.equal(LearningFormulas.accuracy(950, 1000).value, 95)
  assert.equal(LearningFormulas.loss(50, 1000).value, 5)
  assert.equal(LearningFormulas.split(1000, 80).value, 800, 'the training split')
  assert.equal(LearningFormulas.params(10, 100).value, 1000)
  assert.equal(LearningFormulas.f1(80, 60).value, 68, 'harmonic mean of precision and recall')
  assert.equal(LearningFormulas.f1(0, 0).value, 0)
  assert.equal(LearningFormulas.overfit(98, 90).value, 8, 'the overfit gap')
  assert.equal(LearningFormulas.overfit(90, 98).value, 0)
  assert.equal(LearningFormulas.throughput(6000, 60).value, 100, 'samples per second')
  assert.equal(LearningFormulas.epochs(60000, 32).dst, 'ml')
  assert.equal(hexFamiliesOf().get('learning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'learning', program: ['params'], params: [10, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `learning.params at ${uuid}`)
  uuidReceiptOf('learning params', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; epochs 1875, accuracy 95, loss 5, split 800, params 1000, f1 68, overfit 8, throughput 100; crossing to ml')
})
