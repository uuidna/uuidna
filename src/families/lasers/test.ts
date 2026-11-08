import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LasersFormulas } from './index.js'
import '../../mcp/families.js'

test('lasers: gain, power, pulseenergy, repetitionrate, beamdivergence, coherencelength, fluence, wavelength — crossing to optics', async (t) => {
  assert.equal(LasersFormulas.gain(1000, 10).value, 100, 'a hundredfold amplifier')
  assert.equal(LasersFormulas.power(5, 1000).value, 5000, 'average power from the pulse train')
  assert.equal(LasersFormulas.pulseenergy(5000, 1000).value, 5)
  assert.equal(LasersFormulas.repetitionrate(6000, 60).value, 100, 'pulses per second')
  assert.equal(LasersFormulas.beamdivergence(5, 1000).value, 5, 'milliradians of spread')
  assert.equal(LasersFormulas.coherencelength(300000, 1000).value, 300)
  assert.equal(LasersFormulas.fluence(1000, 5).value, 200)
  assert.equal(LasersFormulas.wavelength(60000, 100).value, 600, 'a visible colour')
  assert.equal(LasersFormulas.power(5, 1000).dst, 'optics')
  assert.equal(hexFamiliesOf().get('lasers')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lasers', program: ['power'], params: [5, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5000, `lasers.power at ${uuid}`)
  uuidReceiptOf('lasers power', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gain 100, power 5000, pulseenergy 5, repetitionrate 100, beamdivergence 5, coherencelength 300, fluence 200, wavelength 600; crossing to optics')
})
