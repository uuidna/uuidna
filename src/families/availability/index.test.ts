import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AvailabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('availability: uptimepercent, downtime, nines, slabudget, mttr, mtbf, steadystate, outagecost — crossing to statistics', async (t) => {
  assert.equal(AvailabilityFormulas.uptimepercent(999, 1000).value, 99)
  assert.equal(AvailabilityFormulas.downtime(1000, 999).value, 1, 'one minute down')
  assert.equal(AvailabilityFormulas.nines(999, 1000).value, 999, 'three nines in per-mille')
  assert.equal(AvailabilityFormulas.slabudget(99, 1000).value, 10, 'ten minutes of error budget')
  assert.equal(AvailabilityFormulas.mttr(120, 4).value, 30)
  assert.equal(AvailabilityFormulas.mtbf(8000, 4).value, 2000)
  assert.equal(AvailabilityFormulas.steadystate(99, 1).value, 99)
  assert.equal(AvailabilityFormulas.outagecost(30, 500).value, 15000)
  assert.equal(AvailabilityFormulas.uptimepercent(999, 1000).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('availability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'availability', program: ['mttr'], params: [120, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `availability.mttr at ${uuid}`)
  uuidReceiptOf('availability mttr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; uptimepercent 99, downtime 1, nines 999, slabudget 10, mttr 30, mtbf 2000, steadystate 99, outagecost 15000; crossing to statistics')
})
