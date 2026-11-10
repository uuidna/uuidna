import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ActuationFormulas } from './index.js'
import '../../mcp/families.js'

test('actuation: force, stroke, holdingtorque, dutycycle, responsetime, backlash, stiffness, thrust — crossing to mechanical', async (t) => {
  assert.equal(ActuationFormulas.force(50, 20).value, 1000, 'pressure over area')
  assert.equal(ActuationFormulas.stroke(5, 100).value, 500, 'a lead screw over its turns')
  assert.equal(ActuationFormulas.holdingtorque(3, 50).value, 150)
  assert.equal(ActuationFormulas.dutycycle(30, 120).value, 25)
  assert.equal(ActuationFormulas.responsetime(1000, 50).value, 20)
  assert.equal(ActuationFormulas.backlash(10, 3).value, 30, 'lost motion over three stages')
  assert.equal(ActuationFormulas.stiffness(1000, 4).value, 250)
  assert.equal(ActuationFormulas.thrust(100, 10).value, 6280, 'torque into thrust')
  assert.equal(ActuationFormulas.force(50, 20).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('actuation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'actuation', program: ['thrust'], params: [100, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6280, `actuation.thrust at ${uuid}`)
  uuidReceiptOf('actuation thrust', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; force 1000, stroke 500, holdingtorque 150, dutycycle 25, responsetime 20, backlash 30, stiffness 250, thrust 6280; crossing to mechanical')
})
