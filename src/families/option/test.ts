import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OptionFormulas } from './index.js'

/** option: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('option: strike, premium, contracts, expiry, intrinsic, breakeven, greeks, combos', async (t) => {
  assert.equal(OptionFormulas.strike(100, 1).value, 100, 'strike(100, 1)')
  assert.equal(OptionFormulas.premium(5, 100).value, 500, 'premium(5, 100)')
  assert.equal(OptionFormulas.contracts(10, 100).value, 1000, 'contracts(10, 100)')
  assert.equal(OptionFormulas.expiry(30, 0).value, 30, 'expiry(30, 0)')
  assert.equal(OptionFormulas.intrinsic(120, 100).value, 20, 'intrinsic(120, 100)')
  assert.equal(OptionFormulas.breakeven(100, 5).value, 105, 'breakeven(100, 5)')
  assert.equal(OptionFormulas.greeks(5, 0).value, 5, 'greeks(5, 0)')
  assert.equal(OptionFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('option')?.length, 8)
  for (const [name, params, expected] of [["strike",[100,1],100],["premium",[5,100],500],["contracts",[10,100],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'option', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `option.${name} at ${uuid}`)
    uuidReceiptOf(`option ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "strike=100, premium=500, contracts=1000")
})
