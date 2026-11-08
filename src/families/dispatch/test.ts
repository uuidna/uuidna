import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DispatchFormulas } from './index.js'
import '../../mcp/families.js'

test('dispatch: queuewait, assignmentrate, idletime, responsetime, jobspershift, overtimeratio, coverage, backlog — crossing to logistics', async (t) => {
  assert.equal(DispatchFormulas.queuewait(600, 20).value, 30)
  assert.equal(DispatchFormulas.assignmentrate(120, 4).value, 30)
  assert.equal(DispatchFormulas.idletime(480, 420).value, 60)
  assert.equal(DispatchFormulas.responsetime(600, 12).value, 50)
  assert.equal(DispatchFormulas.jobspershift(8, 6).value, 48)
  assert.equal(DispatchFormulas.overtimeratio(60, 480).value, 12)
  assert.equal(DispatchFormulas.coverage(18, 20).value, 90)
  assert.equal(DispatchFormulas.backlog(50, 42).value, 8)
  assert.equal(DispatchFormulas.queuewait(600, 20).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('dispatch')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dispatch', program: ['queuewait'], params: [600, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `dispatch.queuewait at ${uuid}`)
  uuidReceiptOf('dispatch queuewait', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; queuewait 30, assignmentrate 30, idletime 60, responsetime 50, jobspershift 48, overtimeratio 12, coverage 90, backlog 8; crossing to logistics')
})
