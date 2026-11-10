import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MeiosisFormulas } from './index.js'
import '../../mcp/families.js'

test('meiosis: gametes, haploid, crossovers, recombinants, variation, diploidrestore, chromatids, segregation — crossing to genetics', async (t) => {
  assert.equal(MeiosisFormulas.gametes(10).value, 40, 'ten cells, forty gametes')
  assert.equal(MeiosisFormulas.haploid(46).value, 23, 'the human haploid number')
  assert.equal(MeiosisFormulas.crossovers(23, 2).value, 46)
  assert.equal(MeiosisFormulas.recombinants(15, 100).value, 15, 'a 15% recombination frequency')
  assert.equal(MeiosisFormulas.variation(4, 4).value, 16)
  assert.equal(MeiosisFormulas.diploidrestore(23).value, 46, 'fertilization restores the diploid set')
  assert.equal(MeiosisFormulas.chromatids(46).value, 92)
  assert.equal(MeiosisFormulas.segregation(100, 3, 4).value, 75, 'a 3:1 cross')
  assert.equal(MeiosisFormulas.segregation(100, 1, 0).value, 0)
  assert.equal(MeiosisFormulas.gametes(10).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('meiosis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'meiosis', program: ['haploid'], params: [46] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 23, `meiosis.haploid at ${uuid}`)
  uuidReceiptOf('meiosis haploid', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; gametes 40, haploid 23, crossovers 46, recombinants 15, variation 16, diploidrestore 46, chromatids 92, segregation 75; crossing to genetics')
})
