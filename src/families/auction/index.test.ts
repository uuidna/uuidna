import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AuctionFormulas } from './index.js'
import '../../mcp/families.js'

test('auction: clearing, competition, estimate, increment, premium, proxy, reserve, selltrough — crossing to trading', async (t) => {
  assert.equal(AuctionFormulas.clearing(150, 100).value, 150, 'demand clears supply')
  assert.equal(AuctionFormulas.competition(90, 30).value, 3, 'three bidders per lot')
  assert.equal(AuctionFormulas.estimate(1200, 1000).value, 120, 'hammer over the low estimate')
  assert.equal(AuctionFormulas.increment(1000, 10).value, 100, 'the next bid step')
  assert.equal(AuctionFormulas.premium(1000, 25).value, 250, 'the buyer\'s premium')
  assert.equal(AuctionFormulas.proxy(500, 300).value, 200, 'headroom on the proxy')
  assert.equal(AuctionFormulas.reserve(800, 500).value, 300, 'cleared over the floor')
  assert.equal(AuctionFormulas.reserve(400, 500).value, 0, 'under the floor clears nothing')
  assert.equal(AuctionFormulas.selltrough(80, 100).value, 80, 'sell-through percent')
  assert.equal(AuctionFormulas.clearing(150, 100).dst, 'trading')
  assert.equal(hexFamiliesOf().get('auction')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'auction', program: ['competition'], params: [90, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `auction.competition at ${uuid}`)
  uuidReceiptOf('auction competition', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; clearing 150, competition 3, estimate 120, increment 100, premium 250, proxy 200, reserve 300, selltrough 80; crossing to trading')
})
