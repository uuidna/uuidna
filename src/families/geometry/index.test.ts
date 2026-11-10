import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeometryFormulas } from './index.js'
import '../../mcp/families.js'

test('geometry: area, perimeter, rectangle, circle, volume, pythagorean, angle, diagonal — crossing to code', async (t) => {
  assert.equal(GeometryFormulas.area(10, 4).value, 20, 'half base times height')
  assert.equal(GeometryFormulas.perimeter(6, 5).value, 30, 'a hexagon of side 5')
  assert.equal(GeometryFormulas.rectangle(8, 3).value, 24)
  assert.equal(GeometryFormulas.circle(10).value, 314, 'π r² proxy: ⌊314 · 100 / 100⌋')
  assert.equal(GeometryFormulas.volume(24, 5).value, 120)
  assert.equal(GeometryFormulas.pythagorean(3, 4).value, 25, 'hypotenuse squared')
  assert.equal(GeometryFormulas.angle(720, 6).value, 120, 'interior angle of a hexagon')
  assert.equal(GeometryFormulas.angle(720, 0).value, 0, 'guarded division')
  assert.equal(GeometryFormulas.diagonal(3, 4).value, 25)
  assert.equal(GeometryFormulas.area(10, 4).dst, 'code')
  assert.equal(hexFamiliesOf().get('geometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geometry', program: ['rectangle'], params: [8, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `geometry.rectangle at ${uuid}`)
  uuidReceiptOf('geometry rectangle', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; area 20, perimeter 30, rectangle 24, circle 314, volume 120, pythagorean 25, angle 120, diagonal 25; crossing to code')
})
