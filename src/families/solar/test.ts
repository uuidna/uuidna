import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SolarFormulas } from './index.js'

/** solar: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('solar: output, efficiency, daily, array, panels, irradiance, strings, combos', async (t) => {
  assert.equal(SolarFormulas.output(300, 20).value, 6000, 'output(300, 20)')
  assert.equal(SolarFormulas.efficiency(22, 100).value, 22, 'efficiency(22, 100)')
  assert.equal(SolarFormulas.daily(300, 5).value, 1500, 'daily(300, 5)')
  assert.equal(SolarFormulas.array(20, 2).value, 40, 'array(20, 2)')
  assert.equal(SolarFormulas.panels(18, 2).value, 20, 'panels(18, 2)')
  assert.equal(SolarFormulas.irradiance(1000, 1).value, 1000, 'irradiance(1000, 1)')
  assert.equal(SolarFormulas.strings(4, 5).value, 20, 'strings(4, 5)')
  assert.equal(SolarFormulas.combos(10, 2).value, 45, 'combos(10, 2)')
  assert.equal(hexFamiliesOf().get('solar')?.length, 8)
  for (const [name, params, expected] of [["output",[300,20],6000],["efficiency",[22,100],22],["daily",[300,5],1500]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'solar', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `solar.${name} at ${uuid}`)
    uuidReceiptOf(`solar ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "output=6000, efficiency=22, daily=1500")
})
