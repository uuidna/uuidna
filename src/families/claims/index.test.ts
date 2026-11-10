import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ClaimsFormulas } from './index.js'
import '../../mcp/families.js'

test('claims: frequency, severity, lossratio, reserve, settlement, deductible, payout, incurred — crossing to insurance', async (t) => {
  assert.equal(ClaimsFormulas.frequency(250, 1000).value, 250, 'claims per thousand policies')
  assert.equal(ClaimsFormulas.severity(50000, 100).value, 500, 'average loss per claim')
  assert.equal(ClaimsFormulas.lossratio(60000, 100000).value, 60)
  assert.equal(ClaimsFormulas.reserve(10000, 4000).value, 6000)
  assert.equal(ClaimsFormulas.reserve(100, 500).value, 0)
  assert.equal(ClaimsFormulas.settlement(5000, 500).value, 4500)
  assert.equal(ClaimsFormulas.settlement(100, 500).value, 0)
  assert.equal(ClaimsFormulas.deductible(5000, 500).value, 500, 'the insured keeps the deductible')
  assert.equal(ClaimsFormulas.payout(8000, 5000).value, 5000, 'capped at the limit')
  assert.equal(ClaimsFormulas.incurred(4000, 6000).value, 10000)
  assert.equal(ClaimsFormulas.frequency(250, 1000).dst, 'insurance')
  assert.equal(hexFamiliesOf().get('claims')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'claims', program: ['severity'], params: [50000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `claims.severity at ${uuid}`)
  uuidReceiptOf('claims severity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; frequency 250, severity 500, lossratio 60, reserve 6000, settlement 4500, deductible 500, payout 5000, incurred 10000; crossing to insurance')
})
