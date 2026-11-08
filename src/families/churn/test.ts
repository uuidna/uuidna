import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChurnFormulas } from './index.js'
import '../../mcp/families.js'

test('churn: rate, retention, lifetime, netrevenue, reactivation, tenure, cohortdecay, risk — crossing to analytics', async (t) => {
  assert.equal(ChurnFormulas.rate(5, 100).value, 5, 'five of a hundred lost')
  assert.equal(ChurnFormulas.retention(95, 100).value, 95)
  assert.equal(ChurnFormulas.lifetime(200, 5).value, 4000, 'LTV proxy')
  assert.equal(ChurnFormulas.netrevenue(50, 30).value, 20)
  assert.equal(ChurnFormulas.netrevenue(30, 50).value, -20, 'net revenue may be negative')
  assert.equal(ChurnFormulas.reactivation(10, 40).value, 25, 'win-backs as a share of the churned')
  assert.equal(ChurnFormulas.tenure(18).value, 18)
  assert.equal(ChurnFormulas.cohortdecay(60, 100).value, 60)
  assert.equal(ChurnFormulas.risk(20, 200).value, 10)
  assert.equal(ChurnFormulas.rate(5, 100).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('churn')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'churn', program: ['retention'], params: [95, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `churn.retention at ${uuid}`)
  uuidReceiptOf('churn retention', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 5, retention 95, lifetime 4000, netrevenue 20/-20, reactivation 25, tenure 18, cohortdecay 60, risk 10; crossing to analytics')
})
