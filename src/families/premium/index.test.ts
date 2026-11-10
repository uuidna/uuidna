import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PremiumFormulas } from './index.js'
import '../../mcp/families.js'

test('premium: gross, net, rate, pure, expense, profit, installment, earned — crossing to econ', async (t) => {
  assert.equal(PremiumFormulas.gross(1000, 20).value, 1200, 'base with a 20% loading')
  assert.equal(PremiumFormulas.net(1200, 15).value, 1020, 'gross less a 15% commission')
  assert.equal(PremiumFormulas.rate(5000, 100).value, 50, 'premium per unit of exposure')
  assert.equal(PremiumFormulas.pure(8000, 200).value, 40, 'expected losses per exposure')
  assert.equal(PremiumFormulas.expense(1000, 25).value, 250)
  assert.equal(PremiumFormulas.profit(1000, 600, 250).value, 150, 'underwriting profit')
  assert.equal(PremiumFormulas.installment(1200, 12).value, 100, 'twelve equal installments')
  assert.equal(PremiumFormulas.earned(1200, 6, 12).value, 600, 'half the term earned')
  assert.equal(PremiumFormulas.gross(1000, 20).dst, 'econ')
  assert.equal(hexFamiliesOf().get('premium')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'premium', program: ['gross'], params: [1000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `premium.gross at ${uuid}`)
  uuidReceiptOf('premium gross', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gross 1200, net 1020, rate 50, pure 40, expense 250, profit 150, installment 100, earned 600; crossing to econ')
})
