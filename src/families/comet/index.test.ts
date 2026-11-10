import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CometFormulas } from './index.js'

/** comet: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('comet: period, tail, nucleus, perihelion, orbits, outgassing, aphelion, combos', async (t) => {
  assert.equal(CometFormulas.period(76, 1).value, 76, 'period(76, 1)')
  assert.equal(CometFormulas.tail(100, 1000).value, 100000, 'tail(100, 1000)')
  assert.equal(CometFormulas.nucleus(10, 1).value, 10, 'nucleus(10, 1)')
  assert.equal(CometFormulas.perihelion(1000, 10).value, 100, 'perihelion(1000, 10)')
  assert.equal(CometFormulas.orbits(1, 0).value, 1, 'orbits(1, 0)')
  assert.equal(CometFormulas.outgassing(5, 100).value, 5, 'outgassing(5, 100)')
  assert.equal(CometFormulas.aphelion(35, 1).value, 35, 'aphelion(35, 1)')
  assert.equal(CometFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('comet')?.length, 8)
  for (const [name, params, expected] of [["period",[76,1],76],["tail",[100,1000],100000],["nucleus",[10,1],10]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'comet', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `comet.${name} at ${uuid}`)
    uuidReceiptOf(`comet ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "period=76, tail=100000, nucleus=10")
})
