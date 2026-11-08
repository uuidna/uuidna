import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EnrollmentFormulas } from './index.js'
import '../../mcp/families.js'

test('enrollment: rate, retention, attrition, yield, ratio, capacity, waitlist, fulltimeequivalent — crossing to sociology', async (t) => {
  assert.equal(EnrollmentFormulas.rate(500, 2000).value, 25, 'a quarter of applicants enroll')
  assert.equal(EnrollmentFormulas.retention(850, 1000).value, 85)
  assert.equal(EnrollmentFormulas.attrition(1000, 850).value, 150, 'left the cohort')
  assert.equal(EnrollmentFormulas.yield(600, 1500).value, 40)
  assert.equal(EnrollmentFormulas.ratio(300, 20).value, 15, 'students per faculty')
  assert.equal(EnrollmentFormulas.capacity(500, 450).value, 50)
  assert.equal(EnrollmentFormulas.waitlist(2000, 1500).value, 500)
  assert.equal(EnrollmentFormulas.fulltimeequivalent(100, 30).value, 110, 'full-time-equivalent head count')
  assert.equal(EnrollmentFormulas.rate(500, 2000).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('enrollment')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'enrollment', program: ['rate'], params: [500, 2000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `enrollment.rate at ${uuid}`)
  uuidReceiptOf('enrollment rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 25, retention 85, attrition 150, yield 40, ratio 15, capacity 50, waitlist 500, fulltimeequivalent 110; crossing to sociology')
})
