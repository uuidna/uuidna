import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HostingFormulas } from './index.js'
import '../../mcp/families.js'

test('hosting: domains, dns, ssl, bandwidth, uptime, traffic, storage, overage — crossing to obs', async (t) => {
  assert.equal(HostingFormulas.domains(50, 3).value, 150, 'domains under the account')
  assert.equal(HostingFormulas.dns(12, 5).value, 60)
  assert.equal(HostingFormulas.ssl(100, 190).value, 90, 'ninety days of certificate left')
  assert.equal(HostingFormulas.ssl(200, 190).value, 0, 'expired')
  assert.equal(HostingFormulas.bandwidth(10000, 90).value, 900)
  assert.equal(HostingFormulas.uptime(999, 1000).value, 99)
  assert.equal(HostingFormulas.traffic(1000, 5).value, 5000, 'traffic the visitors carry')
  assert.equal(HostingFormulas.storage(50, 20).value, 1000)
  assert.equal(HostingFormulas.overage(120, 100).value, 20, 'past the quota')
  assert.equal(HostingFormulas.overage(80, 100).value, 0)
  assert.equal(HostingFormulas.domains(50, 3).dst, 'obs')
  assert.equal(hexFamiliesOf().get('hosting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hosting', program: ['dns'], params: [12, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `hosting.dns at ${uuid}`)
  uuidReceiptOf('hosting dns', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; domains 150, dns 60, ssl 90, bandwidth 900, uptime 99, traffic 5000, storage 1000, overage 20; crossing to obs')
})
