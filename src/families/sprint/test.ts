import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SprintFormulas } from './index.js'
import '../../mcp/families.js'

test('sprint: velocity, acceleration, stridelength, stridefrequency, splittime, topspeed, distancecovered, reactiontime — crossing to kinematics', async (t) => {
  assert.equal(SprintFormulas.velocity(100, 10).value, 10)
  assert.equal(SprintFormulas.acceleration(20, 4).value, 5)
  assert.equal(SprintFormulas.stridelength(1000, 8).value, 125)
  assert.equal(SprintFormulas.stridefrequency(80, 10).value, 8)
  assert.equal(SprintFormulas.splittime(400, 4).value, 100)
  assert.equal(SprintFormulas.topspeed(11, 12).value, 12)
  assert.equal(SprintFormulas.distancecovered(10, 10).value, 100)
  assert.equal(SprintFormulas.reactiontime(200, 150).value, 50)
  assert.equal(SprintFormulas.velocity(100, 10).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('sprint')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sprint', program: ['velocity'], params: [100, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `sprint.velocity at ${uuid}`)
  uuidReceiptOf('sprint velocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; velocity 10, acceleration 5, stridelength 125, stridefrequency 8, splittime 100, topspeed 12, distancecovered 100, reactiontime 50; crossing to kinematics')
})
