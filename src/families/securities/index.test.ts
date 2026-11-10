import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SecuritiesFormulas } from './index.js'
import '../../mcp/families.js'

test('securities: market cap, P/E, coupon, dividend, dilution, spread, gain, split — crossing to law', async (t) => {
  assert.equal(SecuritiesFormulas.marketcap(1000000, 50).value, 50000000)
  assert.equal(SecuritiesFormulas.pe(100, 5).value, 20, 'a P/E of 20')
  assert.equal(SecuritiesFormulas.coupon(1000, 5).value, 50, 'a 5% coupon')
  assert.equal(SecuritiesFormulas.dividend(500, 3).value, 1500)
  assert.equal(SecuritiesFormulas.dilution(200, 800).value, 20, '20% dilution from the issue')
  assert.equal(SecuritiesFormulas.spread(99, 101).value, 2)
  assert.equal(SecuritiesFormulas.gain(40, 55, 100).value, 1500, 'a winning holding')
  assert.equal(SecuritiesFormulas.gain(55, 40, 100).value, -1500, 'a loss is a valid reading')
  assert.equal(SecuritiesFormulas.split(1000, 3).value, 3000, 'a 3-for-1 split')
  assert.equal(SecuritiesFormulas.pe(100, 5).dst, 'law')
  assert.equal(hexFamiliesOf().get('securities')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'securities', program: ['coupon'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `securities.coupon at ${uuid}`)
  uuidReceiptOf('securities coupon', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; marketcap 50M, pe 20, coupon 50, dividend 1500, dilution 20%, spread 2, gain 1500/-1500, split 3000; crossing to law')
})
