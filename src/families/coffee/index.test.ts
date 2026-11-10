import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CoffeeFormulas } from './index.js'
import '../../mcp/families.js'

test('coffee: brewratio, extraction, tds, doseyield, grindsetting, watertemp, bloomwater, strength — crossing to cuisine', async (t) => {
  assert.equal(CoffeeFormulas.brewratio(500, 30).value, 16, 'the golden ratio, rounded down')
  assert.equal(CoffeeFormulas.extraction(6, 30).value, 20, 'a 20% extraction yield')
  assert.equal(CoffeeFormulas.tds(14, 1000).value, 14)
  assert.equal(CoffeeFormulas.doseyield(18, 2).value, 36, 'a double-ratio espresso')
  assert.equal(CoffeeFormulas.grindsetting(800, 50).value, 16)
  assert.equal(CoffeeFormulas.watertemp(100, 7).value, 93, 'off the boil')
  assert.equal(CoffeeFormulas.bloomwater(30, 2).value, 60)
  assert.equal(CoffeeFormulas.strength(14, 12).value, 1, 'strength met')
  assert.equal(CoffeeFormulas.strength(10, 12).value, 0)
  assert.equal(CoffeeFormulas.brewratio(500, 30).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('coffee')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'coffee', program: ['brewratio'], params: [500, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `coffee.brewratio at ${uuid}`)
  uuidReceiptOf('coffee brewratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; brewratio 16, extraction 20, tds 14, doseyield 36, grindsetting 16, watertemp 93, bloomwater 60, strength 1; crossing to cuisine')
})
