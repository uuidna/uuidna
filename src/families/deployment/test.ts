import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DeploymentFormulas } from './index.js'
import '../../mcp/families.js'

test('deployment: frequency, leadtime, failrate, mttr, rollback, availability, canary, replicas — crossing to cloud', async (t) => {
  assert.equal(DeploymentFormulas.frequency(30, 30).value, 1, 'a deploy a day')
  assert.equal(DeploymentFormulas.leadtime(100, 160).value, 60)
  assert.equal(DeploymentFormulas.leadtime(160, 100).value, 0, 'never negative')
  assert.equal(DeploymentFormulas.failrate(5, 100).value, 5)
  assert.equal(DeploymentFormulas.mttr(600, 5).value, 120)
  assert.equal(DeploymentFormulas.rollback(2, 100).value, 2)
  assert.equal(DeploymentFormulas.availability(999, 1000).value, 99)
  assert.equal(DeploymentFormulas.canary(9, 10).value, 90)
  assert.equal(DeploymentFormulas.replicas(7).value, 7)
  assert.equal(DeploymentFormulas.frequency(30, 30).dst, 'cloud')
  assert.equal(hexFamiliesOf().get('deployment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'deployment', program: ['availability'], params: [999, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 99, `deployment.availability at ${uuid}`)
  uuidReceiptOf('deployment availability', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; frequency 1, leadtime 60, failrate 5, mttr 120, rollback 2, availability 99, canary 90, replicas 7; crossing to cloud')
})
