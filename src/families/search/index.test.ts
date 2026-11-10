import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SearchFormulas } from './index.js'
import '../../mcp/families.js'

test('search: recall, precision, latency, index, hits, throughput, coverage, f1 — crossing to cross', async (t) => {
  assert.equal(SearchFormulas.recall(80, 100).value, 80, 'four in five relevant found')
  assert.equal(SearchFormulas.precision(40, 50).value, 80)
  assert.equal(SearchFormulas.latency(5000, 100).value, 50)
  assert.equal(SearchFormulas.index(1000, 20).value, 20000, 'the posting count')
  assert.equal(SearchFormulas.hits(30, 200).value, 15)
  assert.equal(SearchFormulas.throughput(6000, 60).value, 100, 'queries per second')
  assert.equal(SearchFormulas.coverage(900, 1000).value, 90)
  assert.equal(SearchFormulas.f1(80, 80).value, 80, 'balanced precision and recall')
  assert.equal(SearchFormulas.f1(0, 0).value, 0)
  assert.equal(SearchFormulas.recall(80, 100).dst, 'cross')
  assert.equal(hexFamiliesOf().get('search')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'search', program: ['recall'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `search.recall at ${uuid}`)
  uuidReceiptOf('search recall', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; recall 80, precision 80, latency 50, index 20000, hits 15, throughput 100, coverage 90, f1 80; crossing to cross')
})
