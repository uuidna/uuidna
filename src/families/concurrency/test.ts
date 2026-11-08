import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConcurrencyFormulas } from './index.js'
import '../../mcp/families.js'

test('concurrency: amdahl, speedup, throughput, utilization, contention, latency, deadlock, scalability, steal — crossing to code', async (t) => {
  assert.equal(ConcurrencyFormulas.amdahl(90, 10).value, 10, 'Amdahl: denom 910, speedup ×100')
  assert.equal(ConcurrencyFormulas.speedup(100, 25).value, 400, 'four times faster, ×100')
  assert.equal(ConcurrencyFormulas.throughput(6000, 60).value, 100, 'tasks per second')
  assert.equal(ConcurrencyFormulas.utilization(75, 100).value, 75)
  assert.equal(ConcurrencyFormulas.contention(30, 100).value, 30)
  assert.equal(ConcurrencyFormulas.latency(5000, 100).value, 50)
  assert.equal(ConcurrencyFormulas.deadlock(3).value, 3, 'three cycles hold')
  assert.equal(ConcurrencyFormulas.scalability(800, 100).value, 800)
  const { ParallelExecutor } = await import('../../optimization/parallel-executor.js')
  const exec = new ParallelExecutor(2)
  exec.enqueue({ id: 'a', formulaId: 'f', input: [1], priority: 1 })
  await exec.executeAll((v) => v)
  const stolen = exec.stolen
  const steal = ConcurrencyFormulas.steal(stolen)
  assert.equal(steal.value, stolen, 'steal returns the scheduler stolen-task count')
  assert.equal(steal.holds, Number.isSafeInteger(stolen) && stolen >= 0)
  assert.equal(ConcurrencyFormulas.amdahl(90, 10).dst, 'code')
  assert.equal(hexFamiliesOf().get('concurrency')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'concurrency', program: ['steal'], params: [stolen] })
  const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
  assert.equal(Number(run.value), stolen, `concurrency.steal at ${uuid}`)
  assert.equal(run.holds, steal.holds)
  uuidReceiptOf('concurrency steal', contentUuidOf(run), { uuid })
  t.diagnostic(`9 formulas; amdahl 10, speedup 400, throughput 100, utilization 75, contention 30, latency 50, deadlock 3, scalability 800, steal ${stolen} holds ${run.holds} at ${uuid}; crossing to code`)
})
