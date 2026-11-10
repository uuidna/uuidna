import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QuiltingFormulas } from './index.js'
import '../../mcp/families.js'

test('quilting: blockcount, patchpairs, seamlength, patternorderings, colorsubsets, gridcells, borderwidth, symmetryratio — crossing to geometry', async (t) => {
  assert.equal(QuiltingFormulas.blockcount(12, 12).value, 144)
  assert.equal(QuiltingFormulas.patchpairs(16, 2).value, 120)
  assert.equal(QuiltingFormulas.seamlength(100, 4).value, 400)
  assert.equal(QuiltingFormulas.patternorderings(5).value, 120)
  assert.equal(QuiltingFormulas.colorsubsets(6).value, 64)
  assert.equal(QuiltingFormulas.gridcells(20, 20).value, 400)
  assert.equal(QuiltingFormulas.borderwidth(4, 2).value, 6)
  assert.equal(QuiltingFormulas.symmetryratio(90, 100).value, 90)
  assert.equal(QuiltingFormulas.blockcount(12, 12).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('quilting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'quilting', program: ['blockcount'], params: [12, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 144, `quilting.blockcount at ${uuid}`)
  uuidReceiptOf('quilting blockcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; blockcount 144, patchpairs 120, seamlength 400, patternorderings 120, colorsubsets 64, gridcells 400, borderwidth 6, symmetryratio 90; crossing to geometry')
})
