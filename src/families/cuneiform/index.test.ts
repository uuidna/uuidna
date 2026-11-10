import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CuneiformFormulas } from './index.js'
import '../../mcp/families.js'

test('cuneiform: signs, wedgesper, signpairs, periodcount, tabletsubsets, strokeorderings, logovalues, attestationratio — crossing to linguistics', async (t) => {
  assert.equal(CuneiformFormulas.signs(600, 1).value, 600)
  assert.equal(CuneiformFormulas.wedgesper(4, 3).value, 7)
  assert.equal(CuneiformFormulas.signpairs(20, 2).value, 190)
  assert.equal(CuneiformFormulas.periodcount(3, 2).value, 5)
  assert.equal(CuneiformFormulas.tabletsubsets(6).value, 64)
  assert.equal(CuneiformFormulas.strokeorderings(5).value, 120)
  assert.equal(CuneiformFormulas.logovalues(100, 0).value, 100)
  assert.equal(CuneiformFormulas.attestationratio(60, 100).value, 60)
  assert.equal(CuneiformFormulas.signs(600, 1).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('cuneiform')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cuneiform', program: ['signs'], params: [600, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 600, `cuneiform.signs at ${uuid}`)
  uuidReceiptOf('cuneiform signs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; signs 600, wedgesper 7, signpairs 190, periodcount 5, tabletsubsets 64, strokeorderings 120, logovalues 100, attestationratio 60; crossing to linguistics')
})
