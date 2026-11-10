import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ControlFormulas } from './index.js'
import '../../mcp/families.js'

test('control: error, settlingtime, overshoot, steadystate, risetime, damping, gainmargin, bandwidth — crossing to dynamics', async (t) => {
  assert.equal(ControlFormulas.error(100, 30).value, 70, 'the steady error')
  assert.equal(ControlFormulas.settlingtime(4, 5).value, 20, 'five time constants')
  assert.equal(ControlFormulas.overshoot(120, 100).value, 20, 'twenty percent over')
  assert.equal(ControlFormulas.steadystate(5, 12).value, 60)
  assert.equal(ControlFormulas.risetime(1800, 90).value, 20)
  assert.equal(ControlFormulas.damping(30, 40).value, 75, 'percent of critical')
  assert.equal(ControlFormulas.gainmargin(100, 25).value, 4, 'the gain can quadruple')
  assert.equal(ControlFormulas.bandwidth(8, 3).value, 24)
  assert.equal(ControlFormulas.error(100, 30).dst, 'dynamics')
  assert.equal(hexFamiliesOf().get('control')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'control', program: ['gainmargin'], params: [100, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `control.gainmargin at ${uuid}`)
  uuidReceiptOf('control gainmargin', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; error 70, settlingtime 20, overshoot 20, steadystate 60, risetime 20, damping 75, gainmargin 4, bandwidth 24; crossing to dynamics')
})
