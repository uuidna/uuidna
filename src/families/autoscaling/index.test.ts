import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AutoscalingFormulas } from './index.js'
import '../../mcp/families.js'

test('autoscaling: desiredreplicas, targetutilization, scaleout, cooldown, headroom, queuebacklog, costperreplica, burst — crossing to concurrency', async (t) => {
  assert.equal(AutoscalingFormulas.desiredreplicas(100, 30).value, 4, 'four replicas for the load')
  assert.equal(AutoscalingFormulas.targetutilization(140, 200).value, 70)
  assert.equal(AutoscalingFormulas.scaleout(4, 2).value, 6, 'two more nodes')
  assert.equal(AutoscalingFormulas.cooldown(300, 5).value, 60)
  assert.equal(AutoscalingFormulas.headroom(100, 60).value, 40, 'spare capacity')
  assert.equal(AutoscalingFormulas.queuebacklog(1000, 900).value, 100)
  assert.equal(AutoscalingFormulas.queuebacklog(900, 1000).value, 0, 'no backlog')
  assert.equal(AutoscalingFormulas.costperreplica(1000, 5).value, 200)
  assert.equal(AutoscalingFormulas.burst(10, 3).value, 30)
  assert.equal(AutoscalingFormulas.desiredreplicas(100, 30).dst, 'concurrency')
  assert.equal(hexFamiliesOf().get('autoscaling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'autoscaling', program: ['desiredreplicas'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `autoscaling.desiredreplicas at ${uuid}`)
  uuidReceiptOf('autoscaling desiredreplicas', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; desiredreplicas 4, targetutilization 70, scaleout 6, cooldown 60, headroom 40, queuebacklog 100, costperreplica 200, burst 30; crossing to concurrency')
})
