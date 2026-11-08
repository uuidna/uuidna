import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RadiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('radiology: dose, contrast, attenuation, halflife, resolution, exposure, coverage, uptake — crossing to med', async (t) => {
  assert.equal(RadiologyFormulas.dose(1000, 4).value, 250, 'absorbed behind shielding')
  assert.equal(RadiologyFormulas.contrast(50, 5).value, 1000)
  assert.equal(RadiologyFormulas.attenuation(100, 30).value, 70, 'the beam the body stops')
  assert.equal(RadiologyFormulas.halflife(2, 3).value, 16, 'thickness doubled three layers')
  assert.equal(RadiologyFormulas.resolution(1024, 16).value, 64)
  assert.equal(RadiologyFormulas.exposure(200, 3).value, 600, 'mAs')
  assert.equal(RadiologyFormulas.coverage(80, 100).value, 80)
  assert.equal(RadiologyFormulas.uptake(30, 120).value, 25, 'tracer uptake')
  assert.equal(RadiologyFormulas.dose(1000, 4).dst, 'med')
  assert.equal(hexFamiliesOf().get('radiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'radiology', program: ['dose'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `radiology.dose at ${uuid}`)
  uuidReceiptOf('radiology dose', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dose 250, contrast 1000, attenuation 70, halflife 16, resolution 64, exposure 600, coverage 80, uptake 25; crossing to med')
})
