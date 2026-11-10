import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DentistryFormulas } from './index.js'
import '../../mcp/families.js'

test('dentistry: decay, plaque, anesthetic, recall, restoration, pocket, fluoride, extraction — crossing to med', async (t) => {
  assert.equal(DentistryFormulas.decay(3, 32).value, 9, 'three of thirty-two teeth decayed')
  assert.equal(DentistryFormulas.plaque(40, 160).value, 25)
  assert.equal(DentistryFormulas.anesthetic(70, 2).value, 140, 'dose by weight')
  assert.equal(DentistryFormulas.recall(6, 2).value, 4, 'four months until recall')
  assert.equal(DentistryFormulas.recall(2, 6).value, 0)
  assert.equal(DentistryFormulas.restoration(8, 10).value, 80)
  assert.equal(DentistryFormulas.pocket(4).value, 4)
  assert.equal(DentistryFormulas.fluoride(700, 1500).value, 1, 'within the limit')
  assert.equal(DentistryFormulas.fluoride(2000, 1500).value, 0)
  assert.equal(DentistryFormulas.extraction(1, 32).value, 3)
  assert.equal(DentistryFormulas.decay(3, 32).dst, 'med')
  assert.equal(hexFamiliesOf().get('dentistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'dentistry', program: ['decay'], params: [3, 32] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `dentistry.decay at ${uuid}`)
  uuidReceiptOf('dentistry decay', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; decay 9, plaque 25, anesthetic 140, recall 4, restoration 80, pocket 4, fluoride 1, extraction 3; crossing to med')
})
