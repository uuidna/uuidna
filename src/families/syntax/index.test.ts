import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SyntaxFormulas } from './index.js'
import '../../mcp/families.js'

test('syntax: depth, branching, agreement, complexity, ambiguity, dependency, recursion, wellformed — crossing to linguistics', async (t) => {
  assert.equal(SyntaxFormulas.depth(12, 3).value, 4, 'parse-tree depth')
  assert.equal(SyntaxFormulas.branching(20, 5).value, 4, 'children per node')
  assert.equal(SyntaxFormulas.agreement(9, 10).value, 90)
  assert.equal(SyntaxFormulas.complexity(15, 5).value, 3, 'clauses per sentence')
  assert.equal(SyntaxFormulas.ambiguity(7).value, 7)
  assert.equal(SyntaxFormulas.dependency(8, 10).value, 80)
  assert.equal(SyntaxFormulas.recursion(3).value, 3)
  assert.equal(SyntaxFormulas.wellformed(95, 100).value, 95)
  assert.equal(SyntaxFormulas.depth(12, 3).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('syntax')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'syntax', program: ['depth'], params: [12, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `syntax.depth at ${uuid}`)
  uuidReceiptOf('syntax depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 4, branching 4, agreement 90, complexity 3, ambiguity 7, dependency 80, recursion 3, wellformed 95; crossing to linguistics')
})
