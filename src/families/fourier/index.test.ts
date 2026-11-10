import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FourierFormulas } from './index.js'
import '../../mcp/families.js'

test('fourier: binwidth, fftoperations, frequencyresolution, fundamentalfrequency, harmonics, leakage, nyquist, spectralpower — crossing to signal', async (t) => {
  assert.equal(FourierFormulas.binwidth(44100, 441).value, 100, 'a bin per hertz')
  assert.equal(FourierFormulas.fftoperations(1024, 10).value, 10240, 'n · log2 passes')
  assert.equal(FourierFormulas.frequencyresolution(48000, 240).value, 200)
  assert.equal(FourierFormulas.fundamentalfrequency(44100, 100).value, 441)
  assert.equal(FourierFormulas.harmonics(440, 5).value, 2200, 'five harmonics of A')
  assert.equal(FourierFormulas.leakage(1000, 850).value, 150, 'energy past the main bin')
  assert.equal(FourierFormulas.leakage(100, 200).value, 0)
  assert.equal(FourierFormulas.nyquist(44100).value, 22050)
  assert.equal(FourierFormulas.spectralpower(3, 4).value, 25, 'squared magnitude')
  assert.equal(FourierFormulas.binwidth(44100, 441).dst, 'signal')
  assert.equal(hexFamiliesOf().get('fourier')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fourier', program: ['harmonics'], params: [440, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2200, `fourier.harmonics at ${uuid}`)
  uuidReceiptOf('fourier harmonics', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; binwidth 100, fftoperations 10240, frequencyresolution 200, fundamentalfrequency 441, harmonics 2200, leakage 150, nyquist 22050, spectralpower 25; crossing to signal')
})
