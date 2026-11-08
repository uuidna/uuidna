import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CausalFormulas } from './index.js'

/** Causal inference as exact combinatorics — DAG edges, chains, backdoor sets, counterfactual worlds, forks, conditionings, mediation. */
test('causal: edges, chains, backdoor sets, counterfactuals, confounded, forks, conditionings, mediation', async (t) => {
  assert.equal(CausalFormulas.edges(5).value, 10, '5 nodes, a total order')
  assert.equal(CausalFormulas.edges(1).value, 0, 'one node, no edge')
  assert.equal(CausalFormulas.chains(5).value, 4, 'a chain of five')
  assert.equal(CausalFormulas.chains(0).value, 0, 'no node, no chain')
  assert.equal(CausalFormulas.backdoorSets(3).value, 8, '2^3 adjustment sets')
  assert.equal(CausalFormulas.counterfactuals(4).value, 16, '2^4 counterfactual worlds')
  assert.equal(CausalFormulas.confounded(2, 3).value, 6, '2 treatments × 3 outcomes')
  assert.equal(CausalFormulas.forks(5).value, 6, '(5−1)(5−2)/2 colliders a node centres')
  assert.equal(CausalFormulas.forks(1).value, 0, 'one node centres nothing')
  assert.equal(CausalFormulas.conditionings(4).value, 15, '2^4 − 1 non-empty conditioning sets')
  assert.equal(CausalFormulas.mediation(3).value, 4, 'direct plus three mediators')
  assert.equal(CausalFormulas.edges(5).dst, 'cross')
  assert.equal(hexFamiliesOf().get('causal')?.length, 8)
  for (const [name, params, expected] of [['edges', [5], 10], ['backdoorSets', [3], 8], ['conditionings', [4], 15]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'causal', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `causal.${name} at ${uuid}`)
    uuidReceiptOf(`causal ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 5 nodes→10 edges (A000217), 2^3 backdoor sets, 2^4−1 conditionings')
})
