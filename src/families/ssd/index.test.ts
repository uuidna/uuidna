import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SsdFormulas } from './index.js'
import '../../mcp/families.js'

test('ssd: IOPS, throughput, TBW, over-provisioning, wear-levelling and DWPD — crossing to hardware', async (t) => {
  assert.equal(SsdFormulas.iops(32, 100).value, 320000, 'queue depth over latency')
  assert.equal(SsdFormulas.throughput(320000, 4).value, 1280000, 'IOPS × block KB')
  assert.equal(SsdFormulas.tbw(256, 3000).value, 768, 'capacity × cycles endurance')
  assert.equal(SsdFormulas.overprovision(512, 480).value, 32, 'raw − usable spare')
  assert.equal(SsdFormulas.wearleveling(10000, 1000).value, 10, 'cycles per block')
  assert.equal(SsdFormulas.channels(16, 4).value, 4, 'flash channels')
  assert.equal(SsdFormulas.pagesize(8, 512).value, 4096, 'sectors × sector bytes')
  assert.equal(SsdFormulas.readlatency(50).value, 50, 'read latency µs')
  assert.equal(SsdFormulas.queuedepth(32).value, 32, 'outstanding requests')
  assert.equal(SsdFormulas.dwpd(730, 200, 365).value, 10, 'drive writes per day')
  assert.equal(SsdFormulas.iops(32, 100).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('ssd')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'ssd', program: ['iops'], params: [32, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 320000, `ssd.iops at ${uuid}`)
  uuidReceiptOf('ssd iops', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; iops 320000, throughput 1280000, tbw 768, overprovision 32, wearleveling 10, channels 4, pagesize 4096, readlatency 50, queuedepth 32, dwpd 10; crossing to hardware')
})
