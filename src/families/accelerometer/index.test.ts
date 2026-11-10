import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AccelerometerFormulas } from './index.js'
import '../../mcp/families.js'

test('accelerometer: gforce, sensitivity, bandwidth, tilt, vibrationrms, offset, fullscale, samplerate — crossing to mechanical', async (t) => {
  assert.equal(AccelerometerFormulas.gforce(2000, 1000).value, 2, 'two g of raw count')
  assert.equal(AccelerometerFormulas.sensitivity(1000, 4).value, 250)
  assert.equal(AccelerometerFormulas.bandwidth(1000).value, 500, 'Nyquist of the sample rate')
  assert.equal(AccelerometerFormulas.tilt(500, 1000).value, 45)
  assert.equal(AccelerometerFormulas.vibrationrms(1000).value, 707, 'RMS of the peak')
  assert.equal(AccelerometerFormulas.offset(2050, 2048).value, 2)
  assert.equal(AccelerometerFormulas.offset(2048, 2050).value, 0, 'offset clamps at zero')
  assert.equal(AccelerometerFormulas.fullscale(8).value, 16)
  assert.equal(AccelerometerFormulas.samplerate(6000, 60).value, 100, 'samples per second')
  assert.equal(AccelerometerFormulas.gforce(2000, 1000).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('accelerometer')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'accelerometer', program: ['tilt'], params: [500, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 45, `accelerometer.tilt at ${uuid}`)
  uuidReceiptOf('accelerometer tilt', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gforce 2, sensitivity 250, bandwidth 500, tilt 45, vibrationrms 707, offset 2, fullscale 16, samplerate 100; crossing to mechanical')
})
