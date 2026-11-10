import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UnderwritingFormulas } from './index.js'
import '../../mcp/families.js'

test('underwriting: risk, premium, loading, score, decline, exposure, reserve, ratio — crossing to insurance', async (t) => {
  assert.equal(UnderwritingFormulas.risk(50, 10).value, 500, 'claims per year, per hundred')
  assert.equal(UnderwritingFormulas.premium(1000, 12).value, 120)
  assert.equal(UnderwritingFormulas.loading(120, 25).value, 30, 'a quarter surcharge')
  assert.equal(UnderwritingFormulas.score(850, 5).value, 170)
  assert.equal(UnderwritingFormulas.decline(170, 150).value, 1, 'declined')
  assert.equal(UnderwritingFormulas.decline(100, 150).value, 0)
  assert.equal(UnderwritingFormulas.exposure(100, 500).value, 50000)
  assert.equal(UnderwritingFormulas.reserve(1000, 400).value, 600, 'still owed')
  assert.equal(UnderwritingFormulas.ratio(600, 1000).value, 60, 'loss ratio')
  assert.equal(UnderwritingFormulas.risk(50, 10).dst, 'insurance')
  assert.equal(hexFamiliesOf().get('underwriting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'underwriting', program: ['score'], params: [850, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 170, `underwriting.score at ${uuid}`)
  uuidReceiptOf('underwriting score', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; risk 500, premium 120, loading 30, score 170, decline 1, exposure 50000, reserve 600, ratio 60; crossing to insurance')
})
