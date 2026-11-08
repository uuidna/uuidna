import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OligopolyFormulas } from './index.js'
import '../../mcp/families.js'

test('oligopoly: firms, concentration, hhindex, collusiongain, reactionpairs, cournotoutput, marketsharesubsets, stabilityindex — crossing to microeconomics', async (t) => {
  assert.equal(OligopolyFormulas.firms(4, 0).value, 4)
  assert.equal(OligopolyFormulas.concentration(80, 100).value, 80)
  assert.equal(OligopolyFormulas.hhindex(25, 4).value, 100)
  assert.equal(OligopolyFormulas.collusiongain(1000, 2).value, 2000)
  assert.equal(OligopolyFormulas.reactionpairs(4, 2).value, 6)
  assert.equal(OligopolyFormulas.cournotoutput(1000, 5).value, 200)
  assert.equal(OligopolyFormulas.marketsharesubsets(4).value, 16)
  assert.equal(OligopolyFormulas.stabilityindex(70, 100).value, 70)
  assert.equal(OligopolyFormulas.firms(4, 0).dst, 'microeconomics')
  assert.equal(hexFamiliesOf().get('oligopoly')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'oligopoly', program: ['firms'], params: [4, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `oligopoly.firms at ${uuid}`)
  uuidReceiptOf('oligopoly firms', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; firms 4, concentration 80, hhindex 100, collusiongain 2000, reactionpairs 6, cournotoutput 200, marketsharesubsets 16, stabilityindex 70; crossing to microeconomics')
})
