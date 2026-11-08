import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LotteryFormulas } from './index.js'
import '../../mcp/families.js'

test('lottery: combinations, coverage, expectedvalue, houseedge, jackpotshare, oddsdenominator, rollover, ticketcost — crossing to combinatorics', async (t) => {
  assert.equal(LotteryFormulas.combinations(49, 6).value, 13983816, 'the 6-from-49 draw')
  assert.equal(LotteryFormulas.coverage(250, 1000).value, 25)
  assert.equal(LotteryFormulas.expectedvalue(50000, 10000).value, 5)
  assert.equal(LotteryFormulas.houseedge(1000, 500).value, 50)
  assert.equal(LotteryFormulas.jackpotshare(60000, 4).value, 15000, 'each winner\'s share')
  assert.equal(LotteryFormulas.oddsdenominator(69, 5, 26).value, 292201338, 'one in 292 million')
  assert.equal(LotteryFormulas.rollover(50000, 15000).value, 65000)
  assert.equal(LotteryFormulas.ticketcost(1000, 2).value, 2000)
  assert.equal(LotteryFormulas.combinations(49, 6).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('lottery')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lottery', program: ['combinations'], params: [49, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13983816, `lottery.combinations at ${uuid}`)
  uuidReceiptOf('lottery combinations', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; combinations 13983816, coverage 25, expectedvalue 5, houseedge 50, jackpotshare 15000, oddsdenominator 292201338, rollover 65000, ticketcost 2000; crossing to combinatorics')
})
