import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HeraldryFormulas } from './index.js'
import '../../mcp/families.js'

test('heraldry: tincturecount, chargecombos, quarterings, blazonorderings, fieldsubsets, marshallingpairs, ordinaries, differencingmarks — crossing to anthropology', async (t) => {
  assert.equal(HeraldryFormulas.tincturecount(5, 2).value, 7)
  assert.equal(HeraldryFormulas.chargecombos(12, 3).value, 220)
  assert.equal(HeraldryFormulas.quarterings(4, 4).value, 16)
  assert.equal(HeraldryFormulas.blazonorderings(4).value, 24)
  assert.equal(HeraldryFormulas.fieldsubsets(4).value, 16)
  assert.equal(HeraldryFormulas.marshallingpairs(8, 2).value, 28)
  assert.equal(HeraldryFormulas.ordinaries(9, 0).value, 9)
  assert.equal(HeraldryFormulas.differencingmarks(3, 3).value, 9)
  assert.equal(HeraldryFormulas.tincturecount(5, 2).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('heraldry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'heraldry', program: ['tincturecount'], params: [5, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 7, `heraldry.tincturecount at ${uuid}`)
  uuidReceiptOf('heraldry tincturecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; tincturecount 7, chargecombos 220, quarterings 16, blazonorderings 24, fieldsubsets 16, marshallingpairs 28, ordinaries 9, differencingmarks 9; crossing to anthropology')
})
