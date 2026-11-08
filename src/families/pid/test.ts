import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PidFormulas } from './index.js'
import '../../mcp/families.js'

test('pid: proportional, integral, derivative, output, ziegler, tuning, windup, setpoint — crossing to dynamics', async (t) => {
  assert.equal(PidFormulas.proportional(5, 30).value, 150, 'the proportional term')
  assert.equal(PidFormulas.integral(2, 40).value, 80)
  assert.equal(PidFormulas.derivative(3, 10).value, 30, 'the derivative term')
  assert.equal(PidFormulas.output(60, 12, 5).value, 77, 'the summed controller output')
  assert.equal(PidFormulas.ziegler(50, 10).value, 6, 'Ziegler–Nichols integral gain')
  assert.equal(PidFormulas.tuning(60, 5).value, 12)
  assert.equal(PidFormulas.windup(500, 300).value, 300, 'the anti-windup clamp')
  assert.equal(PidFormulas.setpoint(100, 70).value, 30)
  assert.equal(PidFormulas.setpoint(70, 100).value, 0)
  assert.equal(PidFormulas.output(60, 12, 5).dst, 'dynamics')
  assert.equal(hexFamiliesOf().get('pid')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pid', program: ['output'], params: [60, 12, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 77, `pid.output at ${uuid}`)
  uuidReceiptOf('pid output', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; proportional 150, integral 80, derivative 30, output 77, ziegler 6, tuning 12, windup 300, setpoint 30; crossing to dynamics')
})
