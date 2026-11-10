import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IdealismFormulas } from './index.js'
import '../../mcp/families.js'

test('idealism: mindcategories, phenomenasubsets, dialecticstages, conceptpairs, absolutelevels, representationmodes, syntheticunity, thesisorderings — crossing to philosophy', async (t) => {
  assert.equal(IdealismFormulas.mindcategories(12, 0).value, 12)
  assert.equal(IdealismFormulas.phenomenasubsets(6).value, 64)
  assert.equal(IdealismFormulas.dialecticstages(3).value, 6)
  assert.equal(IdealismFormulas.conceptpairs(10, 2).value, 45)
  assert.equal(IdealismFormulas.absolutelevels(3, 0).value, 3)
  assert.equal(IdealismFormulas.representationmodes(4, 3).value, 12)
  assert.equal(IdealismFormulas.syntheticunity(90, 100).value, 90)
  assert.equal(IdealismFormulas.thesisorderings(5, 2).value, 20)
  assert.equal(IdealismFormulas.mindcategories(12, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('idealism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'idealism', program: ['mindcategories'], params: [12, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `idealism.mindcategories at ${uuid}`)
  uuidReceiptOf('idealism mindcategories', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mindcategories 12, phenomenasubsets 64, dialecticstages 6, conceptpairs 45, absolutelevels 3, representationmodes 12, syntheticunity 90, thesisorderings 20; crossing to philosophy')
})
