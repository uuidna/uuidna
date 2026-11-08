import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AcousticsFormulas } from './index.js'
import '../../mcp/families.js'

test('acoustics: wavelength, frequency, decibel, doppler, reverb, attenuation, impedance, resonance — crossing to seismology', async (t) => {
  assert.equal(AcousticsFormulas.wavelength(343, 7).value, 49, 'speed over frequency')
  assert.equal(AcousticsFormulas.frequency(343, 7).value, 49, 'speed over wavelength')
  assert.equal(AcousticsFormulas.decibel(1000, 1).value, 30, '10·log10(1000) = 30 dB')
  assert.equal(AcousticsFormulas.doppler(440, 10).value, 450, 'shifted signal')
  assert.equal(AcousticsFormulas.reverb(1000, 1).value, 161, 'Sabine proxy, clean floor')
  assert.equal(AcousticsFormulas.attenuation(100, 40).value, 60)
  assert.equal(AcousticsFormulas.impedance(1000, 343).value, 343000)
  assert.equal(AcousticsFormulas.resonance(100, 4).value, 25)
  assert.equal(AcousticsFormulas.decibel(1000, 1).dst, 'seismology')
  assert.equal(hexFamiliesOf().get('acoustics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'acoustics', program: ['wavelength'], params: [343, 7] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 49, `acoustics.wavelength at ${uuid}`)
  uuidReceiptOf('acoustics wavelength', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wavelength 49, frequency 49, decibel 30, doppler 450, reverb 161, attenuation 60, impedance 343000, resonance 25; crossing to seismology')
})
