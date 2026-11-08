import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TeleologyFormulas } from './index.js'
import '../../mcp/families.js'

test('teleology: endscount, meanschains, goalpairs, causallevels, finalcauses, purposesubsets, orderingpaths, directednessratio — crossing to philosophy', async (t) => {
  assert.equal(TeleologyFormulas.endscount(3, 2).value, 5)
  assert.equal(TeleologyFormulas.meanschains(4).value, 24)
  assert.equal(TeleologyFormulas.goalpairs(7, 2).value, 21)
  assert.equal(TeleologyFormulas.causallevels(4, 0).value, 4)
  assert.equal(TeleologyFormulas.finalcauses(4, 1).value, 4)
  assert.equal(TeleologyFormulas.purposesubsets(4).value, 16)
  assert.equal(TeleologyFormulas.orderingpaths(5, 2).value, 20)
  assert.equal(TeleologyFormulas.directednessratio(80, 100).value, 80)
  assert.equal(TeleologyFormulas.endscount(3, 2).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('teleology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'teleology', program: ['endscount'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `teleology.endscount at ${uuid}`)
  uuidReceiptOf('teleology endscount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; endscount 5, meanschains 24, goalpairs 21, causallevels 4, finalcauses 4, purposesubsets 16, orderingpaths 20, directednessratio 80; crossing to philosophy')
})
