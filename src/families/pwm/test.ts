import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PwmFormulas } from './index.js'
import '../../mcp/families.js'

test('pwm: dutycycle, averagevoltage, period, resolution, onpulse, frequency, ripple, effectivepower — crossing to electronics', async (t) => {
  assert.equal(PwmFormulas.dutycycle(25, 100).value, 25)
  assert.equal(PwmFormulas.averagevoltage(1200, 100).value, 12)
  assert.equal(PwmFormulas.period(1000000, 1000).value, 1000)
  assert.equal(PwmFormulas.resolution(256, 1).value, 256)
  assert.equal(PwmFormulas.onpulse(1000, 4).value, 250)
  assert.equal(PwmFormulas.frequency(1000000, 1000).value, 1000)
  assert.equal(PwmFormulas.ripple(5, 100).value, 5)
  assert.equal(PwmFormulas.effectivepower(75, 100).value, 75)
  assert.equal(PwmFormulas.dutycycle(25, 100).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('pwm')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pwm', program: ['dutycycle'], params: [25, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `pwm.dutycycle at ${uuid}`)
  uuidReceiptOf('pwm dutycycle', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dutycycle 25, averagevoltage 12, period 1000, resolution 256, onpulse 250, frequency 1000, ripple 5, effectivepower 75; crossing to electronics')
})
