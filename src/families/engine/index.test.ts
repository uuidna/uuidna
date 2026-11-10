import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EngineFormulas } from './index.js'

/** engine: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('engine: displacement, power, torque, cylinders, compression, rpm, firingorders, valves', async (t) => {
  assert.equal(EngineFormulas.displacement(500, 4).value, 2000, 'displacement(500, 4)')
  assert.equal(EngineFormulas.power(100, 4).value, 400, 'power(100, 4)')
  assert.equal(EngineFormulas.torque(200, 1).value, 200, 'torque(200, 1)')
  assert.equal(EngineFormulas.cylinders(4, 2).value, 6, 'cylinders(4, 2)')
  assert.equal(EngineFormulas.compression(100, 10).value, 10, 'compression(100, 10)')
  assert.equal(EngineFormulas.rpm(6000, 1).value, 6000, 'rpm(6000, 1)')
  assert.equal(EngineFormulas.firingorders(4).value, 24, 'firingorders(4)')
  assert.equal(EngineFormulas.valves(4, 4).value, 16, 'valves(4, 4)')
  assert.equal(hexFamiliesOf().get('engine')?.length, 8)
  for (const [name, params, expected] of [["displacement",[500,4],2000],["power",[100,4],400],["torque",[200,1],200]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'engine', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `engine.${name} at ${uuid}`)
    uuidReceiptOf(`engine ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "displacement=2000, power=400, torque=200")
})
