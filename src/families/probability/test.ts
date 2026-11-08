import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProbabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('probability: odds, conditional, expected, bayes, combinations, variance, entropy, independence — crossing to code', async (t) => {
  assert.equal(ProbabilityFormulas.odds(1, 4).value, 25, 'one in four')
  assert.equal(ProbabilityFormulas.conditional(30, 60).value, 50)
  assert.equal(ProbabilityFormulas.expected(200, 25).value, 50, 'a value weighted by its chance')
  assert.equal(ProbabilityFormulas.bayes(40, 50).value, 20)
  assert.equal(ProbabilityFormulas.combinations(5, 2).value, 10)
  assert.equal(ProbabilityFormulas.variance(400, 10).value, 40)
  assert.equal(ProbabilityFormulas.entropy(8).value, 8, 'outcomes as bits proxy')
  assert.equal(ProbabilityFormulas.independence(30, 60).value, 50)
  assert.equal(ProbabilityFormulas.odds(1, 4).dst, 'code')
  assert.equal(hexFamiliesOf().get('probability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'probability', program: ['odds'], params: [1, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `probability.odds at ${uuid}`)
  uuidReceiptOf('probability odds', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; odds 25, conditional 50, expected 50, bayes 20, combinations 10, variance 40, entropy 8, independence 50; crossing to code')
})
