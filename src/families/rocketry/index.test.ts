import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RocketryFormulas } from './index.js'
import '../../mcp/families.js'

test('rocketry: thrust, impulse, twr, deltav, massratio, isp, payload, staging — crossing to aerospace', async (t) => {
  assert.equal(RocketryFormulas.thrust(300, 3000).value, 900000, 'mass flow at exhaust velocity')
  assert.equal(RocketryFormulas.impulse(900, 120).value, 108000, 'thrust over the burn')
  assert.equal(RocketryFormulas.twr(1500, 1000).value, 150, 'thrust-to-weight ×100')
  assert.equal(RocketryFormulas.deltav(3000, 2).value, 6000)
  assert.equal(RocketryFormulas.massratio(1000, 250).value, 400)
  assert.equal(RocketryFormulas.isp(9000, 30).value, 300, 'specific impulse proxy')
  assert.equal(RocketryFormulas.payload(20, 100).value, 20, 'payload fraction ×100')
  assert.equal(RocketryFormulas.staging(3).value, 3)
  assert.equal(RocketryFormulas.thrust(300, 3000).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('rocketry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rocketry', program: ['twr'], params: [1500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `rocketry.twr at ${uuid}`)
  uuidReceiptOf('rocketry twr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; thrust 900000, impulse 108000, twr 150, deltav 6000, massratio 400, isp 300, payload 20, staging 3; crossing to aerospace')
})
