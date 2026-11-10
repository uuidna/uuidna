import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TpuFormulas } from './index.js'
import '../../mcp/families.js'

test('tpu: MACs, TOPS, tiles, throughput, utilisation and the systolic dataflow — crossing to hardware', async (t) => {
  assert.equal(TpuFormulas.macs(256, 256).value, 65536, 'rows × cols of the array')
  assert.equal(TpuFormulas.tops(65536, 700, 2).value, 91750400, 'macs · clock · ops-per-MAC')
  assert.equal(TpuFormulas.tiles(1000, 256).value, 4, '⌈1000/256⌉ tiles')
  assert.equal(TpuFormulas.throughput(65536, 700).value, 45875200, 'macs · clock')
  assert.equal(TpuFormulas.utilization(48, 64).value, 75, 'active PEs of the total')
  assert.equal(TpuFormulas.dataflow(8, 1024).value, 8192, 'operand reuse across loads')
  assert.equal(TpuFormulas.latency(256, 1024).value, 1280, 'depth + cycles')
  assert.equal(TpuFormulas.memory(1000000, 2).value, 2000000, 'weights · bytes')
  assert.equal(TpuFormulas.batch(10000, 256).value, 40, 'passes to cover the samples')
  assert.equal(TpuFormulas.efficiency(75, 100).value, 75, 'useful ops of the peak')
  assert.equal(TpuFormulas.macs(256, 256).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('tpu')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'tpu', program: ['macs'], params: [256, 256] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 65536, `tpu.macs at ${uuid}`)
  uuidReceiptOf('tpu macs', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; macs 65536, tops 91750400, tiles 4, throughput 45875200, utilization 75%, dataflow 8192, latency 1280, memory 2000000, batch 40, efficiency 75%; crossing to hardware')
})
