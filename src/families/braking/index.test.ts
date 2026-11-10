import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BrakingFormulas } from './index.js'
import '../../mcp/families.js'

test('braking: distance, force, torque, fade, pressure, bias, deceleration, pad — crossing to automotive', async (t) => {
  assert.equal(BrakingFormulas.distance(30, 9).value, 50, 'stopping distance under constant deceleration')
  assert.equal(BrakingFormulas.force(1500, 8).value, 12000, 'F = m · a')
  assert.equal(BrakingFormulas.torque(4000, 20).value, 80000)
  assert.equal(BrakingFormulas.fade(300, 400).value, 75, 'percent of the thermal threshold')
  assert.equal(BrakingFormulas.pressure(10000, 50).value, 200)
  assert.equal(BrakingFormulas.bias(60, 40).value, 60, 'front share of braking force')
  assert.equal(BrakingFormulas.deceleration(100, 5).value, 20)
  assert.equal(BrakingFormulas.pad(12, 1, 5).value, 7, 'pad thickness left after the run')
  assert.equal(BrakingFormulas.distance(30, 9).dst, 'automotive')
  assert.equal(hexFamiliesOf().get('braking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'braking', program: ['distance'], params: [30, 9] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `braking.distance at ${uuid}`)
  uuidReceiptOf('braking distance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; distance 50, force 12000, torque 80000, fade 75, pressure 200, bias 60, deceleration 20, pad 7; crossing to automotive')
})
