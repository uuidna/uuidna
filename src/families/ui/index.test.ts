import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UiFormulas } from './index.js'
import '../../mcp/families.js'

test('ui: clickdepth, layoutcombos, elementcount, responsiveness, navpaths, gridcells, colorsubsets, accessibilityscore — crossing to statistics', async (t) => {
  assert.equal(UiFormulas.clickdepth(3, 2).value, 5)
  assert.equal(UiFormulas.layoutcombos(8, 3).value, 56)
  assert.equal(UiFormulas.elementcount(20, 4).value, 80)
  assert.equal(UiFormulas.responsiveness(90, 100).value, 90)
  assert.equal(UiFormulas.navpaths(6, 2).value, 30)
  assert.equal(UiFormulas.gridcells(12, 8).value, 96)
  assert.equal(UiFormulas.colorsubsets(4).value, 16)
  assert.equal(UiFormulas.accessibilityscore(85, 100).value, 85)
  assert.equal(UiFormulas.clickdepth(3, 2).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('ui')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ui', program: ['clickdepth'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `ui.clickdepth at ${uuid}`)
  uuidReceiptOf('ui clickdepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; clickdepth 5, layoutcombos 56, elementcount 80, responsiveness 90, navpaths 30, gridcells 96, colorsubsets 16, accessibilityscore 85; crossing to statistics')
})
