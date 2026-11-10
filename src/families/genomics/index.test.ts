import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GenomicsFormulas } from './index.js'
import '../../mcp/families.js'

test('genomics: coverage, gccontent, snp, heterozygosity, assembly, n50, mutation, synteny — crossing to genetics', async (t) => {
  assert.equal(GenomicsFormulas.coverage(3000, 100).value, 30, 'thirty-fold depth')
  assert.equal(GenomicsFormulas.gccontent(50, 100).value, 50)
  assert.equal(GenomicsFormulas.snp(10, 1000000).value, 10, 'variants per million bases')
  assert.equal(GenomicsFormulas.heterozygosity(5, 100).value, 5)
  assert.equal(GenomicsFormulas.assembly(50, 200).value, 25)
  assert.equal(GenomicsFormulas.n50(5000).value, 5000)
  assert.equal(GenomicsFormulas.mutation(100, 10).value, 10)
  assert.equal(GenomicsFormulas.synteny(8, 10).value, 80, 'conserved blocks')
  assert.equal(GenomicsFormulas.coverage(3000, 100).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('genomics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'genomics', program: ['coverage'], params: [3000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `genomics.coverage at ${uuid}`)
  uuidReceiptOf('genomics coverage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coverage 30, gccontent 50, snp 10, heterozygosity 5, assembly 25, n50 5000, mutation 10, synteny 80; crossing to genetics')
})
