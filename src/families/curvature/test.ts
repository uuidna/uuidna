import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CurvatureFormulas } from './index.js'
import '../../mcp/families.js'

test('curvature: gaussian, mean, radiusofcurvature, totalcurvature, sectional, geodesicdeviation, anglesum, defect — crossing to topology', async (t) => {
  assert.equal(CurvatureFormulas.gaussian(3, 5).value, 15, 'product of principal curvatures')
  assert.equal(CurvatureFormulas.mean(4, 6).value, 5)
  assert.equal(CurvatureFormulas.radiusofcurvature(100, 5).value, 20, 'arc over turning angle')
  assert.equal(CurvatureFormulas.totalcurvature(2, 50).value, 100)
  assert.equal(CurvatureFormulas.sectional(60, 12).value, 5, 'averaged over the planes')
  assert.equal(CurvatureFormulas.geodesicdeviation(2, 3, 4).value, 24)
  assert.equal(CurvatureFormulas.anglesum(60, 60, 60).value, 180, 'a flat triangle')
  assert.equal(CurvatureFormulas.defect(300).value, 60, 'angular defect at a vertex')
  assert.equal(CurvatureFormulas.defect(400).value, 0)
  assert.equal(CurvatureFormulas.gaussian(3, 5).dst, 'topology')
  assert.equal(hexFamiliesOf().get('curvature')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'curvature', program: ['gaussian'], params: [3, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `curvature.gaussian at ${uuid}`)
  uuidReceiptOf('curvature gaussian', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gaussian 15, mean 5, radiusofcurvature 20, totalcurvature 100, sectional 5, geodesicdeviation 24, anglesum 180, defect 60; crossing to topology')
})
