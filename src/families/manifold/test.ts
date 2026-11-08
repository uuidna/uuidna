import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ManifoldFormulas } from './index.js'
import '../../mcp/families.js'

test('manifold: dimension, genus, bettinumber, eulercharacteristic, chartcount, boundarycomponents, orientability, homologyrank — crossing to topology', async (t) => {
  assert.equal(ManifoldFormulas.dimension(5, 2).value, 3, 'a surface in 5-space, codimension 2')
  assert.equal(ManifoldFormulas.genus(0).value, 1, 'the torus')
  assert.equal(ManifoldFormulas.bettinumber(10, 4).value, 6)
  assert.equal(ManifoldFormulas.eulercharacteristic(8, 12, 6).value, 2, 'the cube: χ of the sphere')
  assert.equal(ManifoldFormulas.chartcount(100, 30).value, 4, 'four charts for the atlas')
  assert.equal(ManifoldFormulas.boundarycomponents(10, 7).value, 3)
  assert.equal(ManifoldFormulas.orientability(2, 0).value, 1, 'no cross-caps')
  assert.equal(ManifoldFormulas.orientability(2, 1).value, 0)
  assert.equal(ManifoldFormulas.homologyrank(1, 2, 1).value, 4, 'the torus: b0 + b1 + b2')
  assert.equal(ManifoldFormulas.dimension(5, 2).dst, 'topology')
  assert.equal(hexFamiliesOf().get('manifold')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'manifold', program: ['chartcount'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `manifold.chartcount at ${uuid}`)
  uuidReceiptOf('manifold chartcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dimension 3, genus 1, bettinumber 6, eulercharacteristic 2, chartcount 4, boundarycomponents 3, orientability 1, homologyrank 4; crossing to topology')
})
