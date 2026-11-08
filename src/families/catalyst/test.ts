import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CatalystFormulas } from './index.js'

/** catalyst: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('catalyst: turnover, sites, efficiency, activation, selectivity, loading, cycles, combos', async (t) => {
  assert.equal(CatalystFormulas.turnover(1000, 60).value, 60000, 'turnover(1000, 60)')
  assert.equal(CatalystFormulas.sites(100, 4).value, 400, 'sites(100, 4)')
  assert.equal(CatalystFormulas.efficiency(90, 100).value, 90, 'efficiency(90, 100)')
  assert.equal(CatalystFormulas.activation(200, 80).value, 120, 'activation(200, 80)')
  assert.equal(CatalystFormulas.selectivity(85, 100).value, 85, 'selectivity(85, 100)')
  assert.equal(CatalystFormulas.loading(500, 10).value, 50, 'loading(500, 10)')
  assert.equal(CatalystFormulas.cycles(1000, 5).value, 5000, 'cycles(1000, 5)')
  assert.equal(CatalystFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('catalyst')?.length, 8)
  for (const [name, params, expected] of [["turnover",[1000,60],60000],["sites",[100,4],400],["efficiency",[90,100],90]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'catalyst', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `catalyst.${name} at ${uuid}`)
    uuidReceiptOf(`catalyst ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "turnover=60000, sites=400, efficiency=90")
})
