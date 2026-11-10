import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AstrometryFormulas } from './index.js'
import '../../mcp/families.js'

test('astrometry: parallax, distance, propermotion, magnitude, airmass, resolution, fieldofview, pixelscale — crossing to astronomy', async (t) => {
  assert.equal(AstrometryFormulas.parallax(1000, 50).value, 20, 'baseline over distance')
  assert.equal(AstrometryFormulas.distance(10).value, 100, 'parsecs from the 1000/p law')
  assert.equal(AstrometryFormulas.propermotion(360, 4).value, 90, 'arc per year')
  assert.equal(AstrometryFormulas.magnitude(100, 250).value, 150)
  assert.equal(AstrometryFormulas.magnitude(300, 100).value, 0)
  assert.equal(AstrometryFormulas.airmass(100, 30).value, 4, 'slant path airmass')
  assert.equal(AstrometryFormulas.resolution(50, 10).value, 500)
  assert.equal(AstrometryFormulas.fieldofview(36, 50).value, 720)
  assert.equal(AstrometryFormulas.pixelscale(3600, 1800).value, 2, 'sky per pixel')
  assert.equal(AstrometryFormulas.parallax(1000, 50).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('astrometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'astrometry', program: ['airmass'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `astrometry.airmass at ${uuid}`)
  uuidReceiptOf('astrometry airmass', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; parallax 20, distance 100, propermotion 90, magnitude 150, airmass 4, resolution 500, fieldofview 720, pixelscale 2; crossing to astronomy')
})
