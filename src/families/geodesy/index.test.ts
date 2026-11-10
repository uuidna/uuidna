import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeodesyFormulas } from './index.js'
import '../../mcp/families.js'

test('geodesy: flattening, arc, geoid, datum, convergence, elevation, baseline, precision — crossing to geography', async (t) => {
  assert.equal(GeodesyFormulas.flattening(298, 297).value, 33, 'ten-thousandths of flattening')
  assert.equal(GeodesyFormulas.arc(90, 6371).value, 10002)
  assert.equal(GeodesyFormulas.geoid(100, 30).value, 70)
  assert.equal(GeodesyFormulas.geoid(30, 100).value, -70, 'geoid may be negative')
  assert.equal(GeodesyFormulas.datum(2, 1000).value, 2000, 'parts per million')
  assert.equal(GeodesyFormulas.convergence(30, 45).value, 15)
  assert.equal(GeodesyFormulas.elevation(100, 30).value, 70)
  assert.equal(GeodesyFormulas.elevation(30, 100).value, -70, 'elevation may be negative')
  assert.equal(GeodesyFormulas.baseline(5, 1000).value, 5000)
  assert.equal(GeodesyFormulas.precision(7).value, 7)
  assert.equal(GeodesyFormulas.flattening(298, 297).dst, 'geography')
  assert.equal(hexFamiliesOf().get('geodesy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geodesy', program: ['datum'], params: [2, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `geodesy.datum at ${uuid}`)
  uuidReceiptOf('geodesy datum', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flattening 33, arc 10002, geoid 70/−70, datum 2000, convergence 15, elevation 70/−70, baseline 5000, precision 7; crossing to geography')
})
