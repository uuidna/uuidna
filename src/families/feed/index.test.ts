import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FeedFormulas } from './index.js'
import '../../mcp/families.js'

/** The scoring formulas are exact; domain(i) is a live reading (network), checked as registered-live, not called here. */
test('feed: news scored for every domain — relevance, recency, signal, trend, velocity, reach, hotness', async (t) => {
  assert.equal(FeedFormulas.relevance(9, 12).value, 75)
  assert.equal(FeedFormulas.recency(2460010, 2460000).value, 10)
  assert.equal(FeedFormulas.signal(120, 45).value, 165)
  assert.equal(FeedFormulas.trend(30, 12).value, 18)
  assert.equal(FeedFormulas.trend(12, 30).value, -18, 'a fading topic reads negative')
  assert.equal(FeedFormulas.velocity(48, 6).value, 8)
  assert.equal(FeedFormulas.reach(5, 14).value, 70)
  assert.equal(FeedFormulas.score(200, 3).value, 5000, 'points decayed by age')
  // domain(i) is live (async → live reading), registered but not called in the test
  const d = hexFamiliesOf().get('feed')?.find((x) => x.name === 'domain')
  assert.ok(d?.live === true, 'feed.domain is a live news reading per domain')
  assert.equal(FeedFormulas.relevance(9, 12).dst, 'cross')
  assert.equal(hexFamiliesOf().get('feed')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'feed', program: ['signal'], params: [120, 45] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 165, `feed.signal at ${uuid}`)
  uuidReceiptOf('feed signal', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; relevance 75, recency 10, signal 165, trend 18/-18, velocity 8, reach 70, score 5000; domain(i) live — news for every family')
})
