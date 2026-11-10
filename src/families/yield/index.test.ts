import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { YieldFormulas } from './index.js'
import '../../mcp/families.js'

test('yield: couponrate, current, dividendyield, effective, nominal, realyield, taxequivalent, yieldtomaturity — crossing to accounting', async (t) => {
  assert.equal(YieldFormulas.couponrate(80, 1000).value, 8)
  assert.equal(YieldFormulas.current(500, 10000).value, 5, 'five percent current yield')
  assert.equal(YieldFormulas.dividendyield(250, 10000).value, 2)
  assert.equal(YieldFormulas.effective(2, 4).value, 8, 'rate compounded over four periods')
  assert.equal(YieldFormulas.nominal(60, 1000).value, 6)
  assert.equal(YieldFormulas.realyield(7, 3).value, 4, 'nominal less inflation')
  assert.equal(YieldFormulas.realyield(2, 5).value, 0)
  assert.equal(YieldFormulas.taxequivalent(4, 20).value, 5)
  assert.equal(YieldFormulas.yieldtomaturity(50, 10, 1000).value, 6)
  assert.equal(YieldFormulas.current(500, 10000).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('yield')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'yield', program: ['current'], params: [500, 10000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `yield.current at ${uuid}`)
  uuidReceiptOf('yield current', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; couponrate 8, current 5, dividendyield 2, effective 8, nominal 6, realyield 4, taxequivalent 5, yieldtomaturity 6; crossing to accounting')
})
