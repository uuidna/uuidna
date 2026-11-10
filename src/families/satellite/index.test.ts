import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SatelliteFormulas } from './index.js'

/** satellite: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('satellite: altitude, period, velocity, inclination, coverage, constellation, bands, combos', async (t) => {
  assert.equal(SatelliteFormulas.altitude(400, 1).value, 400, 'altitude(400, 1)')
  assert.equal(SatelliteFormulas.period(5400, 60).value, 90, 'period(5400, 60)')
  assert.equal(SatelliteFormulas.velocity(7, 1000).value, 7000, 'velocity(7, 1000)')
  assert.equal(SatelliteFormulas.inclination(90, 51).value, 39, 'inclination(90, 51)')
  assert.equal(SatelliteFormulas.coverage(80, 100).value, 80, 'coverage(80, 100)')
  assert.equal(SatelliteFormulas.constellation(24, 3).value, 72, 'constellation(24, 3)')
  assert.equal(SatelliteFormulas.bands(4, 0).value, 4, 'bands(4, 0)')
  assert.equal(SatelliteFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('satellite')?.length, 8)
  for (const [name, params, expected] of [["altitude",[400,1],400],["period",[5400,60],90],["velocity",[7,1000],7000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'satellite', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `satellite.${name} at ${uuid}`)
    uuidReceiptOf(`satellite ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "altitude=400, period=90, velocity=7000")
})
