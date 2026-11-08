import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SocialFormulas } from './index.js'
import '../../mcp/families.js'

test('social: engagement, reach, virality, growth, impressions, sentiment, influence, frequency — crossing to analytics', async (t) => {
  assert.equal(SocialFormulas.engagement(500, 10000).value, 5)
  assert.equal(SocialFormulas.reach(100000, 8).value, 8000)
  assert.equal(SocialFormulas.virality(200, 10000).value, 2)
  assert.equal(SocialFormulas.growth(500, 10000).value, 5)
  assert.equal(SocialFormulas.impressions(30, 8000).value, 240000)
  assert.equal(SocialFormulas.sentiment(700, 1000).value, 70)
  assert.equal(SocialFormulas.influence(100000, 5).value, 5000)
  assert.equal(SocialFormulas.frequency(240000, 80000).value, 3)
  assert.equal(SocialFormulas.engagement(500, 10000).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('social')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'social', program: ['reach'], params: [100000, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8000, `social.reach at ${uuid}`)
  uuidReceiptOf('social reach', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; engagement 5, reach 8000, virality 2, growth 5, impressions 240000, sentiment 70, influence 5000, frequency 3; crossing to analytics')
})
