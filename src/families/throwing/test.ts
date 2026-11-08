import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ThrowingFormulas } from './index.js'
import '../../mcp/families.js'

test('throwing: range, releasevelocity, flighttime, spin, momentum, peakheight, effortratio, distancegain — crossing to kinematics', async (t) => {
  assert.equal(ThrowingFormulas.range(20, 15).value, 300)
  assert.equal(ThrowingFormulas.releasevelocity(600, 30).value, 20)
  assert.equal(ThrowingFormulas.flighttime(100, 10).value, 10)
  assert.equal(ThrowingFormulas.spin(8, 50).value, 400)
  assert.equal(ThrowingFormulas.momentum(2, 30).value, 60)
  assert.equal(ThrowingFormulas.peakheight(900, 4).value, 225)
  assert.equal(ThrowingFormulas.effortratio(80, 100).value, 80)
  assert.equal(ThrowingFormulas.distancegain(300, 250).value, 50)
  assert.equal(ThrowingFormulas.range(20, 15).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('throwing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'throwing', program: ['range'], params: [20, 15] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `throwing.range at ${uuid}`)
  uuidReceiptOf('throwing range', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; range 300, releasevelocity 20, flighttime 10, spin 400, momentum 60, peakheight 225, effortratio 80, distancegain 50; crossing to kinematics')
})
