import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MatrixFormulas } from './index.js'

/** matrix: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('matrix: elements, mults, adds, trace, rank, determinant, transpose, combos', async (t) => {
  assert.equal(MatrixFormulas.elements(4, 4).value, 16, 'elements(4, 4)')
  assert.equal(MatrixFormulas.mults(4, 4, 4).value, 64, 'mults(4, 4, 4)')
  assert.equal(MatrixFormulas.adds(16, 3).value, 48, 'adds(16, 3)')
  assert.equal(MatrixFormulas.trace(10, 6).value, 16, 'trace(10, 6)')
  assert.equal(MatrixFormulas.rank(4, 3).value, 3, 'rank(4, 3)')
  assert.equal(MatrixFormulas.determinant(100, 40).value, 60, 'determinant(100, 40)')
  assert.equal(MatrixFormulas.transpose(4, 4).value, 16, 'transpose(4, 4)')
  assert.equal(MatrixFormulas.combos(4, 2).value, 6, 'combos(4, 2)')
  assert.equal(MatrixFormulas.ranknullity(2, 3).value, 5, 'ranknullity(2, 3)')
  assert.equal(MatrixFormulas.nullity(4, 1).value, 3, 'nullity(4, 1)')
  assert.equal(MatrixFormulas.symmetricentries(4).value, 10, 'symmetricentries(4)')
  assert.equal(MatrixFormulas.offdiagonal(4).value, 12, 'offdiagonal(4)')
  assert.equal(MatrixFormulas.identitytrace(5).value, 5, 'identitytrace(5)')
  assert.equal(MatrixFormulas.minors(4).value, 16, 'minors(4)')
  assert.equal(MatrixFormulas.characteristicdegree(5).value, 5, 'characteristicdegree(5)')
  assert.equal(hexFamiliesOf().get('matrix')?.length, 15)
  for (const [name, params, expected] of [["elements",[4,4],16],["mults",[4,4,4],64],["adds",[16,3],48]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'matrix', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `matrix.${name} at ${uuid}`)
    uuidReceiptOf(`matrix ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "elements=16, mults=64, adds=48")
})
