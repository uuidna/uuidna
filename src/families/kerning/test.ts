import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KerningFormulas } from './index.js'
import '../../mcp/families.js'

test('kerning: pairadjust, tracking, emratio, sidebearing, advancewidth, wordspacing, units, optical — crossing to typography', async (t) => {
  assert.equal(KerningFormulas.pairadjust(120, 40).value, 80, 'default spacing pulled in by the kern')
  assert.equal(KerningFormulas.tracking(10, 20).value, 200, 'tracking across ten glyphs')
  assert.equal(KerningFormulas.emratio(750, 1000).value, 750, 'three quarters of the em')
  assert.equal(KerningFormulas.sidebearing(80, 80).value, 160)
  assert.equal(KerningFormulas.advancewidth(500, 80, 80).value, 660, 'ink plus both bearings')
  assert.equal(KerningFormulas.wordspacing(5, 250).value, 1000, 'four gaps between five words')
  assert.equal(KerningFormulas.units(3, 1000).value, 3000, 'three ems at a thousand units')
  assert.equal(KerningFormulas.optical(72, 950).value, 68, 'seventy-two scaled to 95%')
  assert.equal(KerningFormulas.pairadjust(120, 40).dst, 'typography')
  assert.equal(hexFamiliesOf().get('kerning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'kerning', program: ['pairadjust'], params: [120, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `kerning.pairadjust at ${uuid}`)
  uuidReceiptOf('kerning pairadjust', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pairadjust 80, tracking 200, emratio 750, sidebearing 160, advancewidth 660, wordspacing 1000, units 3000, optical 68; crossing to typography')
})
