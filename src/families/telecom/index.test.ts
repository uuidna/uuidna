import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TelecomFormulas } from './index.js'
import '../../mcp/families.js'

test('telecom: bandwidth, latency, erlang, coverage, signal, packet, jitter, capacity — crossing to obs', async (t) => {
  assert.equal(TelecomFormulas.bandwidth(1000, 8).value, 1000, 'megabytes to Mbps')
  assert.equal(TelecomFormulas.latency(3000, 200).value, 15)
  assert.equal(TelecomFormulas.erlang(3600, 180).value, 180, 'call-seconds to erlangs')
  assert.equal(TelecomFormulas.coverage(10000, 50).value, 200)
  assert.equal(TelecomFormulas.signal(90, 30).value, 60, 'signal-to-noise in dB')
  assert.equal(TelecomFormulas.signal(20, 30).value, -10, 'below the noise floor')
  assert.equal(TelecomFormulas.packet(980, 1000).value, 98)
  assert.equal(TelecomFormulas.jitter(50, 12).value, 38)
  assert.equal(TelecomFormulas.capacity(1000, 40).value, 25)
  assert.equal(TelecomFormulas.bandwidth(1000, 8).dst, 'obs')
  assert.equal(hexFamiliesOf().get('telecom')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'telecom', program: ['jitter'], params: [50, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 38, `telecom.jitter at ${uuid}`)
  uuidReceiptOf('telecom jitter', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; bandwidth 1000, latency 15, erlang 180, coverage 200, signal 60/-10, packet 98, jitter 38, capacity 25; crossing to obs')
})
