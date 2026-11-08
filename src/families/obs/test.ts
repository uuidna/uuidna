import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ObsFormulas } from './index.js'
import '../../mcp/families.js'

test('obs: uptime, errorrate, latencyp99, throughput, alertcombos, sloburn, samplingrate, dashboardsubsets — crossing to statistics', async (t) => {
  assert.equal(ObsFormulas.uptime(999, 1000).value, 99)
  assert.equal(ObsFormulas.errorrate(50, 1000).value, 5)
  assert.equal(ObsFormulas.latencyp99(5000, 100).value, 50)
  assert.equal(ObsFormulas.throughput(6000, 60).value, 100)
  assert.equal(ObsFormulas.alertcombos(10, 2).value, 45)
  assert.equal(ObsFormulas.sloburn(100, 95).value, 5)
  assert.equal(ObsFormulas.samplingrate(10, 100).value, 10)
  assert.equal(ObsFormulas.dashboardsubsets(5).value, 32)
  assert.equal(ObsFormulas.uptime(999, 1000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('obs')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'obs', program: ['uptime'], params: [999, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 99, `obs.uptime at ${uuid}`)
  uuidReceiptOf('obs uptime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; uptime 99, errorrate 5, latencyp99 50, throughput 100, alertcombos 45, sloburn 5, samplingrate 10, dashboardsubsets 32; crossing to statistics')
})
