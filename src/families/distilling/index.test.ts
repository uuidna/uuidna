import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DistillingFormulas } from './index.js'
import '../../mcp/families.js'

test('distilling: abv, cuts, boilingpoint, refluxratio, yieldliters, platecombos, distillationruns, puritypct — crossing to chemistry', async (t) => {
  assert.equal(DistillingFormulas.abv(40, 100).value, 40)
  assert.equal(DistillingFormulas.cuts(3, 1).value, 4)
  assert.equal(DistillingFormulas.boilingpoint(78, 100).value, 100)
  assert.equal(DistillingFormulas.refluxratio(50, 10).value, 5)
  assert.equal(DistillingFormulas.yieldliters(1000, 10).value, 100)
  assert.equal(DistillingFormulas.platecombos(12, 2).value, 66)
  assert.equal(DistillingFormulas.distillationruns(3, 1).value, 3)
  assert.equal(DistillingFormulas.puritypct(95, 100).value, 95)
  assert.equal(DistillingFormulas.abv(40, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('distilling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'distilling', program: ['abv'], params: [40, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `distilling.abv at ${uuid}`)
  uuidReceiptOf('distilling abv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; abv 40, cuts 4, boilingpoint 100, refluxratio 5, yieldliters 100, platecombos 66, distillationruns 3, puritypct 95; crossing to chemistry')
})
