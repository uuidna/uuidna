import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DieteticsFormulas } from './index.js'
import '../../mcp/families.js'

test('dietetics: caloriesneeded, macropct, bmi, proteingrams, mealsperday, waterml, deficit, nutrientcombos — crossing to nutrition', async (t) => {
  assert.equal(DieteticsFormulas.caloriesneeded(2000, 1).value, 2000)
  assert.equal(DieteticsFormulas.macropct(30, 100).value, 30)
  assert.equal(DieteticsFormulas.bmi(7000, 324).value, 21)
  assert.equal(DieteticsFormulas.proteingrams(70, 1).value, 70)
  assert.equal(DieteticsFormulas.mealsperday(3, 2).value, 5)
  assert.equal(DieteticsFormulas.waterml(35, 70).value, 2450)
  assert.equal(DieteticsFormulas.deficit(2500, 2000).value, 500)
  assert.equal(DieteticsFormulas.nutrientcombos(12, 3).value, 220)
  assert.equal(DieteticsFormulas.caloriesneeded(2000, 1).dst, 'nutrition')
  assert.equal(hexFamiliesOf().get('dietetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dietetics', program: ['caloriesneeded'], params: [2000, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `dietetics.caloriesneeded at ${uuid}`)
  uuidReceiptOf('dietetics caloriesneeded', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; caloriesneeded 2000, macropct 30, bmi 21, proteingrams 70, mealsperday 5, waterml 2450, deficit 500, nutrientcombos 220; crossing to nutrition')
})
