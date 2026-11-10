import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GlyphsFormulas } from './index.js'
import '../../mcp/families.js'

test('glyphs: count, strokeorderings, radicalcombos, unicodeplanes, componentsubsets, strokesperglyph, variantcount, rendercoverage — crossing to linguistics', async (t) => {
  assert.equal(GlyphsFormulas.count(1000, 1).value, 1000)
  assert.equal(GlyphsFormulas.strokeorderings(5).value, 120)
  assert.equal(GlyphsFormulas.radicalcombos(10, 2).value, 45)
  assert.equal(GlyphsFormulas.unicodeplanes(17, 0).value, 17)
  assert.equal(GlyphsFormulas.componentsubsets(6).value, 64)
  assert.equal(GlyphsFormulas.strokesperglyph(12, 8).value, 20)
  assert.equal(GlyphsFormulas.variantcount(12, 3).value, 36)
  assert.equal(GlyphsFormulas.rendercoverage(95, 100).value, 95)
  assert.equal(GlyphsFormulas.count(1000, 1).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('glyphs')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'glyphs', program: ['count'], params: [1000, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `glyphs.count at ${uuid}`)
  uuidReceiptOf('glyphs count', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; count 1000, strokeorderings 120, radicalcombos 45, unicodeplanes 17, componentsubsets 64, strokesperglyph 20, variantcount 36, rendercoverage 95; crossing to linguistics')
})
