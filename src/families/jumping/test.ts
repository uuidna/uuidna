import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JumpingFormulas } from './index.js'
import '../../mcp/families.js'

test('jumping: height, hangtime, takeoffvelocity, horizontalrange, power, approachspeed, impulse, netheight — crossing to kinematics', async (t) => {
  assert.equal(JumpingFormulas.height(500, 2).value, 250)
  assert.equal(JumpingFormulas.hangtime(1000, 10).value, 100)
  assert.equal(JumpingFormulas.takeoffvelocity(3, 2).value, 6)
  assert.equal(JumpingFormulas.horizontalrange(5, 8).value, 40)
  assert.equal(JumpingFormulas.power(800, 3).value, 2400)
  assert.equal(JumpingFormulas.approachspeed(3000, 300).value, 10)
  assert.equal(JumpingFormulas.impulse(70, 5).value, 350)
  assert.equal(JumpingFormulas.netheight(250, 30).value, 220)
  assert.equal(JumpingFormulas.height(500, 2).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('jumping')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'jumping', program: ['height'], params: [500, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `jumping.height at ${uuid}`)
  uuidReceiptOf('jumping height', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; height 250, hangtime 100, takeoffvelocity 6, horizontalrange 40, power 2400, approachspeed 10, impulse 350, netheight 220; crossing to kinematics')
})
