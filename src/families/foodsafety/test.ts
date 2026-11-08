import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FoodsafetyFormulas } from './index.js'
import '../../mcp/families.js'

test('foodsafety: dangerzonehours, pathogenpairs, cookingtempc, coolingtime, contaminationrate, haccppoints, logreduction, compliancepct — crossing to microbiology', async (t) => {
  assert.equal(FoodsafetyFormulas.dangerzonehours(2, 2).value, 4)
  assert.equal(FoodsafetyFormulas.pathogenpairs(10, 2).value, 45)
  assert.equal(FoodsafetyFormulas.cookingtempc(74, 75).value, 75)
  assert.equal(FoodsafetyFormulas.coolingtime(360, 2).value, 180)
  assert.equal(FoodsafetyFormulas.contaminationrate(3, 100).value, 3)
  assert.equal(FoodsafetyFormulas.haccppoints(7, 0).value, 7)
  assert.equal(FoodsafetyFormulas.logreduction(5).value, 32)
  assert.equal(FoodsafetyFormulas.compliancepct(95, 100).value, 95)
  assert.equal(FoodsafetyFormulas.dangerzonehours(2, 2).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('foodsafety')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'foodsafety', program: ['dangerzonehours'], params: [2, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `foodsafety.dangerzonehours at ${uuid}`)
  uuidReceiptOf('foodsafety dangerzonehours', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dangerzonehours 4, pathogenpairs 45, cookingtempc 75, coolingtime 180, contaminationrate 3, haccppoints 7, logreduction 32, compliancepct 95; crossing to microbiology')
})
