import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CyberneticsFormulas } from './index.js'
import '../../mcp/families.js'

test('cybernetics: feedback, gain, setpoint, stability, latency, entropy, control, homeostasis — crossing to robotics', async (t) => {
  assert.equal(CyberneticsFormulas.feedback(150, 100).value, 150, 'output over input')
  assert.equal(CyberneticsFormulas.gain(200, 100).value, 200)
  assert.equal(CyberneticsFormulas.setpoint(100, 30).value, 70, 'the setpoint error')
  assert.equal(CyberneticsFormulas.stability(80, 100).value, 80)
  assert.equal(CyberneticsFormulas.latency(500, 10).value, 50)
  assert.equal(CyberneticsFormulas.entropy(16).value, 16, 'the states it can occupy')
  assert.equal(CyberneticsFormulas.control(90, 30).value, 300)
  assert.equal(CyberneticsFormulas.homeostasis(95, 100).value, 95, 'regulated against the perturbation')
  assert.equal(CyberneticsFormulas.feedback(150, 100).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('cybernetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cybernetics', program: ['feedback'], params: [150, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `cybernetics.feedback at ${uuid}`)
  uuidReceiptOf('cybernetics feedback', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; feedback 150, gain 200, setpoint 70, stability 80, latency 50, entropy 16, control 300, homeostasis 95; crossing to robotics')
})
