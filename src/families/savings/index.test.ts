import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SavingsFormulas } from './index.js'
import '../../mcp/families.js'

test('savings: interest, simplegrowth, futurevalue, deposit, apy, goalmonths, emergencyfund, rate — crossing to banking', async (t) => {
  assert.equal(SavingsFormulas.interest(1000, 5, 3).value, 150, 'three years of simple interest')
  assert.equal(SavingsFormulas.simplegrowth(1000, 5, 3).value, 1150, 'the balance it grows to')
  assert.equal(SavingsFormulas.futurevalue(1000, 200, 12).value, 3400, 'start plus a year of deposits')
  assert.equal(SavingsFormulas.deposit(200, 12).value, 2400, 'a year of monthly deposits')
  assert.equal(SavingsFormulas.apy(20).value, 21, 'effective annual yield')
  assert.equal(SavingsFormulas.goalmonths(10000, 500).value, 20, 'months to the goal')
  assert.equal(SavingsFormulas.goalmonths(10000, 0).value, 0)
  assert.equal(SavingsFormulas.emergencyfund(2000, 6).value, 12000, 'six months of expenses')
  assert.equal(SavingsFormulas.rate(150, 1000).value, 15, 'the implied annual rate')
  assert.equal(SavingsFormulas.rate(150, 0).value, 0)
  assert.equal(SavingsFormulas.interest(1000, 5, 3).dst, 'banking')
  assert.equal(hexFamiliesOf().get('savings')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'savings', program: ['goalmonths'], params: [10000, 500] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `savings.goalmonths at ${uuid}`)
  uuidReceiptOf('savings goalmonths', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; interest 150, simplegrowth 1150, futurevalue 3400, deposit 2400, apy 21, goalmonths 20, emergencyfund 12000, rate 15; crossing to banking')
})
