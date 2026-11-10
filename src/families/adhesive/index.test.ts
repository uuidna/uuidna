import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AdhesiveFormulas } from './index.js'

/** adhesive: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('adhesive: bondstrength, cure, coverage, viscosity, peel, layers, shear, combos', async (t) => {
  assert.equal(AdhesiveFormulas.bondstrength(500, 2).value, 1000, 'bondstrength(500, 2)')
  assert.equal(AdhesiveFormulas.cure(1440, 60).value, 24, 'cure(1440, 60)')
  assert.equal(AdhesiveFormulas.coverage(100, 3).value, 300, 'coverage(100, 3)')
  assert.equal(AdhesiveFormulas.viscosity(5000, 1).value, 5000, 'viscosity(5000, 1)')
  assert.equal(AdhesiveFormulas.peel(1000, 10).value, 100, 'peel(1000, 10)')
  assert.equal(AdhesiveFormulas.layers(2, 0).value, 2, 'layers(2, 0)')
  assert.equal(AdhesiveFormulas.shear(300, 2).value, 600, 'shear(300, 2)')
  assert.equal(AdhesiveFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('adhesive')?.length, 8)
  for (const [name, params, expected] of [["bondstrength",[500,2],1000],["cure",[1440,60],24],["coverage",[100,3],300]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'adhesive', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `adhesive.${name} at ${uuid}`)
    uuidReceiptOf(`adhesive ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bondstrength=1000, cure=24, coverage=300")
})
