import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChocolateFormulas } from './index.js'
import '../../mcp/families.js'

test('chocolate: cacaopercent, cocoabutter, conche, crystalseed, meltpoint, sugarratio, temper, viscosity — crossing to chemistry', async (t) => {
  assert.equal(ChocolateFormulas.cacaopercent(70, 100).value, 70, 'a 70% dark bar')
  assert.equal(ChocolateFormulas.cocoabutter(1000, 54).value, 540, 'butter yield from the batch')
  assert.equal(ChocolateFormulas.conche(72, 5).value, 360, 'three days of conching')
  assert.equal(ChocolateFormulas.crystalseed(100, 30).value, 4, 'four seeds for the mass')
  assert.equal(ChocolateFormulas.meltpoint(28, 7).value, 35)
  assert.equal(ChocolateFormulas.sugarratio(30, 100).value, 30)
  assert.equal(ChocolateFormulas.temper(31, 29).value, 1, 'temper holds')
  assert.equal(ChocolateFormulas.temper(27, 29).value, 0)
  assert.equal(ChocolateFormulas.viscosity(600, 5).value, 120)
  assert.equal(ChocolateFormulas.cacaopercent(70, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('chocolate')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chocolate', program: ['crystalseed'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `chocolate.crystalseed at ${uuid}`)
  uuidReceiptOf('chocolate crystalseed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cacaopercent 70, cocoabutter 540, conche 360, crystalseed 4, meltpoint 35, sugarratio 30, temper 1, viscosity 120; crossing to chemistry')
})
