import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IndexingFormulas } from './index.js'
import '../../mcp/families.js'

test('indexing: selectivity, cardinality, fanout, depth, scan, coverage, bloat, speedup — crossing to db', async (t) => {
  assert.equal(IndexingFormulas.selectivity(5, 1000).value, 0, 'a selective predicate')
  assert.equal(IndexingFormulas.cardinality(900, 1000).value, 90, 'a high-cardinality column')
  assert.equal(IndexingFormulas.fanout(1000, 10).value, 100, 'keys per page')
  assert.equal(IndexingFormulas.depth(1000000, 100).value, 10000)
  assert.equal(IndexingFormulas.scan(250, 1000).value, 25, 'a quarter of the table')
  assert.equal(IndexingFormulas.coverage(80, 100).value, 80)
  assert.equal(IndexingFormulas.bloat(200, 1000).value, 20)
  assert.equal(IndexingFormulas.speedup(5000, 100).value, 5000, 'fifty times faster')
  assert.equal(IndexingFormulas.selectivity(5, 1000).dst, 'db')
  assert.equal(hexFamiliesOf().get('indexing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'indexing', program: ['fanout'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `indexing.fanout at ${uuid}`)
  uuidReceiptOf('indexing fanout', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; selectivity 0, cardinality 90, fanout 100, depth 10000, scan 25, coverage 80, bloat 20, speedup 5000; crossing to db')
})
