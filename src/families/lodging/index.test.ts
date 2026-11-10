import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LodgingFormulas } from './index.js'
import '../../mcp/families.js'

test('lodging: occupancy, nightlyrate, cleaning, cancellation, leadtime, rating, amenity, seasonality — crossing to tourism', async (t) => {
  assert.equal(LodgingFormulas.occupancy(85, 100).value, 85, 'rooms filled')
  assert.equal(LodgingFormulas.nightlyrate(9000, 60).value, 150)
  assert.equal(LodgingFormulas.cleaning(120, 40).value, 3, 'rooms per turnover')
  assert.equal(LodgingFormulas.cancellation(15, 100).value, 15)
  assert.equal(LodgingFormulas.leadtime(10, 45).value, 35, 'nights ahead')
  assert.equal(LodgingFormulas.leadtime(50, 45).value, 0)
  assert.equal(LodgingFormulas.rating(480, 100).value, 4)
  assert.equal(LodgingFormulas.amenity(18, 24).value, 75)
  assert.equal(LodgingFormulas.seasonality(300, 100).value, 300, 'peak against off-peak')
  assert.equal(LodgingFormulas.occupancy(85, 100).dst, 'tourism')
  assert.equal(hexFamiliesOf().get('lodging')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lodging', program: ['occupancy'], params: [85, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `lodging.occupancy at ${uuid}`)
  uuidReceiptOf('lodging occupancy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; occupancy 85, nightlyrate 150, cleaning 3, cancellation 15, leadtime 35, rating 4, amenity 75, seasonality 300; crossing to tourism')
})
