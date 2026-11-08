import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AxiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('axiology: valuetypes, rankings, valuepairs, hierarchydepth, intrinsicextrinsic, preferenceorderings, normsubsets, commensurability — crossing to philosophy', async (t) => {
  assert.equal(AxiologyFormulas.valuetypes(2, 1).value, 3)
  assert.equal(AxiologyFormulas.rankings(5).value, 120)
  assert.equal(AxiologyFormulas.valuepairs(8, 2).value, 28)
  assert.equal(AxiologyFormulas.hierarchydepth(3, 2).value, 5)
  assert.equal(AxiologyFormulas.intrinsicextrinsic(2, 3).value, 6)
  assert.equal(AxiologyFormulas.preferenceorderings(6, 3).value, 120)
  assert.equal(AxiologyFormulas.normsubsets(5).value, 32)
  assert.equal(AxiologyFormulas.commensurability(60, 100).value, 60)
  assert.equal(AxiologyFormulas.valuetypes(2, 1).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('axiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'axiology', program: ['valuetypes'], params: [2, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `axiology.valuetypes at ${uuid}`)
  uuidReceiptOf('axiology valuetypes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; valuetypes 3, rankings 120, valuepairs 28, hierarchydepth 5, intrinsicextrinsic 6, preferenceorderings 120, normsubsets 32, commensurability 60; crossing to philosophy')
})
