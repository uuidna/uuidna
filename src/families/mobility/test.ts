import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MobilityFormulas } from './index.js'
import '../../mcp/families.js'

test('mobility: modeshare, commutetime, triprate, accessibility, congestion, vehicleoccupancy, farecost, networkcoverage — crossing to logistics', async (t) => {
  assert.equal(MobilityFormulas.modeshare(45, 100).value, 45, 'mode carries 45% of trips')
  assert.equal(MobilityFormulas.commutetime(30, 60).value, 30, '30 km at 60 km/h is 30 minutes')
  assert.equal(MobilityFormulas.triprate(300, 100).value, 3, 'three trips per person')
  assert.equal(MobilityFormulas.accessibility(1000, 20).value, 50)
  assert.equal(MobilityFormulas.congestion(90, 60).value, 150, 'the travel-time index')
  assert.equal(MobilityFormulas.vehicleoccupancy(120, 40).value, 3)
  assert.equal(MobilityFormulas.farecost(12, 3).value, 36)
  assert.equal(MobilityFormulas.networkcoverage(80, 100).value, 80)
  assert.equal(MobilityFormulas.triprate(10, 0).value, 0, 'guarded division by zero')
  assert.equal(MobilityFormulas.modeshare(45, 100).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('mobility')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mobility', program: ['triprate'], params: [300, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `mobility.triprate at ${uuid}`)
  uuidReceiptOf('mobility triprate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; modeshare 45, commutetime 30, triprate 3, accessibility 50, congestion 150, vehicleoccupancy 3, farecost 36, networkcoverage 80; crossing to logistics')
})
