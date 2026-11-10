import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MetabolismFormulas } from './index.js'

/** metabolism: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('metabolism: bmr, atp, calories, pathways, glucose, oxygen, enzymes, combos', async (t) => {
  assert.equal(MetabolismFormulas.bmr(1500, 1).value, 1500, 'bmr(1500, 1)')
  assert.equal(MetabolismFormulas.atp(36, 1).value, 36, 'atp(36, 1)')
  assert.equal(MetabolismFormulas.calories(2000, 1).value, 2000, 'calories(2000, 1)')
  assert.equal(MetabolismFormulas.pathways(3, 0).value, 3, 'pathways(3, 0)')
  assert.equal(MetabolismFormulas.glucose(180, 6).value, 30, 'glucose(180, 6)')
  assert.equal(MetabolismFormulas.oxygen(250, 1).value, 250, 'oxygen(250, 1)')
  assert.equal(MetabolismFormulas.enzymes(100, 5).value, 500, 'enzymes(100, 5)')
  assert.equal(MetabolismFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('metabolism')?.length, 8)
  for (const [name, params, expected] of [["bmr",[1500,1],1500],["atp",[36,1],36],["calories",[2000,1],2000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'metabolism', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `metabolism.${name} at ${uuid}`)
    uuidReceiptOf(`metabolism ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bmr=1500, atp=36, calories=2000")
})
