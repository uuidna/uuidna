import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FamilyFormulas } from './index.js'
import '../../mcp/families.js'

test('family: support, children, division, arrears, maintenance, imputed, overnights, majority — crossing to law', async (t) => {
  assert.equal(FamilyFormulas.support(60000, 20).value, 12000, '20% of income')
  assert.equal(FamilyFormulas.children(400, 3).value, 1200, 'three children')
  assert.equal(FamilyFormulas.division(500000, 50).value, 250000, 'an equal division')
  assert.equal(FamilyFormulas.arrears(12000, 9000).value, 3000)
  assert.equal(FamilyFormulas.maintenance(80000, 30000, 30).value, 15000, '30% of the income gap')
  assert.equal(FamilyFormulas.maintenance(30000, 80000, 30).value, 0, 'no gap, no maintenance')
  assert.equal(FamilyFormulas.imputed(50000, 20000).value, 50000, 'the higher earning capacity is imputed')
  assert.equal(FamilyFormulas.overnights(255, 365).value, 69, 'the custody share')
  assert.equal(FamilyFormulas.majority(200).value, 1, 'more than half the year')
  assert.equal(FamilyFormulas.majority(150).value, 0)
  assert.equal(FamilyFormulas.support(60000, 20).dst, 'law')
  assert.equal(hexFamiliesOf().get('family')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'family', program: ['division'], params: [50000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25000, `family.division at ${uuid}`)
  uuidReceiptOf('family division', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; support 12000, children 1200, division 250000, arrears 3000, maintenance 15000, imputed 50000, overnights 69%, majority 1; crossing to law')
})
