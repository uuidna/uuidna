import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FerryFormulas } from './index.js'
import '../../mcp/families.js'

test('ferry: capacity, crossingtime, vehicledecks, dailycrossings, loadfactor, turnaroundmin, routepairs, throughput — crossing to logistics', async (t) => {
  assert.equal(FerryFormulas.capacity(200, 2).value, 400)
  assert.equal(FerryFormulas.crossingtime(60, 1).value, 60)
  assert.equal(FerryFormulas.vehicledecks(2, 1).value, 3)
  assert.equal(FerryFormulas.dailycrossings(1440, 90).value, 16)
  assert.equal(FerryFormulas.loadfactor(75, 100).value, 75)
  assert.equal(FerryFormulas.turnaroundmin(60, 2).value, 30)
  assert.equal(FerryFormulas.routepairs(8, 2).value, 28)
  assert.equal(FerryFormulas.throughput(400, 16).value, 6400)
  assert.equal(FerryFormulas.capacity(200, 2).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('ferry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ferry', program: ['capacity'], params: [200, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `ferry.capacity at ${uuid}`)
  uuidReceiptOf('ferry capacity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 400, crossingtime 60, vehicledecks 3, dailycrossings 16, loadfactor 75, turnaroundmin 30, routepairs 28, throughput 6400; crossing to logistics')
})
