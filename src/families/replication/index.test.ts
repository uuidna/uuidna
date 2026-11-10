import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReplicationFormulas } from './index.js'
import '../../mcp/families.js'

test('replication: consistency, divergence, factor, failover, lag, quorum, sync, throughput — crossing to networking', async (t) => {
  assert.equal(ReplicationFormulas.consistency(2, 3).value, 66, 'two of three replicas acknowledged')
  assert.equal(ReplicationFormulas.divergence(1000, 940).value, 60, 'the follower is sixty entries behind')
  assert.equal(ReplicationFormulas.factor(3, 4).value, 12, 'three copies across four sites')
  assert.equal(ReplicationFormulas.failover(300, 150).value, 450)
  assert.equal(ReplicationFormulas.lag(1000, 50).value, 20, 'seconds to drain the backlog')
  assert.equal(ReplicationFormulas.quorum(5).value, 3, 'majority of five nodes')
  assert.equal(ReplicationFormulas.sync(500, 3).value, 1500)
  assert.equal(ReplicationFormulas.throughput(9000, 60).value, 150, 'replicated ops per second')
  assert.equal(ReplicationFormulas.consistency(2, 3).dst, 'networking')
  assert.equal(hexFamiliesOf().get('replication')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'replication', program: ['quorum'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `replication.quorum at ${uuid}`)
  uuidReceiptOf('replication quorum', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; consistency 66, divergence 60, factor 12, failover 450, lag 20, quorum 3, sync 1500, throughput 150; crossing to networking')
})
