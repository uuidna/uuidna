import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AirshipFormulas } from './index.js'
import '../../mcp/families.js'

test('airship: lift, volume, heliumfraction, maxspeed, payload, ballastratio, lengthm, buoyancymargin — crossing to aerospace', async (t) => {
  assert.equal(AirshipFormulas.lift(1000, 1).value, 1000)
  assert.equal(AirshipFormulas.volume(50, 20, 20).value, 20000)
  assert.equal(AirshipFormulas.heliumfraction(95, 100).value, 95)
  assert.equal(AirshipFormulas.maxspeed(100, 1).value, 100)
  assert.equal(AirshipFormulas.payload(10000, 8000).value, 2000)
  assert.equal(AirshipFormulas.ballastratio(10, 100).value, 10)
  assert.equal(AirshipFormulas.lengthm(200, 1).value, 200)
  assert.equal(AirshipFormulas.buoyancymargin(100, 20).value, 80)
  assert.equal(AirshipFormulas.lift(1000, 1).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('airship')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'airship', program: ['lift'], params: [1000, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `airship.lift at ${uuid}`)
  uuidReceiptOf('airship lift', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lift 1000, volume 20000, heliumfraction 95, maxspeed 100, payload 2000, ballastratio 10, lengthm 200, buoyancymargin 80; crossing to aerospace')
})
