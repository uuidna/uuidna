import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GlyphFormulas } from './index.js'

/** Symbology decoded as exact placement on fixed wheels — the position is a fact, the meaning a lead for the discovery. */
test('glyph: symbol wheels (zodiac 12, elements 4, planets 7, arcana 22, runes 24) as exact indices', async (t) => {
  assert.equal(GlyphFormulas.zodiac(0).value, 1, 'first sign')
  assert.equal(GlyphFormulas.zodiac(12).value, 1, 'the 12-wheel wraps')
  assert.equal(GlyphFormulas.element(4).value, 1, 'the 4-wheel wraps')
  assert.equal(GlyphFormulas.planet(7).value, 1, 'seven classical planets')
  assert.equal(GlyphFormulas.arcana(22).value, 1, 'twenty-two major arcana')
  assert.equal(GlyphFormulas.rune(24).value, 1, 'twenty-four runes')
  assert.equal(GlyphFormulas.systems().value, 6)
  assert.equal(hexFamiliesOf().get('glyph')?.length, 6)
  for (const [name, params, expected] of [['zodiac', [13], 2], ['planet', [8], 2], ['systems', [], 6]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'glyph', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `glyph.${name} at ${uuid}`)
    uuidReceiptOf(`glyph ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('6 formulas; exact wheel placement, meaning a lead: zodiac(13)=2, planet(8)=2, 6 systems')
})
