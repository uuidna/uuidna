import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WireframeFormulas } from './index.js'
import '../../mcp/families.js'

test('wireframe: grid, gutter, density, hierarchy, whitespace, alignment, fold, fidelity — crossing to layout', async (t) => {
  assert.equal(WireframeFormulas.grid(960, 12).value, 80, 'twelve-column grid')
  assert.equal(WireframeFormulas.gutter(240, 12).value, 20)
  assert.equal(WireframeFormulas.density(50, 1000).value, 5)
  assert.equal(WireframeFormulas.hierarchy(4).value, 4, 'four nesting levels')
  assert.equal(WireframeFormulas.whitespace(40, 100).value, 40)
  assert.equal(WireframeFormulas.alignment(9, 10).value, 90, 'nine of ten aligned')
  assert.equal(WireframeFormulas.fold(3, 10).value, 30)
  assert.equal(WireframeFormulas.fidelity(2, 10).value, 20)
  assert.equal(WireframeFormulas.grid(960, 12).dst, 'layout')
  assert.equal(hexFamiliesOf().get('wireframe')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'wireframe', program: ['grid'], params: [960, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `wireframe.grid at ${uuid}`)
  uuidReceiptOf('wireframe grid', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; grid 80, gutter 20, density 5, hierarchy 4, whitespace 40, alignment 90, fold 30, fidelity 20; crossing to layout')
})
