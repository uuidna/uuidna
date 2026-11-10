import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KinematicsFormulas } from './index.js'
import '../../mcp/families.js'

test('kinematics: velocity, acceleration, displacement, momentum, kinetic, projectile, freefall, impulse — crossing to gravity', async (t) => {
  assert.equal(KinematicsFormulas.velocity(100, 20).value, 5, 'distance over time')
  assert.equal(KinematicsFormulas.acceleration(60, 12).value, 5)
  assert.equal(KinematicsFormulas.displacement(5, 20).value, 100, 'the ground covered')
  assert.equal(KinematicsFormulas.momentum(10, 5).value, 50)
  assert.equal(KinematicsFormulas.kinetic(10, 4).value, 80, 'half m v squared')
  assert.equal(KinematicsFormulas.projectile(10, 10).value, 10, 'range proxy')
  assert.equal(KinematicsFormulas.freefall(10, 3).value, 45)
  assert.equal(KinematicsFormulas.impulse(20, 5).value, 100)
  assert.equal(KinematicsFormulas.velocity(100, 0).value, 0, 'guarded time')
  assert.equal(KinematicsFormulas.projectile(10, 0).value, 0, 'guarded gravity')
  assert.equal(KinematicsFormulas.velocity(100, 20).dst, 'gravity')
  assert.equal(hexFamiliesOf().get('kinematics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'kinematics', program: ['velocity'], params: [100, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `kinematics.velocity at ${uuid}`)
  uuidReceiptOf('kinematics velocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; velocity 5, acceleration 5, displacement 100, momentum 50, kinetic 80, projectile 10, freefall 45, impulse 100; crossing to gravity')
})
