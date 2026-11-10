import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PumpFormulas } from './index.js'

/** pump: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('pump: flow, head, power, stages, efficiency, impellers, throughput, combos', async (t) => {
  assert.equal(PumpFormulas.flow(50, 60).value, 3000, 'flow(50, 60)')
  assert.equal(PumpFormulas.head(100, 20).value, 80, 'head(100, 20)')
  assert.equal(PumpFormulas.power(5, 1000).value, 5000, 'power(5, 1000)')
  assert.equal(PumpFormulas.stages(3, 1).value, 4, 'stages(3, 1)')
  assert.equal(PumpFormulas.efficiency(75, 100).value, 75, 'efficiency(75, 100)')
  assert.equal(PumpFormulas.impellers(2, 1).value, 3, 'impellers(2, 1)')
  assert.equal(PumpFormulas.throughput(6000, 60).value, 100, 'throughput(6000, 60)')
  assert.equal(PumpFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('pump')?.length, 8)
  for (const [name, params, expected] of [["flow",[50,60],3000],["head",[100,20],80],["power",[5,1000],5000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'pump', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `pump.${name} at ${uuid}`)
    uuidReceiptOf(`pump ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "flow=3000, head=80, power=5000")
})
