import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AccountingFormulas } from './index.js'
import '../../mcp/families.js'

test('accounting: the ledger balances and reports — equity, net, depreciation, ratios, tax — read by the law', async (t) => {
  assert.equal(AccountingFormulas.balance(5000, 5000).value, 1, 'debits equal credits')
  assert.equal(AccountingFormulas.balance(5000, 4900).value, 0, 'out of balance')
  assert.equal(AccountingFormulas.equity(100000, 60000).value, 40000)
  assert.equal(AccountingFormulas.equity(60000, 100000).value, -40000, 'insolvency is a valid reading')
  assert.equal(AccountingFormulas.net(200000, 150000).value, 50000)
  assert.equal(AccountingFormulas.depreciation(50000, 5000, 9).value, 5000, 'straight-line per period')
  assert.equal(AccountingFormulas.margin(50000, 200000).value, 25, '25% profit margin')
  assert.equal(AccountingFormulas.current(150000, 100000).value, 150, 'current ratio 1.5 (×100)')
  assert.equal(AccountingFormulas.accrue(10000, 8, 365).value, 800, 'a year of interest')
  assert.equal(AccountingFormulas.tax(50000, 20).value, 10000, '20% tax')
  assert.equal(AccountingFormulas.net(200000, 150000).dst, 'law', 'the ledger is read by the law')
  assert.equal(hexFamiliesOf().get('accounting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'accounting', program: ['net'], params: [200000, 150000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50000, `accounting.net at ${uuid}`)
  uuidReceiptOf('accounting net', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; balance 1, equity 40000/-40000, net 50000, depreciation 5000, margin 25%, current 150, accrue 800, tax 10000; crossing to law')
})
