import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OrbitFormulas } from './index.js'
import '../../mcp/families.js'

test('orbit: period, semimajoraxis, eccentricity, apoapsis, periapsis, velocity, inclination, meananomaly — crossing to astronomy', async (t) => {
  assert.equal(OrbitFormulas.period(62800, 8).value, 7850, 'the path at speed')
  assert.equal(OrbitFormulas.semimajoraxis(500, 300).value, 400)
  assert.equal(OrbitFormulas.eccentricity(500, 300).value, 250, 'per-thousand eccentricity')
  assert.equal(OrbitFormulas.eccentricity(300, 500).value, 0)
  assert.equal(OrbitFormulas.apoapsis(400, 250).value, 500, 'the far point')
  assert.equal(OrbitFormulas.periapsis(400, 250).value, 300, 'the near point')
  assert.equal(OrbitFormulas.velocity(60000, 60).value, 1000)
  assert.equal(OrbitFormulas.inclination(30, 60).value, 45, 'degrees of tilt')
  assert.equal(OrbitFormulas.meananomaly(10, 45).value, 90, 'swept angle mod a turn')
  assert.equal(OrbitFormulas.period(62800, 8).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('orbit')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'orbit', program: ['period'], params: [62800, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 7850, `orbit.period at ${uuid}`)
  uuidReceiptOf('orbit period', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; period 7850, semimajoraxis 400, eccentricity 250, apoapsis 500, periapsis 300, velocity 1000, inclination 45, meananomaly 90; crossing to astronomy')
})
