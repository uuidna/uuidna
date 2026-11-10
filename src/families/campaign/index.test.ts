import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CampaignFormulas } from './index.js'
import '../../mcp/families.js'

test('campaign: reach, impressions, frequency, ctr, cpm, cpc, engagement, roi — crossing to marketing', async (t) => {
  assert.equal(CampaignFormulas.reach(50000, 60).value, 30000, 'sixty percent of the audience')
  assert.equal(CampaignFormulas.impressions(30000, 3).value, 90000)
  assert.equal(CampaignFormulas.frequency(90000, 30000).value, 3, 'each person saw it three times')
  assert.equal(CampaignFormulas.ctr(600, 60000).value, 100, 'one percent, in basis points')
  assert.equal(CampaignFormulas.cpm(5000, 50000).value, 100)
  assert.equal(CampaignFormulas.cpc(5000, 500).value, 10)
  assert.equal(CampaignFormulas.engagement(1500, 30000).value, 5)
  assert.equal(CampaignFormulas.roi(15000, 5000).value, 200, 'two hundred percent return')
  assert.equal(CampaignFormulas.roi(3000, 5000).value, 0)
  assert.equal(CampaignFormulas.reach(50000, 60).dst, 'marketing')
  assert.equal(hexFamiliesOf().get('campaign')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'campaign', program: ['reach'], params: [50000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30000, `campaign.reach at ${uuid}`)
  uuidReceiptOf('campaign reach', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reach 30000, impressions 90000, frequency 3, ctr 100, cpm 100, cpc 10, engagement 5, roi 200; crossing to marketing')
})
