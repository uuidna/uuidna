import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SonographyFormulas } from './index.js'
import '../../mcp/families.js'

test('sonography: depth, resolution, framerate, attenuation, impedance, dopplershift, axialres, penetration — crossing to radiology', async (t) => {
  assert.equal(SonographyFormulas.depth(1540, 100).value, 77000, 'round-trip echo halved')
  assert.equal(SonographyFormulas.resolution(15360, 512).value, 30)
  assert.equal(SonographyFormulas.framerate(15400, 11, 70).value, 10, 'frames per second')
  assert.equal(SonographyFormulas.attenuation(1, 5, 10).value, 50)
  assert.equal(SonographyFormulas.impedance(1000, 1540).value, 1540000)
  assert.equal(SonographyFormulas.dopplershift(5000, 77, 1540).value, 500, 'Doppler shift in hertz')
  assert.equal(SonographyFormulas.axialres(500, 4).value, 1000)
  assert.equal(SonographyFormulas.penetration(60000, 5).value, 12000)
  assert.equal(SonographyFormulas.depth(1540, 100).dst, 'radiology')
  assert.equal(hexFamiliesOf().get('sonography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sonography', program: ['depth'], params: [1540, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 77000, `sonography.depth at ${uuid}`)
  uuidReceiptOf('sonography depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 77000, resolution 30, framerate 10, attenuation 50, impedance 1540000, dopplershift 500, axialres 1000, penetration 12000; crossing to radiology')
})
