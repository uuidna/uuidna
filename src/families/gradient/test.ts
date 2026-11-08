import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GradientFormulas } from './index.js'
import '../../mcp/families.js'

test('gradient: step, update, learningrate, momentum, norm, clip, decay, epoch — crossing to linearalgebra', async (t) => {
  assert.equal(GradientFormulas.step(100, 5).value, 500, 'distance over iterations')
  assert.equal(GradientFormulas.update(100, 3, 10).value, 70, 'a parameter after one step')
  assert.equal(GradientFormulas.learningrate(1000, 4).value, 250)
  assert.equal(GradientFormulas.momentum(9, 10, 5).value, 95, 'carried velocity plus gradient')
  assert.equal(GradientFormulas.norm(3, 4).value, 25, 'squared gradient length')
  assert.equal(GradientFormulas.clip(100, 30).value, 30, 'clipped to threshold')
  assert.equal(GradientFormulas.clip(20, 30).value, 20)
  assert.equal(GradientFormulas.decay(100, 30).value, 70)
  assert.equal(GradientFormulas.epoch(1000, 32).value, 32, 'batches per epoch')
  assert.equal(GradientFormulas.step(100, 5).dst, 'linearalgebra')
  assert.equal(hexFamiliesOf().get('gradient')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gradient', program: ['norm'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `gradient.norm at ${uuid}`)
  uuidReceiptOf('gradient norm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; step 500, update 70, learningrate 250, momentum 95, norm 25, clip 30, decay 70, epoch 32; crossing to linearalgebra')
})
