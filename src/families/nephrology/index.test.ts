import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NephrologyFormulas } from './index.js'
import '../../mcp/families.js'

test('nephrology: gfr, clearance, creatinine, filtration, dialysis, proteinuria, electrolyte, reabsorption — crossing to med', async (t) => {
  assert.equal(NephrologyFormulas.gfr(12000, 100).value, 120, 'renal filtrate per minute')
  assert.equal(NephrologyFormulas.clearance(1000, 10).value, 100)
  assert.equal(NephrologyFormulas.creatinine(1200, 120).value, 10)
  assert.equal(NephrologyFormulas.filtration(20, 100).value, 20, 'filtration fraction')
  assert.equal(NephrologyFormulas.dialysis(70, 100).value, 70)
  assert.equal(NephrologyFormulas.proteinuria(300, 2).value, 150)
  assert.equal(NephrologyFormulas.electrolyte(140, 1).value, 140)
  assert.equal(NephrologyFormulas.reabsorption(99, 100).value, 99, 'tubular reabsorption')
  assert.equal(NephrologyFormulas.gfr(12000, 100).dst, 'med')
  assert.equal(hexFamiliesOf().get('nephrology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nephrology', program: ['gfr'], params: [12000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `nephrology.gfr at ${uuid}`)
  uuidReceiptOf('nephrology gfr', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gfr 120, clearance 100, creatinine 10, filtration 20, dialysis 70, proteinuria 150, electrolyte 140, reabsorption 99; crossing to med')
})
