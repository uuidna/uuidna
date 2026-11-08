import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GraphtheoryFormulas } from './index.js'
import '../../mcp/families.js'

test('graphtheory: edges, density, degree, handshake, treeedges, components, planaredges, cyclomatic — crossing to algebra', async (t) => {
  assert.equal(GraphtheoryFormulas.edges(10).value, 45, 'K_10 edges')
  assert.equal(GraphtheoryFormulas.density(45, 10).value, 100, 'a complete graph is 100% dense')
  assert.equal(GraphtheoryFormulas.degree(45, 10).value, 9, 'degree n − 1 in K_10')
  assert.equal(GraphtheoryFormulas.handshake(45).value, 90)
  assert.equal(GraphtheoryFormulas.treeedges(10).value, 9)
  assert.equal(GraphtheoryFormulas.components(10, 7).value, 3, 'a forest of three trees')
  assert.equal(GraphtheoryFormulas.planaredges(10).value, 24)
  assert.equal(GraphtheoryFormulas.cyclomatic(15, 10, 1).value, 6, 'independent cycles')
  assert.equal(GraphtheoryFormulas.density(45, 1).value, 0)
  assert.equal(GraphtheoryFormulas.edges(10).dst, 'algebra')
  assert.equal(hexFamiliesOf().get('graphtheory')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'graphtheory', program: ['edges'], params: [10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 45, `graphtheory.edges at ${uuid}`)
  uuidReceiptOf('graphtheory edges', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; edges 45, density 100, degree 9, handshake 90, treeedges 9, components 3, planaredges 24, cyclomatic 6; crossing to algebra')
})
