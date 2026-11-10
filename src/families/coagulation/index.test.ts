import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CoagulationFormulas } from './index.js'
import '../../mcp/families.js'

test('coagulation: inr, prothrombintime, aptt, plateletcount, fibrinogen, bleedingtime, clotretraction, thrombinratio — crossing to hematology', async (t) => {
  assert.equal(CoagulationFormulas.inr(18, 12).value, 150, 'INR 1.50 as a percent ratio')
  assert.equal(CoagulationFormulas.prothrombintime(15, 12).value, 3, 'three seconds over control')
  assert.equal(CoagulationFormulas.prothrombintime(10, 12).value, 0, 'no prolongation below control')
  assert.equal(CoagulationFormulas.aptt(60, 30).value, 200)
  assert.equal(CoagulationFormulas.plateletcount(15, 15).value, 225)
  assert.equal(CoagulationFormulas.fibrinogen(3000, 10).value, 300)
  assert.equal(CoagulationFormulas.bleedingtime(2, 9).value, 7, 'seven minutes to stop')
  assert.equal(CoagulationFormulas.clotretraction(48, 100).value, 48, 'forty-eight percent retracted')
  assert.equal(CoagulationFormulas.thrombinratio(20, 10).value, 200)
  assert.equal(CoagulationFormulas.inr(18, 12).dst, 'hematology')
  assert.equal(hexFamiliesOf().get('coagulation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'coagulation', program: ['inr'], params: [18, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `coagulation.inr at ${uuid}`)
  uuidReceiptOf('coagulation inr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; inr 150, prothrombintime 3, aptt 200, plateletcount 225, fibrinogen 300, bleedingtime 7, clotretraction 48, thrombinratio 200; crossing to hematology')
})
