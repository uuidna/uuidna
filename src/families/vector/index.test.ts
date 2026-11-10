import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VectorFormulas } from './index.js'

/** vector: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('vector: dot, magnitude, dims, scale, components, crossprod, norm, combos', async (t) => {
  assert.equal(VectorFormulas.dot(3, 4).value, 12, 'dot(3, 4)')
  assert.equal(VectorFormulas.magnitude(500, 10).value, 50, 'magnitude(500, 10)')
  assert.equal(VectorFormulas.dims(3, 0).value, 3, 'dims(3, 0)')
  assert.equal(VectorFormulas.scale(5, 3).value, 15, 'scale(5, 3)')
  assert.equal(VectorFormulas.components(3, 1).value, 3, 'components(3, 1)')
  assert.equal(VectorFormulas.crossprod(3, 4, 1).value, 12, 'crossprod(3, 4, 1)')
  assert.equal(VectorFormulas.norm(100, 20).value, 80, 'norm(100, 20)')
  assert.equal(VectorFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(VectorFormulas.chebyshev(3, -7).value, 7, 'chebyshev(3, -7)')
  assert.equal(VectorFormulas.squaredmagnitude(3, 4).value, 25, 'squaredmagnitude(3, 4)')
  assert.equal(VectorFormulas.parallelogram(3, 4).value, 50, 'parallelogram(3, 4)')
  assert.equal(VectorFormulas.unit(1, 0).value, 1, 'unit(1, 0)')
  assert.equal(VectorFormulas.unit(2, 2).value, 0, 'unit(2, 2)')
  assert.equal(VectorFormulas.span(3, 5).value, 3, 'span(3, 5)')
  assert.equal(VectorFormulas.anglecosnum(1, 2, 3, 4).value, 11, 'anglecosnum(1, 2, 3, 4)')
  assert.equal(VectorFormulas.distance1(1, 2, 4, 6).value, 7, 'distance1(1, 2, 4, 6)')
  assert.equal(hexFamiliesOf().get('vector')?.length, 15)
  for (const [name, params, expected] of [["dot",[3,4],12],["magnitude",[500,10],50],["dims",[3,0],3]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'vector', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `vector.${name} at ${uuid}`)
    uuidReceiptOf(`vector ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "dot=12, magnitude=50, dims=3")
})
