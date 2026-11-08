import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GisFormulas } from './index.js'
import '../../mcp/families.js'

test('gis: area, density, buffer, overlay, resolution, slope, proximity, accuracy — crossing to geography', async (t) => {
  assert.equal(GisFormulas.area(30, 20).value, 600, 'a tile of width by height')
  assert.equal(GisFormulas.density(1000, 50).value, 20, 'features per unit area')
  assert.equal(GisFormulas.buffer(10).value, 314, 'πr² proxy of a ten-unit radius')
  assert.equal(GisFormulas.overlay(30, 120).value, 25)
  assert.equal(GisFormulas.resolution(1000, 40).value, 25)
  assert.equal(GisFormulas.slope(15, 100).value, 15, 'a fifteen-percent grade')
  assert.equal(GisFormulas.proximity(30, 100).value, 70)
  assert.equal(GisFormulas.proximity(120, 100).value, 0, 'beyond the threshold')
  assert.equal(GisFormulas.accuracy(95, 100).value, 95)
  assert.equal(GisFormulas.area(30, 20).dst, 'geography')
  assert.equal(hexFamiliesOf().get('gis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gis', program: ['density'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `gis.density at ${uuid}`)
  uuidReceiptOf('gis density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; area 600, density 20, buffer 314, overlay 25, resolution 25, slope 15, proximity 70, accuracy 95; crossing to geography')
})
