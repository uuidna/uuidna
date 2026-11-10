import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeographyFormulas } from './index.js'
import '../../mcp/families.js'

test('geography: density, gradient, distance, area, elevation, watershed, urbanization, connectivity — crossing to ecology', async (t) => {
  assert.equal(GeographyFormulas.density(10000, 50).value, 200, 'people per unit of land')
  assert.equal(GeographyFormulas.gradient(15, 100).value, 15, 'a 15% slope')
  assert.equal(GeographyFormulas.distance(3, 111).value, 333)
  assert.equal(GeographyFormulas.area(40, 25).value, 1000)
  assert.equal(GeographyFormulas.elevation(8848, 5300).value, 3548)
  assert.equal(GeographyFormulas.elevation(100, 200).value, 0, 'never negative')
  assert.equal(GeographyFormulas.watershed(9000, 30).value, 300)
  assert.equal(GeographyFormulas.urbanization(45, 100).value, 45)
  assert.equal(GeographyFormulas.connectivity(120, 40).value, 300, 'links per node')
  assert.equal(GeographyFormulas.density(10000, 50).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('geography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geography', program: ['area'], params: [40, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `geography.area at ${uuid}`)
  uuidReceiptOf('geography area', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; density 200, gradient 15, distance 333, area 1000, elevation 3548, watershed 300, urbanization 45, connectivity 300; crossing to ecology')
})
