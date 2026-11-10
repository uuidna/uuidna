import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MonopolyFormulas } from './index.js'
import '../../mcp/families.js'

test('monopoly: marketshare, markup, deadweightloss, lernerindex, outputreduction, pricemargin, barriersubsets, profitmax — crossing to microeconomics', async (t) => {
  assert.equal(MonopolyFormulas.marketshare(90, 100).value, 90)
  assert.equal(MonopolyFormulas.markup(40, 100).value, 40)
  assert.equal(MonopolyFormulas.deadweightloss(500, 10).value, 50)
  assert.equal(MonopolyFormulas.lernerindex(40, 100).value, 40)
  assert.equal(MonopolyFormulas.outputreduction(1000, 600).value, 400)
  assert.equal(MonopolyFormulas.pricemargin(150, 100).value, 50)
  assert.equal(MonopolyFormulas.barriersubsets(5).value, 32)
  assert.equal(MonopolyFormulas.profitmax(10000, 2).value, 5000)
  assert.equal(MonopolyFormulas.marketshare(90, 100).dst, 'microeconomics')
  assert.equal(hexFamiliesOf().get('monopoly')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'monopoly', program: ['marketshare'], params: [90, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `monopoly.marketshare at ${uuid}`)
  uuidReceiptOf('monopoly marketshare', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; marketshare 90, markup 40, deadweightloss 50, lernerindex 40, outputreduction 400, pricemargin 50, barriersubsets 32, profitmax 5000; crossing to microeconomics')
})
