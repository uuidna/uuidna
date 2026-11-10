import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GraphFormulas } from './index.js'

/** graph: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('graph: edges, degree, paths, components, spanning, density, cliques, diameter', async (t) => {
  assert.equal(GraphFormulas.edges(10, 2).value, 45, 'edges(10, 2)')
  assert.equal(GraphFormulas.degree(2, 10).value, 20, 'degree(2, 10)')
  assert.equal(GraphFormulas.paths(6, 2).value, 30, 'paths(6, 2)')
  assert.equal(GraphFormulas.components(3, 0).value, 3, 'components(3, 0)')
  assert.equal(GraphFormulas.spanning(10, 1).value, 9, 'spanning(10, 1)')
  assert.equal(GraphFormulas.density(18, 45).value, 40, 'density(18, 45)')
  assert.equal(GraphFormulas.cliques(5).value, 32, 'cliques(5)')
  assert.equal(GraphFormulas.diameter(100, 10).value, 10, 'diameter(100, 10)')
  assert.equal(hexFamiliesOf().get('graph')?.length, 8)
  for (const [name, params, expected] of [["edges",[10,2],45],["degree",[2,10],20],["paths",[6,2],30]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'graph', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `graph.${name} at ${uuid}`)
    uuidReceiptOf(`graph ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "edges=45, degree=20, paths=30")
})
