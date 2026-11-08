import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OptometryFormulas } from './index.js'
import '../../mcp/families.js'

test('optometry: acuity, diopter, astigmatism, accommodation, pupil, contrast, refraction, field — crossing to med', async (t) => {
  assert.equal(OptometryFormulas.acuity(20, 40).value, 10, '20/40 proxy')
  assert.equal(OptometryFormulas.acuity(20, 0).value, 0, 'guard letterdistance > 0')
  assert.equal(OptometryFormulas.diopter(50).value, 20000)
  assert.equal(OptometryFormulas.diopter(0).value, 0, 'guard focalmm > 0')
  assert.equal(OptometryFormulas.astigmatism(90, 45).value, 200)
  assert.equal(OptometryFormulas.astigmatism(90, 0).value, 0, 'guard axis > 0')
  assert.equal(OptometryFormulas.accommodation(250, 25).value, 225)
  assert.equal(OptometryFormulas.accommodation(25, 250).value, 0, 'never negative')
  assert.equal(OptometryFormulas.pupil(5).value, 5)
  assert.equal(OptometryFormulas.contrast(80, 100).value, 80)
  assert.equal(OptometryFormulas.contrast(1, 0).value, 0, 'guard total > 0')
  assert.equal(OptometryFormulas.refraction(1500, 1000).value, 1500)
  assert.equal(OptometryFormulas.refraction(1500, 0).value, 0, 'guard index > 0')
  assert.equal(OptometryFormulas.field(120).value, 120)
  assert.equal(OptometryFormulas.acuity(20, 40).dst, 'med')
  assert.equal(hexFamiliesOf().get('optometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'optometry', program: ['acuity'], params: [20, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `optometry.acuity at ${uuid}`)
  uuidReceiptOf('optometry acuity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; acuity 10, diopter 20000, astigmatism 200, accommodation 225, pupil 5, contrast 80, refraction 1500, field 120; crossing to med')
})
