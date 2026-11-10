import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MessagingFormulas } from './index.js'
import '../../mcp/families.js'

test('messaging: delivery, open, bounce, latency, queue, throughput, cost, retry — crossing to obs', async (t) => {
  assert.equal(MessagingFormulas.delivery(950, 1000).value, 95)
  assert.equal(MessagingFormulas.open(300, 950).value, 31)
  assert.equal(MessagingFormulas.bounce(50, 1000).value, 5)
  assert.equal(MessagingFormulas.latency(4000, 1000).value, 4)
  assert.equal(MessagingFormulas.queue(1000, 700).value, 300, 'the backlog')
  assert.equal(MessagingFormulas.throughput(6000, 60).value, 100)
  assert.equal(MessagingFormulas.cost(100000, 50).value, 5000, 'fifty per thousand')
  assert.equal(MessagingFormulas.retry(10, 3).value, 3, 'capped at the retry ceiling')
  assert.equal(MessagingFormulas.delivery(950, 1000).dst, 'obs')
  assert.equal(hexFamiliesOf().get('messaging')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'messaging', program: ['queue'], params: [1000, 700] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `messaging.queue at ${uuid}`)
  uuidReceiptOf('messaging queue', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; delivery 95, open 31, bounce 5, latency 4, queue 300, throughput 100, cost 5000, retry 3; crossing to obs')
})
