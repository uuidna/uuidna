import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ManufacturingFormulas } from './index.js'
import '../../mcp/families.js'

test('manufacturing: throughput, oee, defects, cycletime, yield, takt, inventory, capacity — crossing to econ', async (t) => {
  assert.equal(ManufacturingFormulas.throughput(1200, 8).value, 150, 'units per hour')
  assert.equal(ManufacturingFormulas.oee(90, 80).value, 72, 'two percentages combined')
  assert.equal(ManufacturingFormulas.defects(5, 1000).value, 0)
  assert.equal(ManufacturingFormulas.cycletime(480, 120).value, 4)
  assert.equal(ManufacturingFormulas.yield(950, 1000).value, 95)
  assert.equal(ManufacturingFormulas.takt(28800, 240).value, 120, 'seconds per unit')
  assert.equal(ManufacturingFormulas.inventory(500, 50).value, 10, 'turns')
  assert.equal(ManufacturingFormulas.capacity(12, 100).value, 1200)
  assert.equal(ManufacturingFormulas.throughput(1200, 8).dst, 'econ')
  assert.equal(hexFamiliesOf().get('manufacturing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'manufacturing', program: ['throughput'], params: [1200, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `manufacturing.throughput at ${uuid}`)
  uuidReceiptOf('manufacturing throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; throughput 150, oee 72, defects 0, cycletime 4, yield 95, takt 120, inventory 10, capacity 1200; crossing to econ')
})
