import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('physics: force, momentum, work, power, pressure, density, energylevels, degreesoffreedom — crossing to statistics', async (t) => {
  assert.equal(PhysicsFormulas.force(10, 5).value, 50)
  assert.equal(PhysicsFormulas.momentum(10, 20).value, 200)
  assert.equal(PhysicsFormulas.work(50, 3).value, 150)
  assert.equal(PhysicsFormulas.power(150, 3).value, 50)
  assert.equal(PhysicsFormulas.pressure(100, 4).value, 25)
  assert.equal(PhysicsFormulas.density(1000, 10).value, 100)
  assert.equal(PhysicsFormulas.energylevels(4).value, 16)
  assert.equal(PhysicsFormulas.degreesoffreedom(3, 3).value, 6)
  assert.equal(PhysicsFormulas.force(10, 5).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('physics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'physics', program: ['force'], params: [10, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `physics.force at ${uuid}`)
  uuidReceiptOf('physics force', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; force 50, momentum 200, work 150, power 50, pressure 25, density 100, energylevels 16, degreesoffreedom 6; crossing to statistics')
})
