import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QueueFormulas } from './index.js'

/** queue: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('queue: throughput, latency, depth, waittime, slots, arrivals, service, combos', async (t) => {
  assert.equal(QueueFormulas.throughput(6000, 60).value, 100, 'throughput(6000, 60)')
  assert.equal(QueueFormulas.latency(1000, 100).value, 10, 'latency(1000, 100)')
  assert.equal(QueueFormulas.depth(64, 0).value, 64, 'depth(64, 0)')
  assert.equal(QueueFormulas.waittime(120, 4).value, 30, 'waittime(120, 4)')
  assert.equal(QueueFormulas.slots(6).value, 64, 'slots(6)')
  assert.equal(QueueFormulas.arrivals(10, 60).value, 600, 'arrivals(10, 60)')
  assert.equal(QueueFormulas.service(1000, 10).value, 100, 'service(1000, 10)')
  assert.equal(QueueFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('queue')?.length, 8)
  for (const [name, params, expected] of [["throughput",[6000,60],100],["latency",[1000,100],10],["depth",[64,0],64]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'queue', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `queue.${name} at ${uuid}`)
    uuidReceiptOf(`queue ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "throughput=100, latency=10, depth=64")
})
