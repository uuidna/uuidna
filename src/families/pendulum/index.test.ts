import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PendulumFormulas } from './index.js'

/** pendulum: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('pendulum: period, frequency, length, swings, amplitude, energy, bobmass, combos', async (t) => {
  assert.equal(PendulumFormulas.period(200, 10).value, 20, 'period(200, 10)')
  assert.equal(PendulumFormulas.frequency(100, 5).value, 20, 'frequency(100, 5)')
  assert.equal(PendulumFormulas.length(2, 1).value, 2, 'length(2, 1)')
  assert.equal(PendulumFormulas.swings(60, 2).value, 120, 'swings(60, 2)')
  assert.equal(PendulumFormulas.amplitude(90, 10).value, 80, 'amplitude(90, 10)')
  assert.equal(PendulumFormulas.energy(50, 2).value, 100, 'energy(50, 2)')
  assert.equal(PendulumFormulas.bobmass(5, 1).value, 5, 'bobmass(5, 1)')
  assert.equal(PendulumFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('pendulum')?.length, 8)
  for (const [name, params, expected] of [["period",[200,10],20],["frequency",[100,5],20],["length",[2,1],2]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'pendulum', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `pendulum.${name} at ${uuid}`)
    uuidReceiptOf(`pendulum ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "period=20, frequency=20, length=2")
})
