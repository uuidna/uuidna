import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FirewallFormulas } from './index.js'
import '../../mcp/families.js'

test('firewall: blockrate, throughput, rules, latency, falseblock, connections, inspection, coverage — crossing to networking', async (t) => {
  assert.equal(FirewallFormulas.blockrate(250, 1000).value, 25, 'a quarter of traffic blocked')
  assert.equal(FirewallFormulas.throughput(60000, 60).value, 1000, 'packets per second')
  assert.equal(FirewallFormulas.rules(512).value, 512)
  assert.equal(FirewallFormulas.latency(45).value, 45)
  assert.equal(FirewallFormulas.falseblock(3, 250).value, 1)
  assert.equal(FirewallFormulas.connections(800, 1000).value, 80)
  assert.equal(FirewallFormulas.inspection(900, 1000).value, 90)
  assert.equal(FirewallFormulas.coverage(48, 64).value, 75)
  assert.equal(FirewallFormulas.blockrate(250, 1000).dst, 'networking')
  assert.equal(hexFamiliesOf().get('firewall')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'firewall', program: ['connections'], params: [800, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `firewall.connections at ${uuid}`)
  uuidReceiptOf('firewall connections', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; blockrate 25, throughput 1000, rules 512, latency 45, falseblock 1, connections 80, inspection 90, coverage 75; crossing to networking')
})
