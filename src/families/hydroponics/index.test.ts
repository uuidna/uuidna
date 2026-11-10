import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HydroponicsFormulas } from './index.js'
import '../../mcp/families.js'

test('hydroponics: ec, ph, nutrientratio, flowrate, density, reservoir, dosing, dwc — crossing to agriculture', async (t) => {
  assert.equal(HydroponicsFormulas.ec(1400, 2).value, 700, 'EC from ppm at the 500 scale')
  assert.equal(HydroponicsFormulas.ph(7, 6).value, 1, 'one point above target')
  assert.equal(HydroponicsFormulas.ph(6, 7).value, 0, 'already at or below target')
  assert.equal(HydroponicsFormulas.nutrientratio(150, 200).value, 75, 'nitrogen is 75% of potassium')
  assert.equal(HydroponicsFormulas.flowrate(600, 60).value, 10, 'litres per minute')
  assert.equal(HydroponicsFormulas.density(100, 4).value, 25, 'plants per square metre')
  assert.equal(HydroponicsFormulas.reservoir(50, 4).value, 200)
  assert.equal(HydroponicsFormulas.dosing(100, 2).value, 200)
  assert.equal(HydroponicsFormulas.dwc(8, 20).value, 160, 'total DWC volume')
  assert.equal(HydroponicsFormulas.ec(1400, 2).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('hydroponics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hydroponics', program: ['flowrate'], params: [600, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `hydroponics.flowrate at ${uuid}`)
  uuidReceiptOf('hydroponics flowrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ec 700, ph 1, nutrientratio 75, flowrate 10, density 25, reservoir 200, dosing 200, dwc 160; crossing to agriculture')
})
