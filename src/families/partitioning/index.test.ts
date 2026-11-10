import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PartitioningFormulas } from './index.js'
import '../../mcp/families.js'

test('partitioning: partitions, keyspacesplit, skew, rebalance, hotpartition, rangewidth, coalesce, fanout — crossing to sharding', async (t) => {
  assert.equal(PartitioningFormulas.partitions(1000, 30).value, 34, 'thirty-four partitions for the keyset')
  assert.equal(PartitioningFormulas.keyspacesplit(1000, 8).value, 125)
  assert.equal(PartitioningFormulas.skew(150, 100).value, 50, 'fifty percent over average')
  assert.equal(PartitioningFormulas.rebalance(1000, 3, 5).value, 400, 'keys moved growing three to five nodes')
  assert.equal(PartitioningFormulas.hotpartition(250, 1000).value, 25)
  assert.equal(PartitioningFormulas.rangewidth(6000, 60).value, 100, 'range width')
  assert.equal(PartitioningFormulas.coalesce(100, 4).value, 25)
  assert.equal(PartitioningFormulas.fanout(10, 5).value, 50)
  assert.equal(PartitioningFormulas.skew(80, 100).value, 0)
  assert.equal(PartitioningFormulas.partitions(1000, 30).dst, 'sharding')
  assert.equal(hexFamiliesOf().get('partitioning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'partitioning', program: ['partitions'], params: [1000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 34, `partitioning.partitions at ${uuid}`)
  uuidReceiptOf('partitioning partitions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; partitions 34, keyspacesplit 125, skew 50, rebalance 400, hotpartition 25, rangewidth 100, coalesce 25, fanout 50; crossing to sharding')
})
