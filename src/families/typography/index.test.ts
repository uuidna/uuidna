import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TypographyFormulas } from './index.js'
import '../../mcp/families.js'

test('typography: measure, scale, tracking, leading, words, widows, weight, rhythm — crossing to css', async (t) => {
  assert.equal(TypographyFormulas.measure(66, 66).value, 1, 'within the ideal measure')
  assert.equal(TypographyFormulas.measure(80, 66).value, 0)
  assert.equal(TypographyFormulas.scale(16, 2).value, 25, 'two steps up the 1.25 scale')
  assert.equal(TypographyFormulas.tracking(32, 25).value, 8)
  assert.equal(TypographyFormulas.leading(16, 150).value, 24, 'line-height 1.5')
  assert.equal(TypographyFormulas.words(660, 6).value, 110)
  assert.equal(TypographyFormulas.widows(2, 10).value, 1, 'not a widow')
  assert.equal(TypographyFormulas.widows(1, 10).value, 0)
  assert.equal(TypographyFormulas.weight(4).value, 400)
  assert.equal(TypographyFormulas.rhythm(10, 24).value, 240)
  assert.equal(TypographyFormulas.measure(66, 66).dst, 'css')
  assert.equal(hexFamiliesOf().get('typography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'typography', program: ['scale'], params: [16, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `typography.scale at ${uuid}`)
  uuidReceiptOf('typography scale', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; measure 1, scale 25, tracking 8, leading 24, words 110, widows 1, weight 400, rhythm 240; crossing to css')
})
