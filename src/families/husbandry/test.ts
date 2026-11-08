import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HusbandryFormulas } from './index.js'
import '../../mcp/families.js'

test('husbandry: stockingdensity, feedconversion, weaningweight, herdgrowth, mortality, pasturerotation, waterrequirement, spaceallowance — crossing to agriculture', async (t) => {
  assert.equal(HusbandryFormulas.stockingdensity(100, 500).value, 20, 'twenty per 100 units')
  assert.equal(HusbandryFormulas.feedconversion(600, 100).value, 600, 'FCR 6.00 ×100')
  assert.equal(HusbandryFormulas.weaningweight(40, 200, 1).value, 240, 'birth plus 200 days of gain')
  assert.equal(HusbandryFormulas.herdgrowth(100, 30, 10).value, 120, 'herd after births and deaths')
  assert.equal(HusbandryFormulas.mortality(3, 100).value, 3)
  assert.equal(HusbandryFormulas.mortality(0, 100).value, 0)
  assert.equal(HusbandryFormulas.pasturerotation(6, 5).value, 30, 'thirty-day cycle')
  assert.equal(HusbandryFormulas.waterrequirement(100, 50).value, 5000)
  assert.equal(HusbandryFormulas.spaceallowance(1000, 40).value, 25, 'floor space per animal')
  assert.equal(HusbandryFormulas.herdgrowth(100, 30, 10).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('husbandry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'husbandry', program: ['herdgrowth'], params: [100, 30, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `husbandry.herdgrowth at ${uuid}`)
  uuidReceiptOf('husbandry herdgrowth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; stockingdensity 20, feedconversion 600, weaningweight 240, herdgrowth 120, mortality 3, pasturerotation 30, waterrequirement 5000, spaceallowance 25; crossing to agriculture')
})
