import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HashingFormulas } from './index.js'
import '../../mcp/families.js'

test('hashing: bucket, loadfactor, collisions, probe, birthday, modulo, resize, distribution — crossing to indexing', async (t) => {
  assert.equal(HashingFormulas.bucket(12345, 1000).value, 345, 'the key lands in bucket 345')
  assert.equal(HashingFormulas.loadfactor(750, 1000).value, 75, 'three-quarters full')
  assert.equal(HashingFormulas.collisions(1500, 1000).value, 500, 'five hundred over capacity')
  assert.equal(HashingFormulas.probe(998, 5, 1000).value, 3, 'wraps past the end')
  assert.equal(HashingFormulas.birthday(30).value, 435, 'pairs among thirty keys')
  assert.equal(HashingFormulas.modulo(100, 7).value, 2)
  assert.equal(HashingFormulas.modulo(100, 0).value, 0)
  assert.equal(HashingFormulas.resize(1024, 2).value, 2048, 'capacity doubled')
  assert.equal(HashingFormulas.distribution(5000, 1000).value, 5)
  assert.equal(HashingFormulas.bucket(12345, 1000).dst, 'indexing')
  assert.equal(hexFamiliesOf().get('hashing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hashing', program: ['bucket'], params: [12345, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 345, `hashing.bucket at ${uuid}`)
  uuidReceiptOf('hashing bucket', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bucket 345, loadfactor 75, collisions 500, probe 3, birthday 435, modulo 2, resize 2048, distribution 5; crossing to indexing')
})
