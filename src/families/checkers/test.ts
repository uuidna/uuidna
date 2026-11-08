import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CheckersFormulas } from './index.js'
import '../../mcp/families.js'

test('checkers: squares, playablesquares, pieces, movepaths, kingrows, jumpcombos, positionsubsets, branchingfactor — crossing to graphtheory', async (t) => {
  assert.equal(CheckersFormulas.squares(8, 8).value, 64)
  assert.equal(CheckersFormulas.playablesquares(64, 2).value, 32)
  assert.equal(CheckersFormulas.pieces(12, 2).value, 24)
  assert.equal(CheckersFormulas.movepaths(8, 2).value, 56)
  assert.equal(CheckersFormulas.kingrows(2, 0).value, 2)
  assert.equal(CheckersFormulas.jumpcombos(12, 2).value, 66)
  assert.equal(CheckersFormulas.positionsubsets(8).value, 256)
  assert.equal(CheckersFormulas.branchingfactor(8, 2).value, 10)
  assert.equal(CheckersFormulas.squares(8, 8).dst, 'graphtheory')
  assert.equal(hexFamiliesOf().get('checkers')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'checkers', program: ['squares'], params: [8, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 64, `checkers.squares at ${uuid}`)
  uuidReceiptOf('checkers squares', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; squares 64, playablesquares 32, pieces 24, movepaths 56, kingrows 2, jumpcombos 66, positionsubsets 256, branchingfactor 10; crossing to graphtheory')
})
