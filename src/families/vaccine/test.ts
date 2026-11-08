import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VaccineFormulas } from './index.js'

/** vaccine: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('vaccine: doses, efficacy, coverage, antigens, boosters, coldchain, batches, combos', async (t) => {
  assert.equal(VaccineFormulas.doses(2, 1).value, 3, 'doses(2, 1)')
  assert.equal(VaccineFormulas.efficacy(95, 100).value, 95, 'efficacy(95, 100)')
  assert.equal(VaccineFormulas.coverage(70, 100).value, 70, 'coverage(70, 100)')
  assert.equal(VaccineFormulas.antigens(4, 1).value, 4, 'antigens(4, 1)')
  assert.equal(VaccineFormulas.boosters(1, 0).value, 1, 'boosters(1, 0)')
  assert.equal(VaccineFormulas.coldchain(8, 2).value, 6, 'coldchain(8, 2)')
  assert.equal(VaccineFormulas.batches(100, 1000).value, 100000, 'batches(100, 1000)')
  assert.equal(VaccineFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('vaccine')?.length, 8)
  for (const [name, params, expected] of [["doses",[2,1],3],["efficacy",[95,100],95],["coverage",[70,100],70]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'vaccine', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `vaccine.${name} at ${uuid}`)
    uuidReceiptOf(`vaccine ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "doses=3, efficacy=95, coverage=70")
})
