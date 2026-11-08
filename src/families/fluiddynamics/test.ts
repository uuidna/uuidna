import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FluiddynamicsFormulas } from './index.js'
import '../../mcp/families.js'

test('fluiddynamics: reynolds, flowrate, pressuredrop, velocity, bernoulli, viscosity, froude, machnumber — crossing to aerodynamics', async (t) => {
  assert.equal(FluiddynamicsFormulas.reynolds(200, 3, 2).value, 300, 'turbulent flow')
  assert.equal(FluiddynamicsFormulas.flowrate(5, 20).value, 100)
  assert.equal(FluiddynamicsFormulas.pressuredrop(100, 8, 4).value, 200)
  assert.equal(FluiddynamicsFormulas.velocity(1000, 25).value, 40)
  assert.equal(FluiddynamicsFormulas.bernoulli(100, 2, 10).value, 200, 'static plus dynamic')
  assert.equal(FluiddynamicsFormulas.viscosity(500, 10).value, 50)
  assert.equal(FluiddynamicsFormulas.froude(20, 10, 2).value, 20)
  assert.equal(FluiddynamicsFormulas.machnumber(680, 340).value, 200, 'Mach 2.00')
  assert.equal(FluiddynamicsFormulas.flowrate(5, 20).dst, 'aerodynamics')
  assert.equal(hexFamiliesOf().get('fluiddynamics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fluiddynamics', program: ['flowrate'], params: [5, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `fluiddynamics.flowrate at ${uuid}`)
  uuidReceiptOf('fluiddynamics flowrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reynolds 300, flowrate 100, pressuredrop 200, velocity 40, bernoulli 200, viscosity 50, froude 20, machnumber 200; crossing to aerodynamics')
})
