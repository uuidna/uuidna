import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RadarFormulas } from './index.js'

/** radar: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('radar: range, pulses, resolution, sweeps, targets, dwell, channels, pairs', async (t) => {
  assert.equal(RadarFormulas.range(100, 1).value, 100, 'range(100, 1)')
  assert.equal(RadarFormulas.pulses(1000, 1).value, 1000, 'pulses(1000, 1)')
  assert.equal(RadarFormulas.resolution(300, 2).value, 150, 'resolution(300, 2)')
  assert.equal(RadarFormulas.sweeps(12, 0).value, 12, 'sweeps(12, 0)')
  assert.equal(RadarFormulas.targets(50, 2).value, 100, 'targets(50, 2)')
  assert.equal(RadarFormulas.dwell(1000, 10).value, 100, 'dwell(1000, 10)')
  assert.equal(RadarFormulas.channels(4).value, 16, 'channels(4)')
  assert.equal(RadarFormulas.pairs(8, 2).value, 28, 'pairs(8, 2)')
  assert.equal(hexFamiliesOf().get('radar')?.length, 8)
  for (const [name, params, expected] of [["range",[100,1],100],["pulses",[1000,1],1000],["resolution",[300,2],150]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'radar', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `radar.${name} at ${uuid}`)
    uuidReceiptOf(`radar ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "range=100, pulses=1000, resolution=150")
})
