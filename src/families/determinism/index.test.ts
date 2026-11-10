import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DeterminismFormulas } from './index.js'
import '../../mcp/families.js'

test('determinism: causallinks, statechains, eventpairs, freedomdegrees, predictabilityratio, causalsubsets, branchingfactor, necessitylevel — crossing to philosophy', async (t) => {
  assert.equal(DeterminismFormulas.causallinks(100, 2).value, 200)
  assert.equal(DeterminismFormulas.statechains(5).value, 120)
  assert.equal(DeterminismFormulas.eventpairs(12, 2).value, 66)
  assert.equal(DeterminismFormulas.freedomdegrees(100, 100).value, 0)
  assert.equal(DeterminismFormulas.predictabilityratio(90, 100).value, 90)
  assert.equal(DeterminismFormulas.causalsubsets(5).value, 32)
  assert.equal(DeterminismFormulas.branchingfactor(1024, 10).value, 102)
  assert.equal(DeterminismFormulas.necessitylevel(3, 1).value, 4)
  assert.equal(DeterminismFormulas.causallinks(100, 2).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('determinism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'determinism', program: ['causallinks'], params: [100, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `determinism.causallinks at ${uuid}`)
  uuidReceiptOf('determinism causallinks', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; causallinks 200, statechains 120, eventpairs 66, freedomdegrees 0, predictabilityratio 90, causalsubsets 32, branchingfactor 102, necessitylevel 4; crossing to philosophy')
})
