import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PermutationFormulas } from './index.js'
import '../../mcp/families.js'

test('permutation: factorial, inversions, derangements, involutions, Eulerian and the symmetric-group statistics — crossing to combinatorics', async (t) => {
  assert.equal(PermutationFormulas.ascents(5).value, 4, 'maximum ascents n−1')
  assert.equal(PermutationFormulas.choose(5, 2).value, 10, '5 choose 2')
  assert.equal(PermutationFormulas.cycles(5).value, 5, 'identity has n cycles')
  assert.equal(PermutationFormulas.derangements(4).value, 9, 'd(4)')
  assert.equal(PermutationFormulas.descents(5).value, 4, 'maximum descents n−1')
  assert.equal(PermutationFormulas.eulerian(4).value, 11, 'A(4,1) = 2^4 − 5')
  assert.equal(PermutationFormulas.excedances(5).value, 4, 'maximum excedances n−1')
  assert.equal(PermutationFormulas.factorial(5).value, 120, '5!')
  assert.equal(PermutationFormulas.factorial(0).value, 1, '0! = 1')
  assert.equal(PermutationFormulas.fixedpoints(5, 2).value, 3, 'n − moved')
  assert.equal(PermutationFormulas.involutions(4).value, 10, 'i(4)')
  assert.equal(PermutationFormulas.inversions(5).value, 10, 'C(5,2) maximum inversions')
  assert.equal(PermutationFormulas.majorindex(5).value, 10, 'C(5,2) maximum major index')
  assert.equal(PermutationFormulas.ncycles(5).value, 24, '(5−1)! distinct 5-cycles')
  assert.equal(PermutationFormulas.permutations(5, 2).value, 20, '5!/(5−2)!')
  assert.equal(PermutationFormulas.transpositions(5).value, 4, 'minimum adjacent transpositions n−1')
  assert.equal(PermutationFormulas.factorial(5).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('permutation')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'permutation', program: ['factorial'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `permutation.factorial at ${uuid}`)
  uuidReceiptOf('permutation factorial', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; ascents 4, choose 10, cycles 5, derangements 9, descents 4, eulerian 11, excedances 4, factorial 120/1, fixedpoints 3, involutions 10, inversions 10, majorindex 10, ncycles 24, permutations 20, transpositions 4; crossing to combinatorics')
})
