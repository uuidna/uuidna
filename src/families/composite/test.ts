import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CompositeFormulas } from './index.js'

/** composite: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('composite: plies, fiberpct, strength, modulus, layers, weight, orientations, combos', async (t) => {
  assert.equal(CompositeFormulas.plies(8, 0).value, 8, 'plies(8, 0)')
  assert.equal(CompositeFormulas.fiberpct(60, 100).value, 60, 'fiberpct(60, 100)')
  assert.equal(CompositeFormulas.strength(500, 2).value, 1000, 'strength(500, 2)')
  assert.equal(CompositeFormulas.modulus(70, 1).value, 70, 'modulus(70, 1)')
  assert.equal(CompositeFormulas.layers(8, 2).value, 16, 'layers(8, 2)')
  assert.equal(CompositeFormulas.weight(1000, 4).value, 250, 'weight(1000, 4)')
  assert.equal(CompositeFormulas.orientations(4).value, 24, 'orientations(4)')
  assert.equal(CompositeFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('composite')?.length, 8)
  for (const [name, params, expected] of [["plies",[8,0],8],["fiberpct",[60,100],60],["strength",[500,2],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'composite', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `composite.${name} at ${uuid}`)
    uuidReceiptOf(`composite ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "plies=8, fiberpct=60, strength=1000")
})
