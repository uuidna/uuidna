import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DynamicsFormulas } from './index.js'
import '../../mcp/families.js'

test('dynamics: force, momentum, impulse, kineticenergy, work, power, acceleration, collision — crossing to kinematics', async (t) => {
  assert.equal(DynamicsFormulas.force(10, 5).value, 50, 'mass times acceleration')
  assert.equal(DynamicsFormulas.momentum(10, 20).value, 200)
  assert.equal(DynamicsFormulas.impulse(50, 4).value, 200, 'force over a time')
  assert.equal(DynamicsFormulas.kineticenergy(4, 10).value, 200, 'half m v squared')
  assert.equal(DynamicsFormulas.work(10, 5).value, 50)
  assert.equal(DynamicsFormulas.power(1000, 20).value, 50, 'work per unit time')
  assert.equal(DynamicsFormulas.acceleration(100, 5).value, 20)
  assert.equal(DynamicsFormulas.collision(3, 7, 5).value, 50, 'inelastic combined momentum')
  assert.equal(DynamicsFormulas.power(100, 0).value, 0)
  assert.equal(DynamicsFormulas.force(10, 5).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('dynamics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dynamics', program: ['collision'], params: [3, 7, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `dynamics.collision at ${uuid}`)
  uuidReceiptOf('dynamics collision', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; force 50, momentum 200, impulse 200, kineticenergy 200, work 50, power 50, acceleration 20, collision 50; crossing to kinematics')
})
