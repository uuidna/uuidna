import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BioinformaticsFormulas } from './index.js'
import '../../mcp/families.js'

test('bioinformatics: identity, gccontent, coverage, alignment, evalue, kmer, phylogeny, expression — crossing to genetics', async (t) => {
  assert.equal(BioinformaticsFormulas.identity(99, 100).value, 99, 'percent identity')
  assert.equal(BioinformaticsFormulas.gccontent(60, 100).value, 60)
  assert.equal(BioinformaticsFormulas.coverage(1000, 10).value, 100, 'reads per base of genome')
  assert.equal(BioinformaticsFormulas.alignment(500, 100).value, 5)
  assert.equal(BioinformaticsFormulas.evalue(1, 1000000).value, 1)
  assert.equal(BioinformaticsFormulas.kmer(100, 5).value, 96, 'windows of width 5')
  assert.equal(BioinformaticsFormulas.phylogeny(80, 100).value, 80)
  assert.equal(BioinformaticsFormulas.expression(1000, 1000).value, 1000, 'RPKM proxy')
  assert.equal(BioinformaticsFormulas.identity(99, 100).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('bioinformatics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bioinformatics', program: ['identity'], params: [99, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 99, `bioinformatics.identity at ${uuid}`)
  uuidReceiptOf('bioinformatics identity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; identity 99, gccontent 60, coverage 100, alignment 5, evalue 1, kmer 96, phylogeny 80, expression 1000; crossing to genetics')
})
