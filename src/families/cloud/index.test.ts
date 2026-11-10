import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CloudFormulas } from './index.js'
import '../../mcp/families.js'

test('cloud: cost, uptime, scale, latency, throughput, storage, egress, sla — crossing to obs', async (t) => {
  assert.equal(CloudFormulas.cost(720, 5).value, 3600, 'a month of instance-hours')
  assert.equal(CloudFormulas.uptime(999, 1000).value, 99)
  assert.equal(CloudFormulas.scale(100, 30).value, 4, 'four nodes for the load')
  assert.equal(CloudFormulas.latency(5000, 100).value, 50)
  assert.equal(CloudFormulas.throughput(6000, 60).value, 100, 'requests per second')
  assert.equal(CloudFormulas.storage(1000, 5).value, 5000)
  assert.equal(CloudFormulas.egress(10000, 90).value, 900)
  assert.equal(CloudFormulas.sla(99, 95).value, 1, 'SLA met')
  assert.equal(CloudFormulas.sla(90, 95).value, 0)
  assert.equal(CloudFormulas.cost(720, 5).dst, 'obs')
  assert.equal(hexFamiliesOf().get('cloud')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cloud', program: ['scale'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `cloud.scale at ${uuid}`)
  uuidReceiptOf('cloud scale', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cost 3600, uptime 99, scale 4, latency 50, throughput 100, storage 5000, egress 900, sla 1; crossing to obs')
})
