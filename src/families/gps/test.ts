import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GpsFormulas } from './index.js'
import '../../mcp/families.js'

test('gps: satellites, trilateration, hdop, fixquality, pseudorange, ttff, accuracy, elevationmask — crossing to navigation', async (t) => {
  assert.equal(GpsFormulas.satellites(31, 7).value, 24, 'satellites in view')
  assert.equal(GpsFormulas.trilateration(3).value, 4, 'four for a 3D fix')
  assert.equal(GpsFormulas.hdop(100, 8).value, 12)
  assert.equal(GpsFormulas.fixquality(8, 4).value, 1, 'fix acquired')
  assert.equal(GpsFormulas.fixquality(2, 4).value, 0)
  assert.equal(GpsFormulas.pseudorange(68, 300).value, 20400)
  assert.equal(GpsFormulas.ttff(12, 18, 15).value, 45, 'cold start seconds')
  assert.equal(GpsFormulas.accuracy(2, 5).value, 10)
  assert.equal(GpsFormulas.elevationmask(24, 9).value, 15)
  assert.equal(GpsFormulas.satellites(31, 7).dst, 'navigation')
  assert.equal(hexFamiliesOf().get('gps')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gps', program: ['hdop'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `gps.hdop at ${uuid}`)
  uuidReceiptOf('gps hdop', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; satellites 24, trilateration 4, hdop 12, fixquality 1, pseudorange 20400, ttff 45, accuracy 10, elevationmask 15; crossing to navigation')
})
