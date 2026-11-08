import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RamFormulas } from './index.js'
import '../../mcp/families.js'

test('ram: capacity, channels, bandwidth, ranks, CAS latency, refresh and utilisation — crossing to hardware', async (t) => {
  assert.equal(RamFormulas.capacity(4, 16).value, 64, 'modules × GB each')
  assert.equal(RamFormulas.channels(4, 2).value, 2, 'channels populated')
  assert.equal(RamFormulas.bandwidth(8, 3200).value, 25600, 'bus bytes × MT/s')
  assert.equal(RamFormulas.ranks(16, 8).value, 2, 'whole ranks')
  assert.equal(RamFormulas.caslatency(16, 500).value, 8000, 'CAS cycles × tCK ps')
  assert.equal(RamFormulas.refresh(8192, 64).value, 8192, 'rows refreshed per window')
  assert.equal(RamFormulas.banks(4, 4).value, 16, 'groups × per-group')
  assert.equal(RamFormulas.burst(8, 8).value, 64, 'burst length × bus bytes')
  assert.equal(RamFormulas.latency(16, 18).value, 34, 'CAS + RCD')
  assert.equal(RamFormulas.utilization(48, 64).value, 75, 'used of the total')
  assert.equal(RamFormulas.capacity(4, 16).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('ram')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'ram', program: ['capacity'], params: [4, 16] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 64, `ram.capacity at ${uuid}`)
  uuidReceiptOf('ram capacity', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; capacity 64, channels 2, bandwidth 25600, ranks 2, caslatency 8000, refresh 8192, banks 16, burst 64, latency 34, utilization 75%; crossing to hardware')
})
