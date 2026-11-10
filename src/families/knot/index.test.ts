import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KnotFormulas } from './index.js'
import '../../mcp/families.js'

test('knot: crossingnumber, genus, bridgenumber, writhe, unknottingnumber, components, determinant, stickcount — crossing to topology', async (t) => {
  assert.equal(KnotFormulas.crossingnumber(3, 2).value, 3, 'the trefoil T(2,3)')
  assert.equal(KnotFormulas.genus(3, 2).value, 1, 'trefoil Seifert genus')
  assert.equal(KnotFormulas.bridgenumber(2, 3).value, 2, 'two bridges')
  assert.equal(KnotFormulas.writhe(5, 2).value, 3)
  assert.equal(KnotFormulas.writhe(2, 5).value, 0)
  assert.equal(KnotFormulas.unknottingnumber(3, 4).value, 3)
  assert.equal(KnotFormulas.components(4).value, 2, 'an even torus link')
  assert.equal(KnotFormulas.components(3).value, 1)
  assert.equal(KnotFormulas.determinant(1).value, 3, 'trefoil determinant')
  assert.equal(KnotFormulas.stickcount(3).value, 6, 'trefoil stick number')
  assert.equal(KnotFormulas.crossingnumber(3, 2).dst, 'topology')
  assert.equal(hexFamiliesOf().get('knot')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'knot', program: ['crossingnumber'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `knot.crossingnumber at ${uuid}`)
  uuidReceiptOf('knot crossingnumber', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; crossingnumber 3, genus 1, bridgenumber 2, writhe 3, unknottingnumber 3, components 2, determinant 3, stickcount 6; crossing to topology')
})
