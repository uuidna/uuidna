import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GripperFormulas } from './index.js'
import '../../mcp/families.js'

test('gripper: gripforce, strokewidth, payloadlimit, closetime, fingercount, frictionhold, contactpressure, slipmargin — crossing to robotics', async (t) => {
  assert.equal(GripperFormulas.gripforce(50, 4).value, 200)
  assert.equal(GripperFormulas.strokewidth(100, 20).value, 80)
  assert.equal(GripperFormulas.payloadlimit(200, 2).value, 100)
  assert.equal(GripperFormulas.closetime(1000, 50).value, 20)
  assert.equal(GripperFormulas.fingercount(2, 1).value, 3)
  assert.equal(GripperFormulas.frictionhold(50, 2).value, 100)
  assert.equal(GripperFormulas.contactpressure(200, 4).value, 50)
  assert.equal(GripperFormulas.slipmargin(80, 100).value, 80)
  assert.equal(GripperFormulas.gripforce(50, 4).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('gripper')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gripper', program: ['gripforce'], params: [50, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `gripper.gripforce at ${uuid}`)
  uuidReceiptOf('gripper gripforce', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gripforce 200, strokewidth 80, payloadlimit 100, closetime 20, fingercount 3, frictionhold 100, contactpressure 50, slipmargin 80; crossing to robotics')
})
