import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SourcingFormulas } from './index.js'
import '../../mcp/families.js'

test('sourcing: savings, spend, leadtime, suppliers, bid, award, qualification, risk — crossing to procurement', async (t) => {
  assert.equal(SourcingFormulas.savings(1000, 850).value, 150, 'negotiated down from the quote')
  assert.equal(SourcingFormulas.savings(800, 900).value, 0, 'no savings when the agreed price is higher')
  assert.equal(SourcingFormulas.spend(500, 20).value, 10000)
  assert.equal(SourcingFormulas.leadtime(14, 21).value, 35, 'prep plus transit')
  assert.equal(SourcingFormulas.suppliers(100, 30).value, 4, 'four suppliers for the demand')
  assert.equal(SourcingFormulas.bid(9000, 3).value, 3000, 'average bid')
  assert.equal(SourcingFormulas.award(1200, 1500).value, 1, 'within budget')
  assert.equal(SourcingFormulas.award(1600, 1500).value, 0)
  assert.equal(SourcingFormulas.qualification(45, 50).value, 90)
  assert.equal(SourcingFormulas.risk(4, 5).value, 20)
  assert.equal(SourcingFormulas.savings(1000, 850).dst, 'procurement')
  assert.equal(hexFamiliesOf().get('sourcing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sourcing', program: ['suppliers'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `sourcing.suppliers at ${uuid}`)
  uuidReceiptOf('sourcing suppliers', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; savings 150, spend 10000, leadtime 35, suppliers 4, bid 3000, award 1, qualification 90, risk 20; crossing to procurement')
})
