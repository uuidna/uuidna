import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AutomotiveFormulas } from './index.js'
import '../../mcp/families.js'

test('automotive: power, economy, acceleration, braking, displacement, emissions, ratio, range — crossing to transport', async (t) => {
  assert.equal(AutomotiveFormulas.power(300, 5252).value, 300, 'horsepower proxy')
  assert.equal(AutomotiveFormulas.economy(400, 10).value, 40, 'distance per unit fuel')
  assert.equal(AutomotiveFormulas.economy(400, 0).value, 0, 'guard fuel > 0')
  assert.equal(AutomotiveFormulas.acceleration(100, 4).value, 25)
  assert.equal(AutomotiveFormulas.acceleration(100, 0).value, 0, 'guard time > 0')
  assert.equal(AutomotiveFormulas.braking(20, 5).value, 40, 'stopping distance')
  assert.equal(AutomotiveFormulas.braking(20, 0).value, 0, 'guard deceleration > 0')
  assert.equal(AutomotiveFormulas.displacement(8, 9).value, 72)
  assert.equal(AutomotiveFormulas.emissions(1000, 50).value, 20)
  assert.equal(AutomotiveFormulas.emissions(1000, 0).value, 0, 'guard distance > 0')
  assert.equal(AutomotiveFormulas.ratio(39, 10).value, 390, 'gear ratio')
  assert.equal(AutomotiveFormulas.ratio(39, 0).value, 0, 'guard drive > 0')
  assert.equal(AutomotiveFormulas.range(600, 20).value, 30)
  assert.equal(AutomotiveFormulas.range(600, 0).value, 0, 'guard consumption > 0')
  assert.equal(AutomotiveFormulas.power(300, 5252).dst, 'transport')
  assert.equal(hexFamiliesOf().get('automotive')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'automotive', program: ['economy'], params: [400, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `automotive.economy at ${uuid}`)
  uuidReceiptOf('automotive economy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 300, economy 40, acceleration 25, braking 40, displacement 72, emissions 20, ratio 390, range 30; crossing to transport')
})
