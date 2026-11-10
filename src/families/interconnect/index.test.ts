import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InterconnectFormulas } from './index.js'
import '../../mcp/families.js'

test('interconnect: lanes, bandwidth, line coding, topology and the link picture — crossing to hardware', async (t) => {
  assert.equal(InterconnectFormulas.lanes(4, 16).value, 64, 'links × lanes-per-link')
  assert.equal(InterconnectFormulas.bandwidth(16, 32).value, 512, 'lanes × per-lane Gbps')
  assert.equal(InterconnectFormulas.throughput(130, 128, 130).value, 128, '128b/130b line coding')
  assert.equal(InterconnectFormulas.latency(5, 100).value, 500, 'hops × per-hop ns')
  assert.equal(InterconnectFormulas.width(16, 1).value, 16, 'lanes × bits-per-lane')
  assert.equal(InterconnectFormulas.topology(8, 3).value, 12, 'links in a 3-regular graph')
  assert.equal(InterconnectFormulas.duplex(512).value, 1024, 'one-way bandwidth doubled')
  assert.equal(InterconnectFormulas.transfers(32, 16).value, 512, 'GT/s × lanes')
  assert.equal(InterconnectFormulas.overhead(130, 128).value, 2, 'raw minus effective')
  assert.equal(InterconnectFormulas.hops(8).value, 7, 'linear chain diameter')
  assert.equal(InterconnectFormulas.lanes(4, 16).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('interconnect')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'interconnect', program: ['lanes'], params: [4, 16] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 64, `interconnect.lanes at ${uuid}`)
  uuidReceiptOf('interconnect lanes', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; lanes 64, bandwidth 512, throughput 128, latency 500, width 16, topology 12, duplex 1024, transfers 512, overhead 2, hops 7; crossing to hardware')
})
