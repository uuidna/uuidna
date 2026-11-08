import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PulsarFormulas } from './index.js'
import '../../mcp/families.js'

test('pulsar: spinfrequency, perioddderivative, characteristicage, magneticfield, spindownluminosity, dispersionmeasure, braking, pulsewidth — crossing to astrophysics', async (t) => {
  assert.equal(PulsarFormulas.spinfrequency(1800, 60).value, 30, 'rotations per second')
  assert.equal(PulsarFormulas.perioddderivative(1000, 50).value, 20)
  assert.equal(PulsarFormulas.characteristicage(1000, 5).value, 100, 'τ = P / (2Ṗ)')
  assert.equal(PulsarFormulas.magneticfield(50, 2).value, 10)
  assert.equal(PulsarFormulas.spindownluminosity(2, 30, 3).value, 180, 'I · f · ḟ')
  assert.equal(PulsarFormulas.dispersionmeasure(30, 100).value, 3000)
  assert.equal(PulsarFormulas.braking(100, 10, 3).value, 3)
  assert.equal(PulsarFormulas.braking(100, 0, 3).value, 0, 'no braking index without ḟ')
  assert.equal(PulsarFormulas.pulsewidth(1000, 5).value, 50, 'beam duty cycle')
  assert.equal(PulsarFormulas.spinfrequency(1800, 60).dst, 'astrophysics')
  assert.equal(hexFamiliesOf().get('pulsar')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pulsar', program: ['spinfrequency'], params: [1800, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `pulsar.spinfrequency at ${uuid}`)
  uuidReceiptOf('pulsar spinfrequency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spinfrequency 30, perioddderivative 20, characteristicage 100, magneticfield 10, spindownluminosity 180, dispersionmeasure 3000, braking 3, pulsewidth 50; crossing to astrophysics')
})
