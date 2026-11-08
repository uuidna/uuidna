import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NicFormulas } from './index.js'
import '../../mcp/families.js'

test('nic: line rate, goodput, packets per second, framing overhead, RSS queues and latency — crossing to hardware', async (t) => {
  assert.equal(NicFormulas.linerate(100).value, 100, 'nominal line rate')
  assert.equal(NicFormulas.throughput(100, 90).value, 90, 'goodput after efficiency')
  assert.equal(NicFormulas.packets(10, 1500).value, 833333, 'packets per second')
  assert.equal(NicFormulas.mtu(9000).value, 9000, 'jumbo MTU bytes')
  assert.equal(NicFormulas.overhead(1518, 1500).value, 18, 'frame minus payload')
  assert.equal(NicFormulas.duplex(100).value, 200, 'full-duplex aggregate')
  assert.equal(NicFormulas.queues(8, 4).value, 32, 'RSS queues')
  assert.equal(NicFormulas.interrupts(1000, 64).value, 16, 'interrupts after coalescing')
  assert.equal(NicFormulas.latency(5, 10).value, 50, 'per-hop path latency')
  assert.equal(NicFormulas.bandwidth(16, 32).value, 512, 'lanes × per-lane Gb/s')
  assert.equal(NicFormulas.linerate(100).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('nic')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'nic', program: ['linerate'], params: [100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `nic.linerate at ${uuid}`)
  uuidReceiptOf('nic linerate', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; linerate 100, throughput 90, packets 833333, mtu 9000, overhead 18, duplex 200, queues 32, interrupts 16, latency 50, bandwidth 512; crossing to hardware')
})
