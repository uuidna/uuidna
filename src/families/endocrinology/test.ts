import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EndocrinologyFormulas } from './index.js'
import '../../mcp/families.js'

test('endocrinology: homa, a1c, thyroid, cortisol, sensitivity, secretion, halflife, feedback — crossing to med', async (t) => {
  assert.equal(EndocrinologyFormulas.homa(90, 10).value, 2, '⌊900 / 405⌋ — insulin resistance proxy')
  assert.equal(EndocrinologyFormulas.a1c(5400).value, 10, '⌊10000 / 1000⌋ — HbA1c proxy')
  assert.equal(EndocrinologyFormulas.thyroid(2, 4).value, 50)
  assert.equal(EndocrinologyFormulas.cortisol(150, 50).value, 300)
  assert.equal(EndocrinologyFormulas.sensitivity(80, 10).value, 800)
  assert.equal(EndocrinologyFormulas.secretion(100, 4).value, 25)
  assert.equal(EndocrinologyFormulas.halflife(10, 5).value, 1)
  assert.equal(EndocrinologyFormulas.feedback(90, 30).value, 300)
  assert.equal(EndocrinologyFormulas.homa(90, 10).dst, 'med')
  assert.equal(hexFamiliesOf().get('endocrinology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'endocrinology', program: ['thyroid'], params: [2, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `endocrinology.thyroid at ${uuid}`)
  uuidReceiptOf('endocrinology thyroid', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; homa 2, a1c 10, thyroid 50, cortisol 300, sensitivity 800, secretion 25, halflife 1, feedback 300; crossing to med')
})
