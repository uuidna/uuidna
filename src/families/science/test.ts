import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScienceFormulas } from './index.js'
import '../../mcp/families.js'

test('science: hypotheses, experimentpairs, replications, confidence, variableorderings, effectsize, peerreviews, reproducibility — crossing to statistics', async (t) => {
  assert.equal(ScienceFormulas.hypotheses(3, 2).value, 5)
  assert.equal(ScienceFormulas.experimentpairs(10, 2).value, 45)
  assert.equal(ScienceFormulas.replications(3, 10).value, 30)
  assert.equal(ScienceFormulas.confidence(95, 100).value, 95)
  assert.equal(ScienceFormulas.variableorderings(4).value, 24)
  assert.equal(ScienceFormulas.effectsize(80, 10).value, 8)
  assert.equal(ScienceFormulas.peerreviews(3, 0).value, 3)
  assert.equal(ScienceFormulas.reproducibility(60, 100).value, 60)
  assert.equal(ScienceFormulas.hypotheses(3, 2).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('science')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'science', program: ['hypotheses'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `science.hypotheses at ${uuid}`)
  uuidReceiptOf('science hypotheses', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hypotheses 5, experimentpairs 45, replications 30, confidence 95, variableorderings 24, effectsize 8, peerreviews 3, reproducibility 60; crossing to statistics')
})
