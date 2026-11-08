import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UsabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('usability: success, efficiency, errors, satisfaction, learnability, timeontask, sus, retention — crossing to layout', async (t) => {
  assert.equal(UsabilityFormulas.success(90, 100).value, 90, 'task success rate')
  assert.equal(UsabilityFormulas.efficiency(5, 10).value, 50)
  assert.equal(UsabilityFormulas.errors(3, 100).value, 3, 'error rate')
  assert.equal(UsabilityFormulas.satisfaction(40, 50).value, 80)
  assert.equal(UsabilityFormulas.learnability(100, 4).value, 25, 'improvement per session')
  assert.equal(UsabilityFormulas.timeontask(600, 10).value, 60, 'seconds per task')
  assert.equal(UsabilityFormulas.sus(32).value, 80, 'SUS score proxy')
  assert.equal(UsabilityFormulas.retention(70, 100).value, 70)
  assert.equal(UsabilityFormulas.success(90, 100).dst, 'layout')
  assert.equal(hexFamiliesOf().get('usability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'usability', program: ['success'], params: [90, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `usability.success at ${uuid}`)
  uuidReceiptOf('usability success', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; success 90, efficiency 50, errors 3, satisfaction 80, learnability 25, timeontask 60, sus 80, retention 70; crossing to layout')
})
