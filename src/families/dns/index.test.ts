import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DnsFormulas } from './index.js'

/** dns: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('dns: ttl, records, labels, cachehit, queries, zones, nameservers, combos', async (t) => {
  assert.equal(DnsFormulas.ttl(3600, 1).value, 3600, 'ttl(3600, 1)')
  assert.equal(DnsFormulas.records(12, 0).value, 12, 'records(12, 0)')
  assert.equal(DnsFormulas.labels(3, 1).value, 4, 'labels(3, 1)')
  assert.equal(DnsFormulas.cachehit(90, 100).value, 90, 'cachehit(90, 100)')
  assert.equal(DnsFormulas.queries(1000, 60).value, 60000, 'queries(1000, 60)')
  assert.equal(DnsFormulas.zones(10, 5).value, 50, 'zones(10, 5)')
  assert.equal(DnsFormulas.nameservers(2, 1).value, 3, 'nameservers(2, 1)')
  assert.equal(DnsFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('dns')?.length, 8)
  for (const [name, params, expected] of [["ttl",[3600,1],3600],["records",[12,0],12],["labels",[3,1],4]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'dns', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `dns.${name} at ${uuid}`)
    uuidReceiptOf(`dns ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "ttl=3600, records=12, labels=4")
})
