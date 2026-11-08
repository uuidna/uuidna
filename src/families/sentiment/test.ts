import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SentimentFormulas } from './index.js'
import '../../mcp/families.js'

test('sentiment: polarity, netscore, subjectivity, intensity, agreement, confidence, mixedratio, valence — crossing to semantics', async (t) => {
  assert.equal(SentimentFormulas.polarity(80, 20).value, 60, 'positive less negative')
  assert.equal(SentimentFormulas.polarity(20, 80).value, 0)
  assert.equal(SentimentFormulas.netscore(75, 100).value, 75)
  assert.equal(SentimentFormulas.subjectivity(40, 100).value, 40)
  assert.equal(SentimentFormulas.intensity(7, 9).value, 63)
  assert.equal(SentimentFormulas.agreement(18, 20).value, 90, 'raters agree')
  assert.equal(SentimentFormulas.confidence(950, 1000).value, 95)
  assert.equal(SentimentFormulas.mixedratio(30, 90).value, 33, 'weaker over stronger')
  assert.equal(SentimentFormulas.valence(60, 30, 10).value, 60, 'positive share')
  assert.equal(SentimentFormulas.polarity(80, 20).dst, 'semantics')
  assert.equal(hexFamiliesOf().get('sentiment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sentiment', program: ['netscore'], params: [75, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `sentiment.netscore at ${uuid}`)
  uuidReceiptOf('sentiment netscore', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; polarity 60, netscore 75, subjectivity 40, intensity 63, agreement 90, confidence 95, mixedratio 33, valence 60; crossing to semantics')
})
