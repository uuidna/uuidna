import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RedundancyFormulas } from './index.js'
import '../../mcp/families.js'

test('redundancy: activepassive, coverage, failover, nplusone, parallelreliability, quorum, sparecount, votingthreshold — crossing to reliability', async (t) => {
  assert.equal(RedundancyFormulas.activepassive(100, 50).value, 50, 'standby at half the primary')
  assert.equal(RedundancyFormulas.coverage(90, 100).value, 90)
  assert.equal(RedundancyFormulas.failover(1000, 5).value, 250, 'load per surviving node')
  assert.equal(RedundancyFormulas.nplusone(8, 1).value, 9, 'eight actives plus one spare')
  assert.equal(RedundancyFormulas.parallelreliability(90, 2).value, 95)
  assert.equal(RedundancyFormulas.quorum(2).value, 5, 'nodes to tolerate two faults')
  assert.equal(RedundancyFormulas.sparecount(10, 8).value, 2)
  assert.equal(RedundancyFormulas.votingthreshold(5).value, 3, 'majority of five')
  assert.equal(RedundancyFormulas.failover(1000, 1).value, 0)
  assert.equal(RedundancyFormulas.activepassive(100, 50).dst, 'reliability')
  assert.equal(hexFamiliesOf().get('redundancy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'redundancy', program: ['failover'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `redundancy.failover at ${uuid}`)
  uuidReceiptOf('redundancy failover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; activepassive 50, coverage 90, failover 250, nplusone 9, parallelreliability 95, quorum 5, sparecount 2, votingthreshold 3; crossing to reliability')
})
