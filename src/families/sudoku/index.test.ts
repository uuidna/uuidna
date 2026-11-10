import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SudokuFormulas } from './index.js'
import '../../mcp/families.js'

test('sudoku: cells, boxes, givens, candidatesubsets, rowperms, pairelims, difficultyindex, emptycells — crossing to combinatorics', async (t) => {
  assert.equal(SudokuFormulas.cells(9, 9).value, 81)
  assert.equal(SudokuFormulas.boxes(3, 3).value, 9)
  assert.equal(SudokuFormulas.givens(17, 0).value, 17)
  assert.equal(SudokuFormulas.candidatesubsets(9).value, 512)
  assert.equal(SudokuFormulas.rowperms(6).value, 720)
  assert.equal(SudokuFormulas.pairelims(9, 2).value, 36)
  assert.equal(SudokuFormulas.difficultyindex(50, 100).value, 50)
  assert.equal(SudokuFormulas.emptycells(81, 30).value, 51)
  assert.equal(SudokuFormulas.cells(9, 9).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('sudoku')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sudoku', program: ['cells'], params: [9, 9] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 81, `sudoku.cells at ${uuid}`)
  uuidReceiptOf('sudoku cells', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cells 81, boxes 9, givens 17, candidatesubsets 512, rowperms 720, pairelims 36, difficultyindex 50, emptycells 51; crossing to combinatorics')
})
