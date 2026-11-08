import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HeliophysicsFormulas } from './index.js'
import '../../mcp/families.js'

test('heliophysics: coronalmass, cycle, flareclass, flux, irradiance, magneticindex, solarwind, sunspot — crossing to astronomy', async (t) => {
  assert.equal(HeliophysicsFormulas.coronalmass(12, 1000).value, 12000, 'mass by speed is momentum')
  assert.equal(HeliophysicsFormulas.cycle(2008, 2025).value, 6, 'seventeen years into the eleven-year cycle')
  assert.equal(HeliophysicsFormulas.flareclass(5000, 1000).value, 5, 'an X5 flare')
  assert.equal(HeliophysicsFormulas.flux(6000, 60).value, 100, 'particles per second')
  assert.equal(HeliophysicsFormulas.irradiance(1361, 1).value, 1361, 'the solar constant')
  assert.equal(HeliophysicsFormulas.magneticindex(56, 8).value, 7)
  assert.equal(HeliophysicsFormulas.solarwind(2000, 400).value, 5)
  assert.equal(HeliophysicsFormulas.sunspot(5, 32).value, 82, 'the Wolf number')
  assert.equal(HeliophysicsFormulas.coronalmass(12, 1000).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('heliophysics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'heliophysics', program: ['flux'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `heliophysics.flux at ${uuid}`)
  uuidReceiptOf('heliophysics flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coronalmass 12000, cycle 6, flareclass 5, flux 100, irradiance 1361, magneticindex 7, solarwind 5, sunspot 82; crossing to astronomy')
})
