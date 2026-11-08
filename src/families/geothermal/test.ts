import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeothermalFormulas } from './index.js'
import '../../mcp/families.js'

test('geothermal: gradient, power, efficiency, cop, capacity, drilling, reinjection, enthalpy — crossing to energy', async (t) => {
  assert.equal(GeothermalFormulas.gradient(300, 10000).value, 30, 'degrees per kilometre')
  assert.equal(GeothermalFormulas.power(50, 80).value, 4000, 'heat the flow carries')
  assert.equal(GeothermalFormulas.efficiency(12, 100).value, 12)
  assert.equal(GeothermalFormulas.cop(400, 100).value, 400, 'COP 4.00')
  assert.equal(GeothermalFormulas.capacity(90, 100).value, 90)
  assert.equal(GeothermalFormulas.drilling(1200, 30).value, 40, 'metres per day')
  assert.equal(GeothermalFormulas.reinjection(95, 100).value, 95)
  assert.equal(GeothermalFormulas.enthalpy(250).value, 250)
  assert.equal(GeothermalFormulas.gradient(300, 10000).dst, 'energy')
  assert.equal(hexFamiliesOf().get('geothermal')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geothermal', program: ['drilling'], params: [1200, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `geothermal.drilling at ${uuid}`)
  uuidReceiptOf('geothermal drilling', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gradient 30, power 4000, efficiency 12, cop 400, capacity 90, drilling 40, reinjection 95, enthalpy 250; crossing to energy')
})
