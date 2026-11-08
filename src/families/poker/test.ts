import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PokerFormulas } from './index.js'
import '../../mcp/families.js'

test('poker: potodds, outs, equity, expectedvalue, impliedodds, fold, stackratio, rake — crossing to probability', async (t) => {
  assert.equal(PokerFormulas.potodds(90, 10).value, 10, 'call is 10% of the pot it wins')
  assert.equal(PokerFormulas.outs(9, 2).value, 7, 'nine-out draw, two dead')
  assert.equal(PokerFormulas.equity(9, 2).value, 36, 'rule of outs on the flop')
  assert.equal(PokerFormulas.expectedvalue(50, 200, 100).value, 50)
  assert.equal(PokerFormulas.impliedodds(90, 10, 100).value, 5)
  assert.equal(PokerFormulas.fold(1, 4).value, 75, 'three of four fold')
  assert.equal(PokerFormulas.stackratio(1000, 100).value, 10, 'ten pots behind')
  assert.equal(PokerFormulas.rake(200, 5).value, 10)
  assert.equal(PokerFormulas.potodds(90, 10).dst, 'probability')
  assert.equal(hexFamiliesOf().get('poker')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'poker', program: ['equity'], params: [9, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 36, `poker.equity at ${uuid}`)
  uuidReceiptOf('poker equity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; potodds 10, outs 7, equity 36, expectedvalue 50, impliedodds 5, fold 75, stackratio 10, rake 10; crossing to probability')
})
