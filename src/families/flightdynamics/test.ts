import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FlightdynamicsFormulas } from './index.js'
import '../../mcp/families.js'

test('flightdynamics: loadfactor, stallspeed, turnrate, climbgradient, wingloading, thrusttoweight, rangefactor, bankangle — crossing to dynamics', async (t) => {
  assert.equal(FlightdynamicsFormulas.loadfactor(2400, 1000).value, 240, '2.4 g pull-up')
  assert.equal(FlightdynamicsFormulas.stallspeed(600, 2).value, 300)
  assert.equal(FlightdynamicsFormulas.turnrate(300, 20).value, 15, 'degrees of turn per unit')
  assert.equal(FlightdynamicsFormulas.climbgradient(500, 10000).value, 5, 'a 5% climb gradient')
  assert.equal(FlightdynamicsFormulas.wingloading(1200, 16).value, 75)
  assert.equal(FlightdynamicsFormulas.thrusttoweight(300, 1000).value, 30, 'T/W of 0.3')
  assert.equal(FlightdynamicsFormulas.rangefactor(500, 6).value, 3000)
  assert.equal(FlightdynamicsFormulas.bankangle(173, 100).value, 173, 'about a 60° bank')
  assert.equal(FlightdynamicsFormulas.turnrate(300, 0).value, 0)
  assert.equal(FlightdynamicsFormulas.loadfactor(2400, 1000).dst, 'dynamics')
  assert.equal(hexFamiliesOf().get('flightdynamics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'flightdynamics', program: ['turnrate'], params: [300, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `flightdynamics.turnrate at ${uuid}`)
  uuidReceiptOf('flightdynamics turnrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; loadfactor 240, stallspeed 300, turnrate 15, climbgradient 5, wingloading 75, thrusttoweight 30, rangefactor 3000, bankangle 173; crossing to dynamics')
})
