import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LinguisticsFormulas } from './index.js'
import '../../mcp/families.js'

test('linguistics: syllables, lexical, readability, cognates, phonemes, frequency, morphemes, distance — crossing to ml', async (t) => {
  assert.equal(LinguisticsFormulas.syllables(100, 2).value, 200, 'syllables across the words')
  assert.equal(LinguisticsFormulas.lexical(400, 1000).value, 40, 'type-token diversity')
  assert.equal(LinguisticsFormulas.readability(500, 25).value, 20, 'average sentence length')
  assert.equal(LinguisticsFormulas.cognates(300, 1000).value, 30)
  assert.equal(LinguisticsFormulas.phonemes(44).value, 44, 'the phoneme inventory')
  assert.equal(LinguisticsFormulas.frequency(50, 1000000).value, 50, 'per million')
  assert.equal(LinguisticsFormulas.morphemes(200, 3).value, 600)
  assert.equal(LinguisticsFormulas.distance(5, 20).value, 25, 'edit distance %')
  assert.equal(LinguisticsFormulas.syllables(100, 2).dst, 'ml')
  assert.equal(hexFamiliesOf().get('linguistics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'linguistics', program: ['readability'], params: [500, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `linguistics.readability at ${uuid}`)
  uuidReceiptOf('linguistics readability', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; syllables 200, lexical 40, readability 20, cognates 30, phonemes 44, frequency 50, morphemes 600, distance 25; crossing to ml')
})
