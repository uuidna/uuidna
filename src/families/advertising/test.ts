import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AdvertisingFormulas } from './index.js'
import '../../mcp/families.js'

test('advertising: ctr, cpm, cpc, conversion, roas, reach, cpa, engagement — crossing to content', async (t) => {
  assert.equal(AdvertisingFormulas.ctr(50, 10000).value, 50, 'click-through in basis points')
  assert.equal(AdvertisingFormulas.cpm(2000, 10000).value, 200)
  assert.equal(AdvertisingFormulas.cpc(1000, 50).value, 20)
  assert.equal(AdvertisingFormulas.conversion(10, 50).value, 20, 'conversion rate percent')
  assert.equal(AdvertisingFormulas.roas(5000, 1000).value, 500, 'five to one return')
  assert.equal(AdvertisingFormulas.reach(10000, 4).value, 2500)
  assert.equal(AdvertisingFormulas.cpa(1000, 20).value, 50)
  assert.equal(AdvertisingFormulas.engagement(25, 100).value, 25, 'engagement rate percent')
  assert.equal(AdvertisingFormulas.ctr(50, 10000).dst, 'content')
  assert.equal(hexFamiliesOf().get('advertising')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'advertising', program: ['reach'], params: [10000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2500, `advertising.reach at ${uuid}`)
  uuidReceiptOf('advertising reach', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ctr 50, cpm 200, cpc 20, conversion 20, roas 500, reach 2500, cpa 50, engagement 25; crossing to content')
})
