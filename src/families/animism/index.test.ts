import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnimismFormulas } from './index.js'
import '../../mcp/families.js'

test('animism: spiritcount, entitypairs, ritualtypes, totemsubsets, offeringcombos, seasonalcycles, ancestorlayers, animacyratio — crossing to anthropology', async (t) => {
  assert.equal(AnimismFormulas.spiritcount(100, 10).value, 1000)
  assert.equal(AnimismFormulas.entitypairs(12, 2).value, 66)
  assert.equal(AnimismFormulas.ritualtypes(5, 3).value, 8)
  assert.equal(AnimismFormulas.totemsubsets(5).value, 32)
  assert.equal(AnimismFormulas.offeringcombos(8, 2).value, 28)
  assert.equal(AnimismFormulas.seasonalcycles(4, 1).value, 4)
  assert.equal(AnimismFormulas.ancestorlayers(5, 0).value, 5)
  assert.equal(AnimismFormulas.animacyratio(70, 100).value, 70)
  assert.equal(AnimismFormulas.spiritcount(100, 10).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('animism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'animism', program: ['spiritcount'], params: [100, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `animism.spiritcount at ${uuid}`)
  uuidReceiptOf('animism spiritcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spiritcount 1000, entitypairs 66, ritualtypes 8, totemsubsets 32, offeringcombos 28, seasonalcycles 4, ancestorlayers 5, animacyratio 70; crossing to anthropology')
})
