import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CompressionFormulas } from './index.js'
import '../../mcp/families.js'

test('compression: ratio, savings, entropy, bitrate, redundancy, throughput, dictionary, fidelity — crossing to storage', async (t) => {
  assert.equal(CompressionFormulas.ratio(1000, 250).value, 400, 'four to one, as a percentage')
  assert.equal(CompressionFormulas.savings(1000, 250).value, 75, 'three quarters saved')
  assert.equal(CompressionFormulas.entropy(1000, 50).value, 20)
  assert.equal(CompressionFormulas.bitrate(64000, 8).value, 8000)
  assert.equal(CompressionFormulas.redundancy(300, 1000).value, 30)
  assert.equal(CompressionFormulas.throughput(10000, 20).value, 500, 'bytes per millisecond')
  assert.equal(CompressionFormulas.dictionary(4096).value, 4096)
  assert.equal(CompressionFormulas.fidelity(950, 1000).value, 95)
  assert.equal(CompressionFormulas.ratio(1000, 250).dst, 'storage')
  assert.equal(hexFamiliesOf().get('compression')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'compression', program: ['entropy'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `compression.entropy at ${uuid}`)
  uuidReceiptOf('compression entropy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratio 400, savings 75, entropy 20, bitrate 8000, redundancy 30, throughput 500, dictionary 4096, fidelity 95; crossing to storage')
})
