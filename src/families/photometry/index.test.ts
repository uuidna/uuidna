import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotometryFormulas } from './index.js'
import '../../mcp/families.js'

test('photometry: magnitude, flux, colorindex, absolutemagnitude, distancemodulus, apparentmagnitude, extinction, signaltonoise — crossing to astronomy', async (t) => {
  assert.equal(PhotometryFormulas.magnitude(25, 10).value, 15, 'zero point less the counts')
  assert.equal(PhotometryFormulas.flux(10000, 5, 100).value, 20, 'photons per area per time')
  assert.equal(PhotometryFormulas.colorindex(15, 12).value, 3)
  assert.equal(PhotometryFormulas.colorindex(12, 15).value, 0)
  assert.equal(PhotometryFormulas.absolutemagnitude(20, 15).value, 5)
  assert.equal(PhotometryFormulas.distancemodulus(20, 5).value, 15)
  assert.equal(PhotometryFormulas.apparentmagnitude(5, 15).value, 20, 'absolute plus the distance modulus')
  assert.equal(PhotometryFormulas.extinction(3, 2).value, 6)
  assert.equal(PhotometryFormulas.signaltonoise(1000, 20).value, 50, 'signal over the noise')
  assert.equal(PhotometryFormulas.magnitude(25, 10).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('photometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photometry', program: ['flux'], params: [10000, 5, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `photometry.flux at ${uuid}`)
  uuidReceiptOf('photometry flux', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; magnitude 15, flux 20, colorindex 3, absolutemagnitude 5, distancemodulus 15, apparentmagnitude 20, extinction 6, signaltonoise 50; crossing to astronomy')
})
