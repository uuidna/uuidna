import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RoboticsFormulas } from './index.js'
import '../../mcp/families.js'

test('robotics: degrees, torque, reach, speed, payload, accuracy, battery, cycle — crossing to obs', async (t) => {
  assert.equal(RoboticsFormulas.degrees(6).value, 6, 'six degrees of freedom')
  assert.equal(RoboticsFormulas.torque(50, 3).value, 150)
  assert.equal(RoboticsFormulas.reach(4, 25).value, 100)
  assert.equal(RoboticsFormulas.speed(1000, 20).value, 50, 'distance per time')
  assert.equal(RoboticsFormulas.payload(100, 30).value, 70)
  assert.equal(RoboticsFormulas.payload(30, 100).value, 0, 'never below zero')
  assert.equal(RoboticsFormulas.accuracy(5, 1000).value, 0)
  assert.equal(RoboticsFormulas.accuracy(250, 1000).value, 25)
  assert.equal(RoboticsFormulas.battery(10000, 250).value, 40, 'cycles on a charge')
  assert.equal(RoboticsFormulas.cycle(12, 5).value, 60)
  assert.equal(RoboticsFormulas.degrees(6).dst, 'obs')
  assert.equal(hexFamiliesOf().get('robotics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'robotics', program: ['torque'], params: [50, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `robotics.torque at ${uuid}`)
  uuidReceiptOf('robotics torque', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; degrees 6, torque 150, reach 100, speed 50, payload 70, accuracy 25, battery 40, cycle 60; crossing to obs')
})
