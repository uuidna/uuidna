import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StorageFormulas } from './index.js'
import '../../mcp/families.js'

test('storage: capacity, used, redundancy, iops, throughput, dedup, tier, cost — crossing to cloud', async (t) => {
  assert.equal(StorageFormulas.capacity(1000, 5).value, 5000, 'objects at a size each')
  assert.equal(StorageFormulas.used(1000, 300).value, 700)
  assert.equal(StorageFormulas.used(100, 400).value, 0, 'never below zero')
  assert.equal(StorageFormulas.redundancy(3, 500).value, 1500, 'three copies')
  assert.equal(StorageFormulas.iops(5000, 10).value, 500, 'operations per second')
  assert.equal(StorageFormulas.throughput(6000, 60).value, 100, 'bytes per second')
  assert.equal(StorageFormulas.dedup(1000, 250).value, 25)
  assert.equal(StorageFormulas.tier(700, 300).value, 1000)
  assert.equal(StorageFormulas.cost(2000, 5).value, 100)
  assert.equal(StorageFormulas.capacity(1000, 5).dst, 'cloud')
  assert.equal(hexFamiliesOf().get('storage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'storage', program: ['capacity'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `storage.capacity at ${uuid}`)
  uuidReceiptOf('storage capacity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 5000, used 700, redundancy 1500, iops 500, throughput 100, dedup 25, tier 1000, cost 100; crossing to cloud')
})
