import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VitalsFormulas } from './index.js'
import '../../mcp/families.js'

test('vitals: lcp, inp, cls, ttfb, fcp, budget, score, regression — crossing to obs', async (t) => {
  assert.equal(VitalsFormulas.lcp(2000).value, 1, 'good LCP under 2500ms')
  assert.equal(VitalsFormulas.lcp(3000).value, 0)
  assert.equal(VitalsFormulas.inp(150).value, 1, 'good INP under 200ms')
  assert.equal(VitalsFormulas.inp(250).value, 0)
  assert.equal(VitalsFormulas.cls(8).value, 1, 'good CLS under 0.10')
  assert.equal(VitalsFormulas.cls(15).value, 0)
  assert.equal(VitalsFormulas.ttfb(600).value, 1, 'good TTFB under 800ms')
  assert.equal(VitalsFormulas.ttfb(900).value, 0)
  assert.equal(VitalsFormulas.fcp(1500).value, 1, 'good FCP under 1800ms')
  assert.equal(VitalsFormulas.fcp(2000).value, 0)
  assert.equal(VitalsFormulas.budget(50, 200).value, 25, 'a quarter of the budget burned')
  assert.equal(VitalsFormulas.score(4, 5).value, 80, 'four of five metrics passed')
  assert.equal(VitalsFormulas.regression(120, 100).value, 20, 'twenty worse than last release')
  assert.equal(VitalsFormulas.regression(90, 100).value, 0, 'an improvement is no regression')
  assert.equal(VitalsFormulas.lcp(2000).dst, 'obs')
  assert.equal(hexFamiliesOf().get('vitals')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'vitals', program: ['budget'], params: [50, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `vitals.budget at ${uuid}`)
  uuidReceiptOf('vitals budget', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lcp 1/0, inp 1/0, cls 1/0, ttfb 1/0, fcp 1/0, budget 25, score 80, regression 20/0; crossing to obs')
})
