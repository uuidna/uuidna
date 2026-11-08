import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ApicultureFormulas } from './index.js'
import '../../mcp/families.js'

test('apiculture: honey, population, foraging, pollination, mite, swarming, overwinter, queen — crossing to entomology', async (t) => {
  assert.equal(ApicultureFormulas.honey(10, 3).value, 30, 'ten frames at three each')
  assert.equal(ApicultureFormulas.population(2000, 3).value, 6000)
  assert.equal(ApicultureFormulas.foraging(5000, 1000).value, 5, 'trips per bee')
  assert.equal(ApicultureFormulas.pollination(100, 50).value, 5000)
  assert.equal(ApicultureFormulas.mite(30, 1000).value, 3, 'mites per hundred bees')
  assert.equal(ApicultureFormulas.swarming(2, 10).value, 20)
  assert.equal(ApicultureFormulas.overwinter(8, 10).value, 80, 'overwinter survival')
  assert.equal(ApicultureFormulas.queen(30000, 20).value, 1500, 'eggs per day')
  assert.equal(ApicultureFormulas.honey(10, 3).dst, 'entomology')
  assert.equal(hexFamiliesOf().get('apiculture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'apiculture', program: ['foraging'], params: [5000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `apiculture.foraging at ${uuid}`)
  uuidReceiptOf('apiculture foraging', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; honey 30, population 6000, foraging 5, pollination 5000, mite 3, swarming 20, overwinter 80, queen 1500; crossing to entomology')
})
