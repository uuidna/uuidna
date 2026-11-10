import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NgramFormulas } from './index.js'
import '../../mcp/families.js'

test('ngram: count, probability, laplacesmoothing, perplexityproxy, coverage, backoffweight, vocabularysize, conditionalcount — crossing to statistics', async (t) => {
  assert.equal(NgramFormulas.count(1000, 3).value, 998, 'trigrams over a thousand tokens')
  assert.equal(NgramFormulas.probability(5, 1000).value, 5, 'five per mille')
  assert.equal(NgramFormulas.probability(3, 0).value, 0)
  assert.equal(NgramFormulas.laplacesmoothing(4, 1000, 1000).value, 2)
  assert.equal(NgramFormulas.perplexityproxy(1000, 8).value, 125)
  assert.equal(NgramFormulas.coverage(90, 100).value, 90)
  assert.equal(NgramFormulas.backoffweight(400, 1000).value, 400)
  assert.equal(NgramFormulas.vocabularysize(5000, 1200).value, 3800, 'pruning the hapax legomena')
  assert.equal(NgramFormulas.conditionalcount(100, 1).value, 99, 'absolute discounting')
  assert.equal(NgramFormulas.conditionalcount(0, 5).value, 0)
  assert.equal(NgramFormulas.count(1000, 3).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('ngram')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ngram', program: ['count'], params: [1000, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 998, `ngram.count at ${uuid}`)
  uuidReceiptOf('ngram count', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; count 998, probability 5, laplacesmoothing 2, perplexityproxy 125, coverage 90, backoffweight 400, vocabularysize 3800, conditionalcount 99; crossing to statistics')
})
