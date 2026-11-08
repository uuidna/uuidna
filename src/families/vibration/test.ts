import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VibrationFormulas } from './index.js'
import '../../mcp/families.js'

test('vibration: naturalfrequency, amplitude, dampingratio, resonance, period, acceleration, transmissibility, modeshape — crossing to mechanical', async (t) => {
  assert.equal(VibrationFormulas.naturalfrequency(5000, 10).value, 500, 'stiffness over mass')
  assert.equal(VibrationFormulas.amplitude(1000, 50).value, 20, 'static deflection')
  assert.equal(VibrationFormulas.dampingratio(30, 100).value, 30)
  assert.equal(VibrationFormulas.resonance(60, 3).value, 180, 'third harmonic')
  assert.equal(VibrationFormulas.period(1000, 50).value, 20)
  assert.equal(VibrationFormulas.acceleration(20, 25).value, 500)
  assert.equal(VibrationFormulas.transmissibility(50, 200).value, 25, 'isolated to a quarter')
  assert.equal(VibrationFormulas.transmissibility(300, 200).value, 150)
  assert.equal(VibrationFormulas.modeshape(3, 100).value, 300)
  assert.equal(VibrationFormulas.naturalfrequency(5000, 10).dst, 'mechanical')
  assert.equal(hexFamiliesOf().get('vibration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'vibration', program: ['naturalfrequency'], params: [5000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `vibration.naturalfrequency at ${uuid}`)
  uuidReceiptOf('vibration naturalfrequency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; naturalfrequency 500, amplitude 20, dampingratio 30, resonance 180, period 20, acceleration 500, transmissibility 25, modeshape 300; crossing to mechanical')
})
