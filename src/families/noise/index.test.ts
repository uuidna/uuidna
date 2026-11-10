import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NoiseFormulas } from './index.js'
import '../../mcp/families.js'

test('noise: snr, sumlevels, attenuation, exposuredose, nr, maskingthreshold, floor, dynamicrange — crossing to acoustics', async (t) => {
  assert.equal(NoiseFormulas.snr(90, 30).value, 60, 'signal 60 dB over the noise')
  assert.equal(NoiseFormulas.sumlevels(60, 40).value, 100)
  assert.equal(NoiseFormulas.attenuation(80, 25).value, 55, 'level after the loss')
  assert.equal(NoiseFormulas.exposuredose(85, 8).value, 680)
  assert.equal(NoiseFormulas.nr(100, 35).value, 65, 'the barrier removes 35 dB')
  assert.equal(NoiseFormulas.maskingthreshold(80, 50).value, 40)
  assert.equal(NoiseFormulas.floor(600, 12).value, 50, 'average ambient floor')
  assert.equal(NoiseFormulas.dynamicrange(120, 20).value, 100)
  assert.equal(NoiseFormulas.snr(30, 90).value, 0)
  assert.equal(NoiseFormulas.snr(90, 30).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('noise')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'noise', program: ['snr'], params: [90, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `noise.snr at ${uuid}`)
  uuidReceiptOf('noise snr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; snr 60, sumlevels 100, attenuation 55, exposuredose 680, nr 65, maskingthreshold 40, floor 50, dynamicrange 100; crossing to acoustics')
})
