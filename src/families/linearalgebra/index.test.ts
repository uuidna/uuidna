import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LinearalgebraFormulas } from './index.js'
import '../../mcp/families.js'

test('linearalgebra: dot2, determinant2x2, trace2, matrixelements, rank, norm1, cross, scalarmul — crossing to algebra', async (t) => {
  assert.equal(LinearalgebraFormulas.dot2(3, 4, 5).value, 32, '(3,4)·(4,5)')
  assert.equal(LinearalgebraFormulas.determinant2x2(5, 2, 3).value, 11, 'det [[5,2],[2,3]]')
  assert.equal(LinearalgebraFormulas.trace2(7, 9).value, 16)
  assert.equal(LinearalgebraFormulas.matrixelements(3, 4).value, 12, 'a 3×4 matrix')
  assert.equal(LinearalgebraFormulas.rank(5, 3).value, 2, 'full-rank diagonal')
  assert.equal(LinearalgebraFormulas.rank(0, 0).value, 0)
  assert.equal(LinearalgebraFormulas.norm1(6, 8).value, 14)
  assert.equal(LinearalgebraFormulas.cross(5, 2, 4).value, 12)
  assert.equal(LinearalgebraFormulas.scalarmul(3, 4, 5).value, 27, '3·(4,5)')
  assert.equal(LinearalgebraFormulas.ranknullity(2, 3).value, 5, 'rank–nullity: 2 + 3')
  assert.equal(LinearalgebraFormulas.nullity(4, 1).value, 3, 'cols 4 − rank 1')
  assert.equal(LinearalgebraFormulas.orthogonal(3, 4).value, 1, '(3,4) ⊥ (−4,3)')
  assert.equal(LinearalgebraFormulas.projection(3, 4, 5).value, 15, '(3,4) onto (5,0)')
  assert.equal(LinearalgebraFormulas.outerproduct(2, 3).value, 6, '2×3 outer product')
  assert.equal(LinearalgebraFormulas.span(3, 5).value, 3, 'min(3, 5)')
  assert.equal(LinearalgebraFormulas.characteristicdegree(5).value, 5, 'deg det(A − λI), 5×5')
  assert.equal(LinearalgebraFormulas.dot2(3, 4, 5).dst, 'algebra')
  assert.equal(hexFamiliesOf().get('linearalgebra')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'linearalgebra', program: ['matrixelements'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `linearalgebra.matrixelements at ${uuid}`)
  uuidReceiptOf('linearalgebra matrixelements', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dot2 32, determinant2x2 11, trace2 16, matrixelements 12, rank 2, norm1 14, cross 12, scalarmul 27; crossing to algebra')
})
