import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PartitionFormulas } from './index.js'
import '../../mcp/families.js'

test('partition: p(n), Durfee square, triangular/pentagonal, Ferrers conjugation, closed counts, hook and rank — crossing to combinatorics', async (t) => {
  assert.equal(PartitionFormulas.p(7).value, 15, 'p(7) = 15')
  assert.equal(PartitionFormulas.p(10).value, 42, 'p(10) = 42')
  assert.equal(PartitionFormulas.durfee(10).value, 3, '⌊√10⌋')
  assert.equal(PartitionFormulas.durfeecells(3).value, 9, 'Durfee square cells 3²')
  assert.equal(PartitionFormulas.triangular(10).value, 55, 'staircase 1+…+10')
  assert.equal(PartitionFormulas.pentagonal(5).value, 35, 'generalized pentagonal p₅')
  assert.equal(PartitionFormulas.distinctmax(10).value, 4, 'most distinct parts within 10')
  assert.equal(PartitionFormulas.ferrers(3, 4).value, 12, 'Ferrers rectangle cells')
  assert.equal(PartitionFormulas.conjugatecells(12).value, 12, 'conjugation preserves cells')
  assert.equal(PartitionFormulas.exactone(10).value, 1, 'p(10,1)')
  assert.equal(PartitionFormulas.exacttwo(10).value, 5, 'p(10,2) = ⌊10/2⌋')
  assert.equal(PartitionFormulas.atmosttwo(10).value, 6, 'at most two parts')
  assert.equal(PartitionFormulas.hook(3, 4).value, 6, 'corner hook rows+cols-1')
  assert.equal(PartitionFormulas.rank(9, 4).value, 5, 'Dyson rank largest-parts')
  assert.equal(PartitionFormulas.oddavailable(10).value, 5, '⌈10/2⌉ odd part-sizes')
  assert.equal(PartitionFormulas.selfconjugatehook(4).value, 7, 'principal hook 2·4-1')
  assert.equal(PartitionFormulas.p(7).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('partition')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'partition', program: ['triangular'], params: [10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 55, `partition.triangular at ${uuid}`)
  uuidReceiptOf('partition triangular', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; p(7)=15, p(10)=42, durfee 3, durfeecells 9, triangular 55, pentagonal 35, distinctmax 4, ferrers 12, conjugatecells 12, exactone 1, exacttwo 5, atmosttwo 6, hook 6, rank 5, oddavailable 5, selfconjugatehook 7; crossing to combinatorics')
})
