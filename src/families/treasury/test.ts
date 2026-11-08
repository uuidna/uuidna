import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TreasuryFormulas } from './index.js'
import '../../mcp/families.js'

test('treasury: liquidity, workingcapital, cashflow, interest, maturity, hedge, reserve, conversion — crossing to accounting', async (t) => {
  assert.equal(TreasuryFormulas.liquidity(200, 100).value, 200, 'current ratio as a percentage')
  assert.equal(TreasuryFormulas.workingcapital(500, 300).value, 200)
  assert.equal(TreasuryFormulas.workingcapital(300, 500).value, 0, 'never below zero')
  assert.equal(TreasuryFormulas.cashflow(100, 60).value, 40)
  assert.equal(TreasuryFormulas.cashflow(60, 100).value, -40, 'cash flow may be negative')
  assert.equal(TreasuryFormulas.interest(1000, 5).value, 50)
  assert.equal(TreasuryFormulas.maturity(90).value, 90)
  assert.equal(TreasuryFormulas.hedge(80, 100).value, 80, 'hedge ratio as a percentage')
  assert.equal(TreasuryFormulas.reserve(120, 100).value, 120)
  assert.equal(TreasuryFormulas.conversion(75, 100).value, 75)
  assert.equal(TreasuryFormulas.cashflow(100, 60).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('treasury')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'treasury', program: ['interest'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `treasury.interest at ${uuid}`)
  uuidReceiptOf('treasury interest', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; liquidity 200, workingcapital 200, cashflow 40/-40, interest 50, maturity 90, hedge 80, reserve 120, conversion 75; crossing to accounting')
})
