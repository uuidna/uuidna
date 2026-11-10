import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReadabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('readability: wordspersentence, syllablesperword, fleschscaled, fleschkincaid, colemanliau, automatedindex, gunningfog, smogscaled — crossing to linguistics', async (t) => {
  assert.equal(ReadabilityFormulas.wordspersentence(120, 6).value, 20, 'average sentence length')
  assert.equal(ReadabilityFormulas.wordspersentence(100, 0).value, 0)
  assert.equal(ReadabilityFormulas.syllablesperword(150, 100).value, 150, 'syllables per hundred words')
  assert.equal(ReadabilityFormulas.fleschscaled(20, 150).value, 60, 'reading ease')
  assert.equal(ReadabilityFormulas.fleschkincaid(20, 150).value, 8, 'grade level')
  assert.equal(ReadabilityFormulas.colemanliau(500, 5).value, 12)
  assert.equal(ReadabilityFormulas.automatedindex(500, 100, 5).value, 12, 'ARI grade')
  assert.equal(ReadabilityFormulas.gunningfog(100, 5, 10).value, 12, 'fog index')
  assert.equal(ReadabilityFormulas.smogscaled(30, 30).value, 8)
  assert.equal(ReadabilityFormulas.wordspersentence(120, 6).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('readability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'readability', program: ['gunningfog'], params: [100, 5, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `readability.gunningfog at ${uuid}`)
  uuidReceiptOf('readability gunningfog', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wordspersentence 20, syllablesperword 150, fleschscaled 60, fleschkincaid 8, colemanliau 12, automatedindex 12, gunningfog 12, smogscaled 8; crossing to linguistics')
})
