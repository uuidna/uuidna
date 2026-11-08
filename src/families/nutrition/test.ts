import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NutritionFormulas } from './index.js'
import '../../mcp/families.js'

test('nutrition: energy, protein, carbs, fat, deficit, macros, hydration, bmr — crossing to med', async (t) => {
  assert.equal(NutritionFormulas.energy(100, 4).value, 400, 'grams at calories per gram')
  assert.equal(NutritionFormulas.protein(50).value, 200)
  assert.equal(NutritionFormulas.carbs(50).value, 200)
  assert.equal(NutritionFormulas.fat(20).value, 180)
  assert.equal(NutritionFormulas.deficit(1800, 2200).value, 400, 'a 400 kcal deficit')
  assert.equal(NutritionFormulas.deficit(2500, 2200).value, 0)
  assert.equal(NutritionFormulas.macros(30, 120).value, 25, 'a quarter of the plate')
  assert.equal(NutritionFormulas.hydration(2100, 70).value, 30)
  assert.equal(NutritionFormulas.bmr(70, 24).value, 1680)
  assert.equal(NutritionFormulas.energy(100, 4).dst, 'med')
  assert.equal(hexFamiliesOf().get('nutrition')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nutrition', program: ['energy'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `nutrition.energy at ${uuid}`)
  uuidReceiptOf('nutrition energy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; energy 400, protein 200, carbs 200, fat 180, deficit 400, macros 25, hydration 30, bmr 1680; crossing to med')
})
