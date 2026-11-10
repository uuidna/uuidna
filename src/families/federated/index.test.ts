import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FederatedFormulas } from './index.js'

/** Federated learning as exact combinatorics — exchanges, updates, params, shards, quorum, cohorts, stragglers, aggregation. */
test('federated: exchanges, updates, params, shards, quorum, cohorts, straggle, aggregated', async (t) => {
  assert.equal(FederatedFormulas.exchanges(10, 5).value, 50, '10 rounds × 5 clients')
  assert.equal(FederatedFormulas.updates(5, 3).value, 15, '5 clients × 3 epochs')
  assert.equal(FederatedFormulas.params(12, 100).value, 1200, '12 layers × 100')
  assert.equal(FederatedFormulas.shards(1000, 4).value, 250, '1000 samples over 4 clients')
  assert.equal(FederatedFormulas.shards(1000, 0).value, 0, 'no client, no shard')
  assert.equal(FederatedFormulas.quorum(5).value, 3, 'majority of five')
  assert.equal(FederatedFormulas.quorum(4).value, 3, 'majority of four')
  assert.equal(FederatedFormulas.cohorts(4).value, 15, '2^4 − 1 non-empty cohorts')
  assert.equal(FederatedFormulas.straggle(10, 7).value, 3, '3 of 10 did not report')
  assert.equal(FederatedFormulas.straggle(5, 8).value, 0, 'more reported than asked, floored')
  assert.equal(FederatedFormulas.aggregated(4, 100).value, 400, '4 clients × 100 params')
  assert.equal(FederatedFormulas.exchanges(10, 5).dst, 'cross')
  assert.equal(hexFamiliesOf().get('federated')?.length, 8)
  for (const [name, params, expected] of [['exchanges', [10, 5], 50], ['cohorts', [4], 15], ['aggregated', [4, 100], 400]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'federated', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `federated.${name} at ${uuid}`)
    uuidReceiptOf(`federated ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 10×5 exchanges, 2^4−1 cohorts, ⌊5/2⌋+1 quorum')
})
