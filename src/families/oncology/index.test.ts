import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OncologyFormulas } from './index.js'
import '../../mcp/families.js'

test('oncology: staging, grade, survival, doubling, response, burden, remission, dose — crossing to med', async (t) => {
  assert.equal(OncologyFormulas.staging(3, 2, 1).value, 6, 'the TNM sum')
  assert.equal(OncologyFormulas.grade(3).value, 3)
  assert.equal(OncologyFormulas.survival(80, 100).value, 80)
  assert.equal(OncologyFormulas.doubling(200, 50).value, 150)
  assert.equal(OncologyFormulas.response(1000, 250).value, 75, 'shrinkage')
  assert.equal(OncologyFormulas.burden(10000, 5).value, 2000)
  assert.equal(OncologyFormulas.remission(60, 100).value, 60)
  assert.equal(OncologyFormulas.dose(30, 2).value, 60, 'total radiation dose')
  assert.equal(OncologyFormulas.staging(3, 2, 1).dst, 'med')
  assert.equal(hexFamiliesOf().get('oncology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'oncology', program: ['burden'], params: [10000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `oncology.burden at ${uuid}`)
  uuidReceiptOf('oncology burden', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; staging 6, grade 3, survival 80, doubling 150, response 75, burden 2000, remission 60, dose 60; crossing to med')
})
