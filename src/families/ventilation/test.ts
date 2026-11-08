import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VentilationFormulas } from './index.js'
import '../../mcp/families.js'

test('ventilation: minutevolume, alveolarventilation, deadspace, respiratoryrate, compliance, airwayresistance, oxygendelivery, ventilationperfusion — crossing to pulmonology', async (t) => {
  assert.equal(VentilationFormulas.minutevolume(500, 12).value, 6000, 'tidal breath at a rate')
  assert.equal(VentilationFormulas.alveolarventilation(500, 150, 12).value, 4200, 'the alveolar share')
  assert.equal(VentilationFormulas.deadspace(70, 2).value, 140, 'dead space by weight')
  assert.equal(VentilationFormulas.respiratoryrate(6000, 500).value, 12, 'breaths per minute')
  assert.equal(VentilationFormulas.compliance(500, 10).value, 50)
  assert.equal(VentilationFormulas.airwayresistance(20, 5).value, 4)
  assert.equal(VentilationFormulas.oxygendelivery(5, 200).value, 1000, 'oxygen delivered per minute')
  assert.equal(VentilationFormulas.ventilationperfusion(4, 5).value, 80, 'V/Q as a percentage')
  assert.equal(VentilationFormulas.minutevolume(500, 12).dst, 'pulmonology')
  assert.equal(hexFamiliesOf().get('ventilation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ventilation', program: ['minutevolume'], params: [500, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `ventilation.minutevolume at ${uuid}`)
  uuidReceiptOf('ventilation minutevolume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; minutevolume 6000, alveolarventilation 4200, deadspace 140, respiratoryrate 12, compliance 50, airwayresistance 4, oxygendelivery 1000, ventilationperfusion 80; crossing to pulmonology')
})
