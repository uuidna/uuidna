import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RailFormulas } from './index.js'
import '../../mcp/families.js'

test('rail: capacity, headway, gradient, gauge, tonnage, dwell, throughput, consist — crossing to transport', async (t) => {
  assert.equal(RailFormulas.capacity(10, 80).value, 800, 'ten cars at eighty seats')
  assert.equal(RailFormulas.headway(120, 8).value, 15, 'minutes between trains')
  assert.equal(RailFormulas.gradient(25, 1000).value, 25, 'a 25‰ grade')
  assert.equal(RailFormulas.gauge(1435, 35).value, 1400)
  assert.equal(RailFormulas.gauge(100, 200).value, 0, 'wear past the nominal floors at zero')
  assert.equal(RailFormulas.tonnage(40, 60).value, 2400, 'trailing tonnage')
  assert.equal(RailFormulas.dwell(300, 4).value, 75, 'platform dwell seconds')
  assert.equal(RailFormulas.throughput(20, 800).value, 16000, 'passengers an hour')
  assert.equal(RailFormulas.consist(1000, 80).value, 13, 'cars for the load')
  assert.equal(RailFormulas.capacity(10, 80).dst, 'transport')
  assert.equal(hexFamiliesOf().get('rail')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rail', program: ['consist'], params: [1000, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13, `rail.consist at ${uuid}`)
  uuidReceiptOf('rail consist', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 800, headway 15, gradient 25, gauge 1400, tonnage 2400, dwell 75, throughput 16000, consist 13; crossing to transport')
})
