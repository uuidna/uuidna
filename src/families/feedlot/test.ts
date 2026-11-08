import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FeedlotFormulas } from './index.js'
import '../../mcp/families.js'

test('feedlot: rationcost, dailygain, daysonfeed, dryintake, feedefficiency, energydensity, proteinratio, breakeven — crossing to nutrition', async (t) => {
  assert.equal(FeedlotFormulas.rationcost(500, 8).value, 4000, 'pounds of feed at a per-pound rate')
  assert.equal(FeedlotFormulas.dailygain(360, 180).value, 2, 'two pounds a day')
  assert.equal(FeedlotFormulas.daysonfeed(1200, 600, 3).value, 200, 'days to finish')
  assert.equal(FeedlotFormulas.dryintake(2400, 120).value, 20)
  assert.equal(FeedlotFormulas.feedefficiency(1200, 200).value, 6, 'six pounds of feed per pound of gain')
  assert.equal(FeedlotFormulas.energydensity(6000, 100).value, 60)
  assert.equal(FeedlotFormulas.proteinratio(45, 300).value, 15, 'fifteen percent protein')
  assert.equal(FeedlotFormulas.breakeven(900, 1200).value, 75, 'cents per pound')
  assert.equal(FeedlotFormulas.dailygain(100, 0).value, 0)
  assert.equal(FeedlotFormulas.rationcost(500, 8).dst, 'nutrition')
  assert.equal(hexFamiliesOf().get('feedlot')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'feedlot', program: ['dailygain'], params: [360, 180] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `feedlot.dailygain at ${uuid}`)
  uuidReceiptOf('feedlot dailygain', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rationcost 4000, dailygain 2, daysonfeed 200, dryintake 20, feedefficiency 6, energydensity 60, proteinratio 15, breakeven 75; crossing to nutrition')
})
