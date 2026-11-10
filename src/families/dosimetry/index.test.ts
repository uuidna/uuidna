import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DosimetryFormulas } from './index.js'
import '../../mcp/families.js'

test('dosimetry: absorbeddose, equivalentdose, effectivedose, doserate, fractionation, cumulative, shielding, exposuretime — crossing to radiology', async (t) => {
  assert.equal(DosimetryFormulas.absorbeddose(600, 12).value, 50, 'energy over mass, in Gray')
  assert.equal(DosimetryFormulas.equivalentdose(50, 20).value, 1000, 'alpha weighting of 20')
  assert.equal(DosimetryFormulas.effectivedose(1000, 12).value, 120, 'a 12% tissue weighting')
  assert.equal(DosimetryFormulas.doserate(1000, 20).value, 50)
  assert.equal(DosimetryFormulas.fractionation(6000, 30).value, 200, 'dose per fraction')
  assert.equal(DosimetryFormulas.cumulative(200, 30).value, 6000, 'the whole course')
  assert.equal(DosimetryFormulas.shielding(100, 30).value, 4, 'four half-value layers')
  assert.equal(DosimetryFormulas.exposuretime(500, 50).value, 10)
  assert.equal(DosimetryFormulas.absorbeddose(600, 12).dst, 'radiology')
  assert.equal(hexFamiliesOf().get('dosimetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dosimetry', program: ['shielding'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `dosimetry.shielding at ${uuid}`)
  uuidReceiptOf('dosimetry shielding', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; absorbeddose 50, equivalentdose 1000, effectivedose 120, doserate 50, fractionation 200, cumulative 6000, shielding 4, exposuretime 10; crossing to radiology')
})
