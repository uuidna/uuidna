import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BayesianFormulas } from './index.js'
import '../../mcp/families.js'

test('bayesian: posterior, likelihood, prior, evidence, oddsratio, bayesfactor, update, marginal — crossing to probability', async (t) => {
  assert.equal(BayesianFormulas.posterior(250, 800, 400).value, 500, 'prior · likelihood over evidence')
  assert.equal(BayesianFormulas.likelihood(90, 100).value, 900, 'P(E|H) in per-mille')
  assert.equal(BayesianFormulas.prior(1, 4).value, 250)
  assert.equal(BayesianFormulas.evidence(300, 100).value, 400)
  assert.equal(BayesianFormulas.oddsratio(250).value, 333, 'odds for a 1-in-4 probability')
  assert.equal(BayesianFormulas.oddsratio(1000).value, 0)
  assert.equal(BayesianFormulas.bayesfactor(800, 200).value, 4000)
  assert.equal(BayesianFormulas.update(333, 4000).value, 1332, 'posterior odds from prior odds and the factor')
  assert.equal(BayesianFormulas.marginal(300, 100, 100).value, 500)
  assert.equal(BayesianFormulas.posterior(250, 800, 400).dst, 'probability')
  assert.equal(hexFamiliesOf().get('bayesian')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bayesian', program: ['posterior'], params: [250, 800, 400] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `bayesian.posterior at ${uuid}`)
  uuidReceiptOf('bayesian posterior', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; posterior 500, likelihood 900, prior 250, evidence 400, oddsratio 333, bayesfactor 4000, update 1332, marginal 500; crossing to probability')
})
