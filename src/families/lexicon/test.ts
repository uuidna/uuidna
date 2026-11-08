import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LexiconFormulas } from './index.js'
import '../../mcp/families.js'

test('lexicon: typetokenratio, vocabularysize, hapaxlegomena, lexicaldensity, frequencyrank, zipfscaled, coverage, growthrate — crossing to linguistics', async (t) => {
  assert.equal(LexiconFormulas.typetokenratio(400, 1000).value, 40, 'two in five words are distinct')
  assert.equal(LexiconFormulas.vocabularysize(5000, 1200).value, 6200)
  assert.equal(LexiconFormulas.hapaxlegomena(400, 150).value, 250, 'words seen exactly once')
  assert.equal(LexiconFormulas.lexicaldensity(240, 600).value, 40)
  assert.equal(LexiconFormulas.frequencyrank(100, 5).value, 500, 'Zipf constant for this word')
  assert.equal(LexiconFormulas.zipfscaled(1000, 4).value, 250)
  assert.equal(LexiconFormulas.coverage(950, 1000).value, 95, 'the list covers most of the corpus')
  assert.equal(LexiconFormulas.growthrate(50, 1000).value, 50)
  assert.equal(LexiconFormulas.typetokenratio(400, 1000).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('lexicon')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lexicon', program: ['typetokenratio'], params: [400, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `lexicon.typetokenratio at ${uuid}`)
  uuidReceiptOf('lexicon typetokenratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; typetokenratio 40, vocabularysize 6200, hapaxlegomena 250, lexicaldensity 40, frequencyrank 500, zipfscaled 250, coverage 95, growthrate 50; crossing to linguistics')
})
