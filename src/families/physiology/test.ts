import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhysiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('physiology: bmr, vo2, clearance, gfr, osmolality, ph, tidal, saturation — crossing to med', async (t) => {
  assert.equal(PhysiologyFormulas.bmr(70, 24).value, 1680, 'basal metabolic rate proxy')
  assert.equal(PhysiologyFormulas.vo2(3500, 70).value, 50, 'oxygen uptake per kilogram')
  assert.equal(PhysiologyFormulas.clearance(12, 10).value, 120)
  assert.equal(PhysiologyFormulas.gfr(1800, 20).value, 90)
  assert.equal(PhysiologyFormulas.osmolality(285, 1000).value, 285)
  assert.equal(PhysiologyFormulas.ph(74, 100).value, 74)
  assert.equal(PhysiologyFormulas.tidal(12, 500).value, 6000, 'tidal minute volume')
  assert.equal(PhysiologyFormulas.saturation(98, 100).value, 98)
  assert.equal(PhysiologyFormulas.saturation(5, 0).value, 0, 'guarded division')
  assert.equal(PhysiologyFormulas.bmr(70, 24).dst, 'med')
  assert.equal(hexFamiliesOf().get('physiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'physiology', program: ['vo2'], params: [3500, 70] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `physiology.vo2 at ${uuid}`)
  uuidReceiptOf('physiology vo2', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bmr 1680, vo2 50, clearance 120, gfr 90, osmolality 285, ph 74, tidal 6000, saturation 98; crossing to med')
})
