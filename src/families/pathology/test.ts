import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PathologyFormulas } from './index.js'
import '../../mcp/families.js'

test('pathology: sensitivity, specificity, precision, prevalence, mitotic, cellularity, concordance, positivity — crossing to med', async (t) => {
  assert.equal(PathologyFormulas.sensitivity(90, 100).value, 90, 'catches 90 of 100 diseased')
  assert.equal(PathologyFormulas.specificity(95, 100).value, 95)
  assert.equal(PathologyFormulas.precision(80, 100).value, 80)
  assert.equal(PathologyFormulas.prevalence(5, 1000).value, 0, 'rare at this count')
  assert.equal(PathologyFormulas.prevalence(50, 1000).value, 5)
  assert.equal(PathologyFormulas.mitotic(30, 10).value, 3, 'figures per field')
  assert.equal(PathologyFormulas.cellularity(2000, 4).value, 500)
  assert.equal(PathologyFormulas.concordance(18, 20).value, 90)
  assert.equal(PathologyFormulas.positivity(45, 150).value, 30)
  assert.equal(PathologyFormulas.sensitivity(90, 100).dst, 'med')
  assert.equal(hexFamiliesOf().get('pathology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pathology', program: ['concordance'], params: [18, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `pathology.concordance at ${uuid}`)
  uuidReceiptOf('pathology concordance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sensitivity 90, specificity 95, precision 80, prevalence 5, mitotic 3, cellularity 500, concordance 90, positivity 30; crossing to med')
})
