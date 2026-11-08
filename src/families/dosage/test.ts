import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DosageFormulas } from './index.js'
import '../../mcp/families.js'

test('dosage: perweight, perbsa, daily, divided, maximum, pediatric, maintenance, cumulative — crossing to pharmacology', async (t) => {
  assert.equal(DosageFormulas.perweight(70, 5).value, 350, 'milligrams per kilogram over body weight')
  assert.equal(DosageFormulas.perbsa(2, 100).value, 200)
  assert.equal(DosageFormulas.daily(250, 3).value, 750, 'the daily total')
  assert.equal(DosageFormulas.divided(750, 3).value, 250, 'the divided dose')
  assert.equal(DosageFormulas.maximum(900, 800).value, 800, 'capped at the ceiling')
  assert.equal(DosageFormulas.maximum(500, 800).value, 500)
  assert.equal(DosageFormulas.pediatric(140, 35).value, 70, "Clark's rule")
  assert.equal(DosageFormulas.maintenance(1000, 25).value, 250)
  assert.equal(DosageFormulas.cumulative(500, 7).value, 3500)
  assert.equal(DosageFormulas.perweight(70, 5).dst, 'pharmacology')
  assert.equal(hexFamiliesOf().get('dosage')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dosage', program: ['daily'], params: [250, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 750, `dosage.daily at ${uuid}`)
  uuidReceiptOf('dosage daily', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; perweight 350, perbsa 200, daily 750, divided 250, maximum 800, pediatric 70, maintenance 250, cumulative 3500; crossing to pharmacology')
})
