import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IotFormulas } from './index.js'
import '../../mcp/families.js'

test('iot: sampling, battery, telemetry, duty, latency, payload, heartbeat, range — crossing to obs', async (t) => {
  assert.equal(IotFormulas.sampling(100, 60).value, 6000)
  assert.equal(IotFormulas.battery(2000, 50).value, 40, 'hours of life')
  assert.equal(IotFormulas.telemetry(500, 12).value, 6000)
  assert.equal(IotFormulas.duty(15, 60).value, 25)
  assert.equal(IotFormulas.latency(4, 12).value, 48)
  assert.equal(IotFormulas.payload(8, 4).value, 32)
  assert.equal(IotFormulas.heartbeat(3600, 60).value, 60)
  assert.equal(IotFormulas.range(100, 5).value, 20)
  assert.equal(IotFormulas.sampling(100, 60).dst, 'obs')
  assert.equal(hexFamiliesOf().get('iot')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'iot', program: ['battery'], params: [2000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `iot.battery at ${uuid}`)
  uuidReceiptOf('iot battery', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sampling 6000, battery 40, telemetry 6000, duty 25, latency 48, payload 32, heartbeat 60, range 20; crossing to obs')
})
