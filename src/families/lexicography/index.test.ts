import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LexicographyFormulas } from './index.js'
import '../../mcp/families.js'

test('lexicography: headwords, senses, coverage, polysemy, definitionlength, crossref, frequencyrank, lemmaratio — crossing to linguistics', async (t) => {
  assert.equal(LexicographyFormulas.headwords(500, 40).value, 20000, 'entries across the pages')
  assert.equal(LexicographyFormulas.senses(1000, 3).value, 3000)
  assert.equal(LexicographyFormulas.coverage(950, 1000).value, 95, 'percent of the lexicon defined')
  assert.equal(LexicographyFormulas.coverage(0, 0).value, 0)
  assert.equal(LexicographyFormulas.polysemy(3000, 1000).value, 3)
  assert.equal(LexicographyFormulas.definitionlength(10000, 500).value, 20)
  assert.equal(LexicographyFormulas.crossref(1000, 4).value, 4000)
  assert.equal(LexicographyFormulas.frequencyrank(5000, 1000).value, 5, 'frequency band')
  assert.equal(LexicographyFormulas.lemmaratio(6000, 1500).value, 4, 'inflected forms per lemma')
  assert.equal(LexicographyFormulas.headwords(500, 40).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('lexicography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lexicography', program: ['polysemy'], params: [3000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `lexicography.polysemy at ${uuid}`)
  uuidReceiptOf('lexicography polysemy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; headwords 20000, senses 3000, coverage 95, polysemy 3, definitionlength 20, crossref 4000, frequencyrank 5, lemmaratio 4; crossing to linguistics')
})
