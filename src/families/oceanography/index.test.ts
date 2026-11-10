import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OceanographyFormulas } from './index.js'
import '../../mcp/families.js'

test('oceanography: pressure, salinity, density, tide, current, thermocline, wave, upwelling — crossing to environment', async (t) => {
  assert.equal(OceanographyFormulas.pressure(1000).value, 100, 'a hundred bar at a thousand metres')
  assert.equal(OceanographyFormulas.salinity(35, 1000).value, 35, 'about ocean salinity in PSU')
  assert.equal(OceanographyFormulas.density(1025, 1).value, 1025)
  assert.equal(OceanographyFormulas.tide(8, 2).value, 6, 'the tidal range')
  assert.equal(OceanographyFormulas.tide(2, 8).value, 0)
  assert.equal(OceanographyFormulas.current(100, 25).value, 4)
  assert.equal(OceanographyFormulas.thermocline(25, 4).value, 21)
  assert.equal(OceanographyFormulas.thermocline(4, 25).value, 0)
  assert.equal(OceanographyFormulas.wave(3, 8).value, 12)
  assert.equal(OceanographyFormulas.upwelling(1000, 50).value, 20)
  assert.equal(OceanographyFormulas.pressure(1000).dst, 'environment')
  assert.equal(hexFamiliesOf().get('oceanography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'oceanography', program: ['current'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `oceanography.current at ${uuid}`)
  uuidReceiptOf('oceanography current', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pressure 100, salinity 35, density 1025, tide 6, current 4, thermocline 21, wave 12, upwelling 20; crossing to environment')
})
