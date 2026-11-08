import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnnuityFormulas } from './index.js'
import '../../mcp/families.js'

test('annuity: futurevalue, presentvalue, payment, totalpaid, interestportion, principalportion, periods, balance — crossing to accounting', async (t) => {
  assert.equal(AnnuityFormulas.futurevalue(100, 12).value, 1200, 'a year of level payments')
  assert.equal(AnnuityFormulas.presentvalue(100, 12, 10).value, 1080)
  assert.equal(AnnuityFormulas.payment(1200, 12).value, 100, 'the level payment')
  assert.equal(AnnuityFormulas.totalpaid(100, 12).value, 1200)
  assert.equal(AnnuityFormulas.interestportion(1000, 5).value, 50)
  assert.equal(AnnuityFormulas.principalportion(100, 50).value, 50)
  assert.equal(AnnuityFormulas.principalportion(50, 100).value, 0)
  assert.equal(AnnuityFormulas.periods(1200, 100).value, 12, 'periods to clear the total')
  assert.equal(AnnuityFormulas.balance(1000, 300).value, 700)
  assert.equal(AnnuityFormulas.futurevalue(100, 12).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('annuity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'annuity', program: ['futurevalue'], params: [100, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `annuity.futurevalue at ${uuid}`)
  uuidReceiptOf('annuity futurevalue', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; futurevalue 1200, presentvalue 1080, payment 100, totalpaid 1200, interestportion 50, principalportion 50, periods 12, balance 700; crossing to accounting')
})
