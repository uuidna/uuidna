import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AerospaceFormulas } from './index.js'
import '../../mcp/families.js'

test('aerospace: thrust, lift, range, mach, orbit, escape, payload, apogee — crossing to cern', async (t) => {
  assert.equal(AerospaceFormulas.thrust(1000, 9).value, 9000, 'force from mass and acceleration')
  assert.equal(AerospaceFormulas.lift(120, 500).value, 600)
  assert.equal(AerospaceFormulas.range(8000, 20).value, 400, 'distance a fuel load buys')
  assert.equal(AerospaceFormulas.mach(680, 340).value, 200, 'Mach 2.00')
  assert.equal(AerospaceFormulas.orbit(100, 500).value, 2000, 'Kepler period proxy')
  assert.equal(AerospaceFormulas.escape(1000, 8).value, 125)
  assert.equal(AerospaceFormulas.payload(5000, 3200).value, 1800, 'usable payload')
  assert.equal(AerospaceFormulas.payload(3000, 4000).value, 0, 'never below zero')
  assert.equal(AerospaceFormulas.apogee(60000, 300).value, 200)
  assert.equal(AerospaceFormulas.thrust(1000, 9).dst, 'cern')
  assert.equal(hexFamiliesOf().get('aerospace')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aerospace', program: ['mach'], params: [680, 340] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `aerospace.mach at ${uuid}`)
  uuidReceiptOf('aerospace mach', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; thrust 9000, lift 600, range 400, mach 200, orbit 2000, escape 125, payload 1800, apogee 200; crossing to cern')
})
