import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TradingFormulas } from './index.js'
import '../../mcp/families.js'

test('trading: P&L, position, leverage, margin, notional, risk, stop, fee — booked toward the ledger', async (t) => {
  assert.equal(TradingFormulas.pnl(100, 130, 10).value, 300, 'a winning position')
  assert.equal(TradingFormulas.pnl(130, 100, 10).value, -300, 'a loss is a valid reading')
  assert.equal(TradingFormulas.position(10000, 130).value, 76, 'whole units a capital affords')
  assert.equal(TradingFormulas.leverage(50000, 10000).value, 5, '5x leverage')
  assert.equal(TradingFormulas.margin(50000, 20).value, 10000, '20% initial margin')
  assert.equal(TradingFormulas.notional(10, 130).value, 1300)
  assert.equal(TradingFormulas.risk(100000, 2).value, 2000, 'a 2% risk budget')
  assert.equal(TradingFormulas.stop(130, 15).value, 115, 'stop below entry')
  assert.equal(TradingFormulas.stop(10, 15).value, 0, 'a stop cannot go below zero')
  assert.equal(TradingFormulas.fee(100000, 5).value, 50, '5 bps commission')
  assert.equal(TradingFormulas.pnl(100, 130, 10).dst, 'accounting', 'a trade books to the ledger')
  assert.equal(hexFamiliesOf().get('trading')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'trading', program: ['notional'], params: [10, 130] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1300, `trading.notional at ${uuid}`)
  uuidReceiptOf('trading notional', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pnl 300/-300, position 76, leverage 5x, margin 10000, risk 2000, stop 115, fee 50 bps; crossing to accounting')
})
