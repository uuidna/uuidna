import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NumerologyFormulas } from './index.js'
import '../../mcp/families.js'

test('numerology: digitsum, numbercombos, cyclewheel, gematriatotal, masternumbers, repetitions, harmonicsum, permutationcount — crossing to statistics', async (t) => {
  assert.equal(NumerologyFormulas.digitsum(3, 6, 9).value, 18)
  assert.equal(NumerologyFormulas.numbercombos(10, 3).value, 120)
  assert.equal(NumerologyFormulas.cyclewheel(26, 9).value, 8)
  assert.equal(NumerologyFormulas.gematriatotal(22, 10).value, 220)
  assert.equal(NumerologyFormulas.masternumbers(11, 22).value, 33)
  assert.equal(NumerologyFormulas.repetitions(100, 7).value, 14)
  assert.equal(NumerologyFormulas.harmonicsum(1, 2, 3).value, 6)
  assert.equal(NumerologyFormulas.permutationcount(5, 3).value, 60)
  assert.equal(NumerologyFormulas.digitsum(3, 6, 9).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('numerology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'numerology', program: ['digitsum'], params: [3, 6, 9] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 18, `numerology.digitsum at ${uuid}`)
  uuidReceiptOf('numerology digitsum', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; digitsum 18, numbercombos 120, cyclewheel 8, gematriatotal 220, masternumbers 33, repetitions 14, harmonicsum 6, permutationcount 60; crossing to statistics')
})
