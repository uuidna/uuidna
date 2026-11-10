import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OrbitalFormulas } from './index.js'
import '../../mcp/families.js'

test('orbital: period, apoapsis, periapsis, eccentricity, semimajor, velocity, inclination, deltav — crossing to astronomy', async (t) => {
  assert.equal(OrbitalFormulas.period(1000, 6).value, 1000, 'one trip around')
  assert.equal(OrbitalFormulas.apoapsis(500, 100).value, 600, 'the farthest point')
  assert.equal(OrbitalFormulas.periapsis(500, 100).value, 400, 'the nearest point')
  assert.equal(OrbitalFormulas.eccentricity(100, 500).value, 200)
  assert.equal(OrbitalFormulas.semimajor(600, 400).value, 500, 'the mean radius')
  assert.equal(OrbitalFormulas.velocity(6000, 6).value, 1000, 'speed along the path')
  assert.equal(OrbitalFormulas.inclination(50, 100).value, 45)
  assert.equal(OrbitalFormulas.deltav(3000, 2000).value, 5000, 'the burn budget')
  assert.equal(OrbitalFormulas.periapsis(100, 500).value, 0)
  assert.equal(OrbitalFormulas.apoapsis(500, 100).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('orbital')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'orbital', program: ['period'], params: [1000, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `orbital.period at ${uuid}`)
  uuidReceiptOf('orbital period', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; period 1000, apoapsis 600, periapsis 400, eccentricity 200, semimajor 500, velocity 1000, inclination 45, deltav 5000; crossing to astronomy')
})
