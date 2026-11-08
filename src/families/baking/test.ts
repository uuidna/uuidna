import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BakingFormulas } from './index.js'
import '../../mcp/families.js'

test('baking: hydration, leavening, bakerspercent, ovenspring, crumb, proof, temperature, scaling — crossing to cuisine', async (t) => {
  assert.equal(BakingFormulas.hydration(70, 100).value, 70, 'a 70% hydration dough')
  assert.equal(BakingFormulas.leavening(200, 100).value, 200, 'doubled in the proof')
  assert.equal(BakingFormulas.bakerspercent(2, 100).value, 2, 'salt at 2%')
  assert.equal(BakingFormulas.ovenspring(120, 100).value, 20, 'twenty of spring')
  assert.equal(BakingFormulas.ovenspring(90, 100).value, 0)
  assert.equal(BakingFormulas.crumb(1000, 400).value, 2)
  assert.equal(BakingFormulas.proof(180, 60).value, 3, 'rise per minute')
  assert.equal(BakingFormulas.temperature(212).value, 100, 'boiling in Celsius')
  assert.equal(BakingFormulas.scaling(500, 3).value, 1500, 'flour for three loaves')
  assert.equal(BakingFormulas.hydration(70, 100).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('baking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'baking', program: ['hydration'], params: [70, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 70, `baking.hydration at ${uuid}`)
  uuidReceiptOf('baking hydration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hydration 70, leavening 200, bakerspercent 2, ovenspring 20, crumb 2, proof 3, temperature 100, scaling 1500; crossing to cuisine')
})
