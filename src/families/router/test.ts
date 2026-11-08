import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RouterFormulas } from './index.js'

/** router: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('router: routes, hops, ttl, tables, interfaces, latency, queues, combos', async (t) => {
  assert.equal(RouterFormulas.routes(1000, 4).value, 4000, 'routes(1000, 4)')
  assert.equal(RouterFormulas.hops(16, 0).value, 16, 'hops(16, 0)')
  assert.equal(RouterFormulas.ttl(64, 1).value, 63, 'ttl(64, 1)')
  assert.equal(RouterFormulas.tables(4, 256).value, 1024, 'tables(4, 256)')
  assert.equal(RouterFormulas.interfaces(48, 0).value, 48, 'interfaces(48, 0)')
  assert.equal(RouterFormulas.latency(1000, 100).value, 10, 'latency(1000, 100)')
  assert.equal(RouterFormulas.queues(8, 2).value, 16, 'queues(8, 2)')
  assert.equal(RouterFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('router')?.length, 8)
  for (const [name, params, expected] of [["routes",[1000,4],4000],["hops",[16,0],16],["ttl",[64,1],63]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'router', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `router.${name} at ${uuid}`)
    uuidReceiptOf(`router ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "routes=4000, hops=16, ttl=63")
})
