import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HedgingFormulas } from './index.js'
import '../../mcp/families.js'

test('hedging: ratio, delta, exposure, coverage, basis, notional, offset, residual — crossing to trading', async (t) => {
  assert.equal(HedgingFormulas.ratio(75, 100).value, 75, 'three quarters of the position covered')
  assert.equal(HedgingFormulas.delta(500, 300).value, 200, 'net delta after the hedge')
  assert.equal(HedgingFormulas.exposure(200, 50).value, 10000)
  assert.equal(HedgingFormulas.coverage(80, 100).value, 80)
  assert.equal(HedgingFormulas.basis(105, 100).value, 5, 'spot over future')
  assert.equal(HedgingFormulas.notional(10, 1000).value, 10000)
  assert.equal(HedgingFormulas.offset(400, 150).value, 250, 'longs over shorts')
  assert.equal(HedgingFormulas.residual(1000, 600).value, 400, 'risk left unhedged')
  assert.equal(HedgingFormulas.delta(300, 500).value, 0, 'fully hedged, no net delta')
  assert.equal(HedgingFormulas.ratio(75, 100).dst, 'trading')
  assert.equal(hexFamiliesOf().get('hedging')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hedging', program: ['ratio'], params: [75, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `hedging.ratio at ${uuid}`)
  uuidReceiptOf('hedging ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratio 75, delta 200, exposure 10000, coverage 80, basis 5, notional 10000, offset 250, residual 400; crossing to trading')
})
