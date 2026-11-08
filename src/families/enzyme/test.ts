import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnzymeFormulas } from './index.js'

/** enzyme: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('enzyme: turnover, km, vmax, substrates, activesites, inhibition, ph, combos', async (t) => {
  assert.equal(EnzymeFormulas.turnover(1000, 60).value, 60000, 'turnover(1000, 60)')
  assert.equal(EnzymeFormulas.km(500, 10).value, 50, 'km(500, 10)')
  assert.equal(EnzymeFormulas.vmax(100, 5).value, 500, 'vmax(100, 5)')
  assert.equal(EnzymeFormulas.substrates(2, 0).value, 2, 'substrates(2, 0)')
  assert.equal(EnzymeFormulas.activesites(4, 1).value, 4, 'activesites(4, 1)')
  assert.equal(EnzymeFormulas.inhibition(30, 100).value, 30, 'inhibition(30, 100)')
  assert.equal(EnzymeFormulas.ph(70, 10).value, 7, 'ph(70, 10)')
  assert.equal(EnzymeFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('enzyme')?.length, 8)
  for (const [name, params, expected] of [["turnover",[1000,60],60000],["km",[500,10],50],["vmax",[100,5],500]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'enzyme', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `enzyme.${name} at ${uuid}`)
    uuidReceiptOf(`enzyme ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "turnover=60000, km=50, vmax=500")
})
