import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CovenantFormulas } from './index.js'
import '../../mcp/families.js'

test('covenant: partycount, clausecombos, conditionsubsets, obligationpairs, stageorderings, blessingcurses, renewalcycle, fulfillmentratio — crossing to philosophy', async (t) => {
  assert.equal(CovenantFormulas.partycount(2, 0).value, 2)
  assert.equal(CovenantFormulas.clausecombos(10, 3).value, 120)
  assert.equal(CovenantFormulas.conditionsubsets(6).value, 64)
  assert.equal(CovenantFormulas.obligationpairs(8, 2).value, 28)
  assert.equal(CovenantFormulas.stageorderings(5).value, 120)
  assert.equal(CovenantFormulas.blessingcurses(12, 12).value, 24)
  assert.equal(CovenantFormulas.renewalcycle(7, 7).value, 49)
  assert.equal(CovenantFormulas.fulfillmentratio(8, 10).value, 80)
  assert.equal(CovenantFormulas.partycount(2, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('covenant')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'covenant', program: ['partycount'], params: [2, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `covenant.partycount at ${uuid}`)
  uuidReceiptOf('covenant partycount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; partycount 2, clausecombos 120, conditionsubsets 64, obligationpairs 28, stageorderings 120, blessingcurses 24, renewalcycle 49, fulfillmentratio 80; crossing to philosophy')
})
