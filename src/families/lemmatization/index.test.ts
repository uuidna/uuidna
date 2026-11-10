import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LemmatizationFormulas } from './index.js'
import '../../mcp/families.js'

test('lemmatization: lemmacount, inflectionratio, formsperlemma, accuracy, ambiguityrate, reductionratio, posmatch, coverage — crossing to linguistics', async (t) => {
  assert.equal(LemmatizationFormulas.lemmacount(1000, 5).value, 200, 'distinct lemmas')
  assert.equal(LemmatizationFormulas.inflectionratio(300, 100).value, 300)
  assert.equal(LemmatizationFormulas.formsperlemma(500, 100).value, 5, 'forms per lemma')
  assert.equal(LemmatizationFormulas.accuracy(950, 1000).value, 95)
  assert.equal(LemmatizationFormulas.ambiguityrate(50, 1000).value, 5)
  assert.equal(LemmatizationFormulas.reductionratio(1000, 200).value, 80, 'the stream shrinks by four fifths')
  assert.equal(LemmatizationFormulas.posmatch(900, 1000).value, 90)
  assert.equal(LemmatizationFormulas.coverage(8000, 10000).value, 80)
  assert.equal(LemmatizationFormulas.lemmacount(1000, 5).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('lemmatization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lemmatization', program: ['formsperlemma'], params: [500, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `lemmatization.formsperlemma at ${uuid}`)
  uuidReceiptOf('lemmatization formsperlemma', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lemmacount 200, inflectionratio 300, formsperlemma 5, accuracy 95, ambiguityrate 5, reductionratio 80, posmatch 90, coverage 80; crossing to linguistics')
})
