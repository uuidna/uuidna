import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RamseyFormulas } from './index.js'
import '../../mcp/families.js'

test('ramsey: small Ramsey numbers, the party size, Erdős–Szekeres, pigeonhole and K_n edges — crossing to combinatorics', async (t) => {
  assert.equal(RamseyFormulas.r22(5).value, 5, 'R(2,n) = n')
  assert.equal(RamseyFormulas.r33().value, 6, 'R(3,3) = 6')
  assert.equal(RamseyFormulas.r34().value, 9, 'R(3,4) = 9')
  assert.equal(RamseyFormulas.r35().value, 14, 'R(3,5) = 14')
  assert.equal(RamseyFormulas.r44().value, 18, 'R(4,4) = 18')
  assert.equal(RamseyFormulas.party(6).value, 6, 'party size')
  assert.equal(RamseyFormulas.threshold(3, 3).value, 6, 'r + s diagonal marker')
  assert.equal(RamseyFormulas.diagonalbound(10).value, 1024, '2^10')
  assert.equal(RamseyFormulas.eszbound(3, 3).value, 6, 'C(4,2) = R(3,3) bound')
  assert.equal(RamseyFormulas.eszbound(3, 4).value, 10, 'C(5,2) ≥ R(3,4)')
  assert.equal(RamseyFormulas.erdos(6).value, 15, 'edges of K_6 = 6·5/2')
  assert.equal(RamseyFormulas.binom(6, 2).value, 15, 'C(6,2)')
  assert.equal(RamseyFormulas.binom(30, 15).value, 155117520, 'C(30,15)')
  assert.equal(RamseyFormulas.pigeon(10, 3).value, 4, '⌈10/3⌉')
  assert.equal(RamseyFormulas.monochromatic(10, 3).value, 3, '⌊10/3⌋')
  assert.equal(RamseyFormulas.schur3().value, 13, 'Schur S(3) = 13')
  assert.equal(RamseyFormulas.vdw23().value, 9, 'van der Waerden W(2,3) = 9')
  assert.equal(RamseyFormulas.r33().dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('ramsey')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'ramsey', program: ['r33'], params: [] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6, `ramsey.r33 at ${uuid}`)
  uuidReceiptOf('ramsey r33', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; R(2,5)=5, R(3,3)=6, R(3,4)=9, R(3,5)=14, R(4,4)=18, party 6, threshold 6, 2^10=1024, eszbound 6/10, K_6 15 edges, C(6,2)=15, C(30,15), pigeon 4, mono 3, Schur S(3)=13, W(2,3)=9; crossing to combinatorics')
})
