import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PatentFormulas } from './index.js'
import '../../mcp/families.js'

test('patent: term, priority, royalty, damages, claims, infringement, novelty — crossing to law', async (t) => {
  assert.equal(PatentFormulas.term(2026, 20).value, 2046, 'a 20-year term')
  assert.equal(PatentFormulas.priority(11).value, 1, 'within the 12-month window')
  assert.equal(PatentFormulas.priority(13).value, 0, 'the window has closed')
  assert.equal(PatentFormulas.royalty(500000, 4).value, 20000, '4% royalty')
  assert.equal(PatentFormulas.damages(10000, 3).value, 30000, 'reasonable royalty per unit')
  assert.equal(PatentFormulas.claims(3, 17).value, 20)
  assert.equal(PatentFormulas.infringement(10000, 2000).value, 8000, 'units beyond the licence')
  assert.equal(PatentFormulas.maintenance(10, 1600).value, 16000)
  assert.equal(PatentFormulas.novelty(0).value, 1, 'novel: no prior art')
  assert.equal(PatentFormulas.novelty(2).value, 0, 'anticipated by prior art')
  assert.equal(PatentFormulas.term(2026, 20).dst, 'law')
  assert.equal(hexFamiliesOf().get('patent')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'patent', program: ['term'], params: [2026, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2046, `patent.term at ${uuid}`)
  uuidReceiptOf('patent term', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; term 2046, priority 1, royalty 20000, damages 30000, claims 20, infringement 8000, novelty 1; crossing to law')
})
