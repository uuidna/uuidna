import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SerializationFormulas } from './index.js'
import '../../mcp/families.js'

test('serialization: overhead, payload, throughput, framing, encoding, schema, delta, batch — crossing to compression', async (t) => {
  assert.equal(SerializationFormulas.overhead(12, 100).value, 1200, 'a 12-byte header on every message')
  assert.equal(SerializationFormulas.payload(5000, 1200).value, 3800)
  assert.equal(SerializationFormulas.payload(1000, 2000).value, 0, 'overhead can never make the payload negative')
  assert.equal(SerializationFormulas.throughput(6000, 60).value, 100, 'messages per second')
  assert.equal(SerializationFormulas.framing(3800, 4, 50).value, 4000)
  assert.equal(SerializationFormulas.encoding(300).value, 400, 'base64 is four bytes for three')
  assert.equal(SerializationFormulas.schema(20, 3).value, 60)
  assert.equal(SerializationFormulas.delta(8, 16).value, 128)
  assert.equal(SerializationFormulas.batch(1000, 64).value, 16, 'sixteen batches for the run')
  assert.equal(SerializationFormulas.overhead(12, 100).dst, 'compression')
  assert.equal(hexFamiliesOf().get('serialization')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'serialization', program: ['batch'], params: [1000, 64] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `serialization.batch at ${uuid}`)
  uuidReceiptOf('serialization batch', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; overhead 1200, payload 3800, throughput 100, framing 4000, encoding 400, schema 60, delta 128, batch 16; crossing to compression')
})
