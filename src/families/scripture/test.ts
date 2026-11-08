import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScriptureFormulas } from './index.js'
import '../../mcp/families.js'

test('scripture: wordtotal, versesperchapter, chaptersperbook, lexicaltypes, concordancepairs, translationways, crossreferences, readingplan — crossing to linguistics', async (t) => {
  assert.equal(ScriptureFormulas.wordtotal(1000, 12).value, 12000)
  assert.equal(ScriptureFormulas.versesperchapter(31000, 1189).value, 26)
  assert.equal(ScriptureFormulas.chaptersperbook(1189, 66).value, 18)
  assert.equal(ScriptureFormulas.lexicaltypes(12000, 3).value, 4000)
  assert.equal(ScriptureFormulas.concordancepairs(20, 2).value, 190)
  assert.equal(ScriptureFormulas.translationways(5).value, 120)
  assert.equal(ScriptureFormulas.crossreferences(340, 10).value, 3400)
  assert.equal(ScriptureFormulas.readingplan(1189, 365).value, 3)
  assert.equal(ScriptureFormulas.wordtotal(1000, 12).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('scripture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'scripture', program: ['wordtotal'], params: [1000, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12000, `scripture.wordtotal at ${uuid}`)
  uuidReceiptOf('scripture wordtotal', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wordtotal 12000, versesperchapter 26, chaptersperbook 18, lexicaltypes 4000, concordancepairs 190, translationways 120, crossreferences 3400, readingplan 3; crossing to linguistics')
})
