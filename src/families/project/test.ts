import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProjectFormulas } from './index.js'
import '../../mcp/families.js'

test('project: progress, budget, schedule, velocity, risk, burndown, milestone, overrun — crossing to collaboration', async (t) => {
  assert.equal(ProjectFormulas.progress(75, 100).value, 75)
  assert.equal(ProjectFormulas.budget(600, 1000).value, 60)
  assert.equal(ProjectFormulas.schedule(30, 90).value, 33)
  assert.equal(ProjectFormulas.velocity(120, 4).value, 30, 'points per sprint')
  assert.equal(ProjectFormulas.risk(3, 20).value, 15)
  assert.equal(ProjectFormulas.burndown(40, 100).value, 40)
  assert.equal(ProjectFormulas.milestone(5, 8).value, 62)
  assert.equal(ProjectFormulas.overrun(14, 10).value, 4, 'four over the plan')
  assert.equal(ProjectFormulas.overrun(8, 10).value, 0, 'under the plan, no overrun')
  assert.equal(ProjectFormulas.progress(75, 100).dst, 'collaboration')
  assert.equal(hexFamiliesOf().get('project')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'project', program: ['velocity'], params: [120, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `project.velocity at ${uuid}`)
  uuidReceiptOf('project velocity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; progress 75, budget 60, schedule 33, velocity 30, risk 15, burndown 40, milestone 62, overrun 4; crossing to collaboration')
})
