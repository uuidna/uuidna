import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DriverFormulas } from './index.js'

/** The kernel driver's arithmetic — ring entries, DMA pages, frame payload, pps, queues, IRQ, MMIO, descriptors. */
test('driver: ring, dmaPages, payload, pps, queues, irq, mmio, descBytes', async (t) => {
  assert.equal(DriverFormulas.ring(4096, 16).value, 256, '4096-byte ring of 16-byte descriptors')
  assert.equal(DriverFormulas.ring(4096, 0).value, 0, 'no descriptor, no divide')
  assert.equal(DriverFormulas.dmaPages(5000).value, 2, '5000 bytes spans two 4K pages')
  assert.equal(DriverFormulas.payload(1500, 42).value, 1458, '1500 MTU less a 42-byte header')
  assert.equal(DriverFormulas.payload(20, 42).value, 0, 'header larger than MTU, floored')
  assert.equal(DriverFormulas.pps(1000000, 1000).value, 1000, '1 MB/s at 1000-byte packets')
  assert.equal(DriverFormulas.queues(8).value, 16, 'tx+rx for 8 cores')
  assert.equal(DriverFormulas.irq(256).value, 64, '256 bytes of 32-bit vectors')
  assert.equal(DriverFormulas.mmio(4).value, 16384, '4 pages mapped')
  assert.equal(DriverFormulas.descBytes(256, 16).value, 4096, '256 × 16-byte descriptors')
  assert.equal(DriverFormulas.throughput(1000, 1458).value, 1458000, '1000 pps of 1458-byte payloads')
  assert.equal(DriverFormulas.latency(50).value, 50, '50us round trip')
  assert.equal(DriverFormulas.buffers(256, 16).value, 4096, '256 entries of 16-byte descriptors')
  assert.equal(DriverFormulas.coalesce(100, 8).value, 13, '100 packets coalesced 8 at a time')
  assert.equal(DriverFormulas.bandwidth(16, 1000).value, 16000, '16 lanes at 1000 each')
  assert.equal(DriverFormulas.completion(256, 100).value, 156, '256-entry ring with 100 inflight')
  assert.equal(DriverFormulas.doorbell(8, 4).value, 32, '8 queues of 4 doorbells')
  assert.equal(hexFamiliesOf().get('driver')?.length, 15)
  for (const [name, params, expected] of [['ring', [4096, 16], 256], ['queues', [8], 16], ['mmio', [4], 16384]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'driver', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `driver.${name} at ${uuid}`)
    uuidReceiptOf(`driver ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 4096/16=256 ring, 5000→2 DMA pages, 1500−42=1458 payload, 8→16 queues')
})
