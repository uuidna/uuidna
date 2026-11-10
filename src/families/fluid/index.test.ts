import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FluidFormulas } from './index.js'

/** fluid: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('fluid: flow, volume, head, pipearea, throughput, litres, pressuredrop, valves', async (t) => {
  assert.equal(FluidFormulas.flow(50, 60).value, 3000, 'flow(50, 60)')
  assert.equal(FluidFormulas.volume(10, 5, 2).value, 100, 'volume(10, 5, 2)')
  assert.equal(FluidFormulas.head(100, 20).value, 80, 'head(100, 20)')
  assert.equal(FluidFormulas.pipearea(78, 1).value, 78, 'pipearea(78, 1)')
  assert.equal(FluidFormulas.throughput(6000, 60).value, 100, 'throughput(6000, 60)')
  assert.equal(FluidFormulas.litres(1000, 5).value, 5000, 'litres(1000, 5)')
  assert.equal(FluidFormulas.pressuredrop(300, 120).value, 180, 'pressuredrop(300, 120)')
  assert.equal(FluidFormulas.valves(4, 2).value, 6, 'valves(4, 2)')
  assert.equal(hexFamiliesOf().get('fluid')?.length, 8)
  for (const [name, params, expected] of [["flow",[50,60],3000],["volume",[10,5,2],100],["head",[100,20],80]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'fluid', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `fluid.${name} at ${uuid}`)
    uuidReceiptOf(`fluid ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "flow=3000, volume=100, head=80")
})
