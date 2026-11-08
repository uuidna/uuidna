import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AlloyFormulas } from './index.js'

/** alloy: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('alloy: parts, meltpoint, hardness, density, ratio, phases, grains, combos', async (t) => {
  assert.equal(AlloyFormulas.parts(3, 2).value, 5, 'parts(3, 2)')
  assert.equal(AlloyFormulas.meltpoint(1500, 300).value, 1200, 'meltpoint(1500, 300)')
  assert.equal(AlloyFormulas.hardness(200, 1).value, 200, 'hardness(200, 1)')
  assert.equal(AlloyFormulas.density(8000, 1).value, 8000, 'density(8000, 1)')
  assert.equal(AlloyFormulas.ratio(70, 100).value, 70, 'ratio(70, 100)')
  assert.equal(AlloyFormulas.phases(2, 1).value, 3, 'phases(2, 1)')
  assert.equal(AlloyFormulas.grains(100, 50).value, 5000, 'grains(100, 50)')
  assert.equal(AlloyFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('alloy')?.length, 8)
  for (const [name, params, expected] of [["parts",[3,2],5],["meltpoint",[1500,300],1200],["hardness",[200,1],200]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'alloy', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `alloy.${name} at ${uuid}`)
    uuidReceiptOf(`alloy ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "parts=5, meltpoint=1200, hardness=200")
})
