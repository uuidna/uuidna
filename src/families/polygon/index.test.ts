import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PolygonFormulas } from './index.js'
import '../../mcp/families.js'

test('polygon: interioranglesum, diagonals, exteriorangle, interiorangle, triangles, perimeter, sides, area — crossing to geometry', async (t) => {
  assert.equal(PolygonFormulas.interioranglesum(5).value, 540, 'a pentagon')
  assert.equal(PolygonFormulas.diagonals(6).value, 9, 'a hexagon')
  assert.equal(PolygonFormulas.exteriorangle(8).value, 45)
  assert.equal(PolygonFormulas.interiorangle(6).value, 120)
  assert.equal(PolygonFormulas.triangles(5).value, 3, 'a pentagon triangulates into three')
  assert.equal(PolygonFormulas.perimeter(4, 5).value, 20, 'a square of side five')
  assert.equal(PolygonFormulas.sides(7).value, 7)
  assert.equal(PolygonFormulas.area(10, 4).value, 20)
  assert.equal(PolygonFormulas.interioranglesum(5).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('polygon')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'polygon', program: ['diagonals'], params: [6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `polygon.diagonals at ${uuid}`)
  uuidReceiptOf('polygon diagonals', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; interioranglesum 540, diagonals 9, exteriorangle 45, interiorangle 120, triangles 3, perimeter 20, sides 7, area 20; crossing to geometry')
})
