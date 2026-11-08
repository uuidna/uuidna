import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AvionicsFormulas } from './index.js'
import '../../mcp/families.js'

test('avionics: airspeed, altitudehold, headingerror, glidepath, fuelflow, climbrate, transponder, navtolerance — crossing to aerodynamics', async (t) => {
  assert.equal(AvionicsFormulas.airspeed(4500, 9).value, 500, 'knots over the leg')
  assert.equal(AvionicsFormulas.altitudehold(10200, 10000).value, 200, 'feet off the hold altitude')
  assert.equal(AvionicsFormulas.headingerror(350, 10).value, 20, 'the shortest turn is 20°')
  assert.equal(AvionicsFormulas.glidepath(15000, 1000).value, 15, 'a 15:1 glide ratio')
  assert.equal(AvionicsFormulas.fuelflow(600, 3).value, 1800)
  assert.equal(AvionicsFormulas.climbrate(3000, 2).value, 1500, 'feet per minute')
  assert.equal(AvionicsFormulas.transponder(1200).value, 1, 'a valid VFR squawk')
  assert.equal(AvionicsFormulas.transponder(1280).value, 0)
  assert.equal(AvionicsFormulas.navtolerance(2, 5).value, 1, 'within tolerance')
  assert.equal(AvionicsFormulas.navtolerance(9, 5).value, 0)
  assert.equal(AvionicsFormulas.airspeed(4500, 9).dst, 'aerodynamics')
  assert.equal(hexFamiliesOf().get('avionics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'avionics', program: ['airspeed'], params: [4500, 9] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `avionics.airspeed at ${uuid}`)
  uuidReceiptOf('avionics airspeed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; airspeed 500, altitudehold 200, headingerror 20, glidepath 15, fuelflow 1800, climbrate 1500, transponder 1, navtolerance 1; crossing to aerodynamics')
})
