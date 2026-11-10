import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MixologyFormulas } from './index.js'
import '../../mcp/families.js'

test('mixology: abv, dilution, ratio, sugarcontent, servings, pour, balance, strength — crossing to cuisine', async (t) => {
  assert.equal(MixologyFormulas.abv(40, 100).value, 40, 'a spirit at 40% ABV')
  assert.equal(MixologyFormulas.dilution(60, 20).value, 25, 'a quarter water once stirred')
  assert.equal(MixologyFormulas.ratio(60, 20).value, 3, 'three parts spirit per mixer')
  assert.equal(MixologyFormulas.sugarcontent(200, 50).value, 100)
  assert.equal(MixologyFormulas.servings(750, 50).value, 15, 'drinks from the bottle')
  assert.equal(MixologyFormulas.pour(3, 30).value, 90)
  assert.equal(MixologyFormulas.balance(20, 12).value, 8)
  assert.equal(MixologyFormulas.strength(40, 90).value, 36, 'millilitres of pure alcohol')
  assert.equal(MixologyFormulas.abv(40, 100).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('mixology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mixology', program: ['ratio'], params: [60, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `mixology.ratio at ${uuid}`)
  uuidReceiptOf('mixology ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; abv 40, dilution 25, ratio 3, sugarcontent 100, servings 15, pour 90, balance 8, strength 36; crossing to cuisine')
})
