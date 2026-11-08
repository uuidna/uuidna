import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DerivativesFormulas } from './index.js'
import '../../mcp/families.js'

test('derivatives: intrinsic, leverage, delta, premium, payoff, breakeven, moneyness, margin — crossing to trading', async (t) => {
  assert.equal(DerivativesFormulas.intrinsic(120, 100).value, 20, 'call in the money')
  assert.equal(DerivativesFormulas.intrinsic(80, 100).value, 0, 'out of the money')
  assert.equal(DerivativesFormulas.leverage(10000, 500).value, 20, 'twenty to one')
  assert.equal(DerivativesFormulas.delta(50, 100).value, 50)
  assert.equal(DerivativesFormulas.premium(20, 5).value, 25)
  assert.equal(DerivativesFormulas.payoff(130, 100).value, 30)
  assert.equal(DerivativesFormulas.breakeven(100, 5).value, 105)
  assert.equal(DerivativesFormulas.moneyness(110, 100).value, 110)
  assert.equal(DerivativesFormulas.margin(10000, 15).value, 1500)
  assert.equal(DerivativesFormulas.intrinsic(120, 100).dst, 'trading')
  assert.equal(hexFamiliesOf().get('derivatives')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'derivatives', program: ['intrinsic'], params: [120, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `derivatives.intrinsic at ${uuid}`)
  uuidReceiptOf('derivatives intrinsic', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; intrinsic 20, leverage 20, delta 50, premium 25, payoff 30, breakeven 105, moneyness 110, margin 1500; crossing to trading')
})
