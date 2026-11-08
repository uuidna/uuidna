import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiomechanicsFormulas } from './index.js'
import '../../mcp/families.js'

test('biomechanics: torque, moment, power, impulse, groundreaction, leverage, workload, gait — crossing to mechanical', async (t) => {
  assert.equal(BiomechanicsFormulas.torque(50, 3).value, 150, 'force on a moment arm')
  assert.equal(BiomechanicsFormulas.moment(10, 4).value, 160, 'point mass at a radius')
  assert.equal(BiomechanicsFormulas.power(1000, 10).value, 100, 'watts in a lift')
  assert.equal(BiomechanicsFormulas.impulse(80, 5).value, 400)
  assert.equal(BiomechanicsFormulas.groundreaction(70, 5).value, 1050, 'mass times gravity plus accel')
  assert.equal(BiomechanicsFormulas.leverage(100, 25).value, 4, 'mechanical advantage')
  assert.equal(BiomechanicsFormulas.workload(10, 50).value, 500, 'training volume')
  assert.equal(BiomechanicsFormulas.gait(120, 60).value, 2, 'steps per second')
  assert.equal(BiomechanicsFormulas.torque(50, 3).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('biomechanics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biomechanics', program: ['torque'], params: [50, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `biomechanics.torque at ${uuid}`)
  uuidReceiptOf('biomechanics torque', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; torque 150, moment 160, power 100, impulse 400, groundreaction 1050, leverage 4, workload 500, gait 2; crossing to mechanical')
})
