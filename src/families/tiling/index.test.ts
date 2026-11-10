import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TilingFormulas } from './index.js'
import '../../mcp/families.js'

test('tiling: tilecount, coverage, gapratio, vertexconfig, symmetryorder, rowtiles, waste, aspectfit — crossing to geometry', async (t) => {
  assert.equal(TilingFormulas.tilecount(100, 50, 10).value, 50, 'ten by five tiles cover the surface')
  assert.equal(TilingFormulas.coverage(90, 100).value, 90)
  assert.equal(TilingFormulas.gapratio(5, 200).value, 2)
  assert.equal(TilingFormulas.vertexconfig(6).value, 120, 'hexagon interior angle')
  assert.equal(TilingFormulas.vertexconfig(4).value, 90)
  assert.equal(TilingFormulas.symmetryorder(6).value, 12, 'dihedral order of a six-fold pattern')
  assert.equal(TilingFormulas.rowtiles(1000, 25).value, 40)
  assert.equal(TilingFormulas.waste(1000, 850).value, 150)
  assert.equal(TilingFormulas.aspectfit(1600, 400).value, 4, 'the height divides the width four times')
  assert.equal(TilingFormulas.tilecount(100, 50, 10).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('tiling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tiling', program: ['tilecount'], params: [100, 50, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `tiling.tilecount at ${uuid}`)
  uuidReceiptOf('tiling tilecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tilecount 50, coverage 90, gapratio 2, vertexconfig 120, symmetryorder 12, rowtiles 40, waste 150, aspectfit 4; crossing to geometry')
})
