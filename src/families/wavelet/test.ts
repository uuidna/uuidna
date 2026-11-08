import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WaveletFormulas } from './index.js'
import '../../mcp/families.js'

test('wavelet: levels, scale, coefficients, compression, decomposition, energy, vanishingmoments, detailcoeffs — crossing to signal', async (t) => {
  assert.equal(WaveletFormulas.levels(1024, 128).value, 8, 'eight levels for the signal')
  assert.equal(WaveletFormulas.scale(3, 7).value, 21)
  assert.equal(WaveletFormulas.coefficients(1024, 4).value, 256, 'coefficients at the level')
  assert.equal(WaveletFormulas.compression(1000, 100).value, 90)
  assert.equal(WaveletFormulas.decomposition(1, 7).value, 8, 'approximation plus detail subbands')
  assert.equal(WaveletFormulas.energy(16, 256).value, 4096)
  assert.equal(WaveletFormulas.vanishingmoments(8).value, 4, 'a Daubechies-8 filter')
  assert.equal(WaveletFormulas.detailcoeffs(1000, 16).value, 63)
  assert.equal(WaveletFormulas.compression(1000, 1000).value, 0, 'nothing dropped')
  assert.equal(WaveletFormulas.levels(1024, 128).dst, 'signal')
  assert.equal(hexFamiliesOf().get('wavelet')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'wavelet', program: ['levels'], params: [1024, 128] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `wavelet.levels at ${uuid}`)
  uuidReceiptOf('wavelet levels', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; levels 8, scale 21, coefficients 256, compression 90, decomposition 8, energy 4096, vanishingmoments 4, detailcoeffs 63; crossing to signal')
})
