import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BondFormulas } from './index.js'

/** bond: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('bond: coupon, facevalue, yield, maturity, duration, payments, rating, combos', async (t) => {
  assert.equal(BondFormulas.coupon(5, 100).value, 5, 'coupon(5, 100)')
  assert.equal(BondFormulas.facevalue(1000, 1).value, 1000, 'facevalue(1000, 1)')
  assert.equal(BondFormulas.yield(4, 100).value, 4, 'yield(4, 100)')
  assert.equal(BondFormulas.maturity(10, 0).value, 10, 'maturity(10, 0)')
  assert.equal(BondFormulas.duration(90, 10).value, 9, 'duration(90, 10)')
  assert.equal(BondFormulas.payments(10, 2).value, 20, 'payments(10, 2)')
  assert.equal(BondFormulas.rating(10, 2).value, 8, 'rating(10, 2)')
  assert.equal(BondFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('bond')?.length, 8)
  for (const [name, params, expected] of [["coupon",[5,100],5],["facevalue",[1000,1],1000],["yield",[4,100],4]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'bond', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `bond.${name} at ${uuid}`)
    uuidReceiptOf(`bond ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "coupon=5, facevalue=1000, yield=4")
})
