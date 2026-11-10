import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnalyticsFormulas } from './index.js'
import '../../mcp/families.js'

test('analytics: rate, ctr, bounce, retention, arpu, ltv, cac, funnel — crossing to ml', async (t) => {
  assert.equal(AnalyticsFormulas.rate(50, 1000).value, 5, 'a 5% conversion rate')
  assert.equal(AnalyticsFormulas.ctr(30, 1000).value, 3)
  assert.equal(AnalyticsFormulas.bounce(400, 1000).value, 40)
  assert.equal(AnalyticsFormulas.retention(300, 1000).value, 30)
  assert.equal(AnalyticsFormulas.arpu(50000, 1000).value, 50)
  assert.equal(AnalyticsFormulas.ltv(50, 24).value, 1200)
  assert.equal(AnalyticsFormulas.cac(30000, 1000).value, 30)
  assert.equal(AnalyticsFormulas.funnel(1000, 50).value, 5, 'five percent reach the bottom')
  assert.equal(AnalyticsFormulas.rate(50, 1000).dst, 'ml')
  assert.equal(hexFamiliesOf().get('analytics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'analytics', program: ['ltv'], params: [50, 24] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `analytics.ltv at ${uuid}`)
  uuidReceiptOf('analytics ltv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 5, ctr 3, bounce 40, retention 30, arpu 50, ltv 1200, cac 30, funnel 5; crossing to ml')
})
