import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SuspensionFormulas } from './index.js'
import '../../mcp/families.js'

test('suspension: springrate, damping, ride, travel, roll, stiffness, frequency, load — crossing to automotive', async (t) => {
  assert.equal(SuspensionFormulas.springrate(1000, 50).value, 20, 'N per mm of travel')
  assert.equal(SuspensionFormulas.damping(300, 4).value, 1200)
  assert.equal(SuspensionFormulas.ride(400, 120).value, 280, 'ride height after sag')
  assert.equal(SuspensionFormulas.ride(100, 400).value, 0)
  assert.equal(SuspensionFormulas.travel(100, 80).value, 180, 'bump plus droop')
  assert.equal(SuspensionFormulas.roll(5000, 30).value, 1500)
  assert.equal(SuspensionFormulas.stiffness(2000, 40).value, 50000)
  assert.equal(SuspensionFormulas.frequency(64000, 400).value, 160)
  assert.equal(SuspensionFormulas.load(1600, 4).value, 400, 'weight over four corners')
  assert.equal(SuspensionFormulas.springrate(1000, 50).dst, 'automotive')
  assert.equal(hexFamiliesOf().get('suspension')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'suspension', program: ['springrate'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `suspension.springrate at ${uuid}`)
  uuidReceiptOf('suspension springrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; springrate 20, damping 1200, ride 280, travel 180, roll 1500, stiffness 50000, frequency 160, load 400; crossing to automotive')
})
