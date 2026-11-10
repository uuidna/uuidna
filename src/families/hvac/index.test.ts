import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HvacFormulas } from './index.js'
import '../../mcp/families.js'

test('hvac: coolingload, airflow, tonnage, ducting, ventilation, sensibleheat, latentheat, setpoint — crossing to mechanical', async (t) => {
  assert.equal(HvacFormulas.coolingload(600, 25).value, 15000, 'cooling load of the space')
  assert.equal(HvacFormulas.airflow(3, 400).value, 1200, 'cfm for the tons')
  assert.equal(HvacFormulas.tonnage(36000, 12000).value, 3, 'three tons of refrigeration')
  assert.equal(HvacFormulas.ducting(1200, 800).value, 2, 'duct area for the flow')
  assert.equal(HvacFormulas.ventilation(20, 15).value, 300, 'fresh air for the occupants')
  assert.equal(HvacFormulas.sensibleheat(1000, 20).value, 20000)
  assert.equal(HvacFormulas.latentheat(1000, 50).value, 25000)
  assert.equal(HvacFormulas.setpoint(72, 75).value, 1, 'setpoint held')
  assert.equal(HvacFormulas.setpoint(78, 75).value, 0)
  assert.equal(HvacFormulas.coolingload(600, 25).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('hvac')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hvac', program: ['ducting'], params: [1200, 800] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `hvac.ducting at ${uuid}`)
  uuidReceiptOf('hvac ducting', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coolingload 15000, airflow 1200, tonnage 3, ducting 2, ventilation 300, sensibleheat 20000, latentheat 25000, setpoint 1; crossing to mechanical')
})
