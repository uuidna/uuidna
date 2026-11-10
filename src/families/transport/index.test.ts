import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TransportFormulas } from './index.js'
import '../../mcp/families.js'

test('transport: speed, eta, fuel, capacity, occupancy, headway, emissions, congestion — crossing to econ', async (t) => {
  assert.equal(TransportFormulas.speed(300, 5).value, 60, 'distance over time')
  assert.equal(TransportFormulas.eta(300, 60).value, 5, 'hours to arrive')
  assert.equal(TransportFormulas.fuel(500, 25).value, 20)
  assert.equal(TransportFormulas.capacity(50, 4).value, 200, 'seats across the fleet')
  assert.equal(TransportFormulas.occupancy(150, 200).value, 75)
  assert.equal(TransportFormulas.headway(60, 5).value, 12, 'minutes between vehicles')
  assert.equal(TransportFormulas.emissions(100, 8).value, 800)
  assert.equal(TransportFormulas.congestion(90, 60).value, 150, 'half again over free-flow')
  assert.equal(TransportFormulas.speed(300, 5).dst, 'econ')
  assert.equal(hexFamiliesOf().get('transport')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'transport', program: ['capacity'], params: [50, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `transport.capacity at ${uuid}`)
  uuidReceiptOf('transport capacity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; speed 60, eta 5, fuel 20, capacity 200, occupancy 75, headway 12, emissions 800, congestion 150; crossing to econ')
})
