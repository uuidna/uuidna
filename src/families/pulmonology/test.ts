import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PulmonologyFormulas } from './index.js'
import '../../mcp/families.js'

test('pulmonology: fev1, tidal, saturation, compliance, deadspace, peakflow, resistance, diffusion — crossing to med', async (t) => {
  assert.equal(PulmonologyFormulas.fev1(80, 100).value, 80, 'the forced-expiratory ratio')
  assert.equal(PulmonologyFormulas.tidal(500, 12).value, 6000, 'minute ventilation')
  assert.equal(PulmonologyFormulas.saturation(98, 100).value, 98)
  assert.equal(PulmonologyFormulas.compliance(500, 5).value, 100)
  assert.equal(PulmonologyFormulas.deadspace(150, 500).value, 30, 'dead-space fraction')
  assert.equal(PulmonologyFormulas.peakflow(600).value, 600)
  assert.equal(PulmonologyFormulas.resistance(20, 4).value, 5)
  assert.equal(PulmonologyFormulas.diffusion(250, 10).value, 25)
  assert.equal(PulmonologyFormulas.fev1(80, 100).dst, 'med')
  assert.equal(hexFamiliesOf().get('pulmonology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pulmonology', program: ['tidal'], params: [500, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `pulmonology.tidal at ${uuid}`)
  uuidReceiptOf('pulmonology tidal', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fev1 80, tidal 6000, saturation 98, compliance 100, deadspace 30, peakflow 600, resistance 5, diffusion 25; crossing to med')
})
