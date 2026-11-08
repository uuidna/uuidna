import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DerivativeFormulas } from './index.js'
import '../../mcp/families.js'

test('derivative: intrinsic, payoff, notional, margin, leverage, breakeven, moneyness, settlement — crossing to econ', async (t) => {
  assert.equal(DerivativeFormulas.intrinsic(150, 100).value, 50, 'a call 50 in the money')
  assert.equal(DerivativeFormulas.intrinsic(90, 100).value, 0, 'out of the money')
  assert.equal(DerivativeFormulas.payoff(10, 50).value, 500, 'ten contracts at 50')
  assert.equal(DerivativeFormulas.notional(10, 100, 50).value, 50000)
  assert.equal(DerivativeFormulas.margin(50000, 20).value, 10000, 'twenty percent posted')
  assert.equal(DerivativeFormulas.leverage(50000, 10000).value, 5, 'five times levered')
  assert.equal(DerivativeFormulas.breakeven(100, 5).value, 105)
  assert.equal(DerivativeFormulas.moneyness(150, 100).value, 1, 'in the money')
  assert.equal(DerivativeFormulas.moneyness(90, 100).value, 0)
  assert.equal(DerivativeFormulas.settlement(120, 100, 10).value, 200, 'long future settles up')
  assert.equal(DerivativeFormulas.intrinsic(150, 100).dst, 'econ')
  assert.equal(hexFamiliesOf().get('derivative')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'derivative', program: ['intrinsic'], params: [150, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `derivative.intrinsic at ${uuid}`)
  uuidReceiptOf('derivative intrinsic', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; intrinsic 50, payoff 500, notional 50000, margin 10000, leverage 5, breakeven 105, moneyness 1, settlement 200; crossing to econ')
})
