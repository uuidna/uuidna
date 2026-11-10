import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TourismFormulas } from './index.js'
import '../../mcp/families.js'

test('tourism: occupancy, revpar, adr, nights, seasonality, capacity, spend, length — crossing to econ', async (t) => {
  assert.equal(TourismFormulas.occupancy(80, 100).value, 80, 'four in five rooms booked')
  assert.equal(TourismFormulas.revpar(9000, 100).value, 90)
  assert.equal(TourismFormulas.adr(9000, 80).value, 112, 'average daily rate')
  assert.equal(TourismFormulas.nights(50, 3).value, 150, 'guest-nights')
  assert.equal(TourismFormulas.seasonality(300, 100).value, 300, 'peak triple the off-season')
  assert.equal(TourismFormulas.capacity(100, 2).value, 200)
  assert.equal(TourismFormulas.spend(1000, 250).value, 250000)
  assert.equal(TourismFormulas.length(150, 50).value, 3, 'three nights on average')
  assert.equal(TourismFormulas.occupancy(80, 100).dst, 'econ')
  assert.equal(hexFamiliesOf().get('tourism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tourism', program: ['occupancy'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `tourism.occupancy at ${uuid}`)
  uuidReceiptOf('tourism occupancy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; occupancy 80, revpar 90, adr 112, nights 150, seasonality 300, capacity 200, spend 250000, length 3; crossing to econ')
})
