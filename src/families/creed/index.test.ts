import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CreedFormulas } from './index.js'
import '../../mcp/families.js'

test('creed: articlecount, clausecombos, affirmationorderings, doctrinesubsets, councilcount, anathemacount, consensusratio, variantcreeds — crossing to sociology', async (t) => {
  assert.equal(CreedFormulas.articlecount(10, 2).value, 12)
  assert.equal(CreedFormulas.clausecombos(12, 3).value, 220)
  assert.equal(CreedFormulas.affirmationorderings(5).value, 120)
  assert.equal(CreedFormulas.doctrinesubsets(6).value, 64)
  assert.equal(CreedFormulas.councilcount(4, 3).value, 7)
  assert.equal(CreedFormulas.anathemacount(5, 2).value, 10)
  assert.equal(CreedFormulas.consensusratio(85, 100).value, 85)
  assert.equal(CreedFormulas.variantcreeds(3, 4).value, 7)
  assert.equal(CreedFormulas.articlecount(10, 2).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('creed')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'creed', program: ['articlecount'], params: [10, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `creed.articlecount at ${uuid}`)
  uuidReceiptOf('creed articlecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; articlecount 12, clausecombos 220, affirmationorderings 120, doctrinesubsets 64, councilcount 7, anathemacount 10, consensusratio 85, variantcreeds 7; crossing to sociology')
})
