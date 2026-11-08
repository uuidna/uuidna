import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CodicologyFormulas } from './index.js'
import '../../mcp/families.js'

test('codicology: quires, foliocount, gatheringorderings, collationpairs, rulingpatterns, inkcombos, bindingstages, completeness — crossing to linguistics', async (t) => {
  assert.equal(CodicologyFormulas.quires(20, 4).value, 24)
  assert.equal(CodicologyFormulas.foliocount(24, 8).value, 192)
  assert.equal(CodicologyFormulas.gatheringorderings(6).value, 720)
  assert.equal(CodicologyFormulas.collationpairs(24, 2).value, 276)
  assert.equal(CodicologyFormulas.rulingpatterns(4).value, 16)
  assert.equal(CodicologyFormulas.inkcombos(5, 2).value, 10)
  assert.equal(CodicologyFormulas.bindingstages(4, 3).value, 7)
  assert.equal(CodicologyFormulas.completeness(90, 100).value, 90)
  assert.equal(CodicologyFormulas.quires(20, 4).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('codicology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'codicology', program: ['quires'], params: [20, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 24, `codicology.quires at ${uuid}`)
  uuidReceiptOf('codicology quires', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; quires 24, foliocount 192, gatheringorderings 720, collationpairs 276, rulingpatterns 16, inkcombos 10, bindingstages 7, completeness 90; crossing to linguistics')
})
