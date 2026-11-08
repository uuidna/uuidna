import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IncidentFormulas } from './index.js'
import '../../mcp/families.js'

test('incident: mttr, mtta, errorbudget, blastradius, severity, postmortemscore, recurrence, slaimpact — crossing to reliability', async (t) => {
  assert.equal(IncidentFormulas.mttr(600, 8).value, 75, 'mean minutes to repair')
  assert.equal(IncidentFormulas.mtta(450, 90).value, 5)
  assert.equal(IncidentFormulas.errorbudget(1000, 250).value, 750, 'budget left')
  assert.equal(IncidentFormulas.blastradius(12, 500).value, 6000)
  assert.equal(IncidentFormulas.severity(5, 4).value, 20)
  assert.equal(IncidentFormulas.postmortemscore(9, 10).value, 90, 'percent of action items done')
  assert.equal(IncidentFormulas.recurrence(24, 12).value, 2)
  assert.equal(IncidentFormulas.slaimpact(120, 60).value, 1, 'SLA breached')
  assert.equal(IncidentFormulas.slaimpact(30, 60).value, 0)
  assert.equal(IncidentFormulas.mttr(600, 8).dst, 'reliability')
  assert.equal(hexFamiliesOf().get('incident')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'incident', program: ['mttr'], params: [600, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `incident.mttr at ${uuid}`)
  uuidReceiptOf('incident mttr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mttr 75, mtta 5, errorbudget 750, blastradius 6000, severity 20, postmortemscore 90, recurrence 2, slaimpact 1; crossing to reliability')
})
