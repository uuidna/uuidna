import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QueueingFormulas } from './index.js'
import '../../mcp/families.js'

test('queueing: utilization, averagequeue, waitingtime, littleslaw, servicerate, arrivalrate, systemlength, idleprobability — crossing to networking', async (t) => {
  assert.equal(QueueingFormulas.utilization(80, 100).value, 80, 'the server is 80% busy')
  assert.equal(QueueingFormulas.averagequeue(1000, 50).value, 20)
  assert.equal(QueueingFormulas.waitingtime(100, 20).value, 5)
  assert.equal(QueueingFormulas.littleslaw(30, 4).value, 120, "Little's law: length is rate times wait")
  assert.equal(QueueingFormulas.servicerate(6000, 60).value, 100, 'jobs served per second')
  assert.equal(QueueingFormulas.arrivalrate(5400, 60).value, 90)
  assert.equal(QueueingFormulas.systemlength(18, 2).value, 20)
  assert.equal(QueueingFormulas.idleprobability(25, 100).value, 75, 'free a quarter of the time')
  assert.equal(QueueingFormulas.idleprobability(100, 100).value, 0)
  assert.equal(QueueingFormulas.utilization(80, 100).dst, 'networking')
  assert.equal(hexFamiliesOf().get('queueing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'queueing', program: ['utilization'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `queueing.utilization at ${uuid}`)
  uuidReceiptOf('queueing utilization', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; utilization 80, averagequeue 20, waitingtime 5, littleslaw 120, servicerate 100, arrivalrate 90, systemlength 20, idleprobability 75; crossing to networking')
})
