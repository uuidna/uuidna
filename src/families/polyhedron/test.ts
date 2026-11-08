import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PolyhedronFormulas } from './index.js'
import '../../mcp/families.js'

test('polyhedron: eulercharacteristic, edges, vertices, faces, facesatvertex, surfacearea, volume, dihedralcount — crossing to geometry', async (t) => {
  assert.equal(PolyhedronFormulas.eulercharacteristic(8, 12, 6).value, 2, 'a cube: V − E + F = 2')
  assert.equal(PolyhedronFormulas.edges(6, 4).value, 12, 'a cube: six square faces')
  assert.equal(PolyhedronFormulas.vertices(12, 6).value, 8)
  assert.equal(PolyhedronFormulas.faces(8, 12).value, 6)
  assert.equal(PolyhedronFormulas.facesatvertex(12, 8).value, 3, 'three faces meet at a cube vertex')
  assert.equal(PolyhedronFormulas.surfacearea(6, 4).value, 24)
  assert.equal(PolyhedronFormulas.volume(2, 3, 4).value, 24, 'a box')
  assert.equal(PolyhedronFormulas.dihedralcount(12).value, 12)
  assert.equal(PolyhedronFormulas.eulercharacteristic(8, 12, 6).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('polyhedron')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'polyhedron', program: ['volume'], params: [2, 3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `polyhedron.volume at ${uuid}`)
  uuidReceiptOf('polyhedron volume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; eulercharacteristic 2, edges 12, vertices 8, faces 6, facesatvertex 3, surfacearea 24, volume 24, dihedralcount 12; crossing to geometry')
})
