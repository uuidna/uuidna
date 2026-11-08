import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TransliterationFormulas } from './index.js'
import '../../mcp/families.js'

test('transliteration: mappings, charpairs, schemeorderings, ambiguouschars, reversibility, diacriticcount, schemesubsets, coverage — crossing to linguistics', async (t) => {
  assert.equal(TransliterationFormulas.mappings(26, 2).value, 52)
  assert.equal(TransliterationFormulas.charpairs(26, 2).value, 325)
  assert.equal(TransliterationFormulas.schemeorderings(4).value, 24)
  assert.equal(TransliterationFormulas.ambiguouschars(4, 2).value, 6)
  assert.equal(TransliterationFormulas.reversibility(95, 100).value, 95)
  assert.equal(TransliterationFormulas.diacriticcount(8, 4).value, 12)
  assert.equal(TransliterationFormulas.schemesubsets(4).value, 16)
  assert.equal(TransliterationFormulas.coverage(98, 100).value, 98)
  assert.equal(TransliterationFormulas.mappings(26, 2).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('transliteration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'transliteration', program: ['mappings'], params: [26, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 52, `transliteration.mappings at ${uuid}`)
  uuidReceiptOf('transliteration mappings', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mappings 52, charpairs 325, schemeorderings 24, ambiguouschars 6, reversibility 95, diacriticcount 12, schemesubsets 16, coverage 98; crossing to linguistics')
})
