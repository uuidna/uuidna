import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InspectionFormulas } from './index.js'
import '../../mcp/families.js'

test('inspection: defectrate, sampling, aql, acceptance, firstpass, rework, scrap, coverage — crossing to quality', async (t) => {
  assert.equal(InspectionFormulas.defectrate(50, 1000).value, 5, 'five percent defective')
  assert.equal(InspectionFormulas.sampling(1000, 40).value, 25, 'one sampled per forty')
  assert.equal(InspectionFormulas.aql(4, 500).value, 8, 'eight defects per thousand')
  assert.equal(InspectionFormulas.acceptance(3, 5).value, 1, 'lot accepted')
  assert.equal(InspectionFormulas.acceptance(7, 5).value, 0)
  assert.equal(InspectionFormulas.firstpass(950, 1000).value, 95, 'first-pass yield')
  assert.equal(InspectionFormulas.rework(20, 15).value, 300)
  assert.equal(InspectionFormulas.scrap(25, 1000).value, 2)
  assert.equal(InspectionFormulas.coverage(800, 1000).value, 80, 'coverage percent')
  assert.equal(InspectionFormulas.defectrate(50, 1000).dst, 'quality')
  assert.equal(hexFamiliesOf().get('inspection')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'inspection', program: ['sampling'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `inspection.sampling at ${uuid}`)
  uuidReceiptOf('inspection sampling', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; defectrate 5, sampling 25, aql 8, acceptance 1, firstpass 95, rework 300, scrap 2, coverage 80; crossing to quality')
})
