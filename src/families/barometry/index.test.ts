import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BarometryFormulas } from './index.js'
import '../../mcp/families.js'

test('barometry: sealevel, tendency, altitudepressure, millibars, pressuregradient, stationpressure, trend, inchesmercury — crossing to weather', async (t) => {
  assert.equal(BarometryFormulas.sealevel(1000, 80).value, 1010, 'station lifted to sea level')
  assert.equal(BarometryFormulas.tendency(1015, 1012).value, 3, 'a three-hour rise')
  assert.equal(BarometryFormulas.tendency(1012, 1015).value, 0)
  assert.equal(BarometryFormulas.altitudepressure(1013, 800).value, 913)
  assert.equal(BarometryFormulas.millibars(101).value, 1010)
  assert.equal(BarometryFormulas.pressuregradient(60, 5).value, 12, 'hPa per unit distance')
  assert.equal(BarometryFormulas.stationpressure(1013, 13).value, 1000)
  assert.equal(BarometryFormulas.trend(4048, 4).value, 1012, 'the running mean')
  assert.equal(BarometryFormulas.inchesmercury(1013).value, 299)
  assert.equal(BarometryFormulas.sealevel(1000, 80).dst, 'weather')
  assert.equal(hexFamiliesOf().get('barometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'barometry', program: ['sealevel'], params: [1000, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1010, `barometry.sealevel at ${uuid}`)
  uuidReceiptOf('barometry sealevel', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sealevel 1010, tendency 3, altitudepressure 913, millibars 1010, pressuregradient 12, stationpressure 1000, trend 1012, inchesmercury 299; crossing to weather')
})
