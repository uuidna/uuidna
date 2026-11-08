import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JobFormulas } from './index.js'

/** Work splits across agents that each find their own slice from their index; the reduce is log rounds; the optimum
 *  agent count maximises speedup — coordinated, decentralised, intelligent, each a hex program at its address. */
test('job: a job splits across agents by index with no coordinator; the reduce is log rounds; the optimum is intelligent', async (t) => {
  // 10 units across 3 agents: slices 4, 3, 3, summing to 10, differing by one — no coordinator needed
  const slices = [0, 1, 2].map((i) => Number(JobFormulas.slice(10, 3 * 4096 + i).value))
  assert.deepEqual(slices, [4, 3, 3], 'balanced slices from the index alone')
  assert.equal(slices.reduce((a, b) => a + b, 0), 10, 'the slices partition the job')
  assert.equal(JobFormulas.makespan(10, 3).value, 4, 'the longest agent carries 4')
  assert.equal(JobFormulas.agents(10, 4).value, 3, 'chunks of 4 need 3 agents')
  assert.equal(JobFormulas.rounds(8).value, 3, 'eight agents reduce in three doublings')
  assert.equal(JobFormulas.rounds(1).value, 0, 'one agent, no reduce')
  assert.equal(JobFormulas.messages(4).value, 6, 'a tree all-reduce of four is six messages')
  // speedup rises then falls: one agent is slowest, too many agents drown in coordination
  assert.ok(Number(JobFormulas.speedup(100, 1).value) < Number(JobFormulas.speedup(100, 10).value), 'ten agents beat one')
  const opt = JobFormulas.optimal(100)
  assert.ok(Number(opt.value) > 1, 'the optimum splits the job')
  assert.ok(Number(JobFormulas.speedup(100, Number(opt.value)).value) >= Number(JobFormulas.speedup(100, Number(opt.value) + 5).value), 'past the optimum, more agents do not help')
  // the default job is to discover all: it runs the whole-lattice discovery and reports it split across optimal agents
  const all = (await JobFormulas.discover(3)) as unknown as { value: number; holds: boolean; agents?: number; rounds?: number; relations?: string[] }
  assert.ok(all.value > 0 && all.holds, 'the default job discovers relations across the lattice')
  assert.ok((all.agents ?? 0) >= 1 && (all.rounds ?? -1) >= 0, 'the discovery job is split across agents with a reduce')
  assert.ok((all.relations ?? []).length <= 3, 'the first n relations ride in the reading')
  assert.equal(hexFamiliesOf().get('job')?.length, 8)
  for (const [name, params, expected] of [['makespan', [10, 3], 4], ['rounds', [8], 3], ['optimal', [100], Number(opt.value)]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'job', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `job.${name} at ${uuid}`)
    uuidReceiptOf(`job ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic(`8 formulas; 10 across 3 → 4,3,3; reduce of 8 in 3 rounds; optimal(100) = ${opt.value}; the default job discovered ${all.value} relations across ${all.agents} agents`)
})
