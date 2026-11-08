import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TranslationFormulas } from './index.js'
import '../../mcp/families.js'

test('translation: bleu, fuzzy, throughput, expansion, coverage, edit, glossary, quality — crossing to linguistics', async (t) => {
  assert.equal(TranslationFormulas.bleu(45, 50).value, 90)
  assert.equal(TranslationFormulas.fuzzy(75, 100).value, 75, 'translation-memory reuse')
  assert.equal(TranslationFormulas.throughput(2500, 5).value, 500, 'words per hour')
  assert.equal(TranslationFormulas.expansion(120, 100).value, 120, 'target expands source')
  assert.equal(TranslationFormulas.coverage(800, 1000).value, 80)
  assert.equal(TranslationFormulas.edit(20, 100).value, 20, 'post-edit distance')
  assert.equal(TranslationFormulas.glossary(10, 50).value, 5, 'hits per term')
  assert.equal(TranslationFormulas.quality(95, 100).value, 95, 'accepted of reviewed')
  assert.equal(TranslationFormulas.bleu(45, 50).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('translation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'translation', program: ['coverage'], params: [800, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `translation.coverage at ${uuid}`)
  uuidReceiptOf('translation coverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bleu 90, fuzzy 75, throughput 500, expansion 120, coverage 80, edit 20, glossary 5, quality 95; crossing to linguistics')
})
