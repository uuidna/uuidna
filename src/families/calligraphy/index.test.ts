import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CalligraphyFormulas } from './index.js'
import '../../mcp/families.js'

test('calligraphy: strokecount, penangle, xheight, letterspacing, strokeorderings, flourishsubsets, glyphpairs, slantdegree — crossing to geometry', async (t) => {
  assert.equal(CalligraphyFormulas.strokecount(8, 4).value, 12)
  assert.equal(CalligraphyFormulas.penangle(900, 10).value, 90)
  assert.equal(CalligraphyFormulas.xheight(100, 2).value, 50)
  assert.equal(CalligraphyFormulas.letterspacing(12, 3).value, 36)
  assert.equal(CalligraphyFormulas.strokeorderings(5).value, 120)
  assert.equal(CalligraphyFormulas.flourishsubsets(4).value, 16)
  assert.equal(CalligraphyFormulas.glyphpairs(26, 2).value, 325)
  assert.equal(CalligraphyFormulas.slantdegree(120, 10).value, 12)
  assert.equal(CalligraphyFormulas.strokecount(8, 4).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('calligraphy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'calligraphy', program: ['strokecount'], params: [8, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `calligraphy.strokecount at ${uuid}`)
  uuidReceiptOf('calligraphy strokecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; strokecount 12, penangle 90, xheight 50, letterspacing 36, strokeorderings 120, flourishsubsets 16, glyphpairs 325, slantdegree 12; crossing to geometry')
})
