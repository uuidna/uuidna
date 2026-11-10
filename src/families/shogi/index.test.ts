import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ShogiFormulas } from './index.js'
import '../../mcp/families.js'

test('shogi: squares, pieces, promotions, dropcombos, movepaths, handsubsets, rankcount, branchingfactor — crossing to graphtheory', async (t) => {
  assert.equal(ShogiFormulas.squares(9, 9).value, 81)
  assert.equal(ShogiFormulas.pieces(20, 2).value, 40)
  assert.equal(ShogiFormulas.promotions(6, 0).value, 6)
  assert.equal(ShogiFormulas.dropcombos(7, 2).value, 21)
  assert.equal(ShogiFormulas.movepaths(8, 3).value, 336)
  assert.equal(ShogiFormulas.handsubsets(7).value, 128)
  assert.equal(ShogiFormulas.rankcount(9, 0).value, 9)
  assert.equal(ShogiFormulas.branchingfactor(80, 0).value, 80)
  assert.equal(ShogiFormulas.squares(9, 9).dst, 'graphtheory')
  assert.equal(hexFamiliesOf().get('shogi')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'shogi', program: ['squares'], params: [9, 9] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 81, `shogi.squares at ${uuid}`)
  uuidReceiptOf('shogi squares', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; squares 81, pieces 40, promotions 6, dropcombos 21, movepaths 336, handsubsets 128, rankcount 9, branchingfactor 80; crossing to graphtheory')
})
