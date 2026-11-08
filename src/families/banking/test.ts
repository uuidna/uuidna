import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BankingFormulas } from './index.js'
import '../../mcp/families.js'

test('banking: reserve, loan, capital, liquidity, spread, apr, credit, multiplier — crossing to accounting', async (t) => {
  assert.equal(BankingFormulas.reserve(1000000, 10).value, 100000, '10% reserve requirement')
  assert.equal(BankingFormulas.loan(1000000, 100000).value, 900000, 'the lendable balance')
  assert.equal(BankingFormulas.capital(500000, 8).value, 40000, '8% capital adequacy')
  assert.equal(BankingFormulas.liquidity(120000, 100000).value, 120, 'a 120% liquidity coverage')
  assert.equal(BankingFormulas.spread(600, 200).value, 400, 'net interest spread in bps')
  assert.equal(BankingFormulas.apr(300, 10000).value, 3, 'a 3% effective APR')
  assert.equal(BankingFormulas.credit(10000, 6000).value, 4000)
  assert.equal(BankingFormulas.multiplier(10).value, 10, 'a 10% reserve multiplies tenfold')
  assert.equal(BankingFormulas.reserve(1000000, 10).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('banking')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'banking', program: ['loan'], params: [1000000, 100000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 900000, `banking.loan at ${uuid}`)
  uuidReceiptOf('banking loan', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reserve 100000, loan 900000, capital 40000, liquidity 120, spread 400, apr 3, credit 4000, multiplier 10; crossing to accounting')
})
