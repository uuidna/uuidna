import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PerformanceFormulas } from './index.js'
import '../../mcp/families.js'

test('performance: rating, productivity, goal, appraisal, improvement, utilization, throughput, score — crossing to pedagogy', async (t) => {
  assert.equal(PerformanceFormulas.rating(450, 5).value, 90, 'average review rating')
  assert.equal(PerformanceFormulas.productivity(1000, 40).value, 25, 'output per hour')
  assert.equal(PerformanceFormulas.goal(80, 100).value, 80)
  assert.equal(PerformanceFormulas.appraisal(80, 90).value, 85, 'two-sided mean')
  assert.equal(PerformanceFormulas.improvement(120, 100).value, 20, 'percent gained')
  assert.equal(PerformanceFormulas.improvement(90, 100).value, 0, 'no regress below zero')
  assert.equal(PerformanceFormulas.utilization(32, 40).value, 80)
  assert.equal(PerformanceFormulas.throughput(100, 20).value, 5, 'tasks per day')
  assert.equal(PerformanceFormulas.score(90, 2).value, 180)
  assert.equal(PerformanceFormulas.rating(450, 5).dst, 'pedagogy')
  assert.equal(hexFamiliesOf().get('performance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'performance', program: ['rating'], params: [450, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `performance.rating at ${uuid}`)
  uuidReceiptOf('performance rating', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rating 90, productivity 25, goal 80, appraisal 85, improvement 20, utilization 80, throughput 5, score 180; crossing to pedagogy')
})
