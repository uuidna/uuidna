import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TriangulationFormulas } from './index.js'
import '../../mcp/families.js'

test('triangulation: angleclosure, areacoords, baseline, bearingsum, intersection, networkredundancy, pointdensity, resection — crossing to surveying', async (t) => {
  assert.equal(TriangulationFormulas.angleclosure(60, 70).value, 50, 'the triangle\'s third angle')
  assert.equal(TriangulationFormulas.angleclosure(100, 100).value, 0)
  assert.equal(TriangulationFormulas.areacoords(20, 10).value, 100)
  assert.equal(TriangulationFormulas.baseline(3, 4).value, 25, 'a 3-4-5 base, squared')
  assert.equal(TriangulationFormulas.bearingsum(200, 200).value, 40, 'wrapped past the circle')
  assert.equal(TriangulationFormulas.intersection(10, 30).value, 20)
  assert.equal(TriangulationFormulas.networkredundancy(12, 8).value, 4, 'degrees of freedom')
  assert.equal(TriangulationFormulas.pointdensity(1000, 4).value, 250)
  assert.equal(TriangulationFormulas.resection(100, 120, 140).value, 360, 'three observed angles')
  assert.equal(TriangulationFormulas.baseline(3, 4).dst, 'surveying')
  assert.equal(hexFamiliesOf().get('triangulation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'triangulation', program: ['baseline'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `triangulation.baseline at ${uuid}`)
  uuidReceiptOf('triangulation baseline', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; angleclosure 50, areacoords 100, baseline 25, bearingsum 40, intersection 20, networkredundancy 4, pointdensity 250, resection 360; crossing to surveying')
})
