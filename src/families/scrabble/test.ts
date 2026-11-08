import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ScrabbleFormulas } from './index.js'
import '../../mcp/families.js'

test('scrabble: tiles, lettervalues, rackcombos, wordpermutations, boardcells, bingobonus, blanktiles, scoremultiplier — crossing to statistics', async (t) => {
  assert.equal(ScrabbleFormulas.tiles(100, 0).value, 100)
  assert.equal(ScrabbleFormulas.lettervalues(26, 1).value, 26)
  assert.equal(ScrabbleFormulas.rackcombos(7, 2).value, 21)
  assert.equal(ScrabbleFormulas.wordpermutations(7).value, 5040)
  assert.equal(ScrabbleFormulas.boardcells(15, 15).value, 225)
  assert.equal(ScrabbleFormulas.bingobonus(50, 0).value, 50)
  assert.equal(ScrabbleFormulas.blanktiles(2, 0).value, 2)
  assert.equal(ScrabbleFormulas.scoremultiplier(3, 3).value, 9)
  assert.equal(ScrabbleFormulas.tiles(100, 0).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('scrabble')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'scrabble', program: ['tiles'], params: [100, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `scrabble.tiles at ${uuid}`)
  uuidReceiptOf('scrabble tiles', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tiles 100, lettervalues 26, rackcombos 21, wordpermutations 5040, boardcells 225, bingobonus 50, blanktiles 2, scoremultiplier 9; crossing to statistics')
})
