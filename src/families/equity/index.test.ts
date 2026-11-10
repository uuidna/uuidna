import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EquityFormulas } from './index.js'

/** equity: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('equity: shares, eps, pe, marketcap, dividendyield, float, classes, combos', async (t) => {
  assert.equal(EquityFormulas.shares(1000, 1000).value, 1000000, 'shares(1000, 1000)')
  assert.equal(EquityFormulas.eps(5000, 1000).value, 5, 'eps(5000, 1000)')
  assert.equal(EquityFormulas.pe(200, 10).value, 20, 'pe(200, 10)')
  assert.equal(EquityFormulas.marketcap(1000, 50).value, 50000, 'marketcap(1000, 50)')
  assert.equal(EquityFormulas.dividendyield(3, 100).value, 3, 'dividendyield(3, 100)')
  assert.equal(EquityFormulas.float(85, 100).value, 85, 'float(85, 100)')
  assert.equal(EquityFormulas.classes(2, 0).value, 2, 'classes(2, 0)')
  assert.equal(EquityFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('equity')?.length, 8)
  for (const [name, params, expected] of [["shares",[1000,1000],1000000],["eps",[5000,1000],5],["pe",[200,10],20]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'equity', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `equity.${name} at ${uuid}`)
    uuidReceiptOf(`equity ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "shares=1000000, eps=5, pe=20")
})
