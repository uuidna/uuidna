import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PicklingFormulas } from './index.js'
import '../../mcp/families.js'

test('pickling: acidity, brineratio, phlevel, fermentdays, saltpercent, lacticacid, shelflife, crunchretention — crossing to microbiology', async (t) => {
  assert.equal(PicklingFormulas.acidity(4, 100).value, 4)
  assert.equal(PicklingFormulas.brineratio(5, 100).value, 5)
  assert.equal(PicklingFormulas.phlevel(38, 10).value, 3)
  assert.equal(PicklingFormulas.fermentdays(2, 7).value, 14)
  assert.equal(PicklingFormulas.saltpercent(5, 100).value, 5)
  assert.equal(PicklingFormulas.lacticacid(8, 100).value, 8)
  assert.equal(PicklingFormulas.shelflife(12, 30).value, 360)
  assert.equal(PicklingFormulas.crunchretention(80, 100).value, 80)
  assert.equal(PicklingFormulas.acidity(4, 100).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('pickling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pickling', program: ['acidity'], params: [4, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `pickling.acidity at ${uuid}`)
  uuidReceiptOf('pickling acidity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; acidity 4, brineratio 5, phlevel 3, fermentdays 14, saltpercent 5, lacticacid 8, shelflife 360, crunchretention 80; crossing to microbiology')
})
