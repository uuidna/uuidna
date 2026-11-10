import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CateringFormulas } from './index.js'
import '../../mcp/families.js'

test('catering: portions, costperhead, scaling, consumption, staffratio, waste, beverage, margin — crossing to cuisine', async (t) => {
  assert.equal(CateringFormulas.portions(240, 80).value, 3, 'three portions a guest')
  assert.equal(CateringFormulas.costperhead(4000, 80).value, 50)
  assert.equal(CateringFormulas.scaling(3, 80).value, 240, 'the recipe scaled to the room')
  assert.equal(CateringFormulas.consumption(180, 240).value, 75)
  assert.equal(CateringFormulas.staffratio(80, 10).value, 8, 'guests a server covers')
  assert.equal(CateringFormulas.waste(60, 240).value, 25)
  assert.equal(CateringFormulas.beverage(240, 80).value, 3, 'drinks a guest')
  assert.equal(CateringFormulas.margin(100, 40).value, 60, 'margin on a plate')
  assert.equal(CateringFormulas.portions(240, 80).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('catering')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'catering', program: ['scaling'], params: [3, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 240, `catering.scaling at ${uuid}`)
  uuidReceiptOf('catering scaling', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; portions 3, costperhead 50, scaling 240, consumption 75, staffratio 8, waste 25, beverage 3, margin 60; crossing to cuisine')
})
