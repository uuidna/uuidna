import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FinancialFormulas } from './index.js'
import '../../mcp/families.js'

test('financial: breakeven, payback, roi, margin, leverage, burn, runway, compound — crossing to accounting', async (t) => {
  assert.equal(FinancialFormulas.breakeven(100000, 40).value, 2500)
  assert.equal(FinancialFormulas.payback(50000, 12000).value, 5, 'rounded up to whole periods')
  assert.equal(FinancialFormulas.roi(15000, 10000).value, 50)
  assert.equal(FinancialFormulas.margin(200000, 120000).value, 40)
  assert.equal(FinancialFormulas.leverage(300000, 100000).value, 3)
  assert.equal(FinancialFormulas.burn(80000, 50000).value, 30000)
  assert.equal(FinancialFormulas.burn(50000, 80000).value, 0, 'profitable: no burn')
  assert.equal(FinancialFormulas.runway(300000, 30000).value, 10, 'ten months')
  assert.equal(FinancialFormulas.compound(1000, 10, 3).value, 1331, '1000 at 10% for three periods')
  assert.equal(FinancialFormulas.roi(15000, 10000).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('financial')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'financial', program: ['compound'], params: [1000, 10, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1331, `financial.compound at ${uuid}`)
  uuidReceiptOf('financial compound', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; breakeven 2500, payback 5, roi 50, margin 40, leverage 3, burn 30000, runway 10, compound 1331; crossing to accounting')
})
