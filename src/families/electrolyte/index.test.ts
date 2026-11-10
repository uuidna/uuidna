import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ElectrolyteFormulas } from './index.js'

/** electrolyte: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('electrolyte: conductivity, molarity, ions, voltage, ph, mobility, cells, combos', async (t) => {
  assert.equal(ElectrolyteFormulas.conductivity(100, 5).value, 500, 'conductivity(100, 5)')
  assert.equal(ElectrolyteFormulas.molarity(2000, 2).value, 1000, 'molarity(2000, 2)')
  assert.equal(ElectrolyteFormulas.ions(2, 6).value, 12, 'ions(2, 6)')
  assert.equal(ElectrolyteFormulas.voltage(2, 1).value, 2, 'voltage(2, 1)')
  assert.equal(ElectrolyteFormulas.ph(70, 10).value, 7, 'ph(70, 10)')
  assert.equal(ElectrolyteFormulas.mobility(800, 10).value, 80, 'mobility(800, 10)')
  assert.equal(ElectrolyteFormulas.cells(6, 0).value, 6, 'cells(6, 0)')
  assert.equal(ElectrolyteFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('electrolyte')?.length, 8)
  for (const [name, params, expected] of [["conductivity",[100,5],500],["molarity",[2000,2],1000],["ions",[2,6],12]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'electrolyte', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `electrolyte.${name} at ${uuid}`)
    uuidReceiptOf(`electrolyte ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "conductivity=500, molarity=1000, ions=12")
})
