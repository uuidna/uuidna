import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BuddhismFormulas } from './index.js'
import '../../mcp/families.js'

test('buddhism: nobletruths, pathfactors, preceptsubsets, suttacount, pathorderings, aggregates, rebirthrealms, meditationcombos — crossing to philosophy', async (t) => {
  assert.equal(BuddhismFormulas.nobletruths(4, 0).value, 4)
  assert.equal(BuddhismFormulas.pathfactors(8, 0).value, 8)
  assert.equal(BuddhismFormulas.preceptsubsets(5).value, 32)
  assert.equal(BuddhismFormulas.suttacount(10000, 1).value, 10000)
  assert.equal(BuddhismFormulas.pathorderings(8).value, 40320)
  assert.equal(BuddhismFormulas.aggregates(5, 0).value, 5)
  assert.equal(BuddhismFormulas.rebirthrealms(6, 0).value, 6)
  assert.equal(BuddhismFormulas.meditationcombos(8, 2).value, 28)
  assert.equal(BuddhismFormulas.nobletruths(4, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('buddhism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'buddhism', program: ['nobletruths'], params: [4, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `buddhism.nobletruths at ${uuid}`)
  uuidReceiptOf('buddhism nobletruths', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; nobletruths 4, pathfactors 8, preceptsubsets 32, suttacount 10000, pathorderings 40320, aggregates 5, rebirthrealms 6, meditationcombos 28; crossing to philosophy')
})
