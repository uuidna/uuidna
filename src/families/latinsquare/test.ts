import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LatinSquareFormulas } from './index.js'
import '../../mcp/families.js'

test('latinsquare: cells, symbols, rows, mols, transversal, conjugates, reduced and the isotopy/paratopy groups — crossing to combinatorics', async (t) => {
  assert.equal(LatinSquareFormulas.cells(4).value, 16, 'n² cells')
  assert.equal(LatinSquareFormulas.symbols(4).value, 4, 'n symbols')
  assert.equal(LatinSquareFormulas.rows(4).value, 4, 'n rows')
  assert.equal(LatinSquareFormulas.cols(4).value, 4, 'n columns')
  assert.equal(LatinSquareFormulas.mols(4).value, 3, 'n − 1 orthogonal mates')
  assert.equal(LatinSquareFormulas.orthogonalpairs(4).value, 3, 'C(3, 2) orthogonal pairs')
  assert.equal(LatinSquareFormulas.transversal(4).value, 4, 'n transversal cells')
  assert.equal(LatinSquareFormulas.conjugates().value, 6, 'the six conjugates')
  assert.equal(LatinSquareFormulas.reduced(4).value, 144, 'n!·(n−1)! = 24·6')
  assert.equal(LatinSquareFormulas.order(4).value, 4, 'order n')
  assert.equal(LatinSquareFormulas.firstrow(4).value, 24, 'n! first-row fillings')
  assert.equal(LatinSquareFormulas.isotopy(4).value, 13824, '(n!)³ = 24³')
  assert.equal(LatinSquareFormulas.paratopy(4).value, 82944, '6·(n!)³ = 6·24³')
  assert.equal(LatinSquareFormulas.subsquare(2).value, 4, 'k² subsquare cells')
  assert.equal(LatinSquareFormulas.intercalate(4).value, 6, 'C(4, 2) row-pairs')
  assert.equal(LatinSquareFormulas.reduced(1).value, 1, 'R-factor at n = 1')
  assert.equal(LatinSquareFormulas.orthogonalpairs(2).value, 0, 'no orthogonal pairs at n = 2')
  assert.equal(LatinSquareFormulas.cells(4).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('latinsquare')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'latinsquare', program: ['cells'], params: [4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `latinsquare.cells at ${uuid}`)
  uuidReceiptOf('latinsquare cells', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; cells 16, symbols 4, rows 4, cols 4, mols 3, orthogonalpairs 3, transversal 4, conjugates 6, reduced 144, order 4, firstrow 24, isotopy 13824, paratopy 82944, subsquare 4, intercalate 6; crossing to combinatorics')
})
