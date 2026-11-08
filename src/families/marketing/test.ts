import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MarketingFormulas } from './index.js'
import '../../mcp/families.js'

test('marketing: roas, cpc, cpm, cpl, roi, budget, reach, churn — crossing to analytics', async (t) => {
  assert.equal(MarketingFormulas.roas(40000, 10000).value, 400, '4x return on ad spend')
  assert.equal(MarketingFormulas.cpc(5000, 2500).value, 2)
  assert.equal(MarketingFormulas.cpm(5000, 1000000).value, 5)
  assert.equal(MarketingFormulas.cpl(10000, 200).value, 50)
  assert.equal(MarketingFormulas.roi(15000, 10000).value, 50)
  assert.equal(MarketingFormulas.roi(5000, 10000).value, -50, 'a losing campaign')
  assert.equal(MarketingFormulas.budget(500, 30).value, 15000)
  assert.equal(MarketingFormulas.reach(15000, 5).value, 3000000)
  assert.equal(MarketingFormulas.churn(50, 1000).value, 5)
  assert.equal(MarketingFormulas.roas(40000, 10000).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('marketing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'marketing', program: ['roas'], params: [40000, 10000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `marketing.roas at ${uuid}`)
  uuidReceiptOf('marketing roas', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; roas 400, cpc 2, cpm 5, cpl 50, roi 50/-50, budget 15000, reach 3M, churn 5; crossing to analytics')
})
