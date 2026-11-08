import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GenomeFormulas } from './index.js'

/** genome: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('genome: basepairs, genes, codons, chromosomes, gcpct, mutations, reads, combos', async (t) => {
  assert.equal(GenomeFormulas.basepairs(3000, 1000).value, 3000000, 'basepairs(3000, 1000)')
  assert.equal(GenomeFormulas.genes(20000, 1).value, 20000, 'genes(20000, 1)')
  assert.equal(GenomeFormulas.codons(3000, 3).value, 1000, 'codons(3000, 3)')
  assert.equal(GenomeFormulas.chromosomes(23, 0).value, 23, 'chromosomes(23, 0)')
  assert.equal(GenomeFormulas.gcpct(41, 100).value, 41, 'gcpct(41, 100)')
  assert.equal(GenomeFormulas.mutations(1000, 100).value, 10, 'mutations(1000, 100)')
  assert.equal(GenomeFormulas.reads(1000, 150).value, 150000, 'reads(1000, 150)')
  assert.equal(GenomeFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('genome')?.length, 8)
  for (const [name, params, expected] of [["basepairs",[3000,1000],3000000],["genes",[20000,1],20000],["codons",[3000,3],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'genome', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `genome.${name} at ${uuid}`)
    uuidReceiptOf(`genome ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "basepairs=3000000, genes=20000, codons=1000")
})
