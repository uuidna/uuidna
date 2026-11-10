import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MonitoringFormulas } from './index.js'
import '../../mcp/families.js'

test('monitoring: uptime, mttr, mttf, alerts, apdex, noise, coverage, incidents — crossing to obs', async (t) => {
  assert.equal(MonitoringFormulas.uptime(999, 1000).value, 99)
  assert.equal(MonitoringFormulas.mttr(600, 5).value, 120, 'two hours to repair, each')
  assert.equal(MonitoringFormulas.mttf(8760, 12).value, 730, 'a month between failures')
  assert.equal(MonitoringFormulas.alerts(30, 120).value, 25)
  assert.equal(MonitoringFormulas.apdex(950, 1000).value, 95)
  assert.equal(MonitoringFormulas.noise(20, 80).value, 25)
  assert.equal(MonitoringFormulas.coverage(85, 100).value, 85)
  assert.equal(MonitoringFormulas.incidents(3, 12).value, 25)
  assert.equal(MonitoringFormulas.uptime(999, 1000).dst, 'obs')
  assert.equal(hexFamiliesOf().get('monitoring')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'monitoring', program: ['apdex'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `monitoring.apdex at ${uuid}`)
  uuidReceiptOf('monitoring apdex', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; uptime 99, mttr 120, mttf 730, alerts 25, apdex 95, noise 25, coverage 85, incidents 25; crossing to obs')
})
