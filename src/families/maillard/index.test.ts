import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MaillardFormulas } from './index.js'
import '../../mcp/families.js'

test('maillard: reactionrate, browningindex, temperaturefactor, aminosugarratio, flavorcompounds, phfactor, timetocolor, crustthickness — crossing to chemistry', async (t) => {
  assert.equal(MaillardFormulas.reactionrate(75, 100).value, 75)
  assert.equal(MaillardFormulas.browningindex(6, 12).value, 72)
  assert.equal(MaillardFormulas.temperaturefactor(180, 30).value, 6)
  assert.equal(MaillardFormulas.aminosugarratio(40, 60).value, 66)
  assert.equal(MaillardFormulas.flavorcompounds(12, 8).value, 96)
  assert.equal(MaillardFormulas.phfactor(70, 10).value, 7)
  assert.equal(MaillardFormulas.timetocolor(300, 5).value, 60)
  assert.equal(MaillardFormulas.crustthickness(10, 3).value, 7)
  assert.equal(MaillardFormulas.reactionrate(75, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('maillard')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'maillard', program: ['reactionrate'], params: [75, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `maillard.reactionrate at ${uuid}`)
  uuidReceiptOf('maillard reactionrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reactionrate 75, browningindex 72, temperaturefactor 6, aminosugarratio 66, flavorcompounds 96, phfactor 7, timetocolor 60, crustthickness 7; crossing to chemistry')
})
