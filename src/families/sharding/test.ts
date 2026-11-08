import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ShardingFormulas } from './index.js'
import '../../mcp/families.js'

test('sharding: shards, keyrange, rebalance, hotspot, fanout, skew, placement, resharding — crossing to indexing', async (t) => {
  assert.equal(ShardingFormulas.shards(1000, 256).value, 4, 'four shards for the key set')
  assert.equal(ShardingFormulas.keyrange(65536, 16).value, 4096)
  assert.equal(ShardingFormulas.rebalance(1000, 3).value, 250, 'a quarter moves on the fourth shard')
  assert.equal(ShardingFormulas.hotspot(900, 100).value, 9)
  assert.equal(ShardingFormulas.fanout(16, 3).value, 48, 'physical nodes a scatter query touches')
  assert.equal(ShardingFormulas.skew(500, 120).value, 380)
  assert.equal(ShardingFormulas.placement(1000, 16).value, 8)
  assert.equal(ShardingFormulas.resharding(1000, 4, 8).value, 500, 'half migrate on a double')
  assert.equal(ShardingFormulas.skew(100, 300).value, 0)
  assert.equal(ShardingFormulas.shards(1000, 256).dst, 'indexing')
  assert.equal(hexFamiliesOf().get('sharding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sharding', program: ['shards'], params: [1000, 256] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `sharding.shards at ${uuid}`)
  uuidReceiptOf('sharding shards', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shards 4, keyrange 4096, rebalance 250, hotspot 9, fanout 48, skew 380, placement 8, resharding 500; crossing to indexing')
})
