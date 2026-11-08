import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeneticsFormulas } from './index.js'
import '../../mcp/families.js'

test('genetics: codons, gc, punnett, mutation, heritability, alleles, coverage, similarity — crossing to med', async (t) => {
  assert.equal(GeneticsFormulas.codons(300).value, 100, 'a hundred codons from three hundred bases')
  assert.equal(GeneticsFormulas.gc(410, 1000).value, 41)
  assert.equal(GeneticsFormulas.punnett(3, 4).value, 75, 'three in four dominant')
  assert.equal(GeneticsFormulas.mutation(5, 1000000).value, 5, 'five per million')
  assert.equal(GeneticsFormulas.heritability(80, 100).value, 80)
  assert.equal(GeneticsFormulas.alleles(20000).value, 40000)
  assert.equal(GeneticsFormulas.coverage(3000000000, 100000000).value, 30, 'thirty-fold coverage')
  assert.equal(GeneticsFormulas.similarity(986, 1000).value, 98)
  assert.equal(GeneticsFormulas.codons(300).dst, 'med')
  assert.equal(hexFamiliesOf().get('genetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'genetics', program: ['gc'], params: [410, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 41, `genetics.gc at ${uuid}`)
  uuidReceiptOf('genetics gc', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; codons 100, gc 41, punnett 75, mutation 5, heritability 80, alleles 40000, coverage 30, similarity 98; crossing to med')
})
