import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OrthographyFormulas } from './index.js'
import '../../mcp/families.js'

test('orthography: transparency, graphemes, errors, density, capitals, diacritics, legibility, syllables — crossing to linguistics', async (t) => {
  assert.equal(OrthographyFormulas.transparency(900, 1000).value, 90, 'a shallow orthography')
  assert.equal(OrthographyFormulas.graphemes(130, 100).value, 130, 'symbols per sound')
  assert.equal(OrthographyFormulas.errors(5, 100).value, 5)
  assert.equal(OrthographyFormulas.density(5000, 1000).value, 5, 'letters per word')
  assert.equal(OrthographyFormulas.capitals(3, 100).value, 3)
  assert.equal(OrthographyFormulas.diacritics(40, 200).value, 20)
  assert.equal(OrthographyFormulas.legibility(980, 1000).value, 98)
  assert.equal(OrthographyFormulas.syllables(4).value, 4)
  assert.equal(OrthographyFormulas.transparency(900, 1000).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('orthography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'orthography', program: ['density'], params: [5000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `orthography.density at ${uuid}`)
  uuidReceiptOf('orthography density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; transparency 90, graphemes 130, errors 5, density 5, capitals 3, diacritics 20, legibility 98, syllables 4; crossing to linguistics')
})
