import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WarehousingFormulas } from './index.js'
import '../../mcp/families.js'

test('warehousing: utilization, pickrate, accuracy, turnover, dock, slotting, throughput, cube — crossing to logistics', async (t) => {
  assert.equal(WarehousingFormulas.utilization(750, 1000).value, 75, 'three quarters of the racks full')
  assert.equal(WarehousingFormulas.pickrate(600, 8).value, 75, 'picks per hour')
  assert.equal(WarehousingFormulas.accuracy(990, 1000).value, 99)
  assert.equal(WarehousingFormulas.turnover(5000, 1000).value, 5, 'inventory turns')
  assert.equal(WarehousingFormulas.dock(30, 10).value, 300, 'doors per truck')
  assert.equal(WarehousingFormulas.slotting(800, 1000).value, 80)
  assert.equal(WarehousingFormulas.throughput(7000, 7).value, 1000, 'units per day')
  assert.equal(WarehousingFormulas.cube(600, 1000).value, 60)
  assert.equal(WarehousingFormulas.utilization(750, 1000).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('warehousing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'warehousing', program: ['utilization'], params: [750, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `warehousing.utilization at ${uuid}`)
  uuidReceiptOf('warehousing utilization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; utilization 75, pickrate 75, accuracy 99, turnover 5, dock 300, slotting 80, throughput 1000, cube 60; crossing to logistics')
})
