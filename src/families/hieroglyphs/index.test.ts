import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HieroglyphsFormulas } from './index.js'
import '../../mcp/families.js'

test('hieroglyphs: signs, determinatives, cartouchepairs, phonemsigns, categorysubsets, readingorderings, biliterals, decipheredratio — crossing to linguistics', async (t) => {
  assert.equal(HieroglyphsFormulas.signs(700, 1).value, 700)
  assert.equal(HieroglyphsFormulas.determinatives(100, 0).value, 100)
  assert.equal(HieroglyphsFormulas.cartouchepairs(10, 2).value, 45)
  assert.equal(HieroglyphsFormulas.phonemsigns(24, 0).value, 24)
  assert.equal(HieroglyphsFormulas.categorysubsets(6).value, 64)
  assert.equal(HieroglyphsFormulas.readingorderings(5).value, 120)
  assert.equal(HieroglyphsFormulas.biliterals(80, 20).value, 100)
  assert.equal(HieroglyphsFormulas.decipheredratio(90, 100).value, 90)
  assert.equal(HieroglyphsFormulas.signs(700, 1).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('hieroglyphs')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hieroglyphs', program: ['signs'], params: [700, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 700, `hieroglyphs.signs at ${uuid}`)
  uuidReceiptOf('hieroglyphs signs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; signs 700, determinatives 100, cartouchepairs 45, phonemsigns 24, categorysubsets 64, readingorderings 120, biliterals 100, decipheredratio 90; crossing to linguistics')
})
