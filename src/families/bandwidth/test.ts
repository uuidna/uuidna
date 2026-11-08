import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BandwidthFormulas } from './index.js'

/** bandwidth: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('bandwidth: bits, utilization, duplex, channels, overhead, goodput, lanes, combos', async (t) => {
  assert.equal(BandwidthFormulas.bits(1000, 1000).value, 1000000, 'bits(1000, 1000)')
  assert.equal(BandwidthFormulas.utilization(80, 100).value, 80, 'utilization(80, 100)')
  assert.equal(BandwidthFormulas.duplex(1000, 2).value, 2000, 'duplex(1000, 2)')
  assert.equal(BandwidthFormulas.channels(8, 20).value, 160, 'channels(8, 20)')
  assert.equal(BandwidthFormulas.overhead(1000, 900).value, 100, 'overhead(1000, 900)')
  assert.equal(BandwidthFormulas.goodput(9400, 10).value, 940, 'goodput(9400, 10)')
  assert.equal(BandwidthFormulas.lanes(4, 25).value, 100, 'lanes(4, 25)')
  assert.equal(BandwidthFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('bandwidth')?.length, 8)
  for (const [name, params, expected] of [["bits",[1000,1000],1000000],["utilization",[80,100],80],["duplex",[1000,2],2000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'bandwidth', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `bandwidth.${name} at ${uuid}`)
    uuidReceiptOf(`bandwidth ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bits=1000000, utilization=80, duplex=2000")
})
