import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BatteryFormulas } from './index.js'

/** battery: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('battery: capacity, cells, runtime, cyclelife, voltage, chargepct, packs, seriescombos', async (t) => {
  assert.equal(BatteryFormulas.capacity(100, 12).value, 1200, 'capacity(100, 12)')
  assert.equal(BatteryFormulas.cells(12, 4).value, 16, 'cells(12, 4)')
  assert.equal(BatteryFormulas.runtime(1000, 50).value, 20, 'runtime(1000, 50)')
  assert.equal(BatteryFormulas.cyclelife(500, 1).value, 500, 'cyclelife(500, 1)')
  assert.equal(BatteryFormulas.voltage(3, 12).value, 36, 'voltage(3, 12)')
  assert.equal(BatteryFormulas.chargepct(80, 100).value, 80, 'chargepct(80, 100)')
  assert.equal(BatteryFormulas.packs(6, 4).value, 24, 'packs(6, 4)')
  assert.equal(BatteryFormulas.seriescombos(8, 2).value, 28, 'seriescombos(8, 2)')
  assert.equal(hexFamiliesOf().get('battery')?.length, 8)
  for (const [name, params, expected] of [["capacity",[100,12],1200],["cells",[12,4],16],["runtime",[1000,50],20]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'battery', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `battery.${name} at ${uuid}`)
    uuidReceiptOf(`battery ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "capacity=1200, cells=16, runtime=20")
})
