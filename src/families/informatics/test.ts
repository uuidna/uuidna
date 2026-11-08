import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InformaticsFormulas } from './index.js'
import '../../mcp/families.js'

test('informatics: bandwidth, bits, compression, entropy, index, precision, recall, redundancy — crossing to code', async (t) => {
  assert.equal(InformaticsFormulas.bandwidth(1000, 8).value, 125, 'bits per second')
  assert.equal(InformaticsFormulas.bits(10).value, 80, 'ten bytes are eighty bits')
  assert.equal(InformaticsFormulas.compression(1000, 250).value, 400)
  assert.equal(InformaticsFormulas.entropy(1000, 8).value, 125)
  assert.equal(InformaticsFormulas.index(10000, 500).value, 20)
  assert.equal(InformaticsFormulas.precision(80, 100).value, 80)
  assert.equal(InformaticsFormulas.recall(80, 200).value, 40)
  assert.equal(InformaticsFormulas.redundancy(30, 100).value, 30)
  assert.equal(InformaticsFormulas.bits(10).dst, 'code')
  assert.equal(hexFamiliesOf().get('informatics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'informatics', program: ['index'], params: [10000, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `informatics.index at ${uuid}`)
  uuidReceiptOf('informatics index', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bandwidth 125, bits 80, compression 400, entropy 125, index 20, precision 80, recall 40, redundancy 30; crossing to code')
})
