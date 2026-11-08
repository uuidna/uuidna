import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LogisticsFormulas } from './index.js'
import '../../mcp/families.js'

test('logistics: eta, capacity, utilization, cost, inventory, leadtime, fillrate, route — crossing to econ', async (t) => {
  assert.equal(LogisticsFormulas.eta(1000, 80).value, 13, 'hours to arrive')
  assert.equal(LogisticsFormulas.capacity(1000, 40).value, 25, 'units a carrier holds')
  assert.equal(LogisticsFormulas.utilization(30, 40).value, 75)
  assert.equal(LogisticsFormulas.cost(1000, 2).value, 2000)
  assert.equal(LogisticsFormulas.inventory(500, 120).value, 380)
  assert.equal(LogisticsFormulas.inventory(100, 150).value, 0, 'never below zero')
  assert.equal(LogisticsFormulas.leadtime(10, 17).value, 7, 'days to receive')
  assert.equal(LogisticsFormulas.fillrate(90, 100).value, 90)
  assert.equal(LogisticsFormulas.route(12, 50).value, 600, 'distance over the stops')
  assert.equal(LogisticsFormulas.cost(1000, 2).dst, 'econ')
  assert.equal(hexFamiliesOf().get('logistics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'logistics', program: ['capacity'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `logistics.capacity at ${uuid}`)
  uuidReceiptOf('logistics capacity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; eta 13, capacity 25, utilization 75, cost 2000, inventory 380, leadtime 7, fillrate 90, route 600; crossing to econ')
})
