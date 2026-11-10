import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LicensingFormulas } from './index.js'
import '../../mcp/families.js'

test('licensing: seats, utilization, renewal, compliance, truecost, overage, term, entitlement — crossing to law', async (t) => {
  assert.equal(LicensingFormulas.seats(100, 5).value, 20, 'twenty seats for the headcount')
  assert.equal(LicensingFormulas.utilization(45, 50).value, 90)
  assert.equal(LicensingFormulas.renewal(12, 100).value, 1200, 'a year of renewal')
  assert.equal(LicensingFormulas.compliance(100, 80).value, 1, 'within the grant')
  assert.equal(LicensingFormulas.compliance(80, 100).value, 0)
  assert.equal(LicensingFormulas.truecost(20, 50).value, 1000)
  assert.equal(LicensingFormulas.overage(120, 100).value, 20, 'twenty seats over')
  assert.equal(LicensingFormulas.term(2024, 3).value, 2027)
  assert.equal(LicensingFormulas.entitlement(1000, 250).value, 750)
  assert.equal(LicensingFormulas.seats(100, 5).dst, 'law')
  assert.equal(hexFamiliesOf().get('licensing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'licensing', program: ['seats'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `licensing.seats at ${uuid}`)
  uuidReceiptOf('licensing seats', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; seats 20, utilization 90, renewal 1200, compliance 1, truecost 1000, overage 20, term 2027, entitlement 750; crossing to law')
})
