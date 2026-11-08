import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BacklogFormulas } from './index.js'
import '../../mcp/families.js'

test('backlog: agedays, clearancetime, cycletime, groomingrate, prioritization, size, throughput, wipfill — crossing to logistics', async (t) => {
  assert.equal(BacklogFormulas.agedays(100, 130).value, 30, 'thirty days in the queue')
  assert.equal(BacklogFormulas.agedays(130, 100).value, 0)
  assert.equal(BacklogFormulas.clearancetime(100, 30).value, 4, 'four sprints to clear')
  assert.equal(BacklogFormulas.cycletime(1000, 40).value, 25)
  assert.equal(BacklogFormulas.groomingrate(30, 40).value, 75)
  assert.equal(BacklogFormulas.prioritization(100, 4).value, 25)
  assert.equal(BacklogFormulas.size(50, 3).value, 150, 'fifty items at three points')
  assert.equal(BacklogFormulas.throughput(60, 5).value, 12, 'items per sprint')
  assert.equal(BacklogFormulas.wipfill(8, 10).value, 80)
  assert.equal(BacklogFormulas.size(50, 3).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('backlog')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'backlog', program: ['clearancetime'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `backlog.clearancetime at ${uuid}`)
  uuidReceiptOf('backlog clearancetime', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; agedays 30, clearancetime 4, cycletime 25, groomingrate 75, prioritization 25, size 150, throughput 12, wipfill 80; crossing to logistics')
})
