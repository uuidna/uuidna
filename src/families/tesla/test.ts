import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TeslaFormulas } from './index.js'

/** The physics the patents state, exact: a 60 Hz two-pole field turns 3600 rpm; a 4-pole, 1800; a tuned circuit's
 *  resonance; a quarter wave; the Schumann modes 7.83, 13.6, 20.3 Hz; and the windings that cross Qpu.Coil. */
test('tesla: the relations the patents claim hold as formulas, and cross the lattice', async (t) => {
  assert.equal(TeslaFormulas.sync(60, 2).value, 3600)
  assert.equal(TeslaFormulas.sync(60, 4).value, 1800)
  assert.equal(TeslaFormulas.sync(50, 4).value, 1500)
  assert.equal(TeslaFormulas.slip(1800, 1750).value, 28, '2.8 % slip')
  assert.equal(TeslaFormulas.resonance(100, 1000).value, 503, '100 µH with 1000 pF resonates near 503 kHz')
  assert.equal(TeslaFormulas.turns(10, 1000).value, 100000, 'a hundred to one, in thousandths')
  assert.equal(TeslaFormulas.quarter(150).value, 500, 'Colorado Springs: ~150 kHz wants a 500 m quarter wave')
  assert.equal(TeslaFormulas.schumann(1).value, 7830, 'the fundamental, 7.83 Hz')
  for (const n of [2, 3, 4]) assert.equal(TeslaFormulas.schumann(n).value, Math.round(7830 * Math.sqrt((n * (n + 1)) / 2)), `mode ${n}: 7.83 Hz · √(n(n+1)/2)`)
  assert.equal(TeslaFormulas.earth(1).value, 40075)
  assert.equal(TeslaFormulas.field(2, 1).value, 2, 'two phases, one pole pair: 381,968')
  assert.equal(TeslaFormulas.field(3, 2).value, 6)
  assert.equal(TeslaFormulas.period(150).value, 6667)
  assert.equal(TeslaFormulas.energy(1000000, 10000).value, 50000000, '1 µF at 10 kV holds 50 J = 50 000 000 µJ')
  assert.equal(TeslaFormulas.windings(2, 7).value, 14, 'the lattice coil: coins × rays = faces')
  assert.equal(hexFamiliesOf().get('tesla')?.length, 11)
  for (const [name, params, expected] of [['sync', [60, 2], 3600], ['schumann', [1], 7830], ['windings', [2, 7], 14]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'tesla', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(Number(run.value), expected, `tesla.${name} at ${uuid}`)
    assert.equal(run.holds, true)
    uuidReceiptOf(`tesla ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('11 formulas; windings(2, 7) = 14 = faces: the cross with Qpu.Coil')
})
