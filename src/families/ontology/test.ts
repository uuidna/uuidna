import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OntologyFormulas } from './index.js'
import '../../mcp/families.js'

test('ontology: categories, entitysubsets, relationpairs, hierarchydepth, predicatecombos, substanceorderings, modalstates, partonomylinks — crossing to philosophy', async (t) => {
  assert.equal(OntologyFormulas.categories(10, 0).value, 10)
  assert.equal(OntologyFormulas.entitysubsets(6).value, 64)
  assert.equal(OntologyFormulas.relationpairs(8, 2).value, 28)
  assert.equal(OntologyFormulas.hierarchydepth(100, 20).value, 5)
  assert.equal(OntologyFormulas.predicatecombos(12, 3).value, 220)
  assert.equal(OntologyFormulas.substanceorderings(5).value, 120)
  assert.equal(OntologyFormulas.modalstates(3, 4).value, 12)
  assert.equal(OntologyFormulas.partonomylinks(10, 3).value, 30)
  assert.equal(OntologyFormulas.categories(10, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('ontology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ontology', program: ['categories'], params: [10, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `ontology.categories at ${uuid}`)
  uuidReceiptOf('ontology categories', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; categories 10, entitysubsets 64, relationpairs 28, hierarchydepth 5, predicatecombos 220, substanceorderings 120, modalstates 12, partonomylinks 30; crossing to philosophy')
})
