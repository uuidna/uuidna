import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UltrasonicsFormulas } from './index.js'
import '../../mcp/families.js'

test('ultrasonics: timeofflight, depth, wavelength, attenuation, dopplershift, axialresolution, acousticimpedance, nearfield — crossing to acoustics', async (t) => {
  assert.equal(UltrasonicsFormulas.timeofflight(7500, 1500).value, 10, 'there and back')
  assert.equal(UltrasonicsFormulas.depth(1500, 4).value, 3000)
  assert.equal(UltrasonicsFormulas.wavelength(1500, 5).value, 300)
  assert.equal(UltrasonicsFormulas.attenuation(3, 50).value, 150)
  assert.equal(UltrasonicsFormulas.dopplershift(5000, 3, 1500).value, 20, 'off a moving target')
  assert.equal(UltrasonicsFormulas.axialresolution(300, 2).value, 300)
  assert.equal(UltrasonicsFormulas.acousticimpedance(1000, 1500).value, 1500000)
  assert.equal(UltrasonicsFormulas.nearfield(20, 5).value, 20)
  assert.equal(UltrasonicsFormulas.timeofflight(7500, 1500).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('ultrasonics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ultrasonics', program: ['wavelength'], params: [1500, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `ultrasonics.wavelength at ${uuid}`)
  uuidReceiptOf('ultrasonics wavelength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; timeofflight 10, depth 3000, wavelength 300, attenuation 150, dopplershift 20, axialresolution 300, acousticimpedance 1500000, nearfield 20; crossing to acoustics')
})
