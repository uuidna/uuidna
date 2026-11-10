import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MealplanningFormulas } from './index.js'
import '../../mcp/families.js'

test('mealplanning: meals, portions, caloriesperday, ingredientpairs, weeklyorderings, varietysubsets, prepminutes, budgetpermeal — crossing to nutrition', async (t) => {
  assert.equal(MealplanningFormulas.meals(3, 7).value, 21)
  assert.equal(MealplanningFormulas.portions(4, 3).value, 12)
  assert.equal(MealplanningFormulas.caloriesperday(2000, 1).value, 2000)
  assert.equal(MealplanningFormulas.ingredientpairs(20, 2).value, 190)
  assert.equal(MealplanningFormulas.weeklyorderings(5).value, 120)
  assert.equal(MealplanningFormulas.varietysubsets(5).value, 32)
  assert.equal(MealplanningFormulas.prepminutes(30, 7).value, 210)
  assert.equal(MealplanningFormulas.budgetpermeal(100, 21).value, 4)
  assert.equal(MealplanningFormulas.meals(3, 7).dst, 'nutrition')
  assert.equal(hexFamiliesOf().get('mealplanning')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mealplanning', program: ['meals'], params: [3, 7] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 21, `mealplanning.meals at ${uuid}`)
  uuidReceiptOf('mealplanning meals', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; meals 21, portions 12, caloriesperday 2000, ingredientpairs 190, weeklyorderings 120, varietysubsets 32, prepminutes 210, budgetpermeal 4; crossing to nutrition')
})
