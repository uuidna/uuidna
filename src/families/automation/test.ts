import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AutomationFormulas } from './index.js'
import '../../mcp/families.js'

test('automation: throughput, uptime, cycletime, errorrate, savings, oee, payback, coverage — crossing to robotics', async (t) => {
  assert.equal(AutomationFormulas.throughput(600, 8).value, 75, 'tasks per hour')
  assert.equal(AutomationFormulas.uptime(990, 1000).value, 99)
  assert.equal(AutomationFormulas.cycletime(100, 160).value, 60, 'sixty-second cycle')
  assert.equal(AutomationFormulas.errorrate(3, 1000).value, 0)
  assert.equal(AutomationFormulas.savings(40, 8).value, 32, 'hours saved')
  assert.equal(AutomationFormulas.oee(90, 80).value, 72)
  assert.equal(AutomationFormulas.payback(10000, 500).value, 20, 'runs to pay back')
  assert.equal(AutomationFormulas.coverage(750, 1000).value, 75)
  assert.equal(AutomationFormulas.throughput(600, 8).dst, 'robotics')
  assert.equal(hexFamiliesOf().get('automation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'automation', program: ['oee'], params: [90, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 72, `automation.oee at ${uuid}`)
  uuidReceiptOf('automation oee', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; throughput 75, uptime 99, cycletime 60, errorrate 0, savings 32, oee 72, payback 20, coverage 75; crossing to robotics')
})
