import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CoachingFormulas } from './index.js'
import '../../mcp/families.js'

test('coaching: periodization, taper, overload, workratio, readiness, acwr, peaking, deload — crossing to physiology', async (t) => {
  assert.equal(CoachingFormulas.periodization(52, 4).value, 13, 'thirteen weeks a block over a year')
  assert.equal(CoachingFormulas.taper(1000, 40).value, 600, 'sixty percent of volume kept')
  assert.equal(CoachingFormulas.overload(100, 10).value, 110, 'ten percent more load')
  assert.equal(CoachingFormulas.workratio(40, 20).value, 2, 'two to one work:rest')
  assert.equal(CoachingFormulas.readiness(90, 100).value, 90)
  assert.equal(CoachingFormulas.acwr(300, 250).value, 120, 'acute above chronic')
  assert.equal(CoachingFormulas.peaking(80, 30).value, 50, 'form is fitness minus fatigue')
  assert.equal(CoachingFormulas.peaking(30, 80).value, 0)
  assert.equal(CoachingFormulas.deload(1000, 50).value, 500)
  assert.equal(CoachingFormulas.periodization(52, 4).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('coaching')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'coaching', program: ['acwr'], params: [300, 250] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `coaching.acwr at ${uuid}`)
  uuidReceiptOf('coaching acwr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; periodization 13, taper 600, overload 110, workratio 2, readiness 90, acwr 120, peaking 50, deload 500; crossing to physiology')
})
