import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ActivationFormulas } from './index.js'
import '../../mcp/families.js'

test('activation: relu, leakyrelu, step, hardsigmoid, saturate, threshold, clamp, deadzone — crossing to neuroscience', async (t) => {
  assert.equal(ActivationFormulas.relu(10, 3).value, 7, 'rectified above the bias')
  assert.equal(ActivationFormulas.relu(3, 10).value, 0)
  assert.equal(ActivationFormulas.leakyrelu(10, 4, 5).value, 6, 'above the bias')
  assert.equal(ActivationFormulas.leakyrelu(20, 100, 4).value, 5, 'leaked below the bias')
  assert.equal(ActivationFormulas.step(7, 5).value, 1, 'the unit fires')
  assert.equal(ActivationFormulas.step(3, 5).value, 0)
  assert.equal(ActivationFormulas.hardsigmoid(25, 100).value, 25)
  assert.equal(ActivationFormulas.hardsigmoid(200, 100).value, 100, 'clamped at the top of the ramp')
  assert.equal(ActivationFormulas.saturate(120, 100).value, 100, 'capped from above')
  assert.equal(ActivationFormulas.saturate(50, 100).value, 50)
  assert.equal(ActivationFormulas.threshold(8, 5, 0).value, 8, 'passed through above the threshold')
  assert.equal(ActivationFormulas.threshold(3, 5, 0).value, 0)
  assert.equal(ActivationFormulas.clamp(150, 10, 100).value, 100, 'held inside the band')
  assert.equal(ActivationFormulas.clamp(5, 10, 100).value, 10)
  assert.equal(ActivationFormulas.deadzone(30, 10).value, 30, 'outside the dead zone')
  assert.equal(ActivationFormulas.deadzone(5, 10).value, 0)
  assert.equal(ActivationFormulas.relu(10, 3).dst, 'neuroscience')
  assert.equal(hexFamiliesOf().get('activation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'activation', program: ['clamp'], params: [150, 10, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `activation.clamp at ${uuid}`)
  uuidReceiptOf('activation clamp', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; relu 7, leakyrelu 6, step 1, hardsigmoid 25, saturate 100, threshold 8, clamp 100, deadzone 30; crossing to neuroscience')
})
