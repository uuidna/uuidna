import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CorpusFormulas } from './index.js'
import '../../mcp/families.js'

test('corpus: annotationcoverage, balancescore, concordancehits, frequencyperm, hapaxratio, keyness, sampledwords, typetoken — crossing to linguistics', async (t) => {
  assert.equal(CorpusFormulas.annotationcoverage(900, 1000).value, 90)
  assert.equal(CorpusFormulas.balancescore(8, 10).value, 80, 'eight of ten categories')
  assert.equal(CorpusFormulas.concordancehits(12, 40).value, 480)
  assert.equal(CorpusFormulas.frequencyperm(3, 1000).value, 3, 'three per mille')
  assert.equal(CorpusFormulas.hapaxratio(25, 50).value, 50, 'half the types seen once')
  assert.equal(CorpusFormulas.keyness(150, 40).value, 110)
  assert.equal(CorpusFormulas.keyness(40, 150).value, 0)
  assert.equal(CorpusFormulas.sampledwords(500, 2000).value, 1000000, 'a million sampled words')
  assert.equal(CorpusFormulas.typetoken(40, 100).value, 40)
  assert.equal(CorpusFormulas.typetoken(40, 100).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('corpus')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'corpus', program: ['typetoken'], params: [40, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `corpus.typetoken at ${uuid}`)
  uuidReceiptOf('corpus typetoken', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; annotationcoverage 90, balancescore 80, concordancehits 480, frequencyperm 3, hapaxratio 50, keyness 110, sampledwords 1000000, typetoken 40; crossing to linguistics')
})
