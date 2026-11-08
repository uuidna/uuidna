import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CartographyFormulas } from './index.js'
import '../../mcp/families.js'

test('cartography: area, bearing, contour, distance, distortion, resolution, scale, zoom — crossing to geography', async (t) => {
  assert.equal(CartographyFormulas.area(40, 25).value, 1000, 'a region length by width')
  assert.equal(CartographyFormulas.bearing(450).value, 90, 'normalised past a full turn')
  assert.equal(CartographyFormulas.bearing(-90).value, 270, 'a negative bearing wraps')
  assert.equal(CartographyFormulas.contour(1050, 100).value, 10)
  assert.equal(CartographyFormulas.distance(50, 1000).value, 50000, 'ground distance from pixels')
  assert.equal(CartographyFormulas.distortion(120, 100).value, 120)
  assert.equal(CartographyFormulas.resolution(10000, 100).value, 100)
  assert.equal(CartographyFormulas.scale(50000, 25).value, 2000)
  assert.equal(CartographyFormulas.zoom(1, 2).value, 16, 'four tiles per level, twice')
  assert.equal(CartographyFormulas.area(40, 25).dst, 'geography')
  assert.equal(hexFamiliesOf().get('cartography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cartography', program: ['area'], params: [40, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `cartography.area at ${uuid}`)
  uuidReceiptOf('cartography area', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; area 1000, bearing 90, contour 10, distance 50000, distortion 120, resolution 100, scale 2000, zoom 16; crossing to geography')
})
