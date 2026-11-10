import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GraphqlFormulas } from './index.js'
import '../../mcp/families.js'

test('graphql: querydepth, complexity, resolvers, nplusone, fieldcount, batchsize, cachehit, fragmentreuse — crossing to networking', async (t) => {
  assert.equal(GraphqlFormulas.querydepth(20, 5).value, 100, 'nodes across five levels')
  assert.equal(GraphqlFormulas.complexity(50, 3).value, 150)
  assert.equal(GraphqlFormulas.resolvers(5000, 50).value, 100, 'resolver calls per second')
  assert.equal(GraphqlFormulas.nplusone(100, 1).value, 101, 'the one list query plus one per parent')
  assert.equal(GraphqlFormulas.fieldcount(40, 8).value, 320)
  assert.equal(GraphqlFormulas.batchsize(1000, 30).value, 34, 'batches the loader groups')
  assert.equal(GraphqlFormulas.cachehit(950, 1000).value, 95)
  assert.equal(GraphqlFormulas.fragmentreuse(600, 8).value, 75)
  assert.equal(GraphqlFormulas.querydepth(20, 5).dst, 'networking')
  assert.equal(hexFamiliesOf().get('graphql')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'graphql', program: ['batchsize'], params: [1000, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 34, `graphql.batchsize at ${uuid}`)
  uuidReceiptOf('graphql batchsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; querydepth 100, complexity 150, resolvers 100, nplusone 101, fieldcount 320, batchsize 34, cachehit 95, fragmentreuse 75; crossing to networking')
})
