import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WaveformFormulas } from './index.js'
import '../../mcp/families.js'

test('waveform: period, amplitude, rmsvalue, dutycycle, crestfactor, peaktopeak, frequencyfromperiod, slewrate — crossing to signal', async (t) => {
  assert.equal(WaveformFormulas.period(1000).value, 1000, 'microseconds per cycle at 1 kHz')
  assert.equal(WaveformFormulas.amplitude(100, 20).value, 40)
  assert.equal(WaveformFormulas.rmsvalue(1000).value, 707, 'sine RMS ≈ peak / √2')
  assert.equal(WaveformFormulas.dutycycle(25, 100).value, 25)
  assert.equal(WaveformFormulas.crestfactor(1000, 707).value, 1414, 'crest factor ≈ √2, scaled by 1000')
  assert.equal(WaveformFormulas.peaktopeak(100, 30).value, 70)
  assert.equal(WaveformFormulas.frequencyfromperiod(1000).value, 1000)
  assert.equal(WaveformFormulas.slewrate(1000, 50).value, 20)
  assert.equal(WaveformFormulas.period(1000).dst, 'signal')
  assert.equal(hexFamiliesOf().get('waveform')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'waveform', program: ['period'], params: [1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `waveform.period at ${uuid}`)
  uuidReceiptOf('waveform period', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; period 1000, amplitude 40, rmsvalue 707, dutycycle 25, crestfactor 1414, peaktopeak 70, frequencyfromperiod 1000, slewrate 20; crossing to signal')
})
