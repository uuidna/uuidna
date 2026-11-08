import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotodiodeFormulas } from './index.js'
import '../../mcp/families.js'

test('photodiode: responsivity, photocurrent, quantumefficiency, darkcurrent, snr, risetime, shuntresistance, saturation — crossing to optics', async (t) => {
  assert.equal(PhotodiodeFormulas.responsivity(1000, 2).value, 500, 'milliamps per watt')
  assert.equal(PhotodiodeFormulas.photocurrent(500, 4).value, 2000)
  assert.equal(PhotodiodeFormulas.quantumefficiency(80, 100).value, 80, 'eighty percent of photons collected')
  assert.equal(PhotodiodeFormulas.darkcurrent(5, 100).value, 500)
  assert.equal(PhotodiodeFormulas.snr(1000, 8).value, 125)
  assert.equal(PhotodiodeFormulas.risetime(50, 10).value, 1100, '2.2 RC')
  assert.equal(PhotodiodeFormulas.shuntresistance(1000, 4).value, 250)
  assert.equal(PhotodiodeFormulas.saturation(500, 400).value, 1, 'saturated')
  assert.equal(PhotodiodeFormulas.saturation(300, 400).value, 0)
  assert.equal(PhotodiodeFormulas.responsivity(1000, 2).dst, 'optics')
  assert.equal(hexFamiliesOf().get('photodiode')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photodiode', program: ['photocurrent'], params: [500, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `photodiode.photocurrent at ${uuid}`)
  uuidReceiptOf('photodiode photocurrent', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; responsivity 500, photocurrent 2000, quantumefficiency 80, darkcurrent 500, snr 125, risetime 1100, shuntresistance 250, saturation 1; crossing to optics')
})
