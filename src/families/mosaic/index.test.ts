import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MosaicFormulas } from './index.js'
import '../../mcp/families.js'

test('mosaic: tilecount, tessellationangle, groutratio, colorcombos, symmetryorderings, gridcells, tilesubsets, coverage — crossing to geometry', async (t) => {
  assert.equal(MosaicFormulas.tilecount(40, 30).value, 1200)
  assert.equal(MosaicFormulas.tessellationangle(360, 6).value, 60)
  assert.equal(MosaicFormulas.groutratio(10, 100).value, 10)
  assert.equal(MosaicFormulas.colorcombos(12, 3).value, 220)
  assert.equal(MosaicFormulas.symmetryorderings(4).value, 24)
  assert.equal(MosaicFormulas.gridcells(50, 50).value, 2500)
  assert.equal(MosaicFormulas.tilesubsets(5).value, 32)
  assert.equal(MosaicFormulas.coverage(95, 100).value, 95)
  assert.equal(MosaicFormulas.tilecount(40, 30).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('mosaic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mosaic', program: ['tilecount'], params: [40, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `mosaic.tilecount at ${uuid}`)
  uuidReceiptOf('mosaic tilecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tilecount 1200, tessellationangle 60, groutratio 10, colorcombos 220, symmetryorderings 24, gridcells 2500, tilesubsets 32, coverage 95; crossing to geometry')
})
