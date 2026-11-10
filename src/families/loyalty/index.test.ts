import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LoyaltyFormulas } from './index.js'
import '../../mcp/families.js'

test('loyalty: points, tier, redemption, retention, repeat, lifetime, churn, reward — crossing to retail', async (t) => {
  assert.equal(LoyaltyFormulas.points(100, 3).value, 300, 'three points per unit spent')
  assert.equal(LoyaltyFormulas.tier(2500, 1000).value, 2, 'two whole tiers')
  assert.equal(LoyaltyFormulas.redemption(1000, 100).value, 10, 'ten units of value')
  assert.equal(LoyaltyFormulas.retention(950, 1000).value, 95)
  assert.equal(LoyaltyFormulas.repeat(500, 100).value, 5, 'five purchases per member')
  assert.equal(LoyaltyFormulas.lifetime(50, 12).value, 600)
  assert.equal(LoyaltyFormulas.churn(50, 1000).value, 5)
  assert.equal(LoyaltyFormulas.reward(2500, 2000).value, 1, 'reward earned')
  assert.equal(LoyaltyFormulas.reward(1000, 2000).value, 0)
  assert.equal(LoyaltyFormulas.points(100, 3).dst, 'retail')
  assert.equal(hexFamiliesOf().get('loyalty')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'loyalty', program: ['tier'], params: [2500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `loyalty.tier at ${uuid}`)
  uuidReceiptOf('loyalty tier', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; points 300, tier 2, redemption 10, retention 95, repeat 5, lifetime 600, churn 5, reward 1; crossing to retail')
})
