import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CheesemakingFormulas } from './index.js'
import '../../mcp/families.js'

test('cheesemaking: yield, culturestrains, phlevel, agingdays, moisture, rennetdrops, saltpct, culturecombos — crossing to microbiology', async (t) => {
  assert.equal(CheesemakingFormulas.yield(10, 100).value, 10)
  assert.equal(CheesemakingFormulas.culturestrains(3, 2).value, 5)
  assert.equal(CheesemakingFormulas.phlevel(52, 10).value, 5)
  assert.equal(CheesemakingFormulas.agingdays(60, 1).value, 60)
  assert.equal(CheesemakingFormulas.moisture(40, 100).value, 40)
  assert.equal(CheesemakingFormulas.rennetdrops(1000, 10).value, 100)
  assert.equal(CheesemakingFormulas.saltpct(2, 100).value, 2)
  assert.equal(CheesemakingFormulas.culturecombos(8, 2).value, 28)
  assert.equal(CheesemakingFormulas.yield(10, 100).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('cheesemaking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cheesemaking', program: ['yield'], params: [10, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `cheesemaking.yield at ${uuid}`)
  uuidReceiptOf('cheesemaking yield', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; yield 10, culturestrains 5, phlevel 5, agingdays 60, moisture 40, rennetdrops 100, saltpct 2, culturecombos 28; crossing to microbiology')
})
