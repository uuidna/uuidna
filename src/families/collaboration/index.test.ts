import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CollaborationFormulas } from './index.js'
import '../../mcp/families.js'

test('collaboration: tasks, workload, meeting, cycle, backlog, throughput, utilization, response — crossing to obs', async (t) => {
  assert.equal(CollaborationFormulas.tasks(42, 60).value, 70)
  assert.equal(CollaborationFormulas.workload(60, 5).value, 12)
  assert.equal(CollaborationFormulas.meeting(8, 45).value, 360, 'person-minutes')
  assert.equal(CollaborationFormulas.cycle(2460000, 2460005).value, 5)
  assert.equal(CollaborationFormulas.backlog(200, 150).value, 50)
  assert.equal(CollaborationFormulas.throughput(140, 7).value, 20)
  assert.equal(CollaborationFormulas.utilization(32, 40).value, 80)
  assert.equal(CollaborationFormulas.response(600, 50).value, 12)
  assert.equal(CollaborationFormulas.tasks(42, 60).dst, 'obs')
  assert.equal(hexFamiliesOf().get('collaboration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'collaboration', program: ['meeting'], params: [8, 45] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 360, `collaboration.meeting at ${uuid}`)
  uuidReceiptOf('collaboration meeting', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tasks 70, workload 12, meeting 360, cycle 5, backlog 50, throughput 20, utilization 80, response 12; crossing to obs')
})
