import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CytogeneticsFormulas } from './index.js'
import '../../mcp/families.js'

test('cytogenetics: chromosomepairs, karyotypeorderings, banding, translocationpairs, ploidy, recombinationsites, aneuploidyrisk, genesubsets — crossing to genetics', async (t) => {
  assert.equal(CytogeneticsFormulas.chromosomepairs(46, 2).value, 23)
  assert.equal(CytogeneticsFormulas.karyotypeorderings(6).value, 720)
  assert.equal(CytogeneticsFormulas.banding(400, 1).value, 400)
  assert.equal(CytogeneticsFormulas.translocationpairs(23, 2).value, 253)
  assert.equal(CytogeneticsFormulas.ploidy(23, 2).value, 46)
  assert.equal(CytogeneticsFormulas.recombinationsites(30, 10).value, 40)
  assert.equal(CytogeneticsFormulas.aneuploidyrisk(5, 100).value, 5)
  assert.equal(CytogeneticsFormulas.genesubsets(8).value, 256)
  assert.equal(CytogeneticsFormulas.chromosomepairs(46, 2).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('cytogenetics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cytogenetics', program: ['chromosomepairs'], params: [46, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 23, `cytogenetics.chromosomepairs at ${uuid}`)
  uuidReceiptOf('cytogenetics chromosomepairs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; chromosomepairs 23, karyotypeorderings 720, banding 400, translocationpairs 253, ploidy 46, recombinationsites 40, aneuploidyrisk 5, genesubsets 256; crossing to genetics')
})
