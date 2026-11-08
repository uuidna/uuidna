import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SilageFormulas } from './index.js'
import '../../mcp/families.js'

test('silage: drymatter, density, fermentationloss, phlevel, packingdensity, feedout, capacity, moisture — crossing to agriculture', async (t) => {
  assert.equal(SilageFormulas.drymatter(350, 1000).value, 35, 'a third-dry-matter grass silage')
  assert.equal(SilageFormulas.density(7000, 10).value, 700, 'kg per cubic metre')
  assert.equal(SilageFormulas.fermentationloss(80, 1000).value, 8)
  assert.equal(SilageFormulas.phlevel(420, 10).value, 42, 'pH 4.2 ×10')
  assert.equal(SilageFormulas.packingdensity(12, 600).value, 7200)
  assert.equal(SilageFormulas.feedout(3000, 30).value, 100, 'kg removed per day')
  assert.equal(SilageFormulas.capacity(50, 4).value, 200)
  assert.equal(SilageFormulas.moisture(650, 1000).value, 65)
  assert.equal(SilageFormulas.drymatter(350, 1000).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('silage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'silage', program: ['feedout'], params: [3000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `silage.feedout at ${uuid}`)
  uuidReceiptOf('silage feedout', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; drymatter 35, density 700, fermentationloss 8, phlevel 42, packingdensity 7200, feedout 100, capacity 200, moisture 65; crossing to agriculture')
})
