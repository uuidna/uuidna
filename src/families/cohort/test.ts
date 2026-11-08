import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CohortFormulas } from './index.js'
import '../../mcp/families.js'

test('cohort: retention, size, engagement, revenue, stickiness, maturation, comparison, decay — crossing to analytics', async (t) => {
  assert.equal(CohortFormulas.retention(850, 1000).value, 85, 'eight-five percent stay')
  assert.equal(CohortFormulas.size(1000).value, 1000)
  assert.equal(CohortFormulas.engagement(600, 1000).value, 60)
  assert.equal(CohortFormulas.revenue(50000, 1000).value, 50, 'ARPU')
  assert.equal(CohortFormulas.stickiness(300, 1000).value, 30, 'DAU over MAU')
  assert.equal(CohortFormulas.maturation(1200, 12).value, 100, 'converted per week')
  assert.equal(CohortFormulas.comparison(120, 100).value, 120)
  assert.equal(CohortFormulas.decay(700, 1000).value, 70)
  assert.equal(CohortFormulas.retention(850, 1000).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('cohort')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cohort', program: ['retention'], params: [850, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `cohort.retention at ${uuid}`)
  uuidReceiptOf('cohort retention', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; retention 85, size 1000, engagement 60, revenue 50, stickiness 30, maturation 100, comparison 120, decay 70; crossing to analytics')
})
