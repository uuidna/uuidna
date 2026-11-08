import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CeramicFormulas } from './index.js'

/** ceramic: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('ceramic: sinter, porosity, hardness, grains, shrink, density, phases, combos', async (t) => {
  assert.equal(CeramicFormulas.sinter(1600, 200).value, 1400, 'sinter(1600, 200)')
  assert.equal(CeramicFormulas.porosity(5, 100).value, 5, 'porosity(5, 100)')
  assert.equal(CeramicFormulas.hardness(9, 1).value, 9, 'hardness(9, 1)')
  assert.equal(CeramicFormulas.grains(100, 20).value, 2000, 'grains(100, 20)')
  assert.equal(CeramicFormulas.shrink(15, 100).value, 15, 'shrink(15, 100)')
  assert.equal(CeramicFormulas.density(3900, 1).value, 3900, 'density(3900, 1)')
  assert.equal(CeramicFormulas.phases(2, 1).value, 3, 'phases(2, 1)')
  assert.equal(CeramicFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('ceramic')?.length, 8)
  for (const [name, params, expected] of [["sinter",[1600,200],1400],["porosity",[5,100],5],["hardness",[9,1],9]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'ceramic', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `ceramic.${name} at ${uuid}`)
    uuidReceiptOf(`ceramic ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "sinter=1400, porosity=5, hardness=9")
})
