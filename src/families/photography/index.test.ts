import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotographyFormulas } from './index.js'
import '../../mcp/families.js'

test('photography: exposure, fstop, depthoffield, iso, megapixels, crop, dynamicrange, composition — crossing to optics', async (t) => {
  assert.equal(PhotographyFormulas.exposure(8, 125).value, 1000, 'aperture by shutter, an EV proxy')
  assert.equal(PhotographyFormulas.fstop(50, 25).value, 20, 'f/2.0 times ten')
  assert.equal(PhotographyFormulas.depthoffield(4, 100).value, 25)
  assert.equal(PhotographyFormulas.iso(400).value, 400, 'sensitivity holds')
  assert.equal(PhotographyFormulas.megapixels(4000, 3000).value, 12)
  assert.equal(PhotographyFormulas.crop(24, 36).value, 150, 'crop factor 1.5 times a hundred')
  assert.equal(PhotographyFormulas.dynamicrange(3).value, 8, 'three stops double to eight')
  assert.equal(PhotographyFormulas.composition(2, 3).value, 66)
  assert.equal(PhotographyFormulas.exposure(8, 125).dst, 'optics')
  assert.equal(hexFamiliesOf().get('photography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photography', program: ['megapixels'], params: [4000, 3000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `photography.megapixels at ${uuid}`)
  uuidReceiptOf('photography megapixels', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; exposure 1000, fstop 20, depthoffield 25, iso 400, megapixels 12, crop 150, dynamicrange 8, composition 66; crossing to optics')
})
