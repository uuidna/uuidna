import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { InvariantFormulas } from './index.js'
import '../../mcp/families.js'

test('invariant: conditions, preconditionpairs, stateorderings, holdratio, clausesubsets, violations, strengthlevels, checkpaths — crossing to logic', async (t) => {
  assert.equal(InvariantFormulas.conditions(5, 3).value, 8)
  assert.equal(InvariantFormulas.preconditionpairs(8, 2).value, 28)
  assert.equal(InvariantFormulas.stateorderings(4).value, 24)
  assert.equal(InvariantFormulas.holdratio(100, 100).value, 100)
  assert.equal(InvariantFormulas.clausesubsets(5).value, 32)
  assert.equal(InvariantFormulas.violations(10, 10).value, 0)
  assert.equal(InvariantFormulas.strengthlevels(3, 1).value, 4)
  assert.equal(InvariantFormulas.checkpaths(5, 2).value, 20)
  assert.equal(InvariantFormulas.conditions(5, 3).dst, 'logic')
  assert.equal(hexFamiliesOf().get('invariant')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'invariant', program: ['conditions'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `invariant.conditions at ${uuid}`)
  uuidReceiptOf('invariant conditions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; conditions 8, preconditionpairs 28, stateorderings 24, holdratio 100, clausesubsets 32, violations 0, strengthlevels 4, checkpaths 20; crossing to logic')
})
