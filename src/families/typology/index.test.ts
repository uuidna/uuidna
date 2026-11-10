import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TypologyFormulas } from './index.js'
import '../../mcp/families.js'

test('typology: wordorderfreq, morphemecomplexity, phonemeinventory, consonantvowelratio, syntheticindex, markednesscount, featurecount, geneticdistance — crossing to linguistics', async (t) => {
  assert.equal(TypologyFormulas.wordorderfreq(600, 1200).value, 50, 'half the sample')
  assert.equal(TypologyFormulas.morphemecomplexity(10000, 3).value, 30000)
  assert.equal(TypologyFormulas.phonemeinventory(22, 5).value, 27, 'consonants and vowels together')
  assert.equal(TypologyFormulas.consonantvowelratio(22, 5).value, 440)
  assert.equal(TypologyFormulas.syntheticindex(2550, 1000).value, 255, 'synthetic index ×100')
  assert.equal(TypologyFormulas.markednesscount(30, 12).value, 18)
  assert.equal(TypologyFormulas.markednesscount(10, 15).value, 0)
  assert.equal(TypologyFormulas.featurecount(192, 3).value, 576, 'feature cells filled')
  assert.equal(TypologyFormulas.geneticdistance(144, 100).value, 44, 'features not shared')
  assert.equal(TypologyFormulas.geneticdistance(100, 144).value, 0)
  assert.equal(TypologyFormulas.wordorderfreq(600, 1200).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('typology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'typology', program: ['phonemeinventory'], params: [22, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 27, `typology.phonemeinventory at ${uuid}`)
  uuidReceiptOf('typology phonemeinventory', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wordorderfreq 50, morphemecomplexity 30000, phonemeinventory 27, consonantvowelratio 440, syntheticindex 255, markednesscount 18, featurecount 576, geneticdistance 44; crossing to linguistics')
})
