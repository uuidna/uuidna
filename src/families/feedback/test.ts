import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FeedbackFormulas } from './index.js'
import '../../mcp/families.js'

test('feedback: closedloopgain, dampingratio, errorsignal, looptransfer, overshoot, sensitivity, settlingtime, steadystateerror — crossing to control', async (t) => {
  assert.equal(FeedbackFormulas.closedloopgain(1000, 9).value, 100, 'the gain the loop settles to')
  assert.equal(FeedbackFormulas.dampingratio(50, 100).value, 50)
  assert.equal(FeedbackFormulas.errorsignal(100, 70).value, 30, 'the error to drive to zero')
  assert.equal(FeedbackFormulas.errorsignal(50, 80).value, 0)
  assert.equal(FeedbackFormulas.looptransfer(50, 3).value, 150, 'open-loop gain around the ring')
  assert.equal(FeedbackFormulas.overshoot(120, 100).value, 20)
  assert.equal(FeedbackFormulas.sensitivity(3).value, 25, 'disturbance left unsuppressed')
  assert.equal(FeedbackFormulas.settlingtime(5, 4).value, 20)
  assert.equal(FeedbackFormulas.steadystateerror(100, 9).value, 10)
  assert.equal(FeedbackFormulas.closedloopgain(1000, 9).dst, 'control')
  assert.equal(hexFamiliesOf().get('feedback')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'feedback', program: ['closedloopgain'], params: [1000, 9] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `feedback.closedloopgain at ${uuid}`)
  uuidReceiptOf('feedback closedloopgain', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; closedloopgain 100, dampingratio 50, errorsignal 30, looptransfer 150, overshoot 20, sensitivity 25, settlingtime 20, steadystateerror 10; crossing to control')
})
