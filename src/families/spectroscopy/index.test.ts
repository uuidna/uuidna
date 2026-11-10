import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SpectroscopyFormulas } from './index.js'
import '../../mcp/families.js'

test('spectroscopy: energy, wavenumber, absorbance, beer, resolution, shift, intensity, linewidth — crossing to optics', async (t) => {
  assert.equal(SpectroscopyFormulas.energy(500, 6).value, 3000, 'E = hf proxy')
  assert.equal(SpectroscopyFormulas.wavenumber(1000, 4).value, 250)
  assert.equal(SpectroscopyFormulas.absorbance(80, 20).value, 400)
  assert.equal(SpectroscopyFormulas.beer(100, 5).value, 20, 'concentration proxy')
  assert.equal(SpectroscopyFormulas.resolution(600, 3).value, 200)
  assert.equal(SpectroscopyFormulas.shift(500, 480).value, 20, 'red shift')
  assert.equal(SpectroscopyFormulas.shift(480, 500).value, -20, 'blue shift, negative')
  assert.equal(SpectroscopyFormulas.intensity(1000, 4).value, 250)
  assert.equal(SpectroscopyFormulas.linewidth(900, 3).value, 300)
  assert.equal(SpectroscopyFormulas.energy(500, 6).dst, 'optics')
  assert.equal(hexFamiliesOf().get('spectroscopy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'spectroscopy', program: ['wavenumber'], params: [1000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 250, `spectroscopy.wavenumber at ${uuid}`)
  uuidReceiptOf('spectroscopy wavenumber', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; energy 3000, wavenumber 250, absorbance 400, beer 20, resolution 200, shift 20/-20, intensity 250, linewidth 300; crossing to optics')
})
