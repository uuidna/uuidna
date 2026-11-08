import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QueryFormulas } from './index.js'
import '../../mcp/families.js'

test('query: pages, skip, depth, where, population, sort, limit, hit — crossing to payload', async (t) => {
  assert.equal(QueryFormulas.pages(100, 10).value, 10, 'ten pages of ten')
  assert.equal(QueryFormulas.skip(3, 10).value, 20, 'skip two pages')
  assert.equal(QueryFormulas.depth(2).value, 2)
  assert.equal(QueryFormulas.where(4).value, 4)
  assert.equal(QueryFormulas.population(5, 2).value, 10)
  assert.equal(QueryFormulas.sort(3).value, 3)
  assert.equal(QueryFormulas.limit(500, 100).value, 100, 'capped at a hundred')
  assert.equal(QueryFormulas.hit(45, 100).value, 45)
  assert.equal(QueryFormulas.pages(100, 10).dst, 'payload')
  assert.equal(hexFamiliesOf().get('query')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'query', program: ['pages'], params: [100, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `query.pages at ${uuid}`)
  uuidReceiptOf('query pages', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pages 10, skip 20, depth 2, where 4, population 10, sort 3, limit 100, hit 45; crossing to payload')
})
