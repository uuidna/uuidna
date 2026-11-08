import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ShamanismFormulas } from './index.js'
import '../../mcp/families.js'

test('shamanism: trancestates, journeyorderings, spiritallies, drumbeats, cosmiclayers, healingcombos, initiationstages, ecstasyratio — crossing to anthropology', async (t) => {
  assert.equal(ShamanismFormulas.trancestates(3, 2).value, 5)
  assert.equal(ShamanismFormulas.journeyorderings(4).value, 24)
  assert.equal(ShamanismFormulas.spiritallies(10, 2).value, 45)
  assert.equal(ShamanismFormulas.drumbeats(120, 1).value, 120)
  assert.equal(ShamanismFormulas.cosmiclayers(3, 0).value, 3)
  assert.equal(ShamanismFormulas.healingcombos(8, 2).value, 28)
  assert.equal(ShamanismFormulas.initiationstages(5, 0).value, 5)
  assert.equal(ShamanismFormulas.ecstasyratio(80, 100).value, 80)
  assert.equal(ShamanismFormulas.trancestates(3, 2).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('shamanism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'shamanism', program: ['trancestates'], params: [3, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `shamanism.trancestates at ${uuid}`)
  uuidReceiptOf('shamanism trancestates', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; trancestates 5, journeyorderings 24, spiritallies 45, drumbeats 120, cosmiclayers 3, healingcombos 28, initiationstages 5, ecstasyratio 80; crossing to anthropology')
})
