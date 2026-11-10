import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OscillatorsFormulas } from './index.js'
import '../../mcp/families.js'

test('oscillators: frequency, period, dutycycle, phase, resonance, harmonics, jitter, stability — crossing to electronics', async (t) => {
  assert.equal(OscillatorsFormulas.frequency(1000, 5).value, 200, 'two hundred hertz')
  assert.equal(OscillatorsFormulas.frequency(1000, 0).value, 0)
  assert.equal(OscillatorsFormulas.period(10000, 1000).value, 10)
  assert.equal(OscillatorsFormulas.dutycycle(30, 40).value, 75, 'held high three parts in four')
  assert.equal(OscillatorsFormulas.phase(1, 4).value, 90, 'a quarter period is ninety degrees')
  assert.equal(OscillatorsFormulas.resonance(100, 10).value, 1000)
  assert.equal(OscillatorsFormulas.harmonics(440, 3).value, 1320, 'the third harmonic')
  assert.equal(OscillatorsFormulas.jitter(5000, 100).value, 50)
  assert.equal(OscillatorsFormulas.stability(5, 10000).value, 500, 'five hundred ppm')
  assert.equal(OscillatorsFormulas.frequency(1000, 5).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('oscillators')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'oscillators', program: ['frequency'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `oscillators.frequency at ${uuid}`)
  uuidReceiptOf('oscillators frequency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; frequency 200, period 10, dutycycle 75, phase 90, resonance 1000, harmonics 1320, jitter 50, stability 500; crossing to electronics')
})
