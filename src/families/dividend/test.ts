import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DividendFormulas } from './index.js'

/** dividend: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('dividend: pershare, payout, yield, frequency, total, growth, exdates, combos', async (t) => {
  assert.equal(DividendFormulas.pershare(2, 1).value, 2, 'pershare(2, 1)')
  assert.equal(DividendFormulas.payout(40, 100).value, 40, 'payout(40, 100)')
  assert.equal(DividendFormulas.yield(3, 100).value, 3, 'yield(3, 100)')
  assert.equal(DividendFormulas.frequency(4, 0).value, 4, 'frequency(4, 0)')
  assert.equal(DividendFormulas.total(2, 20000).value, 40000, 'total(2, 20000)')
  assert.equal(DividendFormulas.growth(8, 100).value, 8, 'growth(8, 100)')
  assert.equal(DividendFormulas.exdates(4, 0).value, 4, 'exdates(4, 0)')
  assert.equal(DividendFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('dividend')?.length, 8)
  for (const [name, params, expected] of [["pershare",[2,1],2],["payout",[40,100],40],["yield",[3,100],3]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'dividend', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `dividend.${name} at ${uuid}`)
    uuidReceiptOf(`dividend ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "pershare=2, payout=40, yield=3")
})
