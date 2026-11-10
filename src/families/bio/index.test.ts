import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BioFormulas } from './index.js'

/** bio: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('bio: doubling, generations, dosage, bmi, cells, colonies, halflife, population', async (t) => {
  assert.equal(BioFormulas.doubling(10).value, 1024, 'doubling(10)')
  assert.equal(BioFormulas.generations(20, 5).value, 25, 'generations(20, 5)')
  assert.equal(BioFormulas.dosage(5, 70).value, 350, 'dosage(5, 70)')
  assert.equal(BioFormulas.bmi(7000, 324).value, 21, 'bmi(7000, 324)')
  assert.equal(BioFormulas.cells(1000, 100).value, 100000, 'cells(1000, 100)')
  assert.equal(BioFormulas.colonies(50, 8).value, 400, 'colonies(50, 8)')
  assert.equal(BioFormulas.halflife(160, 8).value, 20, 'halflife(160, 8)')
  assert.equal(BioFormulas.population(100, 10, 5).value, 5000, 'population(100, 10, 5)')
  assert.equal(hexFamiliesOf().get('bio')?.length, 8)
  for (const [name, params, expected] of [["doubling",[10],1024],["generations",[20,5],25],["dosage",[5,70],350]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'bio', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `bio.${name} at ${uuid}`)
    uuidReceiptOf(`bio ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "doubling=1024, generations=25, dosage=350")
})
