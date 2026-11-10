import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ClearanceFormulas } from './index.js'
import '../../mcp/families.js'

test('clearance: renal, hepatic, total, filtration, extractionratio, firstpass, residual, ratio — crossing to pharmacology', async (t) => {
  assert.equal(ClearanceFormulas.renal(100, 2, 10).value, 20, 'urine · flow over plasma')
  assert.equal(ClearanceFormulas.hepatic(1500, 40).value, 600, 'liver flow at a 40% extraction')
  assert.equal(ClearanceFormulas.total(20, 600).value, 620)
  assert.equal(ClearanceFormulas.filtration(120, 600).value, 20, 'filtration fraction percent')
  assert.equal(ClearanceFormulas.extractionratio(100, 25).value, 75)
  assert.equal(ClearanceFormulas.firstpass(75).value, 25, 'fraction surviving first pass')
  assert.equal(ClearanceFormulas.residual(500, 120).value, 380)
  assert.equal(ClearanceFormulas.ratio(240, 120).value, 200)
  assert.equal(ClearanceFormulas.renal(100, 2, 10).dst, 'pharmacology')
  assert.equal(hexFamiliesOf().get('clearance')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'clearance', program: ['renal'], params: [100, 2, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `clearance.renal at ${uuid}`)
  uuidReceiptOf('clearance renal', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; renal 20, hepatic 600, total 620, filtration 20, extractionratio 75, firstpass 25, residual 380, ratio 200; crossing to pharmacology')
})
