import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OpendataFormulas } from './index.js'
import '../../mcp/families.js'

test('opendata: records, completeness, freshness, license, downloads, coverage, size, formats — crossing to cross', async (t) => {
  assert.equal(OpendataFormulas.records(100, 20).value, 2000, 'cells in a table')
  assert.equal(OpendataFormulas.completeness(950, 1000).value, 95)
  assert.equal(OpendataFormulas.freshness(1000, 700).value, 300, 'age since last update')
  assert.equal(OpendataFormulas.freshness(700, 1000).value, 0, 'never negative')
  assert.equal(OpendataFormulas.license(80, 100).value, 80)
  assert.equal(OpendataFormulas.downloads(50, 12).value, 600)
  assert.equal(OpendataFormulas.coverage(45, 60).value, 75)
  assert.equal(OpendataFormulas.size(1000, 64).value, 64000)
  assert.equal(OpendataFormulas.formats(3, 4).value, 7)
  assert.equal(OpendataFormulas.records(100, 20).dst, 'cross')
  assert.equal(hexFamiliesOf().get('opendata')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'opendata', program: ['records'], params: [100, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `opendata.records at ${uuid}`)
  uuidReceiptOf('opendata records', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; records 2000, completeness 95, freshness 300, license 80, downloads 600, coverage 75, size 64000, formats 7; crossing to cross')
})
